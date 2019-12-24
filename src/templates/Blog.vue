<template>
  <Layout>
    <Container>
      <h1 v-html="$context.tag ? blog.title + ' - ' + $context.tag.title : blog.title"></h1>
      <ul class="blog__list gridy">
        <li class="blog__item gridy__item" v-for="edge in articleList" :key="edge.node.slug">
          <TeaserBlog :post="edge.node"></TeaserBlog>
        </li>
      </ul>
      <Pager :info="pageInfo" />
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
    }
  },
  metaInfo() {
    return {
      title: `Blog`,
      bodyAttrs: {
        class: "blog"
      },
      meta: [
        {
          key: "description",
          name: "description",
          content: "Description en dur"
        },
        { property: "og:type", content: "blog" },
        { property: "og:title", content: "Blog" },
        {
          property: "og:description",
          content: "Description en dur"
        },
        {
          property: "og:url",
          content: this.$page.metadata.siteUrl + "blog/"
        },
        // { property: "og:image", content: this.ogImageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Blog" },
        {
          name: "twitter:description",
          content: "Description en dur"
        },
        { name: "twitter:site", content: "@cossssmin" },
        { name: "twitter:creator", content: "@cossssmin" }
        // { name: "twitter:image", content: this.ogImageUrl }
      ]
    };
  }
};
</script> 

<page-query>
query($page: Int, $id: ID) {
  metadata{
    siteUrl
  }
  blog: wordPressPage(id: $id){
    title
    content
    yoastMeta{
      yoastWpseoTitle
      yoastWpseoMetadesc
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
  tags{
    slug
    title
  }
  excerpt
  content
}
</page-query>