<template>
  <yk-drawer placement="right" :show="active" @close="closes" :title="'私信' + count">
    <yk-space dir="vertical">
      
      <reply v-for="item in messages" :key="item.id" :content="item" @delete="deleteMessage" :isComment="false" />
    </yk-space>
    <template #footer>
      <yk-pagination :total="count" simple @change="changePage" :default-page-size="props.pageSize"></yk-pagination>
    </template>
  </yk-drawer>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import { InformationProps } from "./reply"
import { onMounted, ref, getCurrentInstance } from "vue"
import { comment } from "../../mock/data"
import { useUserStore } from '../../store/user'
import { useCode } from '../../hooks/code'
import { messageApi,deleteMessageApi } from "../../api"

const userStore = useUserStore()
const { tackleCode } = useCode()

const proxy: any = getCurrentInstance()?.proxy

const props = withDefaults(defineProps<InformationProps>(), {
  active: false,
  pageSize: 8,
})
const emits = defineEmits(["close"])

const { active } = toRefs(props)
const closes = () => {
  emits("close", false)
}

const count = ref<number>(0)
const messages = ref<any[]>([])
  type Requset = {
  token?: string;
  pageSize: number;//单页条数；
  nowPage: number;//当前页
  count?: boolean;

}
const request:Requset = {
  pageSize: props.pageSize,
  nowPage: 1,
  token: userStore.token
  
}
const changePage = (e: number) => {
  request.nowPage = e
  drwData(false)
}

const drwData = (e: boolean) => {
  request.count! = e
  messageApi(request).then((res: any) => {
    if (tackleCode(res.code)) {
      if (res.data.count !== -1) {
        count.value = res.data.count
      }
      messages.value = res.data.result
    }
  })
}





const deleteMessage = (e: number) => {
  const request = {
    token: userStore.token,
    id: e
  }
  deleteMessageApi(request).then((res: any) => {
    if (tackleCode(res.code)) {
      messages.value = messages.value.filter(item => item.id !== e)
      proxy.$message({ type: 'primary', message: '删除成功' })

      // 补充数据（当页评论少于 pageSize）
      if (messages.value.length < props.pageSize && count.value > props.pageSize) {
        drwData(false)
      }

      count.value--
    }
  })
}

onMounted(() => {
  drwData(true)
})
</script>

<style lang="less" scoped></style>