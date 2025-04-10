<template>
  <yk-space size="m" class="reply">
    <yk-avatar img-url="https://bucket.redeyes.top/avater.webp" v-if="isComment"></yk-avatar>
    <yk-space dir="vertical" size="s" class="reply__main">
      <div class="reply__name">
        <yk-text strong>{{ content?.user.name }}</yk-text>
        <yk-text type="third" style="font-size: 12px;">{{ content?.moment }}</yk-text>
      </div>
      <yk-text type="secondary">{{ content?.comment }}</yk-text>
      <yk-space size="s" align="center" v-if="isComment">
        <yk-tag type="primary">
          {{ content?.article?.title }}
        </yk-tag>
        <yk-text type="danger" v-show="content?.complaint! > 0">举报 {{ content?.complaint }}</yk-text>
      </yk-space>
      <IconDeleteOutline class="reply__main--delete" @click.stop="deleteReply(props.content!.id)" />
    </yk-space>
  </yk-space>
</template>

<script lang="ts" setup>
import { ReplyProps } from './reply';

const props = withDefaults(defineProps<ReplyProps>(), {
  isComment: true,
})

const emits = defineEmits(["delete"])

//删除
const deleteReply = (e: number) => {
  emits("delete", e)
}
</script>

<style lang="less" scoped>
.reply {
  width: 100%;

  &__main {
    border-bottom: 1px solid @line-color-s;
    padding-bottom: @space-l;
    flex: 1;
    position: relative;

    &--delete {
      position: absolute;
      right: 0;
      top: 0;
      width: 16px;
      height: 16px;
      cursor: pointer;
      color: @font-color-s;
      display: none;
    }
  }

  &__name {
    display: flex;
    flex-direction: column;
  }

  &:hover {
    .reply__main--delete {
      display: block;
    }
  }
}
</style>