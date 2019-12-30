<template>
  <Layout>
    <Banner v-slot="banner" :pageTitle="title"></Banner>
    <Container>
      <!-- <ul
        class="blog__list blog__list--sticky gridy gridy-d-2-40"
        v-show="stickyArticleList && pageInfo.currentPage == 1"
      >
        <li
          class="blog__item blog__item--sticky gridy__item"
          v-for="edge in stickyArticleList"
          :key="edge.node.slug"
        >
          <TeaserBlog :post="edge.node" :defaultThumbnail="blog.acf.blogDefaultThumbnail.sourceUrl"></TeaserBlog>
        </li>
      </ul>-->
      <!-- <transition appear name="gridy" mode="out-in" duration="3000">
        <ul class="blog__list gridy gridy-d-3-40" domChange>
          <li class="blog__item gridy__item" v-for="edge in articleList" :key="edge.node.slug">
            <TeaserBlog
              :post="edge.node"
              :defaultThumbnail="blog.acf.blogDefaultThumbnail.sourceUrl"
            ></TeaserBlog>
          </li>
        </ul>
      </transition>-->
      <Pager :info="pageInfo" class="pagination" linkClass="pagination__link" />
    </Container>
  </Layout>
</template>

<script>
import { Pager } from "gridsome";
import pageMixin from "~/js/mixins/page";
import TeaserBlog from "~/components/teasers/TeaserBlog.vue";
import lazyImg from "~/js/plugins/lazyImg/lazyImg";
export default {
  mixins: [pageMixin],
  components: { TeaserBlog, Pager },
  computed: {
    title() {
      return this.blog.title;
    },
    blog() {
      return this.$page.blog;
    },
    stickyArticleList() {
      return this.$page.stickyArticles.edges;
    },
    articleList() {
      return this.$page.articles.edges;
    },
    pageInfo() {
      return this.$page.articles.pageInfo;
    },
    seo() {
      return this.seoBuilder(this.$page.blog.yoastMeta, this.title, "");
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
.blog {
  &__list {
    margin-bottom: -4rem;
    &--sticky {
      margin-bottom: 0;
    }
  }
  &__item {
    margin-bottom: 4rem;
  }
}
</style>

<page-query>
query($page: Int, $id: ID) {
  metadata{
    siteUrl
  }
  blog: wordPressPage(id: $id){
    title
    content
    acf {
      blogDefaultThumbnail {
        sourceUrl
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
  stickyArticles: allWordPressPost(filter: {sticky: {eq: true}}) {
    edges {
      node {
        ...Teaser
      }
    }
  }
  articles: allWordPressPost(perPage: 12, page: $page, filter: {sticky: {eq: false}}) @paginate {
    pageInfo{
      totalPages
      currentPage
    }
    edges {
      node {
        ...Teaser
      }
    }
  }
}
fragment Teaser on WordPressPost{
  slug
  sticky
  title
  date
  featuredMedia{sourceUrl}
  tags{
    slug
    title
  }
  excerpt
  content
}
</page-query>
