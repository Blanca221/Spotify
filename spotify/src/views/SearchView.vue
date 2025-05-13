<template>
  <div class="search">
    <div class="search-header">
      <h1>Buscar</h1>
      <div class="search-input">
        <i class="fas fa-search"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="¿Qué quieres escuchar?"
          @input="handleSearch"
        >
      </div>
    </div>
    <div v-if="searchResults.length > 0" class="search-results">
      <h2>Resultados</h2>
      <div class="results-grid">
        <div v-for="song in searchResults" :key="song.id" class="song-card">
          <div class="song-cover">
            <img :src="song.cover" :alt="song.title">
          </div>
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="searchQuery" class="no-results">
      <p>No se encontraron resultados para "{{ searchQuery }}"</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const searchResults = ref([])

// Simulación de búsqueda
const handleSearch = () => {
  if (searchQuery.value.length < 2) {
    searchResults.value = []
    return
  }

  // Aquí iría la lógica real de búsqueda
  searchResults.value = [
    {
      id: 1,
      title: 'Canción de ejemplo 1',
      artist: 'Artista 1',
      cover: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      title: 'Canción de ejemplo 2',
      artist: 'Artista 2',
      cover: 'https://via.placeholder.com/150'
    }
  ]
}
</script>

<style scoped>
.search {
  padding: 2rem;
}

.search-header {
  margin-bottom: 2rem;
}

.search-header h1 {
  color: #fff;
  margin-bottom: 1rem;
}

.search-input {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
}

.search-input i {
  color: #000;
  margin-right: 0.5rem;
}

.search-input input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
}

.search-results h2 {
  color: #fff;
  margin-bottom: 1rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.song-card {
  background: #282828;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.song-card:hover {
  background: #383838;
}

.song-cover {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.song-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-card h3 {
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.song-card p {
  color: #b3b3b3;
  margin: 0;
  font-size: 0.9rem;
}

.no-results {
  color: #b3b3b3;
  text-align: center;
  padding: 2rem;
}
</style> 