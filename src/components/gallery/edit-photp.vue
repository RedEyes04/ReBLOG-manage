<template>
  <div class="edit-photo">
    <yk-upload :upload-url="uploadUrl" :draggable="true" @handleSuccess="handleSuccess"></yk-upload>
    <div class="waterfall">
      <div class="waterfall__item" v-for="item in fileList">
        <img :src="baseImgPath+'/'+item.url " />
        <IconStarFill class="waterfall__item--cover" v-show="item.id === coverIndex" />
        <yk-space size="ss">
          <p class="waterfall__item--tool" v-show="item.id !== coverIndex" @click="changeCover(item.id)">设为封面</p>
          <IconDeleteOutline class="waterfall__item--delete" @click="deletePhoto(item.id)" />
        </yk-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { mphotos } from '../../mock/data';
import { baseUrl,baseImgPath } from '../../utils/env';
import { useCode } from '../../hooks/code';
import { FileData } from '../../utils/interface';
const { tackleCode } = useCode()


const proxy: any = getCurrentInstance()?.proxy

//获取图片 
const photos = ref()
const getPhotos = () => {
  photos.value = mphotos.data
}

const uploadUrl = `${baseUrl}/upload`
//后端返回来的数组
const fileList = ref<{url:string;id:number}[]>([])

//封面 
const coverIndex = ref<number>(0)

const changeCover = (e: number) => {
  coverIndex.value = e
}


//删除 
const deletePhoto = (e: number) => {
  photos.value = photos.value.filter((obj: any) => {
    return obj.id !== e
  })
  if (coverIndex.value == e && photos.value.length > 0) {
    coverIndex.value = photos.value[0].id
  } else if (coverIndex.value == e && photos.value.length <= 0) {
    coverIndex.value = -1
  }
  proxy.$message({ type: 'primary', message: '删除完成' })
}
//图片提交
const handleSuccess = (e:{code:number;data:FileData})=>{
  if (tackleCode(e.code)) {
    let photo = {
      id:e.data.id,
      url:e.data.url
    }
    fileList.value.push(photo)
  }
  
  // console.log(e)
}
onMounted(() => {
  getPhotos();
})

</script>

<style lang="less" scoped>
.edit-photo {
  background: @bg-color-l;
  border-radius: @radius-m;
  padding: @space-xl;
  width: 100%;
}

.waterfall {
  width: 100%;
  column-count: 3;
  column-gap: @space-xl;
  padding-top: 32px;

  &__item {
    margin-bottom: @space-xl;
    border-radius: @radius-m;
    overflow: hidden;
    line-height: 0%;

    img {
      width: 100%;
    }

    .yk-space {
      position: absolute;
      top: @space-l;
      right: @space-l;
    }

    &--cover {
      position: absolute;
      left: @space-l;
      top: @space-l;
      width: 24px;
      height: 24px;
      color: @wcolor;
    }

    &--tool {
      line-height: 32px;
      padding: 0 @space-m;
      border-radius: @radius-m;
      background: rgba(255, 255, 255, 0.56);
      color: @pcolor;
      cursor: pointer;
      transition: all @animatb;
      opacity: 0;

      &:hover {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(2px);
      }
    }

    &--delete {
      width: 32px;
      height: 32px;
      padding: 9px;
      border-radius: @radius-m;
      background: rgba(255, 255, 255, 0.56);
      color: @gray;
      cursor: pointer;
      transition: all @animatb;
      opacity: 0;

      &:hover {
        color: @ecolor;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(2px);
      }
    }

    &:hover {
      .waterfall__item--tool {
        opacity: 1;
      }

      .waterfall__item--delete {
        opacity: 1;
      }
    }
  }
}
.edit-photo{
    .yk-upload_file-list{
      display: none;
    }
  }
</style>
