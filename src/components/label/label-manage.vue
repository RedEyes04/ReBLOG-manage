<template>
  <yk-table>
    <yk-table-column property="name" label="标签名称"></yk-table-column>
    <yk-table-column property="moment" label="创建时间"></yk-table-column>
    <yk-table-column property="manage" label="操作" align="right"></yk-table-column>
    <template #tbody>
      <tr v-for="(item, index) in label" :key="index" class="yk-table__row">
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
import { watch, ref } from "vue"
import { LabelData } from '../../utils/interface';
import { momentm } from "../../utils/memont";



type labelProps = {
  label: LabelData[]
}
const props = withDefaults(defineProps<labelProps>(), {})
//删除标签
const emits = defineEmits(['deleteLabel'])

//当前标签
const labelDate = ref<LabelData[]>([])

const deletelabel = (e: number | string) => {
  emits('deleteLabel', e)
  labelDate.value = labelDate.value.filter(
    (obj: { id: number | string }) => {
      return obj.id !== e
    }
  )
}








watch(
  () => props.label,
  (e) => {
    labelDate.value = [...e]
  },
  { immediate: true }
)

</script>

<style lang="less" scoped></style>