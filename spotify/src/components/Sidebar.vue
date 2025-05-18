<template>
  <aside
    class="sidebar"
    v-if="!collapsed"
    :style="{ width: sidebarWidth + 'px' }"
  >
    <div class="logo">
      <img src="/images/spotify-logo.png" alt="Spotify" class="logo-img">
    </div>
    <div class="library-title">Tu biblioteca</div>
    <div class="tabs">
      <button :class="{active: activeTab === 'listas'}" @click="activeTab = 'listas'">Listas</button>
      <button :class="{active: activeTab === 'albumes'}" @click="activeTab = 'albumes'">Álbumes</button>
      <!-- <button :class="{active: activeTab === 'artistas'}" @click="activeTab = 'artistas'">Artistas</button> -->
    </div>
    <div class="search-box">
      <span class="search-icon"><Icon icon="fa6-solid:magnifying-glass" width="18" /></span>
      <input type="text" v-model="search" placeholder="Buscar en tu biblioteca..." />
    </div>
    <div class="recent-list">
      <!-- Ejemplos visuales (con portada personalizada) -->
      <div
        v-if="activeTab === 'listas'"
        v-for="item in items.listas"
        :key="'ejemplo-' + item.id"
        class="recent-item"
      >
        <img v-if="item.img" :src="item.img" class="item-img" />
        <div v-else class="item-img placeholder"><i class="fas fa-music"></i></div>
        <div class="item-info">
          <div class="item-title">{{ item.name }}</div>
          <div class="item-type">{{ item.type }}</div>
        </div>
      </div>
      <!-- Playlists reales del store (con collage) -->
      <div
        v-if="activeTab === 'listas'"
        v-for="playlist in store.playlists"
        :key="'real-' + playlist.id"
        class="recent-item"
        @click="goToPlaylist(playlist.id)"
      >
        <div class="collage-imgs">
          <template v-if="getCollageCovers(playlist).length === 1">
            <img :src="getCollageCovers(playlist)[0]" class="item-img" />
          </template>
          <template v-else>
            <div class="collage">
              <img v-for="(img, i) in getCollageCovers(playlist)" :key="i" :src="img" class="collage-img" />
            </div>
          </template>
        </div>
        <div class="item-info">
          <div class="item-title">{{ playlist.name }}</div>
          <div class="item-type">Lista</div>
        </div>
      </div>
      <!-- El resto de tabs siguen igual -->
      <div
        v-else
        v-for="item in filteredItems"
        :key="item.id"
        class="recent-item"
      >
        <img v-if="item.img" :src="item.img" class="item-img" />
        <div v-else class="item-img placeholder"><i class="fas fa-music"></i></div>
        <div class="item-info">
          <div class="item-title">{{ item.name }}</div>
          <div class="item-type">{{ item.type }}</div>
        </div>
      </div>
    </div>
    <div class="playlists">
      <button class="create-playlist">
        <i class="fas fa-plus"></i>
        <span>Crear Playlist</span>
      </button>
      <button class="liked-songs">
        <i class="fas fa-heart"></i>
        <span>Canciones que te gustan</span>
      </button>
    </div>
    <div class="resize-handle" @mousedown="startResize"></div>
  </aside>
  <button v-else class="expand-btn" @click="expandSidebar">
    <i class="fas fa-angle-right"></i> Abrir tu biblioteca
  </button>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useSongsStore } from '@/stores/songs'
import { useRouter } from 'vue-router'
const collapsed = ref(false)
const emit = defineEmits(['toggleSidebar'])

const activeTab = ref('listas')
const search = ref('')
const store = useSongsStore()
const router = useRouter()

const sidebarWidth = ref(280)
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
    sidebarWidth.value = Math.max(200, Math.min(500, e.clientX))
  }
}
onMounted(() => {
  window.addEventListener('mousemove', onResize)
  window.addEventListener('mouseup', stopResize)
})

