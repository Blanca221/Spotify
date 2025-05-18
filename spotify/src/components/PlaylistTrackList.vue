<template>
  <table class="playlist-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Título</th>
        <th>Álbum</th>
        <th>Fecha añadido..</th>
        <th>
          <svg class="icon-clock" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(song, idx) in songs" :key="song.id" @click="playSong(song)" class="song-row">
        <td>{{ idx + 1 }}</td>
        <td class="song-title">
          <img :src="song.cover" alt="cover" class="song-cover" />
          <div>
            <div class="title">{{ song.title }}</div>
            <div class="artist">{{ song.artist }}</div>
          </div>
        </td>
        <td>{{ song.album }}</td>
        <td>{{ song.addedAt }}</td>
        <td>{{ song.duration }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useSongsStore } from '@/stores/songs'

const props = defineProps({
  songs: Array
})

const store = useSongsStore()

const playSong = (song) => {
  store.setCurrentSong(song)
  store.togglePlay()
}
</script>

<style scoped>
.playlist-table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  font-size: 1rem;
  background: rgba(24, 24, 24, 0.55); /* Fondo semitransparente */
  backdrop-filter: blur(12px);         /* Efecto cristal */
  border-radius: 18px;
  box-shadow: 0 4px 32px #000a;
  overflow: hidden;
  border-top: 1.5px solid rgba(180,180,180,0.25); /* Borde superior gris translúcido */
}
.playlist-table thead tr {
  color: #b3b3b3;
  font-weight: 400;
  border-bottom: 2px solid rgba(180,180,180,0.5);
}
.playlist-table th, .playlist-table td {
  padding: 12px 8px;
  text-align: left;
}
.playlist-table tbody tr {
  /* border-bottom: 1px solid #222; */
  transition: background 0.2s;
  cursor: pointer;
}
.playlist-table tbody tr:hover {
  background: rgba(255,255,255,0.07);
}
.song-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.song-cover {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  background: #222;
}
.title {
  font-weight: 500;
  color: #fff;
}
.artist {
  color: #b3b3b3;
  font-size: 0.95em;
}
.icon-clock {
  vertical-align: middle;
  display: inline-block;
}
.song-row {
  cursor: pointer;
}
</style> 