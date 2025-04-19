<template>
  <div class="diary-item">
    <yk-space dir="vertical">
      <div class="diary-item--toptitle">
        <yk-space dir="vertical" :size="4">
          <p class="diary-item__title">
            <span v-html="title"></span>
            <img :src="'./src/assets/' + weather[props.data?.weather_id!].icon" />
          </p>
          <yk-text type="third">{{ momentl(props.data?.moment!) }}</yk-text>
        </yk-space>
        <yk-popconfirm trigger="click" placement="topRight" title="确定删除" content="删除将不可恢复" @confirm="deletediary()">
          <IconDeleteOutline class="diary-item__delete" />
        </yk-popconfirm>
      </div>
      <p v-html="content"></p>
      <div class="images">
        <yk-image-preview-group :src-list="images" width="80" height="80" fit="cover"></yk-image-preview-group>
      </div>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue"
import { DiaryDate } from '../../utils/interface';
import { momentl } from "../../utils/memont";
import { weather } from "../../utils/weather";
import { baseImgPath } from '../../utils/env';
import { highlightKeywords } from "../../utils/highlight.ts";




type diaryItemProps = {
  data?: DiaryDate
  serchTerm?: string
}

const props = withDefaults(defineProps<diaryItemProps>(), {
})

//图片处理
const images = computed(() => {

  if (props.data?.picture) {

    //深拷贝
    let arr = props.data?.picture.split(" ").map((obj: string) => JSON.parse(obj))

    let pic = []

    for (let i = 0; i < arr.length; i++) {
      pic.push(baseImgPath + '/' + arr[i].url)

    }
    return pic
  }
})

const emits = defineEmits(["delete"])

//删除 
const deletediary = () => {
  emits("delete", props.data!.id)
}
//高亮关键词
const content = ref(props.data?.content)
const title = ref(props.data?.title)

const highLight = (key?: string) => {
  if (props.data?.content) {
    content.value = highlightKeywords(props.data?.content, key!)
  }
  title.value = highlightKeywords(props.data?.title!, key!)
}


watch(
  () => props.serchTerm,
  (e) => {
    highLight(e)
  }
)

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

    span {
      font-weight: 600;

    }

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

.diary-item {
  .highlight {
    font-weight: 600;
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