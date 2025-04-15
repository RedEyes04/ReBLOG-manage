<template>
  <div class="eidt-gallery">
    <div class="eidt-gallery__topbar">
      <p class="eidt-gallery__topbar--title">新建博客文章</p>
      <yk-space align="center">
        <yk-text type="secondary" v-show="nowMoment">{{ nowMoment }} 保存</yk-text>
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
import editor from "../components/editor/editor.vue";
import forms from '../components/forms/forms.vue';
import { useArticle } from '../hooks/article';

const { formData, editorData, submit, nowMoment } = useArticle()

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