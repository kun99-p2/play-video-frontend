<template>
  <div class="video-container">
    <div class="container">
      <video
        ref="videoPlayer"
        class="video-js vjs-default-skin"
        @ended="navigate('right')"
      ></video>
    </div>
    <div class="title">
      <h2 style="color: white">{{ this.title }}</h2>
      <p style="color: white">Views: {{ this.views }}</p>
    </div>
  </div>
  <div class="arrow left-arrow" @click="navigate('left')">&#8249;</div>
  <div class="arrow right-arrow" @click="navigate('right')">&#8250;</div>
</template>

<script>
import axios from "axios";
import videojs from "video.js";
export default {
  data() {
    return {
      id: "",
      user: "",
      video: "",
      videos: [],
      title: "",
      desc: "",
      views: "",
      i: 0,
      m3u8: "",
      player: null,
    };
  },
  methods: {
    clickedVideo(id, user, title) {
      window.location.href =
        "http://localhost:4001/video?vid=" +
        id +
        "&user=" +
        user +
        "&title=" +
        title +
        "&i=" +
        this.i;
    },
    navigate(direction) {
      if (direction === "right") {
        if (this.i >= this.videos.length - 1) {
          this.i = 0;
        } else {
          this.i++;
        }
      } else {
        this.i = this.i > 0 ? this.i - 1 : this.videos.length - 1;
      }
      this.clickedVideo(
        this.videos[this.i][0].metadata.id,
        this.videos[this.i][0].metadata.user,
        this.videos[this.i][0].metadata.title
      );
    },
    async increaseViews(videoId) {
      try {
        const response = await axios.post(
          "http://localhost:5000/increment/" + videoId
        );
        this.views = response.data.views;
      } catch (error) {
        console.error("Couldn't increment views.");
      }
    },
    initVideo() {
      this.player = videojs(this.$refs.videoPlayer, {
        controls: true,
        autoplay: true,
        aspectRatio: '4:3',
        sources: [
          {
            src: this.m3u8,
            type: "application/x-mpegURL",
          },
        ],
      });
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    //m3u8
    this.user = urlParams.get("user");
    this.id = urlParams.get("vid");
    this.i = urlParams.get("i");
    axios
      .post("http://localhost:5001/hls", {
        user: urlParams.get("user"),
        title: urlParams.get("title"),
      })
      .then((response) => {
        const vid = this.id;
        console.log(response.data);
        this.title = response.data.metadata.title;
        this.desc = response.data.metadata.desc;
        this.m3u8 = response.data.m3u8;
        this.increaseViews(vid);
        this.initVideo();
        this.player.on("pause", () => {
          this.$refs.videoPlayer.pause();
        });
        this.player.on("play", () => {
          this.$refs.videoPlayer.play();
        });
      })
      .catch((error) => {
        console.error("Couldn't fetch video:", error);
      });

    axios
      .get("http://localhost:5001/videos")
      .then((response) => {
        this.videos = response.data.videos;
        console.log(this.videos);
      })
      .catch((error) => {
        console.error("Couldn't fetch videos:", error);
      });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style>
.video-container {
  display: flex;
  justify-content: center;
}
.container {
  display: flex;
  justify-content: center;
  width: 30%;
  height: 850px;
}
.container video {
  width: 100%;
  height: 90%;
  width: 800px;
  height: 300px;
}
.title {
  position: absolute;
  color: black;
}
.views {
  position: absolute;
  color: black;
}
.arrow {
  position: fixed;
  top: 50%;
  font-size: 50px;
  color: #111;
  padding: 10px 20px;
  cursor: pointer;
}
.left-arrow {
  left: 20px;
}
.right-arrow {
  right: 20px;
}
</style>
