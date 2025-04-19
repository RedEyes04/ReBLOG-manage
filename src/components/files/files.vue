<template>
  <div class="files">
    <div class="files__tool" v-show="selectedFilesId.length > 0">
      <yk-space>
        <yk-checkbox :checked="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll">
          全选
        </yk-checkbox>
        <yk-text>已选择 {{ selectedFilesId.length }} 项内容</yk-text>
        <yk-text type="primary" style="cursor: pointer;" @click="removeAll">取消选择</yk-text>
      </yk-space>
      <yk-space>
        <IconDeleteOutline class="files__tool-delete" @click="deleteFiles" />
        <yk-popconfirm title="选择分组" placement="bottomRight" trigger="click" @cancel="cancel" @confirm="confirm">
          <IconSwitchOutline class="files__tool-switch" />
          <template #content>
            <yk-scrollbar ref="scrollbar" height="148px" class="subset">

              <div v-for="item in subsetStore.data" class="subset__item"
                :class="{ 'subset-elected': subsetSelectedId == item.id }" @click="changeOption(item.id)">
                {{ item.name }} {{ item.value }}
              </div>

            </yk-scrollbar>
          </template>
        </yk-popconfirm>

      </yk-space>
    </div>
    <div class="files__main">
      <filesItem v-for="item in files" :data="item" :key="item.id" @selected="selectFile" @delete="deleteFile"
        @changeSubsetId="changeSubset" />
    </div>
    <div class="pagination" v-show="count / props.pageSize > 1">
      <yk-pagination :total="count" size="m" @change="changePage" :default-page-size="props.pageSize"></yk-pagination>
    </div>
    <div class="empty" v-show="count == 0">
      <yk-empty description="这里什么也没有哦OvO!" type="secondary" />
    </div>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance, watch } from "vue"
import { mkfile } from "../../mock/data";
import filesItem from "./files-item.vue"
import { useSubsetStore } from '../../store/subset';
import './files.less'
import { useCode } from '../../hooks/code';

import { useUserStore } from '../../store/user';
import { fileApi, deleteFileApi } from "../../api";
const userStore = useUserStore()
const { tackleCode } = useCode()
//store
const subsetStore = useSubsetStore();

type FileProps = {
  pageSize: number;
  subsetId: number | string
}
const props = withDefaults(defineProps<FileProps>(), {
  pageSize: 8,
  subsetId: -1,
})
//总数
const count = ref<number>(123)
//数据内容
const files = ref();

//请求
type Requset = {
  token?: string;
  pageSize: number;//单页条数；
  nowPage: number;//当前页
  subsetId?: number | string;
  count: boolean
}

const request: Requset = {
  token: userStore.token,
  pageSize: props.pageSize,
  subsetId: props.subsetId,
  nowPage: 1,
  count: false

}

//获取数据
const drwData = (e: boolean) => {
  request.count = e
  fileApi(request).then((res: any) => {
    // console.log(res.data)
    if (tackleCode(res.code)) {
      if (e) {
        count.value = res.data.count
      }
      let arr = res.data.list
      //加入选择项
      for (let i = 0; i < arr.length; i++) {
        arr[i].selected = false;
      }
      files.value = arr
    }
  })

  // console.log(files.value)
}

//头部操作
const indeterminate = ref(false)
const checkedAll = ref(false)

const handleChangeAll = (value: boolean) => {
  indeterminate.value = false

  //先清空选择ID
  selectedFilesId.value = []
  if (value) {
    checkedAll.value = true
    for (let i = 0; i < files.value.length; i++) {
      files.value[i].selected = true
      selectedFilesId.value.push(files.value[i].id)
    }

  } else {
    checkedAll.value = false
    for (let i = 0; i < files.value.length; i++) {
      files.value[i].selected = false
    }

  }
}

//取消选择
const removeAll = () => {
  selectedFilesId.value = []
  for (let i = 0; i < files.value.length; i++) {
    files.value[i].selected = false
  }
}

