<script>
import axios from "axios";
export default {
  data() {
    return {
      video: null,
      title: ""
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    axios
      .post("http://localhost:5001/video", {
        id: urlParams.get('vid'),
      })
      .then((response) => {
        this.video = response.data.video;
        this.title = response.data.title;
        console.log(this.video)
      })
      .catch((error) => {
        console.error("Couldn't fetch video:", error);
      });
  },
};
</script>
<template>
  <div class="video-container">
    <div class="container" v-if="video">
      <video controls>
        <source :src="video" />
      </video>
    </div>
    <div class="title">
      <h2>{{ this.title }}</h2>
    </div>
  </div>
  <div class="arrow left-arrow" @click="navigate('left')">&#8249;</div>
  <div class="arrow right-arrow" @click="navigate('right')">&#8250;</div>
</template>

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
