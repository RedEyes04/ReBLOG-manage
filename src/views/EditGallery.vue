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
        <formsVue style="width:420px" :classify="1" />
      </div>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import editPhotpVue from "../components/gallery/edit-photp.vue";
import formsVue from "../components/forms/forms.vue";


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