<template>
  <div class="video-container">
    <div class="container">
      <video :key="video" controls autoplay muted>
        <source :src="this.video" />
      </video>
    </div>
    <div class="title">
      <h2>{{ this.title }}</h2>
      <p>Views: {{ this.views }}</p>
    </div>
  </div>
  <div class="arrow left-arrow" @click="navigate('left')">&#8249;</div>
  <div class="arrow right-arrow" @click="navigate('right')">&#8250;</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      video: "",
      videos: [],
      title: "",
      views: "",
      i: 0,
    };
  },
  methods: {
    navigate(direction) {
      if (direction === "right") {
        if (this.i + 1 < this.videos.length) {
          this.i++;
        } else {
          this.i = 0;
        }
      } else {
        if (this.i - 1 >= 0) {
          this.i--;
        } else {
          this.i = this.videos.length - 1;
        }
      }
      this.video = this.videos[this.i][0].file;
      this.title = this.videos[this.i][0].metadata.title;
      this.increaseViews(this.videos[this.i][0].metadata.id);
    },
    async increaseViews(videoId) {
      try {
        const response = await axios.post(
          "http://localhost:5000/increment/"+videoId
        );
        this.views = response.data.views;
      } catch (error) {
        console.error("Couldn't increment views.");
      }
    }
  },
  beforeMount() {
    axios
      .get("http://localhost:5001/videos")
      .then((response) => {
        this.videos = response.data.videos;
      })
      .catch((error) => {
        console.error("Couldn't fetch videos:", error);
      });
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    axios
      .post("http://localhost:5001/video", {
        id: urlParams.get("vid"),
      })
      .then((response) => {
        const vid = response.data.video[0].metadata.id;
        this.video = response.data.video[0].file;
        this.title = response.data.video[0].metadata.title;
        this.increaseViews(vid);
      })
      .catch((error) => {
        console.error("Couldn't fetch video:", error);
      });
  },
};
</script>

<style>
.video-container {
  display: flex;
  justify-content: center;
}
.container {
  width: 30%;
  height: 850px;
}
.container video {
  width: 100%;
  height: 90%;
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
