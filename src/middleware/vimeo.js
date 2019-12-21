/**
 * Retourne un objet Video (id, poster, posterLarge, ratio) à partir d'un ID de vidéo Viméo via l'api Viméo
 */

var Vimeo = require("vimeo").Vimeo;
var vimeoClient = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);
export default function(videoId) {
  return new Promise(function(resolve, reject) {
    vimeoClient.request({ path: "/videos/" + videoId }, function(error, body) {
      if (error) {
        console.log(error);
        reject();
      } else {
        let video = {
          id: videoId
        };
        video.poster = body.pictures.sizes[3].link;
        video.posterLarge = body.pictures.sizes[4].link;
        video.ratio = (body.height * 100) / body.width;
        resolve(video);
      }
    });
  });
}
