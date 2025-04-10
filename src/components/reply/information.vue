<template>
  <yk-drawer placement="right" :show="active" @close="closes" :title="'私信' + count">
    <yk-space dir="vertical">
      <reply v-for="item in comments" :key="item.id" :content="item" @delete="deleteComment" :isComment="false" />
    </yk-space>
    <template #footer>
      <yk-pagination :total="count" simple @change="changePage"></yk-pagination>
    </template>
  </yk-drawer>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import { InformationProps } from "./reply"
import { onMounted, ref, getCurrentInstance } from "vue"
import { comment } from "../../mock/data"

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

//总数
const count = ref<number>(123)
//数据内容
const comments = ref();

//请求
type Requset = {
  token?: string;
  pageSize: number;//单页条数；
  nowPage: number;//当前页
}

const request: Requset = {
  pageSize: props.pageSize,
  nowPage: 1,
}

//获取数据
const drwCommentData = () => {
  let data = comment.data;
  count.value = data.count;
  comments.value = data.list.slice(
    (request.nowPage - 1) * request.pageSize,
    request.nowPage * request.pageSize
  );
}

//翻页 
const changePage = (e: number) => {
  request.nowPage = e;
  drwCommentData()
}

//删除评论
const deleteComment = (e: number) => {
  comments.value = comments.value.filter((obj: any) => {
    return obj.id !== e
  })
  proxy.$message({ type: 'primary', message: '删除成功' })
}

onMounted(() => {
  drwCommentData()
})
</script>

<style lang="less" scoped></style>