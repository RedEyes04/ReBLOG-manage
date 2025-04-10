<template>
  <div class="diary-item">
    <yk-space dir="vertical">
      <div class="diary-item--toptitle">
        <yk-space dir="vertical" :size="4">
          <p class="diary-item__title">
            {{ props.data?.title }}
            <img :src="'./src/assets/' + weather[props.data?.weatherId!].icon" />
          </p>
          <yk-text type="third">{{ momentl(props.data?.moment!) }}</yk-text>
        </yk-space>
        <yk-popconfirm trigger="click" placement="topRight" title="确定删除" content="删除将不可恢复" @confirm="deletediary()">
          <IconDeleteOutline class="diary-item__delete" />
        </yk-popconfirm>
      </div>
      <yk-text>{{ props.data?.content }}</yk-text>
      <div class="images">
        <yk-image-preview-group :src-list="images" width="80" height="80" fit="cover"></yk-image-preview-group>
      </div>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { DiaryDate } from '../../utils/interface';
import { momentl } from "../../utils/memont";
import { weather } from "../../utils/weather";


type diaryItemProps = {
  data?: DiaryDate
}

const props = withDefaults(defineProps<diaryItemProps>(), {
})

//图片处理
const images = computed(() => {
  if (props.data?.picture) {
    //深拷贝
    let arr = JSON.parse(JSON.stringify(props.data?.picture))
    for (let i = 0; i < arr.length; i++) {
      arr[i] = './src/assets/images/' + arr[i]
    }
    return arr
  }
  return undefined
})

const emits = defineEmits(["delete"])

//删除 
const deletediary = () => {
  emits("delete", props.data!.id)
}

</script>

<style lang="less" scoped>
.diary-item {
  border-radius: @radius-m;
  padding: @space-xl;
  background: @bg-color-l;
  width: 100%;

  &--toptitle {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__title {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;

    img {
      margin-left: @space-s ;
    }
  }

  &__delete {
    width: 20px;
    height: 20px;
    padding: 2px;
    color: @font-color-s;
    transition: color @animatb;
    display: none;

    &:hover {
      color: @font-color-l;
    }
  }

  &:hover {
    .diary-item__delete {
      display: block;
    }
  }
}
</style>
<style leng="less">
.images {

  .yk-space {
    gap: 8px;
  }

  .yk-image {
    border-radius: 8px;
  }
}
</style>