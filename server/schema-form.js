module.exports = async function({ actions, axios }) {
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
        advanced: Boolean
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
        advanced: Boolean
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
      },
    },
  });
};
