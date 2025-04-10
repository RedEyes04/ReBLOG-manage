<template>
  <yk-space dir="vertical" style="width:100%;" size="l">
    <TopTitle name="随笔随记" style="margin-bottom:8px" />
    <yk-space style="width: 100%;" size="xl">
      <dairyVue />
      <diaryEditor style="flex:none;width:600px" />
    </yk-space>
  </yk-space>
</template>

<script lang="ts" setup>
import TopTitle from '../components/bar/TopTitle.vue';
import dairyVue from '../components/diary/dairy.vue';
import diaryEditor from '../components/diary/diary-editor.vue';

</script>

<style lang="less" scoped></style>