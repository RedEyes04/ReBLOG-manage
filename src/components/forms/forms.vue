<template>
  <div class="form">
    <yk-space dir="vertical" size="xl">
      <input type="text" class="form__title" placeholder="请输入标题" v-model="formData.title" />
      <yk-space align="center">
        <div class="subset">
          <input type="text" placeholder="选择分类" disabled v-model="subsetName"
            style="width: 110px; line-height: 28px;" />
          <IconDownOutline />
          <yk-dropdown @selected="subsetSelect">
            <yk-dropdown-item v-for="item in subsetList" :value="item.id">{{ item.name }}</yk-dropdown-item>
          </yk-dropdown>
        </div>
        <yk-space align="center" size="s">
          <yk-tag v-for="(tag, index) in formData.label" :key="index" closeable shape="round" @close="deleteLabel(tag)">
            {{ tag }}
          </yk-tag>
          <yk-text type="third" @click="showLabel" style="cursor: pointer;white-space: nowrap;"
            v-show="formData.label!.length < 3">
            插入标签
          </yk-text>
        </yk-space>
      </yk-space>
      <div :class="{ introduce: props.classify == 0 }">
        <yk-text-area v-model="formData.introduce" :max-length="800" placeholder="请输入简介"
          :auto-size="raws"></yk-text-area>
      </div>
    </yk-space>
    <div class="form__cover" v-if="props.classify == 0">
      <yk-upload :upload-url="uploadUrl" :file-list="fileUrl" :limit="1" accept="image/*" desc="封面800x600"
        @handle-success="handleSuccess"></yk-upload>
    </div>
    <yk-modal v-model="visible" title="标签" size="s" :show-footer="false">
      <yk-space dir="vertical" size="l">
        <yk-input v-model="inputValue" placeholder="请输入标签会车确定" style="width:280px" @submit="addLabel" />
        <yk-space size="s">
          <yk-tag v-for="(tag, index) in formData.label" :key="index" closeable shape="round" @close="deleteLabel(tag)">
            {{ tag }}
          </yk-tag>
        </yk-space>
        <yk-space wrap size="s" style="padding-top: 8px;">
          <yk-tag v-for="(tag, index) in labelArr" :key="index" shape="round" style="cursor: pointer;"
            @click="selectLabel(tag)">
            {{ tag }}
          </yk-tag>

        </yk-space>
      </yk-space>
    </yk-modal>
  </div>
  <!-- {{ props.form }} -->
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useSubset } from '../../hooks/subset';
import { useSubsetStore } from '../../store/subset';
import { useLabel } from '../../hooks/label';
import { baseImgPath, baseUrl } from '../../utils/env';
import { useCode } from '../../hooks/code';
import { FormData } from '../../utils/interface';


const { tackleCode } = useCode()
type FormProps = {
  classify: number,
  form?: FormData

}
// const props =withDefaults(defineProps<FormData>(), {
//   classify: 0,
// })
const props = withDefaults(defineProps<FormProps>(), {
  classify: 0,
})

// props
// const props = defineProps({
//   classify: {
//     default: 0,
//     type: Number
//   }
// })

// emits
const emits = defineEmits(['formData'])

// 表单数据（含标题、分类、标签、简介等）
const formData = ref<FormData>({
  title: "",
  subset_id: undefined,
  label: [],         // 标签（字符串数组）
  introduce: '',     // 简介
  cover: '',
  classify: props.classify,
})

// 简介输入框的行数配置（随分类变化）
const raws = computed(() => {
  return props.classify === 1
    ? { minRows: 24, maxRows: 30 }
    : { minRows: 4, maxRows: 10 }
})

// 分类相关
const subsetStore = useSubsetStore()
const { rawSubset } = useSubset('')
const subsetList = ref<{ id: string | number; name: string | number; value: number; moment?: string }[]>([])
const subsetName = ref()

// 分类选择
const subsetSelect = (e: number) => {
  formData.value.subset_id! = e
  nowSubset(e)
}

//当前分类
const nowSubset = (e: number) => {
  const selected = subsetList.value.find(item => item.id === e)
  if (selected) {
    subsetName.value = selected.name
  }
}









// 标签相关
const { rawLabel, label, inputValue, confirm } = useLabel()
const labelArr = ref<any[]>([])           // 所有标签（候选）
const inputLabel = ref<string | number>() // 输入框的标签值
const visible = ref<boolean>(false)       // 标签弹窗显隐

// 打开标签弹窗
const showLabel = () => {
  visible.value = true
}

// 新增标签（最多3个）
const addLabel = () => {
  if (inputValue.value && formData.value.label!.length < 3) {
    confirm()
    formData.value.label!.push(inputValue.value)
  }
}

// 选择标签（从候选区添加到已选标签中）
const selectLabel = (e: number | string) => {
  if (formData.value.label!.length < 3) {
    formData.value.label!.push(e)
    labelArr.value = labelArr.value.filter(item => item !== e)
  }
}

// 删除标签（从已选中移除并回退到候选区）
const deleteLabel = (e: number | string) => {
  labelArr.value.unshift(e)
  formData.value.label = formData.value.label!.filter(item => item !== e)
}

// 上传相关
const uploadUrl = `${baseUrl}/upload`
const fileUrl = ref<{ name: string, url: string }[]>([])

//图片提交成功
const handleSuccess = (res: any) => {
  if (tackleCode(res.code)) {
    let photoUrl = { name: res.data.file_name, url: baseImgPath + '/' + res.data.url }
    fileUrl.value.push(photoUrl)
    formData.value.cover = res.data.url
  }
  // console.log(e)
}


// 表单数据变动时向父组件同步
watch(formData,(e) => {
  emits('formData', e)
},
{deep:true})

// 同步分类数据
watch(() => subsetStore.data, 
(newVal) => {
  subsetList.value = newVal
  if(formData.value.subset_id){
      nowSubset(formData.value.subset_id)
    }
}, 
{ immediate: true })

// 同步标签数据（将标签对象数组转为字符串数组）
watch(
  () => label.value,
  (e: any[]) => {
    labelArr.value = Array.isArray(e) ? e.map(item => item.label_name) : []
  },
  { immediate: true }
)


watch(
  () => props.form,
  (e) => {
    formData.value = e!
    if(formData.value.cover){
      let photoUrl = { name:'', url: baseImgPath + '/' + formData.value.cover}
    fileUrl.value=[photoUrl]
    }
    if(formData.value.subset_id && subsetList.value){
      nowSubset(formData.value.subset_id)
    }
    
  }
)




// 初始化分类、标签
onMounted(() => {
  rawSubset(props.classify)
  rawLabel()
})

</script>


<style lang="less" scoped>
.form {
  position: relative;
  padding-top: @space-xl;

  input {
    border: none;
    background: transparent;
    outline: none;

    &::placeholder {
      color: @gray-4;
    }
  }

  &__title {
    font-size: @size-xl;
    font-weight: 600;
  }

  .yk-dropdown {
    position: absolute;
    top: 0;


  }

  .yk-text-area {
    border: 0px solid transparent;
    border-radius: 0;
    background-color: transparent;
    padding: 0;
  }

  .introduce {
    width: 100%;
    border-bottom: 1px solid @gray-2;
  }

  &__cover {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
<style lang="less">
.form {
  .yk-dropdown__title {
    width: 120px;
    height: 24px;
  }

  .yk-upload__picture-button {
    width: 160px;
    height: 120px;
  }

  .yk-upload-picture {
    width: 160px;
    height: 120px;
  }

  .yk-upload__picture {
    width: 160px;
    height: 120px;
  }
}
</style>