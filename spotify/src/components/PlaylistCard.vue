<template>
  <div class="playlist-card">
    <div class="playlist-header">
      <div v-if="playlist.cover" class="playlist-cover-wrapper">
        <img :src="playlist.cover" alt="cover" class="playlist-cover" />
      </div>
      <div v-else class="collage">
        <template v-if="collageCovers.length === 1">
          <img :src="collageCovers[0]" class="collage-img single" />
        </template>
        <template v-else>
          <div class="collage-grid">
            <img v-for="(img, i) in collageCovers" :key="i" :src="img" class="collage-img" />
          </div>
        </template>
      </div>
      <div class="playlist-info">
        <h1>{{ playlist.name }}</h1>
        <p>{{ playlist.songs.length }} canciones</p>
      </div>
    </div>
    <div class="songs-list">
      <PlaylistTrackList :songs="playlist.songs" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PlaylistTrackList from './PlaylistTrackList.vue'
const props = defineProps({
  playlist: Object
})

const collageCovers = computed(() => {
  if (!props.playlist.songs) return []
  return props.playlist.songs.filter(song => song.cover).slice(0, 4).map(song => song.cover)
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
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: calc(100vh - 150px); /* Menor separación inferior */
  overflow: hidden;
}
.playlist-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}
.playlist-cover-wrapper {
  width: 220px;
  height: 220px;
}
.playlist-cover {
  width: 220px;
  height: 220px;
  border-radius: 12px;
  object-fit: cover;
  background: #222;
}
.collage {
  width: 220px;
  height: 220px;
  margin-right: 0;
}
.collage-grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
  border-radius: 12px;
  overflow: hidden;
}
.collage-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.collage-img.single {
  border-radius: 12px;
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
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: #222 transparent;
}
.songs-list::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}
.songs-list::-webkit-scrollbar-thumb {
  background: #222;
  border-radius: 4px;
}
.songs-list::-webkit-scrollbar-track {
  background: transparent;
}
</style> 