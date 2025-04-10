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
      <yk-tag v-for="item in label" :key="item.id" :class="{ 'label__menu-seledted': selected == item.id + 'label' }"
        @click="changeOption(item.id, 'label')">
        {{ item.name }}
      </yk-tag>
    </yk-space>
  </div>
  <yk-modal v-model="visible" title="管理分组">
    <label-manage :label="label" />
    <template #footer>
      <yk-button @click="showModal">确定</yk-button>
    </template>
  </yk-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import { mklabel } from '../../mock/data';
import { LabelData } from '../../utils/interface';
// import labelManage from './label-manage.vue';

const emits = defineEmits(['nowlabel'])


//新建分组内容
const inputValue = ref<number | string>()

//当前选择
const selected = ref<string>('-1all')

//选择切换 
const changeOption = (id: number | string, type: string) => {
  if (id + type != selected.value) {
    selected.value = id + type
    emits('nowlabel', { id, type })
  }
}

//获取标签
const label = ref<LabelData[]>([])
const rawlabel = () => {
  label.value = [...mklabel.data.list]
}

const proxy: any = getCurrentInstance()?.proxy
//取消
function cancel() {
  inputValue.value = ""
}
//新建分组 
function confirm() {
  if (inputValue.value) {
    let obj = {
      id: -2,
      name: inputValue.value,
      value: 0
    }
    label.value.push(obj)
    inputValue.value = ""
    proxy.$message({ type: 'primary', message: '插入完成' })

  } else {
    proxy.$message({ type: 'warning', message: '请输入' })
  }
}

//管理分组 
const visible = ref<boolean>(false)
const showModal = () => {
  visible.value = !visible.value
}

onMounted(() => {
  rawlabel();
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