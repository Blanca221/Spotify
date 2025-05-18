<template>
  <div class="audio-player">
    <!-- Izquierda: portada, info y check -->
    <div class="player-left">
      <img class="cover" src="/images/vultures.jpg" alt="cover" />
      <div class="song-info">
        <div class="title">FORÇA PESADA</div>
        <div class="artist">Sayfalse, TRXSHBXY, Scythermane, MELIZA</div>
      </div>
      <svg class="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1ed760" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
    </div>
    <!-- Centro: controles y barra de progreso -->
    <div class="player-center">
      <div class="controls">
        <button class="icon-btn">
          <Icon icon="mdi:chevron-left-circle" width="40" height="40" color="#b3b3b3" />
        </button>
        <button class="play-btn">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="28" fill="#fff"/>
            <polygon points="22,17 22,39 40,28" fill="#181818"/>
          </svg>
        </button>
        <button class="icon-btn">
          <Icon icon="mdi:chevron-right-circle" width="40" height="40" color="#b3b3b3" />
        </button>
      </div>
      <div class="progress-bar-wrapper">
        <span class="time">0:27</span>
        <div class="progress-bar">
          <div class="progress" style="width: 40%"></div>
        </div>
        <span class="time">1:10</span>
      </div>
    </div>
    <!-- Derecha: controles secundarios -->
    <div class="player-right">
      <!-- Micrófono (letra) -->
      <button class="icon-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="2" width="6" height="12" rx="3"/>
          <path d="M5 10v2a7 7 0 0 0 14 0v-2"/>
          <line x1="12" y1="22" x2="12" y2="18"/>
        </svg>
      </button>
      <!-- Lista (cola) -->
      <button class="icon-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="15" y2="18"/>
          <polyline points="18 15 21 18 18 21"/>
        </svg>
      </button>
      <!-- Dispositivos (pantalla simple) -->
      <button class="icon-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="2"/>
          <line x1="8" y1="20" x2="16" y2="20"/>
        </svg>
      </button>
      <!-- Volumen -->
      <div class="volume-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19 5v14"/></svg>
        <div class="volume-track">
          <div class="volume-progress" style="width: 60%"></div>
        </div>
      </div>
      <!-- Expandir/minimizar (dos cuadrados) -->
      <button class="icon-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="7" y="7" width="10" height="10" rx="2"/>
          <rect x="3" y="3" width="10" height="10" rx="2"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
// Solo estructura visual, sin lógica aún
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
.icon-btn:hover {
  background: #222;
  color: #1ed760;
  box-shadow: 0 2px 8px #0002;
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
.play-btn:hover {
  background: #fff;
  color: #181818;
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
}
.volume-progress {
  height: 100%;
  background: #fff;
  border-radius: 2px;
  width: 60%;
}
</style> 