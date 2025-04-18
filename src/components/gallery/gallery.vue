<template>
  <div class="gallery">
    <div class="gallery__content">
      <div class="gallery__content__files">
        <galleryItemVue v-for="item in articleList" :data="item" :key="item.id" @delete="deleteArticle"
          @state="updateState" :serchTerm="props.serchTerm" />
      </div>
    </div>

    <div class="pagination" v-show="count/props.pageSize>1" >
      <yk-pagination
        :total="count"
        size="m"
        @change="changePage"
        :default-page-size="props.pageSize"
        ></yk-pagination>
    </div>
    <div class="empty" v-show="count == 0">
      <yk-empty description="这里什么也没有哦OvO!" type="secondary" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted,watch } from "vue"
import galleryItemVue from "./gallery-item.vue";

import { useArticle } from "../../hooks/article";
import { useUserStore } from '../../store/user';

const userStore = useUserStore()
const { getData,articleList,count, updateState,deleteArticle} = useArticle()


const props = defineProps({
  pageSize: {
    type: Number,
    default: 3,
  },
  subsetId: {
    default: -1,
    type: [Number,String]
  },
  
  serchTerm: {
    type: String,
    default: ""
  }
})

const request = {
  token:userStore.token,
  pageSize: props.pageSize,
  nowPage: 1,
  subsetId: props.subsetId,
  serchTerm: props.serchTerm,
  count: true,
  classify:1
}





//翻页 
const changePage = (e: number) => {
  request.nowPage = e;
  getData(request)
}
watch(
  props,()=>{
    //接受到修改再次查询数据
    request.nowPage = 1
    request.subsetId = props.subsetId
    request.serchTerm = props.serchTerm

    getData(request)


  }
)
onMounted(() => {
  getData(request)
  // console.log(articleList.value)
})
</script>

<style lang="less" scoped>
.gallery {
  width: 100%;
  background: @bg-color-l;
  padding: 32px 24px 24px;
  border-radius: @radius-m;

  &__content {
    display: inline;

    &__files {
      display: grid;
      grid-template-columns: repeat(auto-fill, 238px);
      row-gap: 32px;
      column-gap: 24px;
      justify-content: center;
    }
  }

  .pagination {
    padding: @space-s 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
}
.empty{
  height: 400px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>