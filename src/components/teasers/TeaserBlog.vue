<template>
  <div class="teaser-blog">
    <a :href="link" class="teaser-blog__overlay-link"></a>
    <div
      class="teaser-blog__bg"
      lazy="bg"
      :lazy-src="size(thumbnail, 'mobile')"
      :style="`background-image: url(${size(thumbnail, 'lazy')});`"
    ></div>
    <h3 class="teaser-blog__title" v-html="post.title"></h3>
    <p class="teaser-blog__date" v-html="formatDate(post.date)"></p>
    <p class="teaser-blog__lead" v-html="excerpt"></p>
    <pre v-for="(tag, index) in tags" v-html="tag.title" :key="index"></pre>
    <!-- <ul class="teaser-blog__tags">
      <li class="teaser-blog__tag" v-for="(tag, index) in post.tags" :key="index">
        <div class="blogpost-tag blogpost-tag--grey" v-html="tag.title"></div>
      </li>
    </ul>-->
  </div>
</template>

<script>
import dateMixin from "~/js/mixins/date";
export default {
  props: ["post", "defaultThumbnail"],
  mixins: [dateMixin],
  computed: {
    tags() {
      return this.post.tags ? this.post.tags : null;
    },
    link() {
      return this.$page.metadata.siteUrl + "/blog/" + this.post.slug + "/";
    },
    thumbnail() {
      return this.post.featuredMedia
        ? this.post.featuredMedia.sourceUrl
        : this.defaultThumbnail;
    },
    excerpt() {
      return this.post.excerpt
        ? this.post.excerpt
        : this.post.content.substring(0, 600) + "...";
    }
  }
};
</script>

<style lang="scss">
// https://codepen.io/pwkip/pen/oGMZjb link inside link
.teaser-blog {
  position: relative;
  &__overlay-link {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    &:hover,
    &:focus {
      & ~ .teaser-blog__title {
        text-decoration: underline;
      }
    }
  }
  &__bg {
    height: 20rem;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 1rem;
  }
  &__title {
    margin-bottom: 1rem;
  }
  &__date {
    margin-bottom: 2rem;
  }
  &__tag {
    pointer-events: all;
    position: relative;
    &s {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: $m1;
      pointer-events: none;
      position: relative;
      z-index: 2;
    }
    & + & {
      margin-left: 0.5rem;
    }
  }
}
</style>