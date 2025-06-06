import { defineStore } from 'pinia'

export const useSongsStore = defineStore('songs', {
  state: () => ({
    currentSong: null,
    isPlaying: false,
    volume: 50,
    queue: [],
    likedSongs: [],
    playlists: [],
    currentTime: 0,
    duration: 0,
    audioElement: null,
    allSongs: [],
    isShuffle: false,
    repeatMode: 'none', // 'none', 'one', 'all'
    originalQueue: [] // Para guardar el orden original cuando se activa shuffle
  }),

  actions: {
    setCurrentSong(song) {
      this.currentSong = song
      if (this.audioElement) {
        this.audioElement.src = song.audio
        this.audioElement.load()
        if (this.isPlaying) {
          this.audioElement.play()
        }
      }
    },

    togglePlay() {
      this.isPlaying = !this.isPlaying
      if (this.audioElement) {
        if (this.isPlaying) {
          this.audioElement.play()
        } else {
          this.audioElement.pause()
        }
      }
    },

    setVolume(value) {
      this.volume = value
      if (this.audioElement) {
        this.audioElement.volume = value / 100
      }
    },

    setCurrentTime(time) {
      this.currentTime = time
      if (this.audioElement) {
        this.audioElement.currentTime = time
      }
    },

    toggleShuffle() {
      this.isShuffle = !this.isShuffle
      if (this.isShuffle) {
        // Guardar el orden original
        this.originalQueue = [...this.allSongs]
        // Mezclar las canciones
        this.allSongs = [...this.allSongs].sort(() => Math.random() - 0.5)
      } else {
        // Restaurar el orden original
        this.allSongs = [...this.originalQueue]
      }
    },

    toggleRepeat() {
      // Cambiar entre los tres modos: none -> one -> all -> none
      if (this.repeatMode === 'none') {
        this.repeatMode = 'one'
      } else if (this.repeatMode === 'one') {
        this.repeatMode = 'all'
      } else {
        this.repeatMode = 'none'
      }
    },

    nextSong() {
      if (!this.currentSong) {
        if (this.allSongs.length > 0) {
          this.setCurrentSong(this.allSongs[0])
          this.togglePlay()
        }
        return
      }

      if (this.repeatMode === 'one') {
        // Repetir la misma canción
        this.setCurrentSong(this.currentSong)
        return
      }

      if (this.isShuffle) {
        // En modo aleatorio, elegir una canción aleatoria diferente a la actual
        const currentIndex = this.allSongs.findIndex(song => song.id === this.currentSong.id)
        let nextIndex
        do {
          nextIndex = Math.floor(Math.random() * this.allSongs.length)
        } while (nextIndex === currentIndex && this.allSongs.length > 1)
        this.setCurrentSong(this.allSongs[nextIndex])
        if (!this.isPlaying) {
          this.togglePlay()
        }
        return
      }

      const currentIndex = this.allSongs.findIndex(song => song.id === this.currentSong.id)
      if (currentIndex < this.allSongs.length - 1) {
        this.setCurrentSong(this.allSongs[currentIndex + 1])
        if (!this.isPlaying) {
          this.togglePlay()
        }
      } else if (this.repeatMode === 'all') {
        // Volver al principio de la lista
        this.setCurrentSong(this.allSongs[0])
        if (!this.isPlaying) {
          this.togglePlay()
        }
      }
    },

    previousSong() {
      if (!this.currentSong) {
        if (this.allSongs.length > 0) {
          this.setCurrentSong(this.allSongs[0])
          this.togglePlay()
        }
        return
      }

      if (this.repeatMode === 'one') {
        // Repetir la misma canción
        this.setCurrentSong(this.currentSong)
        return
      }

      if (this.isShuffle) {
        // En modo aleatorio, elegir una canción aleatoria diferente a la actual
        const currentIndex = this.allSongs.findIndex(song => song.id === this.currentSong.id)
        let prevIndex
        do {
          prevIndex = Math.floor(Math.random() * this.allSongs.length)
        } while (prevIndex === currentIndex && this.allSongs.length > 1)
        this.setCurrentSong(this.allSongs[prevIndex])
        if (!this.isPlaying) {
          this.togglePlay()
        }
        return
      }

      const currentIndex = this.allSongs.findIndex(song => song.id === this.currentSong.id)
      if (currentIndex > 0) {
        this.setCurrentSong(this.allSongs[currentIndex - 1])
        if (!this.isPlaying) {
          this.togglePlay()
        }
      } else if (this.repeatMode === 'all') {
        // Ir al final de la lista
        this.setCurrentSong(this.allSongs[this.allSongs.length - 1])
        if (!this.isPlaying) {
          this.togglePlay()
        }
      }
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

    async loadPlaylists() {
      const res = await fetch('/playlists.json')
      const data = await res.json()
      this.playlists = data.playlists
      
      this.allSongs = this.playlists.reduce((songs, playlist) => {
        return songs.concat(playlist.songs)
      }, [])
      
      if (!this.currentSong && this.allSongs.length > 0) {
        this.setCurrentSong(this.allSongs[0])
      }
    },

    initAudio() {
      if (!this.audioElement) {
        this.audioElement = new Audio()
        this.audioElement.volume = this.volume / 100

        this.audioElement.addEventListener('timeupdate', () => {
          this.currentTime = this.audioElement.currentTime
        })

        this.audioElement.addEventListener('loadedmetadata', () => {
          this.duration = this.audioElement.duration
        })

        this.audioElement.addEventListener('ended', () => {
          if (this.repeatMode === 'one') {
            // Repetir la misma canción
            this.audioElement.currentTime = 0
            this.audioElement.play()
          } else {
            this.nextSong()
          }
        })
      }
    }
  },

  getters: {
    isLiked: (state) => (songId) => {
      return state.likedSongs.some(song => song.id === songId)
    },
    getPlaylist: (state) => (playlistId) => {
      return state.playlists.find(p => p.id === playlistId)
    },
    formattedTime: (state) => (time) => {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }
}) 