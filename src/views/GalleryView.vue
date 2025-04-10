<template>
  <yk-space dir="vertical" style="width:100%;" size="l">
    <TopTitle name="摄影图库" style="margin-bottom:8px" />
    <subsetVue />
    <galleryVue />
  </yk-space>
</template>

<script lang="ts" setup>
import TopTitle from '../components/bar/TopTitle.vue';
import galleryVue from '../components/gallery/gallery.vue';
import subsetVue from '../components/subset/subset.vue';

</script>

<style lang="less" scoped></style>