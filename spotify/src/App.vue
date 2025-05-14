<template>
  <div class="app-layout">
    <Sidebar />
    <div class="main-section">
      <router-view />
    </div>
    <AudioPlayer />
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import AudioPlayer from './components/AudioPlayer.vue'
</script>

<style>
.app-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background: #181818;
  overflow: hidden;
}
.main-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100vh;
  position: relative;
}

html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #181818;
}
</style>
