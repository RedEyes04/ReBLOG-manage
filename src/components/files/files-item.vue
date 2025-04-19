<template>
  <div class="file-item">
    <div class="file-item__img" :class="{ 'file-item--selected': props.data?.selected }">
      <yk-image :src="url" width="200" height="200" :is-lazy="true" fit="contain"></yk-image>
      <yk-space class="file-item__img--tool" size="s">
        <IconDeleteOutline class="files__tool-delete" @click="deleteFile" />
        <yk-popconfirm title="选择分组" placement="bottomRight" @cancel="cancel" @confirm="confirm">
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
      <div class="file-item__img--check" @click="checkFile">
        <IconTickMinOutline style="color:#fff;font-size:24px" />
      </div>
    </div>
    <div class="file-item__name">
      <p class="file-item__name-file">{{ props.data?.url }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { FileData } from "../../utils/interface"
import { useSubsetStore } from '../../store/subset';
import './files.less'
import { baseImgPath } from "../../utils/env";

//store
const subsetStore = useSubsetStore();

type FielItemProps = {
  data?: FileData
}

const props = withDefaults(defineProps<FielItemProps>(), {
})

const emits = defineEmits(['changeSubsetId', 'delete', 'selected'])
//图片路径
const url = computed(() => {
  return baseImgPath + '/' + props.data?.url
})
//分类选择
const subsetSelectedId = ref<number | string>(props.data?.subset_id!);
//切换 分组 
const changeOption = (e: number | string) => {
  subsetSelectedId.value = e
}

function cancel() {
  // proxy.$message({ type: 'warning', message: '你点击了取消按钮' })
}
function confirm() {
  //如果当前选择于之前不同时
  if (subsetSelectedId.value != props.data?.subset_id) {
    let data = {
      id: props.data?.id,
      subsetId: subsetSelectedId.value,
    }
    emits("changeSubsetId", data)
  }

}
//删除 
const deleteFile = () => {
  emits("delete", props.data?.id, props.data?.url)
}
//选择
const checkFile = () => {
  emits("selected", props.data?.id)
}
</script>

<style lang="less" scoped>
.file-item {
  &__img {
    position: relative;
    border-radius: @radius-s;
    border: 2px solid @bg-color-l;

    &--tool {
      position: absolute;
      right: @space-s;
      bottom: @space-s;
      opacity: 0;

      .yk-icon {
        width: 32px;
        height: 32px;
        padding: 8px;
        background: rgba(255, 255, 255, 0.56);
        border-radius: @radius-m;
        transition: all @animatb;
        cursor: pointer;

        &:hover {
          color: @pcolor;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(2px);
        }
      }
    }

    &--check {
      width: 26px;
      height: 26px;
      border-radius: @radius-s;
      background: @gray-4;
      position: absolute;
      left: @space-s;
      top: @space-s;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.56);
      opacity: 0;

      .yk-icon {
        opacity: 0;
      }
    }

    &:hover {
      background: @pcolor-1;

      .file-item__img--check {
        opacity: 1;
      }

      .file-item__img--tool {
        opacity: 1;
      }
    }
  }

  &--selected {
    background: @pcolor-1;
    border: 2px solid @pcolor-3;

    .file-item__img--check {
      opacity: 1;
      background: @pcolor;

      .yk-icon {
        opacity: 1;
      }
    }

    .file-item__img--tool {
      opacity: 0;
    }

    &:hover {
      .file-item__img--tool {
        opacity: 0;
      }
    }
  }

  &__name {
    padding-top: @space-l;
    display: flex;
    justify-content: center;

    &-file {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }
  }

}
</style>