<template>
  <div class="card comment">
    <div class="card__title">
      <p class="card__title-name">评论 {{ count }}</p>
    </div>
    <yk-scrollbar ref="scrollbar" :height="height" style="padding:0 24px;">
      <yk-space dir="vertical">
        <reply v-for="item in comments" :key="item.id" :content="item" @delete="deleteComment" />
      </yk-space>
    </yk-scrollbar>
    <div class="comment__pagination">
      <yk-pagination :total="count" size="m" @change="changePage"></yk-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance } from "vue"
import reply from "./reply.vue";
import { comment } from "../../mock/data"
import { CommentProps } from "./reply"

const proxy: any = getCurrentInstance()?.proxy

const props = withDefaults(defineProps<CommentProps>(), {
  pageSize: 8,
  height: "650px",
})

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

<style lang="less" scoped>
.comment {
  padding: @space-xl 0 64px;
  position: relative;

  .card__title-name {
    padding: 0 @space-xl;
  }

  &__pagination {
    padding: @space-l @space-xl;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid @line-color-s;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
  }
}
</style>