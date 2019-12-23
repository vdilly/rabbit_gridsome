<template>
  <Layout>
    <Container>
      <h1>About us</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>
    </Container>
  </Layout>
</template>

<script>
export default {
  computed: {
    about() {
      return this.$page.about;
    }
  },
  metaInfo() {
    return {
      title: this.about.yoastMeta.yoastWpseoTitle
    };
  }
};
</script>
<page-query>
query($id: ID){
  about: wordPressPage(id: $id){
    title
    content
    acf{
      titre
    }
    yoastMeta{
      yoastWpseoTitle
      yoastWpseoMetadesc
    }
  }
}
</page-query>