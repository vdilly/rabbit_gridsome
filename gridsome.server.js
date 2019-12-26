// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const createPagesTemplates = require("./server/pages");
const createArticlesTemplates = require("./server/articles");
module.exports = function(api) {
  api.loadSource(actions => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  });

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/

    /**
     *  PAGES
     */

    createPagesTemplates({ graphql, createPage });
    createArticlesTemplates({ graphql, createPage });
  });
};
