<template>
  <div class="playlist-details-layout">
    <div class="details-content">
      <PlaylistCard :playlist="playlist" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSongsStore } from '@/stores/songs'
import PlaylistCard from '@/components/PlaylistCard.vue'

const route = useRoute()
const store = useSongsStore()

onMounted(() => {
  if (store.playlists.length === 0) {
    store.loadPlaylists()
  }
})

const playlist = computed(() => {
  return store.getPlaylist(Number(route.params.id)) || { name: '', songs: [] }
})
</script>

<style scoped>
.playlist-details-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #181818;
}
.details-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  padding: 64px 0 90px 0;
  min-width: 0;
}
</style> 