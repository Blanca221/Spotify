<template>
  <div class="audio-player">
    <!-- Izquierda: portada, info y check -->
    <div class="player-left">
      <img class="cover" :src="currentSong?.cover || '/images/default-cover.jpg'" alt="cover" />
      <div class="song-info">
        <div class="title">{{ currentSong?.title || 'No hay canción seleccionada' }}</div>
        <div class="artist">{{ currentSong?.artist || 'Selecciona una canción para reproducir' }}</div>
      </div>
      <svg 
        v-if="currentSong && isLiked(currentSong.id)"
        class="icon-check" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#1ed760" 
        stroke-width="2.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12l2 2 4-4"/>
      </svg>
    </div>

    <!-- Centro: controles y barra de progreso -->
    <div class="player-center">
      <div class="controls">
        <button class="icon-btn" @click="previousSong" :disabled="!currentSong">
          <Icon icon="mdi:chevron-left-circle" width="40" height="40" :color="currentSong ? '#b3b3b3' : '#444'" />
        </button>
        <button class="play-btn" @click="togglePlay" :disabled="!currentSong">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="28" :fill="currentSong ? '#fff' : '#444'"/>
            <template v-if="isPlaying">
              <rect x="22" y="18" width="4" height="20" fill="#181818"/>
              <rect x="30" y="18" width="4" height="20" fill="#181818"/>
            </template>
            <template v-else>
              <polygon points="22,17 22,39 40,28" fill="#181818"/>
            </template>
          </svg>
        </button>
        <button class="icon-btn" @click="nextSong" :disabled="!currentSong">
          <Icon icon="mdi:chevron-right-circle" width="40" height="40" :color="currentSong ? '#b3b3b3' : '#444'" />
        </button>
      </div>
      <div class="progress-bar-wrapper">
        <span class="time">{{ formattedTime(currentTime) }}</span>
        <div class="progress-bar" @click="seekTo" :class="{ disabled: !currentSong }">
          <div class="progress" :style="{ width: `${(currentTime / duration) * 100}%` }"></div>
        </div>
        <span class="time">{{ formattedTime(duration) }}</span>
      </div>
    </div>

    <!-- Derecha: controles secundarios -->
    <div class="player-right">
      <button class="icon-btn" @click="toggleLike(currentSong)" :disabled="!currentSong">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" :stroke="currentSong ? '#b3b3b3' : '#444'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
      <div class="volume-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19 5v14"/>
        </svg>
        <div class="volume-track" @click="setVolumeFromClick">
          <div class="volume-progress" :style="{ width: `${volume}%` }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useSongsStore } from '@/stores/songs'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useSongsStore()
const { 
  currentSong, 
  isPlaying, 
  volume, 
  currentTime, 
  duration 
} = storeToRefs(store)

const { 
  togglePlay, 
  setVolume, 
  nextSong, 
  previousSong, 
  toggleLike, 
  isLiked,
  formattedTime,
  setCurrentTime,
  initAudio
} = store

onMounted(() => {
  initAudio()
})

const seekTo = (event) => {
  if (!currentSong.value) return
  const progressBar = event.currentTarget
  const clickPosition = event.offsetX
  const progressBarWidth = progressBar.offsetWidth
  const percentage = clickPosition / progressBarWidth
  const newTime = percentage * duration.value
  setCurrentTime(newTime)
}

const setVolumeFromClick = (event) => {
  const volumeTrack = event.currentTarget
  const clickPosition = event.offsetX
  const trackWidth = volumeTrack.offsetWidth
  const percentage = (clickPosition / trackWidth) * 100
  setVolume(Math.round(percentage))
}
</script>

<style scoped>
.audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  height: 90px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 8px #000a;
  padding: 0 24px;
  gap: 1.5rem;
}
.player-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 220px;
}
.cover {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
}
.song-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.2;
}
.artist {
  color: #b3b3b3;
  font-size: 0.95rem;
  line-height: 1.1;
}
.icon-check {
  margin-left: 0.7rem;
  vertical-align: middle;
}
.player-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 0;
}
.controls {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.3rem;
}
.icon-btn {
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.4rem;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 0 transparent;
}
.icon-btn:not(:disabled):hover {
  background: #222;
  color: #1ed760;
  box-shadow: 0 2px 8px #0002;
}
.icon-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.play-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  color: #181818;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0003;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.play-btn:not(:disabled):hover {
  background: #fff;
  color: #181818;
}
.play-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.progress-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  max-width: 500px;
}
.progress-bar {
  flex: 1;
  height: 4px;
  background: #444;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.progress-bar.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.progress {
  height: 100%;
  background: #fff;
  border-radius: 2px;
  width: 40%;
}
.time {
  color: #b3b3b3;
  font-size: 0.95rem;
  min-width: 40px;
  text-align: center;
}
.player-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 220px;
}
.volume-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
}
.volume-track {
  width: 120px;
  height: 4px;
  background: #444;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.volume-progress {
  height: 100%;
  background: #fff;
  border-radius: 2px;
  width: 60%;
}
</style> 