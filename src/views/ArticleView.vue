<template>
  <yk-space dir="vertical" style="width:100%;" size="l">
    <TopTitle name="博客文章" style="margin-bottom:8px" />
    <subsetVue :classify="0" @nowSubset="nowSelect"/>
    <yk-space style="width:100%;">
      <Article-view style="width:100%" :state="nowState" :subsetId="nowSubset" />
      <label-view />
    </yk-space>
  </yk-space>
</template>

<script lang="ts" setup>
import TopTitle from '../components/bar/TopTitle.vue';
import subsetVue from '../components/subset/subset.vue';
import labelView from '../components/label/label.vue';
import ArticleView from "../components/article/article.vue"
import {ref} from 'vue'


const nowState = ref<number|string>(-1)
const nowSubset = ref<number|string>(-1)

const nowSelect = (e:{id:number|string;type:string})=>{
  // console.log(e)
  if(e.type=="state"){
    nowState.value = e.id
    nowSubset.value=-1
  }else if(e.type=="all"){
    nowState.value = -1
    nowSubset.value=-1
  }else if(e.type=="subset" || e.type =="exclude"){
    nowState.value = -1
    nowSubset.value=e.id
  }
}

</script>

<style lang="less" scoped></style>