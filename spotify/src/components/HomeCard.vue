<script setup>
import { useSongsStore } from '@/stores/songs'
import { storeToRefs } from 'pinia'
import HomeCardItems from './HomeCardItems.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const songsStore = useSongsStore()
const { playlists } = storeToRefs(songsStore)
const router = useRouter()

const albums = ref([
  {
    id: 1,
    name: "Éxitos España",
    cover: "https://th.bing.com/th/id/OIP.IODymWxMAV_htk8lxRhcpAHaHa?w=167&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    artist: "Varios"
  },
  {
    id: 2,
    name: "El Ritmo",
    cover: "https://th.bing.com/th/id/OIP.yrL4PdcY0-hwOx-ES7G7WAHaHa?w=203&h=203&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    artist: "Varios"
  },
  {
    id: 3,
    name: "Timeless",
    cover: "https://th.bing.com/th/id/OIP.OJB1qz4vR7QpUWSJV5WUDgHaHa?w=203&h=203&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    artist: "Kelly Clarkson"
  },
  {
    id: 4,
    name: "Vultures 1",
    cover: "https://a.allegroimg.com/original/11adb8/8a9573904713a9b623f7df71bdf3/Kanye-West-Ty-Dolla-ign-Vultures-Plakat-Obraz-z-albumem-w-ramce-Preze",
    artist: "Kanye West & Ty Dolla $ign"
  },
  {
    id: 5,
    name: "Never Was There",
    cover: "https://th.bing.com/th/id/OIP.Sx-nJTxGLW_bNzjcJkSiPQAAAA?w=168&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    artist: "MARROW"
  },
  {
    id: 6,
    name: "Girl You Loud",
    cover: "https://th.bing.com/th/id/OIF.wVcqwjUvUwkOL2POBEMe7A?w=209&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    artist: "Chris Brown"
  }

])

const bannerColors = [
  'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)', // verde
  'linear-gradient(90deg, #fc4a1a 0%, #f7b733 100%)', // naranja
  'linear-gradient(90deg, #396afc 0%, #2948ff 100%)', // azul
  'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)', // rojo/rosa
  'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', // amarillo
  'linear-gradient(90deg, #c471f5 0%, #fa71cd 100%)', // violeta
]

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
      <h2 class="seccion-titulo">Álbumes recomendados</h2>
      <div class="albums-list">
        <div v-for="(album, i) in albums" :key="album.id" class="album-card">
          <div class="album-img-wrapper">
            <img :src="album.cover" alt="cover" class="album-img"/>
            <div class="album-banner" :style="{ background: bannerColors[i % bannerColors.length] }">
              {{ album.name }}
            </div>
          </div>
          <div class="album-artist">{{ album.artist }}</div>
          <div class="album-desc">Tu música favorita y más</div>
        </div>
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
  max-width: 1300px;
  min-height: 950px;
  max-height: 1200px;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #181818 0%, #232323 100%);
  border-radius: 0;
  box-shadow: none;
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
.seccion-titulo {
  color: #fff;
  margin: 2rem 0 1rem 0;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: left;
  width: 100%;
}

/* --- Estilos para las tarjetas de álbum --- */
.albums-list {
  width: 100%;
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  background: rgba(24, 24, 24, 0.95);
  border-radius: 18px;
}

.album-card {
  background: #202020;
  border-radius: 18px;
  padding: 1rem 1rem 0.8rem 1rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  min-width: 200px;
  max-width: 220px;
  box-shadow: 0 1px 8px #0006;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.album-card:hover {
  background: #292929;
  transform: translateY(-4px) scale(1.03);
}
.album-img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  margin-bottom: 0.7rem;
}
.album-img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
  display: block;
}
.album-banner {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.45rem 0.7rem;
  border-radius: 0 0 12px 12px;
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px #0005;
  text-shadow: 0 1px 4px #000a;
  z-index: 2;
  /* El color de fondo se asigna dinámicamente */
}
.album-artist {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
  margin-left: 2px;
}
.album-desc {
  color: #b3b3b3;
  font-size: 0.95rem;
  margin-left: 2px;
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>

<style>
body, html {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #181818;
}
</style> 