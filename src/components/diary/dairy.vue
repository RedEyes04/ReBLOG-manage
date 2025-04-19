<template>
  <div class="diary">
    <yk-space dir="vertical" size="xl" style="width:100%;padding-bottom: 24px;">
      <diaryItemVue v-for="item in diaryList" :data="item" :key="item.id" @delete="deleteDiary" />
    </yk-space>
    <div class="pagination">
      <yk-pagination :total="count" size="m" @change="changePage"></yk-pagination>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import { mkdiary } from "../../mock/data";
import { DiaryDate } from "../../utils/interface";
import diaryItemVue from "./diary-item.vue";


const proxy: any = getCurrentInstance()?.proxy

const props = defineProps({
  pageSize: {
    type: Number,
    default: 6,
  },
  serchTerm: {
    type: String,
    default: ""
  }
})

const request = {
  pageSize: props.pageSize,
  nowPage: 1,
  serchTerm: props.serchTerm,
  count: true,
}

//获取日记
//日记
const diaryList = ref<DiaryDate[]>([])
//日记总数
const count = ref<number>(0)

const getData = () => {
  if (request.nowPage == 1) {
    count.value = mkdiary.count
  }
  let arr = mkdiary.list.slice(
    (request.nowPage - 1) * request.pageSize,
    request.nowPage * request.pageSize
  )
  diaryList.value = [...arr]
  // console.log(diaryList.value)
}

//删除 
const deleteDiary = (e: number) => {
  diaryList.value = diaryList.value.filter((obj: any) => {
    return obj.id !== e
  })
  proxy.$message({ type: 'primary', message: '删除完成' })
}

//翻页 
const changePage = (e: number) => {
  request.nowPage = e;
  getData()
}

onMounted(() => {
  getData()
  // console.log(articleList.value)
})
</script>

<style lang="less" scoped>
.diary {
  width: 100%;

  .pagination {
    padding: @space-s 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
}
</style>