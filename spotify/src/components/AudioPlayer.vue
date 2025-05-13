<template>
  <div class="audio-player">
    <div class="player-controls">
      <button class="control-btn">
        <i class="fas fa-step-backward"></i>
      </button>
      <button class="control-btn play-btn">
        <i class="fas fa-play"></i>
      </button>
      <button class="control-btn">
        <i class="fas fa-step-forward"></i>
      </button>
    </div>
    <div class="progress-bar">
      <div class="progress"></div>
    </div>
    <div class="volume-control">
      <i class="fas fa-volume-up"></i>
      <input type="range" min="0" max="100" value="50" class="volume-slider">
    </div>
  </div>
</template>

<script setup>
// Lógica del reproductor de audio
</script>

<style scoped>
.audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #282828;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
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

.progress-bar {
  flex: 1;
  height: 4px;
  background: #4f4f4f;
  margin: 0 1rem;
  border-radius: 2px;
  cursor: pointer;
}

.progress {
  height: 100%;
  background: #1db954;
  border-radius: 2px;
  width: 30%;
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