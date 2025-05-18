<template>
  <nav class="navbar">
    <div class="nav-left">
      <button class="nav-btn nav-menu"><Icon icon="fa6-solid:ellipsis" /></button>
      <button class="nav-btn nav-arrow"><Icon icon="fa6-solid:chevron-left" /></button>
      <button class="nav-btn nav-arrow"><Icon icon="fa6-solid:chevron-right" /></button>
    </div>
    <div class="nav-center">
      <button class="nav-btn home-btn" @click="goHome"><Icon icon="fa6-solid:house" /></button>
      <div class="search-bar-wrapper">
        <div class="search-bar">
          <Icon icon="fa6-solid:magnifying-glass" />
          <input type="text" placeholder="¿Qué quieres reproducir?" v-model="search" />
        </div>
        <span class="search-divider"></span>
        <button class="icon-btn box-btn"><Icon icon="fa6-solid:box-archive" /></button>
      </div>
      <button class="premium-btn">Descubrir Premium</button>
    </div>
    <div class="nav-right">
      <button class="icon-btn"><Icon icon="fa6-regular:bell" /></button>
      <button class="icon-btn"><Icon icon="fa6-solid:users" /></button>
      <div class="user-circle">E</div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
const search = ref('')
const router = useRouter()
function goHome() {
  router.push({ name: 'home' })
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  width: 100%;
  background: #181818;
  color: #fff;
}

.app {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #181818;
  overflow: hidden;
}

.sidebar {
  min-width: 240px;
  width: 240px;
  background: #000;
  height: 100vh;
  box-shadow: 2px 0 8px #000a;
  z-index: 10;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #181818;
  min-width: 0;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 32px 40px 120px 40px;
  background: linear-gradient(180deg, #181818 60%, #282828 100%);
  min-height: 0;
  height: 100%;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: #222;
  border-radius: 4px;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: var(--navbar-height, 64px);
  background: #000;
  box-shadow: 0 2px 8px #0002;
  border-bottom: 1px solid #222;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.nav-btn {
  background: #232323;
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: #333;
}

.nav-menu {
  font-size: 1.2rem;
  margin-right: 0.2rem;
}

.nav-arrow {
  font-size: 1.1rem;
  margin-right: 0.2rem;
}

.home-btn {
  margin-right: 0.2rem;
}

.search-bar-wrapper {
  display: flex;
  align-items: center;
  background: #222;
  border-radius: 24px;
  padding: 0.1rem 0.3rem 0.1rem 0.7rem;
  min-width: 340px;
  max-width: 480px;
  width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  background: transparent;
  padding: 0.3rem 0;
  border-radius: 24px;
  width: 100%;
  color: #fff;
  position: relative;
}

.search-bar input {
  border: none;
  outline: none;
  margin-left: 0.5rem;
  width: 100%;
  background: transparent;
  color: #fff;
  font-size: 1rem;
}

.search-divider {
  display: inline-block;
  width: 1px;
  height: 28px;
  background: #444;
  margin: 0 0.7rem;
}

.box-btn {
  font-size: 1.2rem;
  color: #aaa;
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}

.box-btn:hover {
  background: #333;
  color: #fff;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
}

.nav-center-premium {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}

.premium-btn {
  background: #fff;
  color: #181818;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.5rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 1px 4px #0002;
  transition: background 0.2s, color 0.2s;
  margin-left: 2.5rem;
}

.premium-btn:hover {
  background: #ffe600;
  color: #181818;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.icon-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 50%;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: #333;
}

.user-circle {
  width: 36px;
  height: 36px;
  background: #ff5e3a;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 1px 4px #0002;
  cursor: pointer;
}

/* Asegura que los iconos de Font Awesome se vean bien */
.fa-solid, .fa-regular, .fa-brands {
  font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands', Arial, sans-serif;
  font-weight: 900;
}
</style> 