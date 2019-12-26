<template>
  <div class="rte">
    <template v-for="(item, index) in rte">
      <div
        v-if="item.blockName == '' || item.blockName == 'core/paragraph'"
        :key="index"
        class="rte__block"
        v-html="item.innerHtml"
      ></div>
      <div class="rte__block" :key="index" v-else>
        <RteImg v-if="item.blockName == 'core/image' && item.attrs.id" :img="item"></RteImg>
      </div>
    </template>
  </div>
</template>

<script>
import RteImg from "~/components/rte/Img.vue";
export default {
  props: ["rte"],
  components: { RteImg }
};
</script>

<style lang="scss">
.h1 {
  @extend .h1-raw;
  &-raw {
    font-family: $font__fancy;
    font-size: 4.8rem;
    font-weight: 500;
    line-height: 1.2em;
    color: $color__title;
    letter-spacing: -0.0313em;
    @include RWD(mobile) {
      font-size: 2.6rem;
    }
  }
}

.h2 {
  @extend .h2-raw;
  &-raw {
    font-family: $font__fancy;
    font-size: 3.6rem;
    font-weight: 500;
    line-height: 1.2em;
    color: $color__title;
    letter-spacing: -0.0313em;
    @include RWD(mobile) {
      font-size: 2.2rem;
    }
  }
}

.h3 {
  @extend .h3-raw;
  &-raw {
    font-family: $font__fancy;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.2em;
    color: $color__title;
    letter-spacing: -0.0313em;
    @include RWD(mobile) {
      font-size: 1.9rem;
    }
  }
}

.h4 {
  @extend .h4-raw;
  &-raw {
    font-family: $font__fancy;
    font-size: 1.7rem;
    font-weight: 500;
    line-height: 1.2em;
    color: $color__title;
    letter-spacing: -0.0313em;
  }
}

.h5 {
  @extend .h5-raw;
  &-raw {
    font-family: $font__main;
    font-size: 1.7rem;
    font-weight: 600;
    line-height: 1.2em;
    color: $color__title;
  }
}

.link {
  font-family: $font__fancy;
  font-weight: 500;
  line-height: 1.2em;
  color: $color__core;
  transition: color, 0.3s;
  text-decoration: none;
  position: relative;
  transition: width 0.5s ease;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}

.rte-inlines {
  strong:not(.unstyled) {
    font-weight: 700;
  }

  em:not(.unstyled) {
    font-style: italic;
  }

  sup:not(.unstyled) {
    font-size: smaller;
    line-height: normal;
    vertical-align: super;
  }

  sub:not(.unstyled) {
    font-size: smaller;
    line-height: normal;
    vertical-align: sub;
  }

  a:not(.unstyled) {
    @extend .link;

    &:before,
    &:after {
      height: 2px;
      bottom: -2px;
    }
  }
}

.rte-lists {
  ul:not(.unstyled),
  ol:not(.unstyled) {
    padding-left: 2.5rem;
    margin-bottom: $mb-p;
    list-style: none;

    @include RWD(mobile) {
      padding-left: 20px;
    }

    li {
      position: relative;
      margin-bottom: $mb-p;

      &:last-child {
        margin-bottom: 0;
      }

      & > :last-child {
        margin-bottom: 0;
      }
    }
  }

  ul:not(.unstyled) {
    li {
      &:before {
        position: absolute;
        top: 7px;
        left: -2.5rem;
        content: "";
        height: 9px;
        width: 9px;
        display: block;
        margin-right: 6px;
        background-color: $color__title;
        border-radius: 50%;
      }
    }
  }

  ol:not(.unstyled) {
    counter-reset: item;

    li {
      &:before {
        position: absolute;
        top: 0px;
        left: -2.5rem;
        content: counter(item) ". ";
        display: block;
        font-weight: 700;
        counter-increment: item;
      }
    }
  }
}

.rte-headless {
  @extend .rte-inlines;
  @extend .rte-lists;
}

.rte {
  & > *:first-child {
    margin-top: 0 !important;
  }
  & > *:last-child {
    margin-bottom: 0 !important;
  }
  @extend .rte-headless;

  p:not(.unstyled) {
    margin-bottom: $mb-p;
  }

  img {
    height: auto;
  }
  .rte-block {
    margin-bottom: $mb-item;
  }

  h1:not(.unstyled) {
    margin-top: $mt-h1;
    margin-bottom: $mb-h1;
    @extend .h1;
  }

  h2:not(.unstyled) {
    &:not(:first-child) {
      margin-top: $mt-h2;
    }
    margin-bottom: $mb-h2;
    @extend .h2;
  }

  h3:not(.unstyled) {
    &:not(:first-child) {
      margin-top: $mt-h3;
    }
    margin-bottom: $mb-h3;
    @extend .h3;
  }

  h4:not(.unstyled) {
    &:not(:first-child) {
      margin-top: $mt-h4;
    }
    margin-bottom: $mb-h4;
    @extend .h4;
  }

  h5:not(.unstyled) {
    &:not(:first-child) {
      margin-top: $mt-h5;
    }
    margin-bottom: $mb-h5;
    @extend .h5;
  }
}
</style>
