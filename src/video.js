const fs = require("fs");
const { spawn } = require("child_process");

class Video {
  _videos = [];

  constructor() {
    fs.readdirSync(`${__dirname}/videos/original`).forEach(file => {
      let name = file.substr(0, file.lastIndexOf("."));
      let extension = file.substr(file.lastIndexOf(".") + 1);

      this._videos.push({
        name,
        extension
      });
    });
  }

  get videos() {
    return this._videos;
  }

  resize(video, extension, quality) {
    const promise = new Promise((resolve, reject) => {
      const ffmpeg = spawn(`${__dirname}/ffmpeg_exec/ffmpeg`, [
        "-i",
        `${__dirname}/videos/original/${video}.${extension}`,
        "-codec:v",
        "libx264",
        "-profile:v",
        "main",
        "-preset",
        "slow",
        "-b:v",
        "400k",
        "-maxrate",
        "400k",
        "-bufsize",
        "800k",
        "-vf",
        `scale=-2:${quality}`,
        "-threads",
        "0",
        "-b:a",
        "128k",
        `${__dirname}/videos/converted/${video}_${quality}.${extension}`
      ]);

      ffmpeg.stderr.on("data", data => reject(data));
      ffmpeg.on("close", code => resolve(code));
    });

    return promise;
  }
}

module.exports = Video;
