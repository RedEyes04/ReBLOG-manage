<template>
  <div class="top-title">
    <yk-title :level="3" style="margin:0;line-height: 36px;">{{ props.name }}</yk-title>
    <slot name="custom" />
    <yk-space size="s" v-if="isSearch">
      <yk-button type="secondary" v-show="SearchData" @click="cancleSearch">取消搜索</yk-button>
      <yk-input-search style="width: 320px" placeholder="请输入..." v-model="SearchData" @search="search">
        <template #suffix>
          <yk-button type="secondary">
            <IconSearchOutline />
          </yk-button>
        </template>
      </yk-input-search>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const SearchData = ref();

type titleProps = {
  name: string;
  isSearch: boolean;
}
const props = withDefaults(defineProps<titleProps>(), {
  name: '总览',
  isSearch: true,
})

const emit = defineEmits(['search'])

//搜索事件
const search = () => {
  emit('search', SearchData.value)
}
//取消搜索
const cancleSearch = () => {
  emit('search', '')
  SearchData.value = ''
}

</script>

<style lang="less" scoped>
.top-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>