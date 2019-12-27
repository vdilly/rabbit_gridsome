<template>
  <Layout>
    <Banner v-slot="banner" :pageTitle="title"></Banner>
    <Container>
      <ul class="blog__list gridy gridy-d-3-40">
        <li class="blog__item gridy__item" v-for="edge in articleList" :key="edge.node.slug">
          <TeaserBlog :post="edge.node" :defaultThumbnail="blog.acf.blogDefaultThumbnail.sourceUrl"></TeaserBlog>
        </li>
      </ul>
      <Pager :info="pageInfo" class="pagination" linkClass="pagination__link" />
    </Container>
  </Layout>
</template>

<script>
import { Pager } from "gridsome";
import pageMixin from "~/js/mixins/page";
import TeaserBlog from "~/components/teasers/TeaserBlog.vue";
export default {
  mixins: [pageMixin],
  components: { TeaserBlog, Pager },
  computed: {
    title() {
      return this.$context.tag
        ? this.blog.title + " - " + this.$context.tag.title
        : this.blog.title;
    },
    blog() {
      return this.$page.blog;
    },
    tagList() {
      return this.$page.tags.edges;
    },
    urlTag() {
      const contextTag = this.$context.tag;
      return contextTag
        ? this.tagList.find(el => el.node.slug == contextTag.slug).node
        : null;
    },
    articleList() {
      const articleList = this.$page.articles.edges;
      if (!this.urlTag) return articleList;
      return this.urlTag.belongsTo.edges;
    },
    pageInfo() {
      if (!this.urlTag) return this.$page.articles.pageInfo;
      return this.urlTag.belongsTo.pageInfo;
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
  articles: allWordPressPost(perPage: 12, page: $page) @paginate {
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
  tags: allWordPressPostTag {
    edges {
      node {
        slug
        belongsTo(perPage: 12, page: $page) @paginate {
          pageInfo {
            totalPages
            currentPage
          }
          edges {
            node {
              ...on WordPressPost{
                ...Teaser
              }
            }
          }
        }
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