// Datos de ejemplo para listas, álbumes y artistas
const items = {
  listas: [
    { id: 1, name: 'Canciones que te gustan', type: 'Lista', img: '/images/vultures.jpg' },
    { id: 2, name: 'El Ritmo', type: 'Lista', img: '/images/saopaulo.jpg' },
    { id: 3, name: 'Pop con Ñ', type: 'Lista', img: '/images/timeless.jpg' },
    { id: 4, name: 'Éxitos España', type: 'Lista', img: '/images/wasneverthere.jpg' },
    { id: 5, name: 'Mix diario 2', type: 'Lista', img: '/images/girlyouloud.jpg' },
  ],
  albumes: [
    { id: 6, name: 'Album Favorito', type: 'Álbum', img: 'https://via.placeholder.com/40/1DB954/fff?text=A' },
    { id: 7, name: 'Otro Álbum', type: 'Álbum', img: 'https://via.placeholder.com/40/333/fff?text=O' },
  ],
  artistas: [
    { id: 8, name: 'Chris Brown', type: 'Artista', img: 'https://via.placeholder.com/40/1DB954/fff?text=CB' },
    { id: 9, name: 'MARROW', type: 'Artista', img: 'https://via.placeholder.com/40/333/fff?text=M' },
  ]
}

const filteredItems = computed(() => {
  return items[activeTab.value].filter(item =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

function goToPlaylist(id) {
  router.push({ name: 'playlist', params: { id } })
}

function getCollageCovers(playlist) {
  // Devuelve las 4 primeras portadas de las canciones de la playlist
  if (!playlist.songs) return []
  return playlist.songs.filter(song => song.cover).slice(0, 4).map(song => song.cover)
}

function collapseSidebar() {
  collapsed.value = true
  emit('toggleSidebar', true)
}
function expandSidebar() {
  collapsed.value = false
  emit('toggleSidebar', false)
}
</script>

<style scoped>
.sidebar {
  background: #232323;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 16px #000a;
  padding: 2rem 0.5rem 1rem 0.5rem;
  min-width: 220px;
  max-width: 400px;
  width: 260px;
  box-sizing: border-box;
  border-radius: 18px;
  max-height: 100%;
  height: 100%;
  margin-right: 0;
  padding-right: 0;
}
.logo-img {
  width: 110px;
  margin-left: 0.5rem;
  margin-bottom: 1.5rem;
  display: block;
}
.library-title {
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  margin-left: 0.2rem;
  text-align: left;
}
.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
  cursor: ew-resize;
  z-index: 200;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-bottom: 1.2rem;
  justify-content: flex-start;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  box-sizing: border-box;
  width: 100%;
}
.tabs button {
  background: #181818;
  color: #b3b3b3;
  border: none;
  border-radius: 20px;
  padding: 0.4rem 1.4rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 1px 2px #0002;
}
.tabs button.active {
  background: #fff;
  color: #181818;
  box-shadow: 0 2px 8px #0002;
}
.search-box {
  display: flex;
  align-items: center;
  background: #232323;
  border-radius: 999px;
  padding: 0.4rem 1.2rem;
  color: #fff;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}
.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.3rem;
  font-size: 1rem;
  color: #b3b3b3;
}
.search-box input {
  background: transparent;
  border: none;
  color: #fff;
  outline: none;
  font-size: 1rem;
  width: 160px;
  margin-left: 0;
}
.recent-list {
  flex: 1;
  overflow-y: auto;
  max-height: 100%;
  /* Scrollbar personalizada */
  scrollbar-width: thin;
  scrollbar-color: #b3b3b3 transparent;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.recent-list::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}
.recent-list::-webkit-scrollbar-thumb {
  background: #b3b3b3;
  border-radius: 6px;
}
.recent-list::-webkit-scrollbar-track {
  background: transparent;
}
.recent-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 0.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.recent-item:hover {
  background: #232323;
}
.item-img {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  background: #282828;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-img.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b3b3b3;
  font-size: 1.2rem;
  background: #282828;
}
.item-info {
  display: flex;
  flex-direction: column;
}
.item-title {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
}
.item-type {
  color: #b3b3b3;
  font-size: 0.85rem;
}
.playlists {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.create-playlist,
.liked-songs {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-weight: 600;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;
}
.create-playlist:hover,
.liked-songs:hover {
  background: #282828;
  color: #fff;
}
.liked-songs {
  background: linear-gradient(90deg, #450af5 0%, #c4efd9 100%);
  color: #fff;
  font-weight: bold;
}
.sidebar-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
.collapse-btn, .expand-btn {
  background: #232323;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 1rem;
}
.collapse-btn:hover, .expand-btn:hover {
  background: #333;
}
.expand-btn {
  position: fixed;
  top: 2rem;
  left: 1rem;
  z-index: 100;
}
.collage {
  width: 40px;
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
  border-radius: 6px;
  overflow: hidden;
}
.collage-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.collage-imgs {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 