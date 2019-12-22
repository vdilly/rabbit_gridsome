<template>
  <Layout :isFront="true">
    <Container>
      <!-- Learn how to use images here: https://gridsome.org/docs/images -->
      <g-image alt="Example image" src="~/favicon.png" width="135" />

      <h1>Hello, world!</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
        excepturi labore tempore expedita, et iste tenetur suscipit explicabo!
        Dolores, aperiam non officia eos quod asperiores
      </p>

      <p class="home-links">
        <a href="https://gridsome.org/docs/" target="_blank" rel="noopener"
          >Gridsome Docs</a
        >
        <a
          href="https://github.com/gridsome/gridsome"
          target="_blank"
          rel="noopener"
          >GitHub</a
        >
      </p>
      <img
        lazy="img"
        lazy-src="https://images.pexels.com/photos/1953451/pexels-photo-1953451.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        lazy-placeholder="https://images.pexels.com/photos/1953451/pexels-photo-1953451.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=32&w=63"
        height="1260"
        width="750"
        alt=""
      />
    </Container>
  </Layout>
</template>

<script>
import pageMixin from "~/js/mixins/page";
export default {
  mixins: [pageMixin],
  metaInfo: {
    title: "Hello, world!",
    meta: [{ name: "description", content: "Une description" }]
  }
};
</script>
<style lang="scss"></style>
