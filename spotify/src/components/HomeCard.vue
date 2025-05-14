<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const featuredPlaylists = ref([
  {
    id: 1,
    name: 'Top 50 Global',
    description: 'Las canciones más populares del momento'
  },
  {
    id: 2,
    name: 'Descubrimiento semanal',
    description: 'Tu mix personalizado de la semana'
  },
  {
    id: 3,
    name: 'Éxitos latinos',
    description: 'Los mejores éxitos latinos'
  }
])

const navigateToPlaylist = (playlistId) => {
  router.push({ name: 'playlist', params: { id: playlistId } })
}

const cardWidth = ref(1100)
let isResizing = false

function startResize(e) {
  isResizing = true
  document.body.style.cursor = 'ew-resize'
}
function stopResize() {
  isResizing = false
  document.body.style.cursor = ''
}
function onResize(e) {
  if (isResizing) {
    cardWidth.value = Math.max(600, Math.min(1400, e.clientX - document.querySelector('.home-card-bg').getBoundingClientRect().left))
  }
}
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', onResize)
  window.addEventListener('mouseup', stopResize)
}
</script>

<template>
  <div class="home-card-bg">
    <div class="home-card" :style="{ width: cardWidth + 'px' }">
      <h1>Bienvenido a Spotify</h1>
      <div class="featured-playlists">
        <h2>Playlists destacadas</h2>
        <div class="playlists-grid">
          <div v-for="playlist in featuredPlaylists" :key="playlist.id" class="playlist-card" @click="navigateToPlaylist(playlist.id)">
            <div class="playlist-cover">
              <i class="fas fa-music"></i>
            </div>
            <h3>{{ playlist.name }}</h3>
            <p>{{ playlist.description }}</p>
          </div>
        </div>
      </div>
      <div class="resize-handle" @mousedown="startResize"></div>
    </div>
  </div>
</template>

<style scoped>
.home-card-bg {
  position: fixed;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 16px;
  margin-bottom: 16px;
  z-index: 1001;
  height: calc(100vh - 64px - 90px - 32px);
  max-height: calc(100vh - 64px - 90px - 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 600px;
}
.home-card {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  border-radius: 32px;
  box-shadow: 0 8px 40px #000a, 0 1.5px 8px #0006;
  padding: 40px 48px 32px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 1400px;
  min-width: 600px;
  width: 1100px;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
h1 {
  color: #fff;
  margin-bottom: 2rem;
}
.featured-playlists h2 {
  color: #fff;
  margin-bottom: 1rem;
}
.featured-playlists {
  width: 100%;
  margin: 2rem 0 0 0;
  padding: 0;
}
.playlists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  width: 100%;
}
.playlist-card {
  background: #282828;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.playlist-card:hover {
  background: #383838;
}
.playlist-cover {
  width: 100%;
  aspect-ratio: 1;
  background: #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b3b3b3;
  font-size: 2rem;
  margin-bottom: 1rem;
}
.playlist-card h3 {
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}
.playlist-card p {
  color: #b3b3b3;
  margin: 0;
  font-size: 0.9rem;
}
.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 100%;
  cursor: ew-resize;
  background: linear-gradient(to right, transparent 60%, #222 100%);
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  z-index: 10;
}
</style> 