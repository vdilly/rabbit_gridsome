// Méthodes pour retrieve des infos à partir d'objets "post" de wordpress

export default {
  methods: {
    getLink(post){
      return this.$page.metadata.siteUrl + "/blog/" + post.slug + "/";
    },
    getThumbnail(post, defaultThumbnail){
      return post.featuredMedia
        ? post.featuredMedia.sourceUrl
        : defaultThumbnail;
    },
    getExcerpt(post){
      return post.excerpt
        ? post.excerpt
        : post.content.substring(0, 600) + "...";
    }
  }
}