<template>
  <div class="label">
    <div class="label__title">
      <yk-title :level="4" style="margin:0;">标签</yk-title>
      <yk-space style="flex:none">
        <yk-popconfirm title="新建标签" @cancel="cancel" @confirm="confirm" placement="bottom" trigger="click">
          <yk-text type="primary">
            <IconCirclePlusOutline style="margin-right: 4px;" />新建
          </yk-text>
          <template #content>
            <div style="margin:8px 4px 16px">
              <yk-input show-counter :limit="6" placeholder="请输入" style="width:208px;" v-model="inputValue" />

            </div>
          </template>
        </yk-popconfirm>
        <yk-text type="primary" @click="showModal">
          <IconSettingsOutline style="margin-right: 4px;" />管理标签
        </yk-text>
      </yk-space>
    </div>
    <yk-space wrap size="s">
      <yk-tag v-for="item in label" :key="item.id">
        {{ item.label_name }}
      </yk-tag>
    </yk-space>
  </div>
  <yk-modal v-model="visible" title="管理分组">
    <label-manage :label="label" @delete-label="deletelabel" />
    <template #footer>
      <yk-button @click="showModal">确定</yk-button>
    </template>
  </yk-modal>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useLabel } from '../../hooks/label';

const {
  inputValue,
  label,
  rawLabel,
  cancel,
  confirm,
  showModal,
  visible,
  deletelabel
} = useLabel()


onMounted(() => {
  rawLabel();
})
</script>

<style lang="less" scoped>
.label {
  padding: @space-l @space-xl;
  border-radius: @radius-m;
  background-color: @bg-color-l;
  flex: none;
  width: 280px;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: @space-l;
  }

  .yk-text {
    cursor: pointer
  }
}
</style>