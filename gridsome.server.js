// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const createPagesTemplates = require("./server/pages");
const createArticlesTemplates = require("./server/articles");
const axios = require("axios");
module.exports = function(api) {
  api.loadSource(async actions => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    /**
     *  ACF OPTIONS
     */
    const { data } = await axios.get(
      process.env.GRIDSOME_WP_URL + "/wp-json/acf/v3/options/option/"
    );
    const collection = actions.addCollection({
      typeName: "AcfOption"
    });
    collection.addNode(data.acf);

    // Type formulaires
    actions.addSchemaTypes(`
      type WordPressPage implements Node @infer{
        form: Form
      }
      type Form {
        formTitle: String
        error: String
        success: String
        formSend: String
        formAction: String
        fields: [FormFields]
      }
      type FormFields {
        type: String
        label: String
        requis: Boolean
        checked: Boolean
        acfFcLayout: String
        defaultValue: String
        options: [FormOption]
        checkboxes: [FormCheckboxes]
        radios: [FormRadios]
        fields: [SubFormFields]
      }
      type SubFormFields {
        type: String
        label: String
        requis: Boolean
        checked: Boolean
        acfFcLayout: String
        defaultValue: String
        options: [FormOption]
        checkboxes: [FormCheckboxes]
        radios: [FormRadios]
      }
      type FormOption {
        value: String,
        selected: Boolean
      }
      type FormCheckboxes {
        label: String,
        checked: Boolean
      }
      type FormRadios {
        label: String,
        selected: Boolean
      }
    `);
    actions.addSchemaResolvers({
      WordPressPage: {
        async form(obj) {
          return obj.acf;
        }
      }
    });
  });

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/

    /**
     *  PAGES
     */

    createPagesTemplates({
      graphql,
      createPage
    });
    createArticlesTemplates({
      graphql,
      createPage
    });
  });
};
