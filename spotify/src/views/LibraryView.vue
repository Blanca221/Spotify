<template>
  <div class="library-view">
    <!-- Imagen grande/banner -->
    <div class="banner">
      <img src="https://misc.scdn.co/liked-songs/liked-songs-640.png" alt="Banner biblioteca" />
    </div>
    <!-- Botones de filtro (puedes dejar solo visual, la lógica ya la tienes en Library.vue) -->
    <div class="library-filters">
      <button :class="{ active: true }">Listas</button>
      <button>Álbumes</button>
      <button>Artistas</button>
    </div>
    <!-- Etiqueta pequeña -->
    <div class="library-label">
      Tu biblioteca personal
    </div>
    <!-- Aquí se mantiene tu componente funcional -->
    <Library />
  </div>
</template>

<script setup>
import Library from '@/components/Library.vue'
</script>

<style scoped>
.library-view {
  width: 100%;
  min-height: 200vh;
  background: #232323;
  color: #fff;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.banner img {
  width: 90vw;
  max-width: 1200px;
  max-height: 250px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 1.5rem;
}
.library-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.library-filters button {
  background: #333;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.library-filters button.active,
.library-filters button:hover {
  background: #fff;
  color: #000;
}
.library-label {
  font-size: 1.1rem;
  color: #b3b3b3;
  margin-bottom: 1.5rem;
}
</style> 