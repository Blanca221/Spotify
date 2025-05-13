<template>
  <nav class="navbar">
    <div class="nav-left">
      <button class="nav-btn">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="nav-btn">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div class="nav-right">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar...">
      </div>
      <div class="user-menu">
        <img src="https://via.placeholder.com/28" alt="Usuario" class="avatar">
        <span class="username">Usuario</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Lógica de la barra de navegación
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.5rem 1.2rem 2.5rem;
  background: rgba(24, 24, 24, 0.95);
  box-shadow: 0 2px 8px #0002;
  position: sticky;
  top: 0;
  z-index: 20;
}

.nav-left {
  display: flex;
  gap: 0.7rem;
}

.nav-btn {
  background: #181818;
  border: none;
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #222;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  width: 320px;
  color: #fff;
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

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  cursor: pointer;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #282828;
}

.username {
  font-weight: 600;
  font-size: 1rem;
}
</style> 