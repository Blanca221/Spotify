<template>
  <div class="song-item" @click="playSong">
    <div class="song-info">
      <img :src="song.cover" :alt="song.title" class="cover">
      <div class="details">
        <h3 class="title">{{ song.title }}</h3>
        <p class="artist">{{ song.artist }}</p>
      </div>
    </div>
    <div class="actions">
      <button class="action-btn" @click.stop="toggleLike">
        <i :class="['fas', isLiked ? 'fa-heart' : 'fa-heart-o']"></i>
      </button>
      <button class="action-btn" @click.stop="addToQueue">
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSongsStore } from '@/stores/songs'

const props = defineProps({
  song: {
    type: Object,
    required: true
  }
})

const store = useSongsStore()

const isLiked = computed(() => store.isLiked(props.song.id))

const playSong = () => {
  store.setCurrentSong(props.song)
  store.togglePlay()
}

const toggleLike = () => {
  store.toggleLike(props.song)
}

const addToQueue = () => {
  store.addToQueue(props.song)
}
</script>

<style scoped>
.song-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.song-item:hover {
  background: #282828;
}

.song-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cover {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}

.details {
  display: flex;
  flex-direction: column;
}

.title {
  color: #fff;
  font-size: 0.9rem;
  margin: 0;
}

.artist {
  color: #b3b3b3;
  font-size: 0.8rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.song-item:hover .actions {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  transition: color 0.3s;
}

.action-btn:hover {
  color: #fff;
}
</style> 