<template>
  <div class="app-layout">
    <Navbar />
    <div class="main-flex">
      <Sidebar />
      <router-view />
    </div>
    <AudioPlayer />
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import AudioPlayer from './components/AudioPlayer.vue'
import Navbar from './components/Navbar.vue'
</script>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: #000;
}
.main-flex {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
  height: 100%;
  gap: 5px;
  padding-top: 64px;
  padding-bottom: 90px;
}

.main-flex > *:not(.sidebar) {
  flex: 1 1 0;
  min-width: 0;
}

html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #000;
}
</style>
