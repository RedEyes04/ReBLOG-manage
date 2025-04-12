<template>
  <yk-space size="m" class="reply">
    <div class="adjust">
      <yk-badge is-dot :hidden="content?.isread==1">
         <yk-avatar img-url="avatar.png" v-if="isComment" @click="changeIsread(props.content!.id)">

         </yk-avatar>
      </yk-badge>
    </div>
    
    <yk-space dir="vertical" size="s" class="reply__main">
      <div class="reply__name">
        <yk-text strong>{{ content?.user_name }}</yk-text>
        <yk-text type="third" style="font-size: 12px;">{{ momentl(content?.moment!) }}</yk-text>
      </div>
      <yk-text type="secondary">{{ content?.content }}</yk-text>
      <yk-space size="s" align="center" v-if="isComment">
        <yk-tag type="primary" v-if="content?.article!.id! > -1">
          {{ content?.article?.title }}
        </yk-tag>
        <yk-tag v-else>
          文章已被删除
        </yk-tag>
        <yk-text type="danger" v-show="content?.complaint! > 0">举报 {{ content?.complaint }}</yk-text>
      </yk-space>
      <IconDeleteOutline class="reply__main--delete" @click.stop="deleteReply(props.content!.id)" />
    </yk-space>
  </yk-space>
</template>

<script lang="ts" setup>
import { ReplyProps } from './reply';
import { momentl } from '../../utils/memont';

const props = withDefaults(defineProps<ReplyProps>(), {
  isComment: true,
})
// console.log(props.content)

const emits = defineEmits(["delete","isread"],)
//已读
const changeIsread = (e:number)=>{
  emits("isread", e)
}

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

.adjust {
  margin-top: -6px; 
}


</style>