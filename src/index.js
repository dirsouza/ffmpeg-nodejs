const Video = require("./video");

const ffmpeg = new Video();

if (ffmpeg.videos.length) {
  processVideo();
}

async function processVideo() {
  let video = ffmpeg.videos.pop();

  if (typeof video === "object" && Object.entries(video).length) {
    try {
      await ffmpeg.resize(video.name, video.extension, 720);
      await ffmpeg.resize(video.name, video.extension, 480);
      await ffmpeg.resize(video.name, video.extension, 360);

      console.log(`Vídeo renderizado: ${video.name}`);
      processVideo();
    } catch (e) {
      console.log(`Error:\n${e.toString()}`);
    }
  }
}
