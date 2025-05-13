<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'

const sidebarCollapsed = ref(false)
function handleToggleSidebar(val) {
  sidebarCollapsed.value = val
}
</script>

<template>
  <div class="app">
    <Sidebar @toggleSidebar="handleToggleSidebar" />
    <div class="main-content" :class="{ expanded: sidebarCollapsed }">
      <Navbar />
      <main class="content">
        <router-view />
      </main>
    </div>
    <AudioPlayer />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  width: 100%;
  background: #181818;
  color: #fff;
}

.app {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #181818;
  overflow: hidden;
}

.sidebar {
  min-width: 240px;
  width: 240px;
  background: #000;
  height: 100vh;
  box-shadow: 2px 0 8px #000a;
  z-index: 10;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #181818;
  min-width: 0;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 32px 40px 120px 40px;
  background: linear-gradient(180deg, #181818 60%, #282828 100%);
  min-height: 0;
  height: 100%;
}

/* Scrollbar personalizado */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #121212;
}

::-webkit-scrollbar-thumb {
  background: #222;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #686868;
}

.main-content.expanded {
  margin-left: 0 !important;
}
</style>
