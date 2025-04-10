<template>
  <div class="subset">
    <yk-space wrap>
      <div class="subset__menu" :class="{ 'subset__menu-seledted': selected == '-1all' }"
        @click="changeOption(-1, 'all')">
        全部{{ subsetStore.count }}
      </div>

      <div class="subset__menu" v-for="item in state.data" :key="item.id"
        :class="{ 'subset__menu-seledted': selected == item.id + 'state' }" @click="changeOption(item.id, 'state')">
        {{ item.name }}{{ item.value }}
      </div>
      <div class="subset__menu" :class="{ 'subset__menu-seledted': selected == subsetStore.exclude.id + 'exclude' }"
        @click="changeOption(subsetStore.exclude.id, 'exclude')">
        {{ subsetStore.exclude.name }}{{ subsetStore.exclude.value }}
      </div>
      <div class="subset__menu" v-for="item in subsetStore.data" :key="item.id"
        :class="{ 'subset__menu-seledted': selected == item.id + 'subset' }" @click="changeOption(item.id, 'subset')">
        {{ item.name }}{{ item.value }}
      </div>
    </yk-space>
    <yk-space style="flex:none">
      <yk-popconfirm title="新建分组" @cancel="cancel" @confirm="confirm" placement="bottom" trigger="click">
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
        <IconSettingsOutline style="margin-right: 4px;" />管理分组
      </yk-text>
    </yk-space>
    <yk-modal v-model="visible" title="管理分组">
      <subset-manage />
      <template #footer>
        <yk-button @click="showModal">确定</yk-button>
      </template>
    </yk-modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import { subset, state } from '../../mock/data';
import { useSubsetStore } from '../../store/subset';
import subsetManage from './subset-manage.vue';

const emits = defineEmits(['nowSubset'])

//store
const subsetStore = useSubsetStore();

//新建分组内容
const inputValue = ref<number | string>()

//当前选择
const selected = ref<string>('-1all')

//选择切换 
const changeOption = (id: number | string, type: string) => {
  if (id + type != selected.value) {
    selected.value = id + type
    emits('nowSubset', { id, type })
  }
}

//获取分组 
const rawSubset = () => {
  subsetStore.data = subset.data.list
  subsetStore.count = subset.data.count
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
    subsetStore.data.push(obj)
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
  rawSubset();
})
</script>

<style lang="less" scoped>
.subset {
  padding: @space-l @space-xl;
  border-radius: @radius-m;
  background-color: @bg-color-l;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .yk-text {
    cursor: pointer
  }

  &__menu {
    padding: 0 @space-l;
    background: @bg-color-m;
    border-radius: @radius-r;
    line-height: 32px;
    user-select: none;
    cursor: pointer;

    &-seledted {
      background: @pcolor-1;
      color: @pcolor;
      font-weight: 500;
    }
  }
}
</style>