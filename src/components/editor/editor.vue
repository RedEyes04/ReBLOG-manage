<template>
  <yk-affix :offset="64" @change="toolbarTop">
    <Toolbar class="toolbar" :class="{ 'istop': top }" :editor="editorRef" :defaultConfig="toolbarConfig"
      :mode="mode" />
  </yk-affix>
  <div class="editor__main">
    <slot></slot>
    <Editor style="min-height: 500px; width:820px; overflow-y: hidden;" v-model="valueHtml"
      :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @onChange="onChange" />
  </div>
</template>
<script lang="ts" setup>
import './style.less' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, } from 'vue'
import { Editor, Toolbar, InsertFnType} from '@wangeditor/editor-for-vue'
import { IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
import { colors } from "./colors"
import {uploadApi} from "../../api/index"
import { baseImgPath } from '../../utils/env'

const emits = defineEmits('editors')


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

//工具栏固定
const top = ref<boolean>(false)
const toolbarTop = (e: boolean) => {
  top.value = e
}


//工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    "blockquote",
    "headerSelect",
    "|",
    "bold",
    "underline",
    "through",
    "italic",
    "color",
    "bgColor",
    "clearStyle",
    "|",
    "bulletedList",
    "numberedList",
    "todo",
    {
      key: "group-justify",
      title: "对齐",
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
      menuKeys: [
        "justifyLeft",
        "justifyRight",
        "justifyCenter",
        "justifyJustify",
      ],
    },
    {
      key: "group-indent",
      title: "缩进",
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
      menuKeys: ["indent", "delIndent"],
    },
    "|",
    "emotion",
    "insertLink",
    // 'insertImage',
    "uploadImage",
    "insertVideo",
    "insertTable",
    "|",
    "code",
    "codeBlock",
  ],
}

//菜单配置
const editorConfig: Partial<IEditorConfig> = {  // TS 语法
  placeholder:"请输入一点内容吧！！！！",
  MENU_CONF: {
    color: {
      colors,
    },
    bgColor: {
      colors,
    },
    uploadImage: {
      async customUpload(file: File, insertFn: InsertFnType) {

        const formData=new FormData()
        formData.append('file',file)
        uploadApi(formData).then((res:any)=>{
          let url = baseImgPath + '/' + res.data.url
          insertFn(url, res.data.url, url)
          console.log(res)

        })
      }
    }
  }

}

//获取内容
const onChange = () => {
  emits('editors', valueHtml.value)
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  // console.log(editor.getAllMenuKeys())
}

</script>
<style scoped lang="less">
.toolbar {
  border-radius: @radius-s;
  width: 1200px;
  background: @bg-color-l;
}

.istop {
  box-shadow: @shadow-m;
}

.editor__main {
  padding-top: @space-xl;
  margin-top: @space-s;
  border-radius: @radius-m;
  background: @bg-color-l;
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

strong {
  font-weight: bold !important;
}
</style>