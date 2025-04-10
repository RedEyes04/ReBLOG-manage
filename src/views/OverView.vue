<template>
  <yk-space dir="vertical" size="xl">
    <top-title :is-search="false" />
    <gather />
    <yk-space style="width: 100%;" size="xl">
      <datas />
      <Comment style="width:50%" height="516px" />
    </yk-space>
  </yk-space>
</template>

<script lang="ts" setup>
import TopTitle from "../components/bar/TopTitle.vue";
import gather from '../components/overview/gather.vue'
import datas from '../components/overview/datas.vue'
import { Comment } from "../components/reply"
</script>

<style lang="less" scoped></style>