//被选中图片ID的数组
const selectedFilesId = ref<number[]>([])

//选择操作
const selectFile = (e: number) => {
  for (let i = 0; i < files.value.length; i++) {
    if (files.value[i].id === e) {
      files.value[i].selected = !files.value[i].selected
      if (files.value[i].selected) {
        selectedFilesId.value.push(files.value[i].id)
      } else {
        //从数组移除对应项
        selectedFilesId.value = selectedFilesId.value.filter((item) => {
          return item !== e
        })
      }
      //半选与全选
      if (selectedFilesId.value.length == 0) {
        indeterminate.value = false
        checkedAll.value = false
      } else if (selectedFilesId.value.length == files.value.length) {
        indeterminate.value = false
        checkedAll.value = true
      } else {
        indeterminate.value = true
        checkedAll.value = false
      }
    }

  }
}

//删除
//删除单张图片
const deleteFile = (id: number, url: string) => {
  let request = {
    token: userStore.token,
    filesId: id,
    filesUrl: url

  }

  deleteFileApi(request).then((res: any) => {
    // console.log(res.data)
    if (tackleCode(res.code)) {
      proxy.$message({ type: 'primary', message: '删除成功' })

      files.value = files.value.filter((item: any) => {
        return item.id !== id
      })
    }
  })

}
//全部删除
const deleteFiles = () => {
  if (selectedFilesId.value.length > 0) {
    //收集提交后的多项内容
    let url = []
    for (let i = 0; i < selectedFilesId.value.length; i++) {
      for (let j = 0; j < files.value.length; j++) {
        if (files.value[j].id == selectedFilesId.value[i]) {
          url.push(files.value[j].url)
        }
      }
    }
    let request = {
      token: userStore.token,
      filesId: selectedFilesId.value.join(','),
      filesUrl: url
    }
    deleteFileApi(request).then((res: any) => {
      // console.log(res.data)
      if (tackleCode(res.code)) {
        proxy.$message({ type: 'primary', message: '删除成功' })
        //静态删除多项
        for (let i = 0; i < selectedFilesId.value.length; i++) {
          files.value = files.value.filter((item: any) => {
            return item.id !== selectedFilesId.value[i]
          })
        }
        //清除选择id
        selectedFilesId.value = [];

      }
    })
  }
}

//切换单张图片分组
const changeSubset = (e: any) => {
  proxy.$message({ type: 'primary', message: e.id })
}

//翻页 
const changePage = (e: number) => {
  request.nowPage = e;
  drwData(false)
}

//分类选择
const subsetSelectedId = ref<number | string>();
//切换 分组 
const changeOption = (e: number | string) => {
  if (e !== undefined && e !== null) {
    subsetSelectedId.value = e;
  } else {
    console.warn("传递的分组 ID 无效:", e);
  }
}


const proxy: any = getCurrentInstance()?.proxy
function cancel() {
  proxy.$message({ type: 'warning', message: '你点击了取消按钮' })
}
function confirm() {
  proxy.$message({ type: 'primary', message: '你点击了确认按钮' })
}

watch(
  props, () => {
    // console.log(props.serchTerm)
    //接受到修改再次查询数据
    request.nowPage = 1
    request.subsetId = props.subsetId
    // console.log(typeof props.subsetId)
    drwData(true)
  }
)



onMounted(() => {
  drwData(true)
})
</script>

<style lang="less" scoped>
.files {
  padding: @space-xl;
  border-radius: @radius-m;
  background: @bg-color-l;
  width: 100%;

  &__tool {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: @space-l;
    border-radius: @radius-m;
    background: @bg-color-m;

    &-delete,
    &-switch {
      width: 20px;
      height: 20px;
      color: @font-color-s;
      cursor: pointer;

      &:hover {
        color: @font-color-l;
      }
    }
  }

  &__main {
    padding: 24px 0 32px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    row-gap: 32px;
    column-gap: 24px;
    justify-content: center;
  }

  .pagination {
    padding: @space-l 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }

  .empty {
    height: 400px;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
  }
}
</style>