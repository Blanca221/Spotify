<template>
  <div class="playlist-details-layout">
    <div class="details-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Sidebar eliminado
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