// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const createPagesTemplates = require("./server/pages");
const createArticlesTemplates = require("./server/articles");
const schemaForm = require("./server/schema-form");
const schemaMenu = require("./server/schema-menu");
const schemaImages = require("./server/schema-images");
const axios = require("axios");
module.exports = function (api) {
  api.loadSource(async (actions) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    /**
     *  ACF OPTIONS
     */
    const { data } = await axios.get(
      process.env.GRIDSOME_WP_URL + "/wp-json/acf/v3/options/option/"
    );
    const collection = actions.addCollection({
      typeName: "AcfOption",
    });
    collection.addNode(data.acf);

    schemaForm({ actions });
    schemaMenu({ actions });
    schemaImages({ actions });
  });

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/

    /**
     *  PAGES
     */

    await createPagesTemplates({
      graphql,
      createPage,
    });
    await createArticlesTemplates({
      graphql,
      createPage,
    });
  });
};
