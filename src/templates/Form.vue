<template>
  <Layout>
    <Banner v-slot="banner" :pageTitle="page.title"></Banner>
    <Container class="container--small">
      <RTE :rte="page.content"></RTE>
      <Formulaire :form="page.form"></Formulaire>
    </Container>
  </Layout>
</template>

<script>
import pageMixin from "~/js/mixins/page";
import Formulaire from "~/components/form/Formulaire.vue";
export default {
  mixins: [pageMixin],
  components: { Formulaire },
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

<style lang="scss"></style>
