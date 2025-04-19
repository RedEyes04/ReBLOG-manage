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
          <img v-if="diaryForm.weather_id !== undefined" :src="'./src/assets/' + weather[diaryForm.weather_id].icon" />

        </yk-popover>
      </div>
      <yk-text-area v-model="diaryForm.content" :max-lenght="1600" placeholder="请输入..." :auto-size="{
        minRows: 24,
        maxRows: 24,
      }"></yk-text-area>
      <div class="diary-editor__picture">
        <yk-upload :upload-url="uploadUrl" :file-list="fileList" accept="image/*" @handleSuccess="handleSuccess"
          @handleDelete="deletePhoto"></yk-upload>
      </div>
    </div>
    <div class="diary-editor__foot">
      <yk-space size="s">
        <yk-button type="secondary" @click="cancle">取消</yk-button>
        <yk-button @click="newDiary">新建笔记</yk-button>
      </yk-space>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref, getCurrentInstance } from "vue"
import { weather } from "../../utils/weather";
import { DiaryDate } from '../../utils/interface';

import { baseUrl } from '../../utils/env';
import { useFile } from '../../hooks/files';
import { FileData } from '../../utils/interface';
import { useCode } from '../../hooks/code';
import { useUserStore } from '../../store/user';
import { createDiaryApi } from "../../api";
const userStore = useUserStore()
const proxy: any = getCurrentInstance()?.proxy


const { tackleCode } = useCode()

const emits = defineEmits(["diaryData"])


const diaryForm = ref<DiaryDate>({ weather_id: 0 })

//上传地址
const uploadUrl = `${baseUrl}/upload`
const fileList = ref<{ url: string; id: number }[]>([])


//选择天气
const selectWeather = (id: number) => {
  diaryForm.value.weather_id = id
}

//图片提交
const handleSuccess = (e: { code: number; data: FileData }) => {
  if (tackleCode(e.code)) {
    let photo = {
      id: e.data.id,
      url: e.data.url
    }
    fileList.value.push(photo)

  }

  // console.log(e)
}


//新建
const newDiary = () => {
  if (fileList.value.length > 0) {
    diaryForm.value.picture = fileList.value.map((obj: any) => JSON.stringify(obj)).join(" ")
  }
  diaryForm.value.moment = new Date()
  let data = {
    token: userStore.token,
    value: diaryForm.value

  }
  createDiaryApi(data).then((res: any) => {
    if (tackleCode(res.code)) {

      //新建传给父级
      let data = diaryForm.value
      data.id = res.id
      emits("diaryData", data)
      //清空编辑器内容
      diaryForm.value = { weather_id: 0 }
      fileList.value = []
      proxy.$message({ type: 'primary', message: '发布成功' })

    }


  })
}

//取消发布
const cancle = () => {
  diaryForm.value = { weather_id: 0 }
  fileList.value = []
}


//图片删除 
const { deleteFile } = useFile()
const deletePhoto = (e: any) => {
  console.log(e[0])
  let dFile = fileList.value[e[0]]
  deleteFile(dFile)

  fileList.value.splice(e[0], 1)
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