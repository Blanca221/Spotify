<template>
  <div class="library">
    <div class="library-header">
      <h2>Tu biblioteca</h2>
      <button class="create-btn">
        <i class="fas fa-plus"></i> Crear
      </button>
    </div>
    <div class="library-filters">
      <button 
        class="filter" 
        :class="{ active: activeTab === 'Listas' }" 
        @click="activeTab = 'Listas'"
      >Listas</button>
      <button 
        class="filter" 
        :class="{ active: activeTab === 'Álbumes' }" 
        @click="activeTab = 'Álbumes'"
      >Álbumes</button>
      <button 
        class="filter" 
        :class="{ active: activeTab === 'Artistas' }" 
        @click="activeTab = 'Artistas'"
      >Artistas</button>
    </div>
    <div class="library-search-sort">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar en tu biblioteca" />
      </div>
      <div class="sort">
        Recientes <i class="fas fa-chevron-down"></i>
      </div>
    </div>
    <div class="library-list">
      <div v-if="activeTab === 'Listas'">
        <div v-for="playlist in playlists" :key="playlist.id" class="library-item" @click="goToPlaylist(playlist.id)">
          <img :src="playlist.cover" class="item-cover" />
          <div class="item-info">
            <div class="item-title">{{ playlist.name }}</div>
            <div class="item-desc">Lista • {{ playlist.owner }}</div>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'Álbumes'">
        <div v-for="album in albums" :key="album.id" class="library-item">
          <img :src="album.cover" class="item-cover" />
          <div class="item-info">
            <div class="item-title">{{ album.name }}</div>
            <div class="item-desc">Álbum • {{ album.artist }}</div>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'Artistas'">
        <div v-for="artist in artists" :key="artist.id" class="library-item">
          <img :src="artist.cover" class="item-cover" />
          <div class="item-info">
            <div class="item-title">{{ artist.name }}</div>
            <div class="item-desc">Artista</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
//Import del store
import { useSongsStore } from '@/stores/songs'

const activeTab = ref('Listas')
const store = useSongsStore()

// playlists reales
const playlists = store.playlists

// playlists de ejemplo ( para pruebas visuales)
const examplePlaylists = [
  {
    id: 1,
    name: "Canciones que te gustan",
    cover: "https://misc.scdn.co/liked-songs/liked-songs-640.png",
    owner: "Spotify"
  },
  {
    id: 2,
    name: "Pop con Ñ",
    cover: "https://i.scdn.co/image/ab67706f00000002c0e5e7e2e2e2e2e2e2e2e2e2",
    owner: "Spotify"
  },
  // ...más playlists
]

const albums = [
  {
    id: 1,
    name: "Éxitos España",
    cover: "https://i.scdn.co/image/ab67706f00000002e2e2e2e2e2e2e2e2e2e2e2e2",
    artist: "Varios"
  },
  {
    id: 2,
    name: "El Ritmo",
    cover: "https://i.scdn.co/image/ab67706f00000002e2e2e2e2e2e2e2e2e2e2e2e2",
    artist: "Varios"
  },
  {
    id: 3,
    name: "Timeless",
    cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9cbd4a2e2e",
    artist: "Kelly Clarkson"
  },
  {
    id: 4,
    name: "Vultures 1",
    cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9cbd4a2e2e",
    artist: "Kanye West & Ty Dolla $ign"
  },
  {
    id: 5,
    name: "Never Was There",
    cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9cbd4a2e2e",
    artist: "MARROW"
  },
  {
    id: 6,
    name: "Girl You Loud",
    cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9cbd4a2e2e",
    artist: "Chris Brown"
  }
]

const artists = [
  {
    id: 1,
    name: "Chris Brown",
    cover: "https://i.scdn.co/image/ab6761610000e5eb2e2e2e2e2e2e2e2e2e2e2e2e2"
  },
  {
    id: 2,
    name: "Rauw Alejandro",
    cover: "https://i.scdn.co/image/ab6761610000e5eb2e2e2e2e2e2e2e2e2e2e2e2e2"
  },
  // ...más artistas
]
</script>

<style scoped>
.library {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.library-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.library-header h2 {
  font-size: 1.5rem;
  font-weight: bold;
}
.create-btn {
  background: #232323;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}
.create-btn:hover {
  background: #333;
}
.library-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.filter {
  background: #232323;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.filter.active, .filter:hover {
  background: #fff;
  color: #000;
}
.library-search-sort {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.search-box {
  display: flex;
  align-items: center;
  background: #232323;
  border-radius: 999px;
  padding: 0.3rem 1rem;
  color: #fff;
  gap: 0.5rem;
}
.search-box input {
  background: transparent;
  border: none;
  color: #fff;
  outline: none;
  font-size: 1rem;
  width: 160px;
}
.sort {
  color: #b3b3b3;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;
}
.library-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  overflow-y: auto;
}
.library-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.library-item:hover {
  background: #232323;
}
.item-cover {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
}
.item-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.item-title {
  font-weight: 600;
  font-size: 1.1rem;
}
.item-desc {
  color: #b3b3b3;
  font-size: 0.95rem;
}
</style> 