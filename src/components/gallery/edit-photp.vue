<template>
  <div class="edit-photo">
    <yk-upload :upload-url="uploadUrl" :draggable="true" @handleSuccess="handleSuccess"></yk-upload>
    <div class="waterfall">
      <div class="waterfall__item" v-for="item in fileList">
        <img :src="baseImgPath+'/'+item.url " />
        <IconStarFill class="waterfall__item--cover" v-show="item.id === coverIndex" />
        <yk-space size="ss">
          <p class="waterfall__item--tool" v-show="item.id !== coverIndex" @click="changeCover(item)">设为封面</p>
          <IconDeleteOutline class="waterfall__item--delete" @click="deletePhoto(item)" />
        </yk-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted,watch } from 'vue'
import { baseUrl,baseImgPath } from '../../utils/env';
import { useCode } from '../../hooks/code';
import { FileData } from '../../utils/interface';
import { useFile } from '../../hooks/files';

const emits = defineEmits(["cover" ,"editors"])
const { tackleCode } = useCode()
const props =defineProps(["content","cover"])





const uploadUrl = `${baseUrl}/upload`
//后端返回来的数组
const fileList = ref<{url:string;id:number}[]>([])

//封面 
const coverIndex = ref<number>(-1)
//切换封面
const changeCover = (e: { id: number; url: string }) => {
  coverIndex.value = e.id
  emits("cover",e.url)

}

const {deleteFile} = useFile()

//删除 
const deletePhoto = (e: { id: number; url: string }) => {
  fileList.value = fileList.value.filter((obj: any) => {
    return obj.id !== e.id
  })
  emits("editors",fileList.value.map((obj:any)=>JSON.stringify(obj)).join(" "))

  if (coverIndex.value == e.id && fileList.value.length > 0) {
    coverIndex.value = fileList.value[0].id
    emits("cover",fileList.value[0].url)

  } else if (coverIndex.value == e.id && fileList.value.length <= 0) {
    coverIndex.value = -1
    emits("cover",'')

  }
  deleteFile(e)
}
//图片提交
const handleSuccess = (e:{code:number;data:FileData})=>{
  if (tackleCode(e.code)) {
    let photo = {
      id:e.data.id,
      url:e.data.url
    }
    fileList.value.push(photo)
    emits("editors",fileList.value.map((obj:any)=>JSON.stringify(obj)).join(" "))
    if(coverIndex.value==-1){
      coverIndex.value = e.data.id
      emits("cover",e.data.url)
    }
  }
  
  // console.log(e)
}

watch(
  () => props.content,
  (e) => {
    //将后端给的字符串转成数组
    let cont = e.split(" ")
    fileList.value = cont.map((obj:string)=>JSON.parse(obj))
    if(props.cover){
      
        for(let i =0;i<fileList.value.length;i++){
          if(props.cover==fileList.value[i].url){
            coverIndex.value = fileList.value[i].id

          }
        }
       }
    }

    
    
  
)


onMounted(() => {
  // getPhotos();
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
