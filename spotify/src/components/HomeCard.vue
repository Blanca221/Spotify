<script setup>
import { useSongsStore } from '@/stores/songs'
import { storeToRefs } from 'pinia'
import HomeCardItems from './HomeCardItems.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const songsStore = useSongsStore()
const { playlists } = storeToRefs(songsStore)
const router = useRouter()

onMounted(() => {
  if (playlists.value.length === 0) {
    songsStore.loadPlaylists()
  }
})

function navigateToPlaylist(playlistId) {
  router.push({ name: 'playlist', params: { id: playlistId } })
}
</script>

<template>
  <div class="home-card-bg">
    <div class="home-card">
      <h1 class="bienvenido">Bienvenido a Spotify</h1>
      <div class="homecarditems-list">
        <HomeCardItems
          v-for="playlist in playlists"
          :key="playlist.id"
          :playlist="playlist"
          @select="navigateToPlaylist"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-card-bg {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-card {
  width: 100%;
  max-width: 900px;
  min-height: 260px;
  max-height: 320px;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  border-radius: 32px;
  box-shadow: 0 8px 40px #000a, 0 1.5px 8px #0006;
  align-items: center;
}
.bienvenido {
  color: #fff;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  text-align: left;
  font-weight: bold;
}
.homecarditems-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.2rem;
  justify-content: center;
}
</style> 