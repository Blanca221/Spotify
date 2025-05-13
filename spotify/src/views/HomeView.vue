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
</script>

<template>
  <div class="home">
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
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
}

h1 {
  color: #fff;
  margin-bottom: 2rem;
}

.featured-playlists h2 {
  color: #fff;
  margin-bottom: 1rem;
}

.playlists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
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
</style>
