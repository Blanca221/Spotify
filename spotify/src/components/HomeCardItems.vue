<script setup>
// Props: playlist (objeto con name, description, songs[])
const emit = defineEmits(['select'])
defineProps({
  playlist: {
    type: Object,
    required: true
  }
})

function getCollageCovers(playlist) {
  if (!playlist.songs) return []
  return playlist.songs.filter(song => song.cover).slice(0, 4).map(song => song.cover)
}
</script>

<template>
  <div class="homecard-item" @click="emit('select', playlist.id)">
    <div class="collage">
      <template v-if="getCollageCovers(playlist).length === 1">
        <img :src="getCollageCovers(playlist)[0]" class="collage-img single" />
      </template>
      <template v-else>
        <div class="collage-grid">
          <img v-for="(img, i) in getCollageCovers(playlist)" :key="i" :src="img" class="collage-img" />
        </div>
      </template>
    </div>
    <h3>{{ playlist.name }}</h3>
    <p>{{ playlist.description }}</p>
  </div>
</template>

<style scoped>
.homecard-item {
  background: #282828;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.homecard-item:hover {
  background: #383838;
}
.collage {
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 1rem;
}
.collage-grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
  border-radius: 4px;
  overflow: hidden;
}
.collage-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.collage-img.single {
  border-radius: 4px;
}
h3 {
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}
p {
  color: #b3b3b3;
  margin: 0;
  font-size: 0.9rem;
}
</style> 