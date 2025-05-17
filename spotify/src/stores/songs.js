import { defineStore } from 'pinia'

export const useSongsStore = defineStore('songs', {
  state: () => ({
    currentSong: null,
    isPlaying: false,
    volume: 50,
    queue: [],
    likedSongs: [],
    playlists: []
  }),

  actions: {
    setCurrentSong(song) {
      this.currentSong = song
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying
    },
    setVolume(value) {
      this.volume = value
    },
    addToQueue(song) {
      this.queue.push(song)
    },
    removeFromQueue(index) {
      this.queue.splice(index, 1)
    },
    toggleLike(song) {
      const index = this.likedSongs.findIndex(s => s.id === song.id)
      if (index === -1) {
        this.likedSongs.push(song)
      } else {
        this.likedSongs.splice(index, 1)
      }
    },
    createPlaylist(name) {
      this.playlists.push({
        id: Date.now(),
        name,
        songs: []
      })
    },
    addToPlaylist(playlistId, song) {
      const playlist = this.playlists.find(p => p.id === playlistId)
      if (playlist) {
        playlist.songs.push(song)
      }
    },
    // Cargar las playlists desde el archivo JSON
    async loadPlaylists() {
      const res = await fetch('/playlists.json') // Si está en public
      const data = await res.json()
      this.playlists = data.playlists
    }
  },

  getters: {
    isLiked: (state) => (songId) => {
      return state.likedSongs.some(song => song.id === songId)
    },
    getPlaylist: (state) => (playlistId) => {
      return state.playlists.find(p => p.id === playlistId)
    }
  }
}) 