<template>
  <table class="playlist-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Título</th>
        <th>Álbum</th>
        <th>Fecha en la que se añadió</th>
        <th><span class="icon-clock"></span></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(song, idx) in songs" :key="song.id">
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
const props = defineProps({
  songs: Array
})
</script>

<style scoped>
.playlist-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  color: #fff;
  font-size: 1rem;
}
.playlist-table thead tr {
  color: #b3b3b3;
  font-weight: 400;
  border-bottom: 1px solid #333;
}
.playlist-table th, .playlist-table td {
  padding: 12px 8px;
  text-align: left;
}
.playlist-table tbody tr {
  border-bottom: 1px solid #222;
  transition: background 0.2s;
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
.icon-clock::before {
  content: "⏱️";
  font-size: 1.1em;
}
</style> 