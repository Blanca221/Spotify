<template>
  <div class="playlist">
    <div class="playlist-header">
      <div class="playlist-cover">
        <i class="fas fa-music"></i>
      </div>
      <div class="playlist-info">
        <h1>{{ playlist.name }}</h1>
        <p>{{ playlist.songs.length }} canciones</p>
      </div>
    </div>
    <div class="songs-list">
      <SongItem
        v-for="song in playlist.songs"
        :key="song.id"
        :song="song"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSongsStore } from '@/stores/songs'
import SongItem from './SongItem.vue'

const route = useRoute()
const store = useSongsStore()

const playlist = computed(() => {
  return store.getPlaylist(Number(route.params.id)) || { name: '', songs: [] }
})
</script>

<style scoped>
.playlist {
  padding: 2rem;
}

.playlist-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.playlist-cover {
  width: 200px;
  height: 200px;
  background: #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b3b3b3;
  font-size: 4rem;
}

.playlist-info h1 {
  color: #fff;
  font-size: 2rem;
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