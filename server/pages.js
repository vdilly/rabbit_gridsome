module.exports = async function({ graphql, createPage }) {
  const {
    data: { allWordPressPage: allWordPressPage }
  } = await graphql(`
    {
      allWordPressPage {
        edges {
          node {
            template
            id
            slug
          }
        }
      }
    }
  `);

  // Blog Tags
  const {
    data: { allWordPressPostTag: allWordPressPostTag }
  } = await graphql(`
    {
      allWordPressPostTag {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `);

  allWordPressPage.edges.forEach(function({ node }) {
    // Hp gérée dans page/index.vue
    if (node.template == "homepage.php") return;

    // Page default
    if (node.template == "") {
      createPage({
        path: `/${node.slug}`,
        component: `./src/templates/Page.vue`,
        context: {
          template: "page",
          id: node.id
        }
      });
    }
    // Blog
    if (node.template == "blog.php") {
      createPage({
        path: `/blog`,
        component: `./src/templates/Blog.vue`,
        context: {
          template: "blog",
          id: node.id
        }
      });

      allWordPressPostTag.edges.forEach(function(edge) {
        createPage({
          path: `/blog/tag/${edge.node.slug}`,
          component: `./src/templates/Blog.vue`,
          context: {
            template: "blog",
            id: node.id,
            tag: edge.node
          }
        });
      });
    }
    // Formulaires
    // if (node.template == "form.php") {
    //   createPage({
    //     path: `/${node.slug}`,
    //     component: `./src/templates/Formulaire.vue`,
    //     context: {
    //       template: "form",
    //       id: node.id
    //     }
    //   });
    // }
    // About
    if (node.template == "about.php") {
      createPage({
        path: `/${node.slug}`,
        component: `./src/templates/About.vue`,
        context: {
          template: "about",
          id: node.id
        }
      });
    }
  });
};
