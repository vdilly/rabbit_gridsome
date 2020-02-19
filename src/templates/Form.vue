<template lang="pug">
  Layout
    Banner(v-slot="banner" :pageTitle="page.title")
    Container.container--small
      RTE(:rte="page.content")
      Formulaire.contact-form(ajaxTo="https://usebasin.com/f/1dc668b32447")
        input.input-box(required name="input")
        Btn(slot="send" :forceDiv="true") Envoyer
        Loader(slot="pending")
        div(slot="success") Formulaire bien envoyé
        div(slot="error") Une erreur est survenue, #[a(href="javascript:history.go(0)") cliquer-ici] pour réessayer
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

<style lang="scss">
.contact-form {
  position: relative;

  .form__state {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

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
