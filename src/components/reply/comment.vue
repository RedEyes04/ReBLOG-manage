<template>
  <div class="card comment">
    <div class="card__title">
      <p class="card__title-name">评论 {{ count }}</p>
    </div>
    <yk-scrollbar ref="scrollbar" :height="height" style="padding: 0 24px">
      <transition-group name="fade" tag="div" class="comment-list">
        <reply
          v-for="item in comments"
          :key="item.id"
          :content="item"
          @delete="deleteComment"
          @isread="changeIsread"
          isComment
        />
      </transition-group>
    </yk-scrollbar>
    <div class="comment__pagination">
      <yk-pagination
        :total="count"
        size="m"
        @change="changePage"
        :default-page-size="props.pageSize"
      ></yk-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance } from "vue"
import reply from "./reply.vue"
import { CommentProps } from "./reply"
import { useUserStore } from '../../store/user'
import { useCode } from '../../hooks/code'
import { commentApi, commentIsreadApi, deleteCommentApi } from "../../api"

const userStore = useUserStore()
const { tackleCode } = useCode()
const proxy: any = getCurrentInstance()?.proxy

const props = withDefaults(defineProps<CommentProps>(), {
  pageSize: 4,
  height: "650px",
})

const count = ref<number>(0)
const comments = ref<any[]>([])
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

const drwCommentData = (e: boolean) => {
  request.count! = e
  commentApi(request).then((res: any) => {
    if (tackleCode(res.code)) {
      if (res.data.count !== -1) {
        count.value = res.data.count
      }
      comments.value = res.data.result
    }
  })
}

const changePage = (e: number) => {
  request.nowPage = e
  drwCommentData(false)
}

const changeIsread = (e: number) => {
  const req = {
    token: userStore.token,
    id: e
  }
  commentIsreadApi(req).then((res: any) => {
    if (tackleCode(res.code)) {
      const target = comments.value.find((item) => item.id === e)
      if (target) target.isread = 1
    }
  })
}

const deleteComment = (e: number) => {
  const req = {
    token: userStore.token,
    id: e
  }
  deleteCommentApi(req).then((res: any) => {
    if (tackleCode(res.code)) {
      comments.value = comments.value.filter(item => item.id !== e)
      proxy.$message({ type: 'primary', message: '删除成功' })

      // 补充数据（当页评论少于 pageSize）
      if (comments.value.length < props.pageSize && count.value > props.pageSize) {
        drwCommentData(false)
      }

      count.value--
    }
  })
}

onMounted(() => {
  drwCommentData(true)
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

/* 删除动效 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>