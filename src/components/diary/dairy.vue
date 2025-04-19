<template>
  <div class="diary">
    <yk-space dir="vertical" size="xl" style="width:100%;padding-bottom: 24px;">
      <diaryItemVue v-for="item in diaryList" :data="item" :key="item.id" @delete="deleteDiary" />
    </yk-space>
    <div class="pagination">
      <yk-pagination :total="count" size="m" @change="changePage" :default-page-size="props.pageSize"></yk-pagination>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import { DiaryDate } from "../../utils/interface";
import diaryItemVue from "./diary-item.vue";
import { useCode } from '../../hooks/code';
import { useUserStore } from '../../store/user';
import { diaryApi, deleteDiaryApi } from "../../api";
const userStore = useUserStore()
const { tackleCode } = useCode()
const currentPage = ref(1)
const proxy: any = getCurrentInstance()?.proxy
const props = defineProps({
  pageSize: {
    type: Number,
    default: 2,
  },
  serchTerm: {
    type: String,
    default: ""
  }
})



//获取日记
//日记
const diaryList = ref<DiaryDate[]>([])
//日记总数
const count = ref<number>(0)

const getData = (e: boolean) => {
  const request = {
    token: userStore.token,
    pageSize: props.pageSize,
    nowPage: currentPage.value,
    serchTerm: props.serchTerm,
    count: e,
  }
  request.count = e
  diaryApi(request).then((res: any) => {
    if (tackleCode(res.code)) {
      console.log(res)
      if (e) {
        count.value = res.data.count
      }

      diaryList.value = res.data.list

    }


  })

}

//删除 
const deleteDiary = (e: number) => {
  let request = {
    token: userStore.token,
    diaryId: e
  }
  deleteDiaryApi(request).then((res: any) => {
    if (tackleCode(res.code)) {
      diaryList.value = diaryList.value.filter((obj: any) => {
        return obj.id !== e
      })
      proxy.$message({ type: 'primary', message: '删除完成' })
    }

  })

}

//翻页 
const changePage = (e: number) => {
  currentPage.value = e
  getData(false)
}

onMounted(() => {
  getData(true)
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