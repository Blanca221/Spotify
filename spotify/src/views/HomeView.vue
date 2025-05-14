<script setup>
import Navbar from '@/components/Navbar.vue'
import HomeCard from '@/components/HomeCard.vue'
</script>

<template>
  <div class="home-view-wrapper">
    <Navbar />
    <div class="home-content">
      <HomeCard />
    </div>
  </div>
</template>

<style scoped>
.home-view-wrapper {
  width: 100vw;
  min-height: 100vh;
  background: #181818;
  display: flex;
  flex-direction: column;
}
.home-content {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
