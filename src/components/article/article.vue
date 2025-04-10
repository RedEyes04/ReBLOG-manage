<template>
  <yk-space dir="vertical" style="width:100%" size="xl">
    <articleItemVue v-for="item in articleList" :data="item" :key="item.id" @delete="deleteArticle"
      @state="updateState" />
    <div class="pagination">
      <yk-pagination :total="count" size="m" @change="changePage"></yk-pagination>
    </div>
  </yk-space>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import articleItemVue from "./article-item.vue";
import { mkarticle } from "../../mock/data";
import { ArticleDate } from "../../utils/interface";

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
    count.value = mkarticle.count
  }
  let arr = mkarticle.list.slice(
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
.pagination {
  padding: @space-s 0 @space-xl;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}
</style>