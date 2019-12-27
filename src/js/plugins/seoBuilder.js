export default function(yoast, postTitle, postContent) {
  let _this = this;
  const title = yoast.yoastWpseoTitle ? yoast.yoastWpseoTitle : postTitle,
    desc = yoast.yoastWpseoMetadesc
      ? yoast.yoastWpseoMetadesc
      : postContent.substring(0, 600) + "...",
    img = yoast.yoastWpseoFacebookImage
      ? yoast.yoastWpseoFacebookImage
      : yoast.yoastWpseoSocialDefaults.ogDefaultImage;
  let seo = {
    title: title,
    link: [{ rel: "canonical", href: yoast.yoastWpseoCanonical }],
    meta: [
      {
        key: "robots",
        name: "robots",
        content:
          "follow,index,max-snippet:-1,max-video-preview:-1,max-image-preview:large"
      },
      {
        key: "description",
        name: "description",
        content: desc
      },
      { property: "og:type", content: yoast.yoastWpseoFacebookType },
      {
        property: "og:title",
        content: yoast.yoastWpseoFacebookTitle
          ? yoast.yoastWpseoFacebookTitle
          : title
      },
      {
        property: "og:description",
        content: yoast.yoastWpseoFacebookDescription
          ? yoast.yoastWpseoFacebookDescription
          : desc
      },
      {
        property: "og:url",
        content: yoast.yoastWpseoCanonical
      },
      {
        property: "og:image",
        content: img
      },
      {
        name: "twitter:card",
        content: yoast.yoastWpseoSocialDefaults.twitterCardType
      },
      {
        name: "twitter:title",
        content: yoast.yoastWpseoTwitterTitle
          ? yoast.yoastWpseoTwitterTitle
          : title
      },
      {
        name: "twitter:description",
        content: yoast.yoastWpseoTwitterDescription
          ? yoast.yoastWpseoTwitterDescription
          : desc
      },
      {
        name: "twitter:image",
        content: yoast.yoastWpseoTwitterImage
          ? yoast.yoastWpseoTwitterImage
          : img
      }
    ]
  };

  return seo;
}