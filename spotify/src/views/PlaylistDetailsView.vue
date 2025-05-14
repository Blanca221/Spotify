<template>
  <div class="playlist-details-layout">
    <Sidebar />
    <div class="details-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<style scoped>
.playlist-details-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #181818;
}
.details-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
</style> 