<script setup lang="ts">
import HeadBar from './components/bar/HeadBar.vue'
</script>

<template>
  <head-bar />
  <router-view />
</template>

<style scoped lang="less">
@colors: #00aaee;

.test {
  color: @ecolor;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
