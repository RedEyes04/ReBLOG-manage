<template>
  <yk-space size="l" dir="vertical" class="file-view">
    <top-title name="本地文件" :isSearch="false" style="margin-bottom:8px;">
      <template #custom>
        <yk-space align="center">
          <yk-text type="third">图片、视频、音频大小不超过20M</yk-text>
          <yk-button>上传</yk-button>
        </yk-space>
      </template>
    </top-title>
    <subsetVue :classify="2" @nowSubset="nowSelect" />
    <filesVue :subsetId="nowSubset" :pageSize="8" />
  </yk-space>
</template>

<script lang="ts" setup>
import TopTitle from '../components/bar/TopTitle.vue';
import filesVue from '../components/files/files.vue';
import subsetVue from '../components/subset/subset.vue';
import { ref } from 'vue'
const nowSubset = ref<number | string>(-1)

const nowSelect = (e: { id: number | string; type: string }) => {
  // console.log(e)
  if (e.type == "all") {
    nowSubset.value = -1
  } else if (e.type == "subset" || e.type == "exclude") {
    nowSubset.value = e.id
  }
}



</script>

<style lang="less" scoped>
.file-view {
  width: 100%;
}
</style>