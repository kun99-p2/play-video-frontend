<script setup></script>

<template>
  <div class="container">
    <video controls>
      <source src="" type="video" />
    </video>
  </div>
  <div class="arrow left-arrow" @click="navigate('left')">&#8249;</div>
  <div class="arrow right-arrow" @click="navigate('right')">&#8250;</div>
</template>

<style>
.container {
  width: 500px;
  height: 850px;
  margin: 0 auto;
}

video {
  width: 100%;
  height: 100%;
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
