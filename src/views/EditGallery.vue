<template>
  <div class="eidt-gallery">
    <div class="eidt-gallery__topbar">
      <p class="eidt-gallery__topbar--title">新建摄影图库</p>
      <yk-space>
        <yk-button type="secondary">取消</yk-button>
        <yk-button>发布</yk-button>
      </yk-space>
    </div>
    <yk-space style="width: 100%;">
      <editPhotpVue />
      <div class="edit-form">
        <forms style="width:420px" :classify="1" @formData="formData" :form="defaultArticle?.formData"></forms>
      </div>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import editPhotpVue from "../components/gallery/edit-photp.vue";
import forms from "../components/forms/forms.vue";
import { useArticle } from '../hooks/article';
import { useRoute } from "vue-router";

const route = useRoute()
const { formData, editorData, submit, nowMoment, id, defaultArticle } = useArticle()
if (route.query.id) {
  id.value = Number(route.query.id)
  console.log(id.value)
}



</script>

<style lang="less" scoped>
.eidt-gallery {
  padding: @space-xl 80px;

  &__topbar {
    border-radius: @radius-m;
    background: @bg-color-l;
    padding: @space-l @space-xl;
    margin-bottom: @space-l;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--title {
      .font-xl();
      font-weight: 600;
    }
  }

  .edit-form {
    background: @bg-color-l;
    border-radius: @radius-m;
    flex: none;
    display: flex;
    padding: 24px;
    justify-content: center;
  }
}
</style>