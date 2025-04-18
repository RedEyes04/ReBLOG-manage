<template>
  <yk-space dir="vertical" style="width:100%;" size="l">
    <TopTitle name="摄影图库" style="margin-bottom:8px" @search="search" />
    <subsetVue :classify="1" @nowSubset="nowSelect" v-show="!query"/>
    <galleryVue :subsetId="nowSubset" :serchTerm="serchTerm" />
    
  </yk-space>
</template>

<script lang="ts" setup>
import TopTitle from '../components/bar/TopTitle.vue';
import galleryVue from '../components/gallery/gallery.vue';
import subsetVue from '../components/subset/subset.vue';
import {ref} from 'vue'


const nowSubset = ref<number|string>(-1)

const nowSelect = (e:{id:number|string;type:string})=>{
  // console.log(e)
  if(e.type=="all"){
    nowSubset.value=-1
  }else if(e.type=="subset" || e.type =="exclude"){
    nowSubset.value=e.id
  }
}
const serchTerm = ref<string>()
const query =ref<boolean>(false)
const search = (e:string)=>{
  serchTerm.value=e
  if(e){
    query.value = true
  }else{
    query.value=false
  }
}
</script>

<style lang="less" scoped></style>