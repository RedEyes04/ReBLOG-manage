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
    <editor style="width: 1200px;" @editors="editorData" :content="defaultArticle?.content">
      <forms :classify="0" @formData="formData" style="width:820px" :form="defaultArticle"></forms>
    </editor>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import editor from "../components/editor/editor.vue";
import forms from '../components/forms/forms.vue';
import { useArticle } from '../hooks/article';
import { useRoute } from "vue-router";

const route = useRoute()
const { formData, editorData, submit, nowMoment,id, defaultArticle} = useArticle()
if(route.query.id){
  id.value = Number(route.query.id)
  console.log(id.value)
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