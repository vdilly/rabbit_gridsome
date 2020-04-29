<template lang="pug">
div.teaser-blog
  a.teaser-blog__overlay-link(:href='link')
  div.teaser-blog__bg(lazy='bg', :lazy-src="size(thumbnail, 'mobile')", :style="`background-image: url(${size(thumbnail, 'lazy')});`")
  h3.teaser-blog__title(v-html='title')
  p.teaser-blog__date(v-html='formatDate(date)')
  div.teaser-blog__lead(v-html='excerpt')
  ul.teaser-blog__tags
    li.teaser-blog__tag(v-for='(tag, index) in tags', :key='index')
      .blogpost-tag.blogpost-tag--grey(v-html='tag.title')
</template>

<script>
import dateMixin from "~/js/mixins/date";
export default {
  props: ["link", "thumbnail", "title", "date", "excerpt", "tags"],
  mixins: [dateMixin],
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