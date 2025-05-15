<script setup>
import HomeCard from '@/components/HomeCard.vue'
</script>

<template>
  <div class="home-view-wrapper">
    <div class="home-content">
      <HomeCard />
    </div>
  </div>
</template>

<style scoped>
.home-view-wrapper {
  width: 100vw;
  height: 100%;
  background: #181818;
  display: flex;
  flex-direction: column;
}
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
  margin-top: 0;
}
</style>
