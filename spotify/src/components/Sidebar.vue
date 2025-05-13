<template>
  <aside class="sidebar" v-if="!collapsed">
    <div class="sidebar-header">
      <button class="collapse-btn" @click="collapseSidebar">
        <i class="fas fa-angle-left"></i> Contraer tu biblioteca
      </button>
    </div>
    <div class="logo">
      <img src="https://via.placeholder.com/130x40/1DB954/FFFFFF?text=Spotify" alt="Spotify">
    </div>
    <div class="library-title">Tu biblioteca</div>
    <div class="tabs">
      <button :class="{active: activeTab === 'listas'}" @click="activeTab = 'listas'">Listas</button>
      <button :class="{active: activeTab === 'albumes'}" @click="activeTab = 'albumes'">Álbumes</button>
      <button :class="{active: activeTab === 'artistas'}" @click="activeTab = 'artistas'">Artistas</button>
    </div>
    <div class="search-box">
      <i class="fas fa-search"></i>
      <input type="text" v-model="search" placeholder="Buscar en tu biblioteca..." />
    </div>
    <div class="recent-list">
      <div v-for="item in filteredItems" :key="item.id" class="recent-item">
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
  </aside>
  <button v-else class="expand-btn" @click="expandSidebar">
    <i class="fas fa-angle-right"></i> Abrir tu biblioteca
  </button>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'
const collapsed = ref(false)
const emit = defineEmits(['toggleSidebar'])

const activeTab = ref('listas')
const search = ref('')

// Datos de ejemplo para listas, álbumes y artistas
const items = {
  listas: [
    { id: 1, name: 'Canciones que te gustan', type: 'Lista', img: 'https://via.placeholder.com/40/1DB954/fff?text=♥' },
    { id: 2, name: 'El Ritmo', type: 'Lista', img: 'https://via.placeholder.com/40/333/fff?text=R' },
    { id: 3, name: 'Pop con Ñ', type: 'Lista', img: 'https://via.placeholder.com/40/333/fff?text=P' },
    { id: 4, name: 'Éxitos España', type: 'Lista', img: 'https://via.placeholder.com/40/333/fff?text=E' },
    { id: 5, name: 'Mix diario 2', type: 'Lista', img: 'https://via.placeholder.com/40/333/fff?text=M' },
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
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: #000;
  padding: 2rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 2px 0 8px #000a;
  z-index: 100;
}
.logo img {
  width: 120px;
  margin-bottom: 1rem;
}
.library-title {
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-left: 0.2rem;
}
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.7rem;
}
.tabs button {
  background: #181818;
  color: #b3b3b3;
  border: none;
  border-radius: 20px;
  padding: 0.3rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
}
.tabs button.active {
  background: #fff;
  color: #181818;
}
.search-box {
  display: flex;
  align-items: center;
  background: #181818;
  border-radius: 20px;
  padding: 0.3rem 1rem;
  margin-bottom: 1rem;
  color: #b3b3b3;
}
.search-box input {
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  margin-left: 0.5rem;
  width: 100%;
  font-size: 1rem;
}
.recent-list {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
</style> 