<template>
  <div class="gallery">
    <div class="gallery__content">
      <div class="gallery__content__files">
        <galleryItemVue v-for="item in articleList" :data="item" :key="item.id" @delete="deleteArticle"
          @state="updateState" />
      </div>
    </div>

    <div class="pagination">
      <yk-pagination :total="count" size="m" @change="changePage"></yk-pagination>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import { mkgallery } from "../../mock/data";
import { ArticleDate } from "../../utils/interface";
import galleryItemVue from "./gallery-item.vue";


const proxy: any = getCurrentInstance()?.proxy

const props = defineProps({
  pageSize: {
    type: Number,
    default: 6,
  },
  subsetId: {
    default: -1,
    type: Number,
  },
  state: {
    default: 0,
    type: Number,
  },
  serchTerm: {
    type: String,
    default: ""
  }
})

const request = {
  pageSize: props.pageSize,
  nowPage: 1,
  state: props.state,
  subsetId: props.subsetId,
  serchTerm: props.serchTerm,
  count: true,
}

//获取文章
//文章
const articleList = ref<ArticleDate[]>([])
//文章总数
const count = ref<number>(0)

const getData = (e: boolean) => {
  if (e) {
    count.value = mkgallery.count
  }
  let arr = mkgallery.list.slice(
    (request.nowPage - 1) * request.pageSize,
    request.nowPage * request.pageSize
  )
  articleList.value = [...arr]
}

//删除 
const deleteArticle = (e: number) => {
  articleList.value = articleList.value.filter((obj: any) => {
    return obj.id !== e
  })
  proxy.$message({ type: 'primary', message: '删除完成' })
}

//修改
const updateState = (e: any) => {
  articleList.value.filter((i: { id: number; state: number }) => {
    if (i.id == e.id) {
      i.state = e.state
      if (e.state === 1) {
        proxy.$message({ type: 'primary', message: '发布成功' })
      } else {
        proxy.$message({ type: 'primary', message: '已撤回' })
      }
    }
  })
}

//翻页 
const changePage = (e: number) => {
  request.nowPage = e;
  getData(false)
}

onMounted(() => {
  getData(true)
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
</style>