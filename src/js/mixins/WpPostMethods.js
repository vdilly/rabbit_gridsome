// Méthodes pour retrieve des infos à partir d'objets "post" de wordpress

const { htmlToText } = require('html-to-text');
export default {
  methods: {
    getLink(post) {
      return this.$page.metadata.siteUrl + "/blog/" + post.slug + "/";
    },
    getThumbnail(post, defaultThumbnail) {
      return post.featuredMedia
        ? post.featuredMedia.sourceUrl
        : defaultThumbnail;
    },
    getExcerpt(post, limit) {
      limit = limit ? limit : 600;
      return post.excerpt
        ? post.excerpt
        : htmlToText(post.content, {
          wordwrap: null,
          tags: {
            a: { format: "skip" },
            img: { format: "skip" }
          },
        })
          .substring(0, limit) + "...";
    }
  }
}