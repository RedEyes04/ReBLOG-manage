<template>
  <div class="diary-editor">
    <div class="diary-editor__form">
      <div class="diary-editor__top">
        <input type="text" class="diary-editor__title" placeholder="请输入标题" v-model="diaryForm.title" />
        <yk-popover placement="bottomRight" title="选择天气">
          <template #content>
            <yk-space wrap :size="[32, 20]" style="padding:16px 0 16px 14px;">
              <div class="diary-editor__weather" v-for="item in weather"
                :class="{ selected: diaryForm.weather_id == item.id }" @click="selectWeather(item.id)">
                <img :src="'./src/assets/' + item.icon" />
              </div>
            </yk-space>
          </template>
          <img :src="'./src/assets/' + weather[diaryForm.weather_id].icon" />
        </yk-popover>
      </div>
      <yk-text-area v-model="diaryForm.content" :max-lenght="1600" placeholder="请输入..." :auto-size="{
          minRows: 24,
          maxRows: 24,
        }"></yk-text-area>
      <div class="diary-editor__picture">
        <yk-upload :upload-url="uploadUrl" :file-list="diaryForm.picture" accept="image/*"></yk-upload>
      </div>
    </div>
    <div class="diary-editor__foot">
      <yk-space size="s">
        <yk-button type="secondary">取消</yk-button>
        <yk-button>新建笔记</yk-button>
      </yk-space>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from "vue"
import { weather } from "../../utils/weather";

type DiaryForm = {
  title?: string
  weather_id: number
  content?: string
  picture?: string[]
}

const diaryForm = ref<DiaryForm>({ weather_id: 0 })

//上传地址
const uploadUrl = 'https://www.huohuo90.com:3005/upload'
//选择天气
const selectWeather = (id: number) => {
  diaryForm.value.weather_id = id
}

</script>

<style lang="less" scoped>
.diary-editor {
  background: @bg-color-l;
  border-radius: @radius-m;
  width: 100%;

  &__form {
    padding: @space-xl;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: @size-xl;
    font-weight: bold;
    color: @font-color-l;
    padding-bottom: @space-m;
  }

  &__picture {
    padding-top: @space-xl;
  }

  .selected {
    &::before {
      position: absolute;
      bottom: -6px;
      left: 9px;
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 4px;
      background: @pcolor;
    }
  }

  input {
    border: none;
    background: transparent;
    outline: none;

    &::placeholder {
      color: @gray-4;
    }
  }

  &__foot {
    display: flex;
    justify-content: end;
    padding: @space-m;
    border-top: 1px solid @line-color-s;
  }
}
</style>
<style lang="less">
.diary-editor {

  .yk-text-area {
    background-color: transparent;
    border: none;
    border-radius: 0;
    padding: 0px;
  }

  .yk-text-area__inner {
    font-size: @size-m;
    line-height: 1.5;

    &::placeholder {
      color: @gray-5;
    }
  }
}
</style>