<template>
  <div class="liked-songs">
    <div class="liked-header">
      <div class="liked-cover">
        <i class="fas fa-heart"></i>
      </div>
      <div class="liked-info">
        <h1>Canciones que te gustan</h1>
        <p>{{ store.likedSongs.length }} canciones</p>
      </div>
    </div>
    <div class="songs-list">
      <SongItem
        v-for="song in store.likedSongs"
        :key="song.id"
        :song="song"
      />
    </div>
  </div>
</template>

<script setup>
import { useSongsStore } from '@/stores/songs'
import SongItem from './SongItem.vue'

const store = useSongsStore()
</script>

<style scoped>
.liked-songs {
  padding: 2rem;
}

.liked-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.liked-cover {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #450af5, #c4efd9);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 4rem;
}

.liked-info h1 {
  color: #fff;
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
}

.liked-info p {
  color: #b3b3b3;
  margin: 0;
}

.songs-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style> 