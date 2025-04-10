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
            v-show="formData.label.length < 3">
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
      <yk-upload :upload-url="uploadUrl" :file-list="fileUrl" :limit="1" accept="image/*" desc="封面800x600"></yk-upload>
    </div>
    <yk-modal v-model="visible" title="标签" size="s" :show-footer="false">
      <yk-space dir="vertical" size="l">
        <yk-input v-model="inputLabel" placeholder="请输入标签会车确定" style="width:280px" @submit="addLabel" />
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
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'
import { subset, mklabel } from '../../mock/data';
import { LabelData } from '../../utils/interface';

const props = defineProps({
  classify: {
    default: 0,
    type: Number
  }
})

const emits = defineEmits(['formData'])

const formData = ref<any>({
  title: "",
  subsetId: undefined,
  label: [],//标签
  introduce: '',//简介
  cover: '',
  classify: props.classify,
})

//简介行数
const raws = computed(() => {
  if (props.classify == 1) {
    return {
      minRows: 24,
      maxRows: 30,
    }
  } else {
    return {
      minRows: 4,
      maxRows: 10,
    }
  }
})

//分类名称
const subsetName = ref()

//选择分类
const subsetSelect = (e: number) => {
  formData.value.subsetId != e
  for (let i = 0; i < subsetList.value.length; i++) {
    if (e == subsetList.value[i].id) {
      subsetName.value = subsetList.value[i].name
    }
  }
}

//获取分类
const subsetList = ref()
const getSubset = () => {
  subsetList.value = subset.data.list
  console.log(subsetList.value)
}

//标签
//所有标签
const labelData = ref<LabelData[]>([])
const labelArr = ref<any[]>([])
const inputLabel = ref<string | number>()

const rawLabel = () => {
  labelData.value = mklabel.data.list;
  for (let i = 0; i < labelData.value.length; i++) {
    labelArr.value.push(labelData.value[i].name)
  }
}

//标签弹窗
const visible = ref<boolean>(false)
const showLabel = () => {
  visible.value = true
}

//增加标签
const addLabel = () => {
  if (inputLabel.value && formData.value.label.length < 3) {
    formData.value.label.push(inputLabel.value)
    inputLabel.value = ""
  }
}

//选择标签
const selectLabel = (e: number | string) => {
  if (formData.value.label.length < 3) {
    formData.value.label.push(e)
    labelArr.value = labelArr.value.filter((obj: number | string) => {
      return obj != e
    })
  }
}

//删除标签
const deleteLabel = (e: number | string) => {
  labelArr.value.unshift(e)
  formData.value.label = formData.value.label.filter((obj: number | string) => {
    return obj != e
  })
}

//封面
const uploadUrl = ""
const fileUrl = ref([])

watch(formData.value, (e) => {
  emits('formData', e)
})

onMounted(() => {
  getSubset()
  rawLabel();
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
}
</style>