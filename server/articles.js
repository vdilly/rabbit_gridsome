module.exports = async function({ graphql, createPage }) {
  const {
    data: { allWordPressPost: allWordPressPost }
  } = await graphql(`
    {
      allWordPressPost {
        edges {
          node {
            id
            title
            slug
          }
        }
      }
    }
  `);

  allWordPressPost.edges.forEach(function({ node }) {
    createPage({
      path: `/blog/${node.slug}`,
      component: `./src/templates/Article.vue`,
      context: {
        template: "article",
        ariane: [
          {
            label: "Blog",
            link: "/blog"
          },
          {
            label: node.title,
            link: `/blog/${node.slug}`
          }
        ],
        id: node.id
      }
    });
  });
};
