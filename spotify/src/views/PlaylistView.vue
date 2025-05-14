<template>
  <div class="playlist-view">
    <PlaylistCard :playlist="playlist">
      <SongItem
        v-for="song in playlist.songs"
        :key="song.id"
        :song="song"
      />
    </PlaylistCard>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSongsStore } from '@/stores/songs'
import PlaylistCard from '@/components/PlaylistCard.vue'
import SongItem from '@/components/SongItem.vue'

const route = useRoute()
const store = useSongsStore()

const playlist = computed(() => {
  return store.getPlaylist(Number(route.params.id)) || { name: '', songs: [] }
})
</script>

<style scoped>
.playlist-view {
  height: 100%;
  overflow-y: auto;
}
</style> 