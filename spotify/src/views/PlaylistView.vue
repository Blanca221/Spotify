<template>
  <div class="playlist-view">
    <Playlist />
  </div>
</template>

<script setup>
import Playlist from '@/components/Playlist.vue'
</script>

<style scoped>
.playlist-view {
  height: 100%;
  overflow-y: auto;
}
</style> 