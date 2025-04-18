<template>
  <yk-space dir="vertical" style="width:100%" size="xl">
    <articleItemVue v-for="item in articleList" :data="item" :key="item.id" @delete="deleteArticle"
      @state="updateState" />
    <div class="pagination" v-show="count/props.pageSize>1">
      
      <yk-pagination
        :total="count"
        size="m"
        @change="changePage"
        :default-page-size="props.pageSize"
      ></yk-pagination>
    </div>
    <div class="empty" v-show="count == 0">
      <yk-empty description="这里什么也没有哦OvO!" type="secondary" />
    </div>
  </yk-space>
</template>

<script lang="ts" setup>
import { onMounted,watch } from "vue"
import articleItemVue from "./article-item.vue";
import { useArticle } from "../../hooks/article";
import { useUserStore } from '../../store/user';

const userStore = useUserStore()
const { getData,articleList,count, updateState,deleteArticle} = useArticle()


const props = defineProps({
  pageSize: {
    type: Number,
    default: 3,
  },
  subsetId: {
    default: -1,
    type: [Number,String]
  },
  state: {
    default: -1,
    type: [Number,String]
  },
  serchTerm: {
    type: String,
    default: ""
  }
})

const request = {
  token:userStore.token,
  pageSize: props.pageSize,
  nowPage: 1,
  state: props.state,
  subsetId: props.subsetId,
  serchTerm: props.serchTerm,
  count: true,
  classify:0
}





//翻页 
const changePage = (e: number) => {
  request.nowPage = e;
  getData(request)
}
watch(
  props,()=>{
    console.log(props.state,props.subsetId)
    //接受到修改再次查询数据
    request.nowPage = 1
    request.state = props.state
    request.subsetId = props.subsetId

    getData(request)


  }
)
onMounted(() => {
  getData(request)
  // console.log(articleList.value)
})
</script>

<style lang="less" scoped>
.pagination {
  padding: @space-s 0 @space-xl;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}
.empty{
  height: 400px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>