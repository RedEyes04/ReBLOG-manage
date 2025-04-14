<template>
  <yk-table>
    <yk-table-column property="name" label="标签名称"></yk-table-column>
    <yk-table-column property="moment" label="创建时间"></yk-table-column>
    <yk-table-column property="manage" label="操作" align="right"></yk-table-column>
    <template #tbody>
      <tr v-for="(item, index) in labelData" :key="index" class="yk-table__row">
        <td class="yk-table__cell">
          {{ item.label_name }}
        </td>
        <td class="yk-table__cell">
          {{ momentm(item.moment!) }}
        </td>
        <td class="yk-table__cell text-right">
          <yk-text type="primary" style="cursor: pointer" @click="deletelabel(item.id)">删除</yk-text>
        </td>
      </tr>
    </template>
  </yk-table>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, watch } from "vue"
import { LabelData } from '../../utils/interface';
import { momentm } from "../../utils/memont";
import { useUserStore } from "../../store/user";
import { useCode } from '../../hooks/code';
import { deleteLabelApi } from '../../api';

const { tackleCode } = useCode()

const userStore = useUserStore()

type labelProps = {
  label: LabelData[]
}
const props = withDefaults(defineProps<labelProps>(), {})

//当前标签数组
const labelData = ref<LabelData[]>([])

const proxy: any = getCurrentInstance()?.proxy


//删除标签
const deletelabel = (e: number | string) => {
  let request = {
    labelId: e,
    token: userStore.token
  }

  deleteLabelApi(request).then((res: any) => {
    if (tackleCode(res.code)) {
      labelData.value = labelData.value.filter(
        (obj: { id: number | string }) => {
          return obj.id !== e
        }
      )
      proxy.$message({ type: 'primary', message: '删除成功' })
    }
  })
}

watch(
  () => props.label,
  (e) => {
    labelData.value = [...e]
  },
  { immediate: true }
)

</script>

<style lang="less" scoped></style>