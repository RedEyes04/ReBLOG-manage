<template>
  <yk-table>
    <yk-table-column property="name" label="分组名称"></yk-table-column>
    <yk-table-column property="value" label="关联文章数"></yk-table-column>
    <yk-table-column property="moment" label="创建时间"></yk-table-column>
    <yk-table-column property="manage" label="操作" align="right"></yk-table-column>
    <template #tbody>
      <tr v-for="(item, index) in subsetStore.data" :key="index" class="yk-table__row">
        <td class="yk-table__cell">
          <yk-input v-model="item.name" @focus="focusSubset(item.id)" @blur="blurSubset(item.id)" />
        </td>
        <td class="yk-table__cell">
          {{ item.value }}
        </td>
        <td class="yk-table__cell">
          {{ item.moment }}
        </td>
        <td class="yk-table__cell text-right">
          <yk-text type="primary" style="cursor: pointer" @click="deleteSubset(item.id)">删除</yk-text>
        </td>
      </tr>
    </template>
  </yk-table>
</template>

<script lang="ts" setup>
import { useSubsetStore } from '../../store/subset';
import { useSubset } from '../../hooks/subset';
const { deleteSubset, updateSubset } = useSubset()

//store
const subsetStore = useSubsetStore();
//当前分组名称
let nowName: string | number
//聚焦名称 
const focusSubset = (id: number | string) => {
  let result = subsetStore.data.find((item: { id: number | string }) => item.id === id)
  if (result) { nowName = result.name }
}
// 失焦
const blurSubset = (id: number | string) => {
  let result = subsetStore.data.find((item: { id: number | string }) => item.id === id)
  if (result && nowName != result.name) {
    // 发送后端处理
    updateSubset(result)
  }
}

</script>

<style lang="less" scoped></style>