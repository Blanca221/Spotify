<template>
  <div class="playlist-card">
    <div class="playlist-header">
      <img :src="playlist.cover" alt="cover" class="playlist-cover" />
      <div class="playlist-info">
        <h1>{{ playlist.name }}</h1>
        <p>{{ playlist.songs.length }} canciones</p>
      </div>
    </div>
    <div class="songs-list">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  playlist: Object
})
</script>

<style scoped>
.playlist-card {
  width: 100%;
  max-width: 1100px;
  background: linear-gradient(135deg, #b9932f 0%, #242424 100%);
  border-radius: 18px;
  box-shadow: 0 4px 32px #000a;
  padding: 40px 48px 32px 48px;
  min-height: 600px;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.playlist-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}
.playlist-cover {
  width: 220px;
  height: 220px;
  border-radius: 12px;
  object-fit: cover;
  background: #222;
}
.playlist-info h1 {
  color: #fff;
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
}
.playlist-info p {
  color: #b3b3b3;
  margin: 0;
}
.songs-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style> 