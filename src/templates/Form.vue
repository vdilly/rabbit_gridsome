<template lang="pug">
  Layout
    Banner(v-slot="banner" :pageTitle="page.title")
    Container.container--small
      RTE(:rte="page.content")
      FormWP.contact-form(:form="page.form")
</template>

<script>
import FormMaterial from "~/components/FormMaterial";
import FormWP from "~/components/FormWP.vue";
import pageMixin from "~/js/mixins/page";
export default {
  mixins: [pageMixin],
  components: { FormWP, FormMaterial },
  computed: {
    page() {
      return this.$page.page;
    },
    seo() {
      return this.seoBuilder(
        this.page.yoastMeta,
        this.page.title,
        this.page.content
      );
    }
  },
  metaInfo() {
    return {
      title: this.seo.title,
      link: this.seo.link,
      meta: this.seo.meta
    };
  }
};
</script>

<page-query>
query($id: ID){
  page: wordPressPage(id: $id){
    title
    content
    form {
      formTitle
      formAction
      success
      error
      formSend
      fields {
        type
        label
        requis
        checked
        acfFcLayout
        defaultValue
        options {
          value
          selected
        }
        checkboxes {
          label
          checked
        }
        radios {
          label
          selected
        }
        fields {
          type
          label
          requis
          checked
          acfFcLayout
          defaultValue
          options {
            value
            selected
          }
          checkboxes {
            label
            checked
          }
          radios {
            label
            selected
          }
        }
      }
    }
    yoastMeta {
      yoastWpseoTitle
      yoastWpseoMetadesc
      yoastWpseoCanonical
      yoastWpseoFacebookType
      yoastWpseoFacebookTitle
      yoastWpseoFacebookDescription
      yoastWpseoFacebookImage
      yoastWpseoTwitterTitle
      yoastWpseoTwitterDescription
      yoastWpseoTwitterImage
      yoastWpseoSocialDefaults {
        ogDefaultImage
        twitterCardType
      }
    }
  }
}
</page-query>
