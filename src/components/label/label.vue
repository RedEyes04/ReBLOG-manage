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
    <label-manage :label="label" />
    <template #footer>
      <yk-button @click="showModal">确定</yk-button>
    </template>
  </yk-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
// import { mklabel } from '../../mock/data';
import { LabelData } from '../../utils/interface';
// import labelManage from './label-manage.vue';
import { useUserStore } from "../../store/user";
import { useCode } from '../../hooks/code';
import { addLabeltApi, labelApi } from '../../api';

const { tackleCode } = useCode()

const userStore = useUserStore()

const emits = defineEmits(['nowlabel'])

//新建分组
function confirm() {
  if (inputValue.value) {
    let request = {
      token: userStore.token,
      value: {
        moment: new Date(),
        label_name: inputValue.value
      }
    }
    let lab = {
      id: -2,
      name: inputValue.value,
      value: 0
    }

    // console.log(request)
    // subsetStore.data.push(obj)
    addLabeltApi(request).then((res: any) => {
      if (tackleCode(res.code)) {
        // console.log(res)
        let lab = {
          id: res.data,
          value: 0,
          label_name: inputValue.value!
        }
        label.value.push(lab)
        inputValue.value = ""
        proxy.$message({ type: 'primary', message: '插入完成' })
      }
    })


  } else {
    proxy.$message({ type: 'warning', message: '请输入' })
  }
}

//新建分组内容
const inputValue = ref<number | string>()




//获取标签
const label = ref<LabelData[]>([])
const rawlabel = () => {
  let request = {
    token: userStore.token,

  }
  labelApi(request).then((res: any) => {
    if (tackleCode(res.code)) {

      label.value = [...res.data]

    }
  })

}

const proxy: any = getCurrentInstance()?.proxy
//取消
function cancel() {
  inputValue.value = ""
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