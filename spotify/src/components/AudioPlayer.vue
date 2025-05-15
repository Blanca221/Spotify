<template>
  <div class="audio-player">
    <!-- Info de la canción (puedes mejorar esto luego) -->
    <div class="player-controls">
      <button class="control-btn">
        <i class="fas fa-step-backward"></i>
      </button>
      <button class="control-btn play-btn" @click="togglePlay">
        <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
      </button>
      <button class="control-btn">
        <i class="fas fa-step-forward"></i>
      </button>
    </div>
    <div class="progress-bar-wrapper">
      <span class="time">{{ formatTime(currentTime) }}</span>
      <input
        type="range"
        min="0"
        :max="duration"
        step="0.1"
        v-model="currentTime"
        @input="seekAudio"
        class="progress-slider"
      />
      <span class="time">{{ formatTime(duration) }}</span>
    </div>
    <div class="volume-control">
      <i class="fas fa-volume-up"></i>
      <input type="range" min="0" max="100" value="50" class="volume-slider">
    </div>
    <audio
      ref="audioRef"
      src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c3b.mp3"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    ></audio>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const audioRef = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

function togglePlay() {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

function onTimeUpdate() {
  currentTime.value = audioRef.value.currentTime
}

function onLoadedMetadata() {
  duration.value = audioRef.value.duration
}

function seekAudio(e) {
  audioRef.value.currentTime = parseFloat(e.target.value)
}

function onEnded() {
  isPlaying.value = false
}

function formatTime(sec) {
  if (isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: var(--audio-height, 90px);
  background: #000;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 8px #000a;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0 2rem;
  gap: 0.7rem;
}

.progress-slider {
  flex: 1;
  height: 4px;
  accent-color: #1db954;
}

.time {
  color: #b3b3b3;
  font-size: 0.95rem;
  min-width: 40px;
  text-align: center;
}

.control-btn {
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 1.2rem;
}

.play-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  color: #000;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.volume-slider {
  width: 100px;
}
</style> 