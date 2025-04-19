<template>
  <div class="diary">
    <yk-space dir="vertical" size="xl" style="width:100%;padding-bottom: 24px;">
      <diaryItemVue v-for="item in diaryList" :data="item" :key="item.id" @delete="deleteDiary"
        :serch-term="props.serchTerm" />
    </yk-space>
    <div class="pagination" v-show="count / props.pageSize > 1">
      <yk-pagination :total="count" size="m" @change="changePage" :default-page-size="props.pageSize"></yk-pagination>
    </div>
    <div class="empty" v-show="count == 0">
      <yk-empty description="这里什么也没有哦OvO!" type="secondary" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance, watch } from "vue"
import { DiaryDate } from "../../utils/interface";
import diaryItemVue from "./diary-item.vue";
import { useCode } from '../../hooks/code';
import { useUserStore } from '../../store/user';
import { diaryApi, deleteDiaryApi } from "../../api";

const userStore = useUserStore()
const { tackleCode } = useCode()
const currentPage = ref(1)
const proxy: any = getCurrentInstance()?.proxy

type DiaryProps = {
  pageSize: number,
  serchTerm?: string
  newDiary?: DiaryDate
}

// 定义响应式的 request 对象
const request = ref({
  token: userStore.token,
  pageSize: 3,
  nowPage: currentPage.value,
  serchTerm: '',
  count: true
})

// 将 props 的默认值设置为 pageSize: 3
const props = withDefaults(defineProps<DiaryProps>(), {
  pageSize: 3
})

// 日记列表和总数
const diaryList = ref<DiaryDate[]>([])
const count = ref<number>(0)

// 获取日记数据
const getData = (e: boolean) => {
  // 更新请求对象的 pageSize 和当前页数
  request.value.pageSize = props.pageSize
  request.value.nowPage = currentPage.value
  request.value.serchTerm = props.serchTerm!
  request.value.count = e

  diaryApi(request.value).then((res: any) => {
    if (tackleCode(res.code)) {
      if (e) {
        count.value = res.data.count
      }
      diaryList.value = res.data.list
    }
  })
}

// 删除日记
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

// 翻页
const changePage = (e: number) => {
  currentPage.value = e
  getData(false)
}

// 监听新建日记
watch(
  () => props.newDiary!,
  (e: DiaryDate) => {
    diaryList.value.unshift(e)
  }
)

// 监听搜索关键字
watch(
  () => props.serchTerm,
  (e) => {
    currentPage.value = 1
    request.value.nowPage = 1
    request.value.serchTerm = e!
    getData(true)
  }
)

// 初始化时获取数据
onMounted(() => {
  getData(true)
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

.empty {
  height: 400px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
