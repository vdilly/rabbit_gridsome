module.exports = async function({ actions, axios }) {
  // Type Menu
  actions.addSchemaTypes(`
      type AcfOption implements Node @infer{
        menu_header: MenuClone,
        menu_footer: MenuClone
      }
      type MenuClone{
        menu: [MenuEntry]
      }
      type MenuEntry{
        acf_fc_layout: String
        label_is_link: Boolean
        label: String
        liens: Liens
        submenu : [SubMenuEntry]
      }
      type SubMenuEntry{
        liens: Liens
      }
      type Liens {
        title: String
        url: String
        target: String
      }
    `);
};
