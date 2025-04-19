<template>
  <yk-space dir="vertical" style="width:100%;" size="l">
    <TopTitle name="随笔随记" style="margin-bottom:8px" :is-search="true" @search="search" />
    <yk-space style="width: 100%;" size="xl">
      <dairyVue :newDiary="newDiary" :serch-term="serchTerm" :page-size="4" />
      <diaryEditor style="flex:none;width:600px" @diaryData="diaryData" />
    </yk-space>
  </yk-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TopTitle from '../components/bar/TopTitle.vue';
import dairyVue from '../components/diary/dairy.vue';
import diaryEditor from '../components/diary/diary-editor.vue';
import { DiaryDate } from '../utils/interface';

//搜索
const serchTerm = ref()

//接受新建的日记

const newDiary = ref()

const diaryData = (e: DiaryDate) => {
  newDiary.value = e
  console.log(e)
}

const search = (e: string) => {
  serchTerm.value = e
}
</script>

<style lang="less" scoped></style>