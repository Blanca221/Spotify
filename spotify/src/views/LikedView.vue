<template>
  <div class="liked-view">
    <LikedSongs />
  </div>
</template>

<script setup>
import LikedSongs from '@/components/LikedSongs.vue'
</script>

<style scoped>
.liked-view {
  height: 100%;
  overflow-y: auto;
}
</style> 