<template>
  <div class="gallery-item">
    <yk-space size="s" dir="vertical">
      <div class="gallery-item__image">
        <div class="gallery-item__cover">
          <yk-image :src="cover" width="238" height="160" :is-lazy="true" :preview="false" fit="cover" />
        </div>
        <yk-space :size="2">
          <div class="gallery-item__image--left image-div">
            <yk-image :src="baseImgPath+'/' + content[0].url" width="78" height="78" :is-lazy="true"
              :preview="false" fit="cover" v-if="content[0]" />
          </div>
          <div class="gallery-item__image--center image-div">
            <yk-image :src="baseImgPath+'/' + content[1].url" width="78" height="78" :is-lazy="true"
              :preview="false" fit="cover" v-if="content[1]" />
          </div>
          <div class="gallery-item__image--right image-div">
            <yk-image :src="baseImgPath+'/' + content[2].url" width="78" height="78" :is-lazy="true"
              :preview="false" fit="cover" v-if="content[2]" />
          </div>
        </yk-space>
        <yk-space class="gallery-item__control" :size="4">
          <IconFillOutline @click="updateArticle" />
          <yk-popconfirm trigger="click" placement="topRight" title="确定删除" content="删除将不可恢复" @confirm="deletegallery()">
            <IconDeleteOutline />
          </yk-popconfirm>
        </yk-space>
      </div>
      <div style="width:100%">
        <p class="gallery-item__title" v-html="title"></p>
        <div class="gallery-item__datas">
          <yk-space size="xl">
            <yk-space>
              <yk-text type="third">
                查看
                {{ props.data?.views }}
              </yk-text>
              <yk-text type="third">
                喜欢
                {{ props.data?.praise }}
              </yk-text>
            </yk-space>
          </yk-space>
          <yk-text type="third">{{ momentm(props.data?.moment!) }}</yk-text>
        </div>
      </div>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import { computed ,ref,watch} from "vue"
import { ArticleDate } from '../../utils/interface';
import { momentm } from "../../utils/memont";
import {baseImgPath} from "../../utils/env.ts"
import { useRouter } from "vue-router";
import { highlightKeywords } from "../../utils/highlight.ts";


const router = useRouter()


type galleryItemProps = {
  data?: ArticleDate
  serchTerm?:string

}

const props = withDefaults(defineProps<galleryItemProps>(), {
})

const emits = defineEmits(["delete", "state"])

//封面地址
const cover = computed(() => {
  return baseImgPath+'/' + props.data?.cover
})

const content  = computed(()=>{
  if(props.data?.content){
    let cont = props.data.content.split(" ")
    return cont.map((obj:string)=>JSON.parse(obj))
  }else{
    return ""
  }
})

//删除 
const deletegallery = () => {
  emits("delete", props.data!.id)
}


//修改文章
const updateArticle=()=>{
  router.push({
    path:'editgallery'  ,
    query:{
      id:props.data!.id
    }
  })

}
//高亮关键词
const title =ref(props.data?.title!)
const highLight=(key?:string)=>{
  title.value = highlightKeywords(props.data?.title!,key!)
}

watch(
  ()=>props.serchTerm,
  (e)=>{
    highLight(e)
  }
)





</script>

<style lang="less" scoped>
.gallery-item {
  border-radius: @radius-m;
  background: @bg-color-l;
  width: 238px;

  &__cover {
    position: relative;
    border-radius: @radius-m @radius-m 0 0;
    overflow: hidden;
    flex: none;
    padding-bottom: 2px;
  }

  &__image--left {
    border-radius: 0 0 0 @radius-m;
    overflow: hidden;
  }

  &__image--right {
    border-radius: 0 0 @radius-m 0;
    overflow: hidden;
  }

  .image-div {
    width: 78px;
    height: 78px;
    background: @gray-2;
  }

  &__unpublish {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: rgba(43, 90, 237, 0.8);
    line-height: 36px;
    color: @white;
    font-weight: 600;
  }

  &__title {
    .font-l();
    padding-top: @space-m;
    font-weight: 600;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &__introduce {
    .font-m();
    height: 48px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color: @font-color-l;
    margin-bottom: @space-m;
    max-width: 720px;
  }

  &__datas {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__control {
    position: absolute;
    right: @space-l;
    top: @space-l;
    background-color: rgba(255, 255, 255, 0.56);
    border-radius: @radius-m;
    padding: @space-ss;
    opacity: 0;

    .yk-icon {
      width: 24px;
      height: 24px;
      padding: 5px;
      color: @gray;
      cursor: pointer;

      &:hover {
        color: @pcolor;
      }
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.64);
      backdrop-filter: blur(2px);
    }
  }

  &:hover {
    .gallery-item__control {
      opacity: 1;
    }
  }

}
</style>
<style lang="less">
.gallery-item {
  .yk-image__img {
    border-radius: 0;
  }
}
</style>