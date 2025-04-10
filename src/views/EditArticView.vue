<template>
  <div class="eidt-gallery">
    <div class="eidt-gallery__topbar">
      <p class="eidt-gallery__topbar--title">新建博客文章</p>
      <yk-space align="center">
        <yk-text type="secondary">{{ nowMoment }} 保存</yk-text>
        <yk-button type="secondary" @click="submit(0)">保存</yk-button>
        <yk-button @click="submit(1)">发布</yk-button>
      </yk-space>
    </div>
    <editor style="width: 1200px;" @editors="editorData">
      <forms :classify="0" @formData="formData" style="width:820px"></forms>
    </editor>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import editor from "../components/editor/editor.vue";
import forms from '../components/forms/forms.vue';
import { time } from '../utils/memont'

const proxy: any = getCurrentInstance()?.proxy

const articleData = ref()
//收取form内容
const form = ref()
const formData = (e: any) => {
  form.value = e
}
//收取editor内容
const editors = ref()
const editorData = (e: any) => {
  // console.log(e)
  editors.value = e
}

//发布
const nowMoment = ref()
const submit = (e: number) => {
  if (form.value && form.value.title) {
    if (e == 0) {
      let nowTime = new Date();
      nowMoment.value = time(nowTime)
    }
    let request = {
      ...form.value,
      ...{
        content: editors.value,
        state: e,
        classify: 0,
        moment: new Date(),
      }
    }
    console.log(request)
  } else {
    proxy.$message({ type: 'warning', message: '请输入标题' })
  }

}

</script>

<style lang="less" scoped>
.eidt-gallery {
  padding: @space-xl 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__topbar {
    border-radius: @radius-m;
    background: @bg-color-l;
    padding: @space-l @space-xl;
    margin-bottom: @space-l;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;

    &--title {
      .font-xl();
      font-weight: 600;
    }
  }

  .edit-form {
    background: @bg-color-l;
    border-radius: @radius-m;
    width: 100%;
    flex: none;
    display: flex;
    flex-direction: column;
    padding: 24px;
    align-items: center;
  }
}
</style>