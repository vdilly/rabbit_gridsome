module.exports = async function({ graphql, createPage }) {
  const {
    data: { allWordPressPost: allWordPressPost }
  } = await graphql(`
    {
      allWordPressPost {
        edges {
          node {
            id
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
        pageIs: "article",
        id: node.id
      }
    });
  });
};
