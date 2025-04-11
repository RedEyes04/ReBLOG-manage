<template>
  <div class="login" :style="{ height: pageHeight + 'px' }">
    <yk-space dir="vertical" :size="48" class="login__main" align="center">
      <yk-space dir="vertical" align="center">
        <img src="../assets/icon不透明1.png" class="logo" />
        <span class="name">欢迎使用REBLOG管理系统</span>

      </yk-space>
      <yk-space dir="vertical">
        <yk-input v-model="user.name" placeholder="用户名" style="width:320px" size="xl" />
        <yk-input v-model="user.psw" placeholder="密码：不能少于4位数" type="password" style="width:320px" size="xl" />
      </yk-space>
      <yk-button long size="xl" @click="sumbit">注册</yk-button>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import { registerApi } from '../api'
import { useCode } from "../hooks/code";
import { useRouter } from 'vue-router';
const router = useRouter()
const { tackleCode } = useCode()

const proxy: any = getCurrentInstance()?.proxy

const pageHeight = ref(window.innerHeight)

//用户
const user = ref({
  name: '',
  psw: ''
})

//提交
const sumbit = () => {
  if (user.value.name && user.value.psw && user.value.psw.length > 3) {
    // console.log('ok')
    let data = {
      name: user.value.name,
      password: user.value.psw,
      moment:new Date()
    }
    registerApi(data).then((res:any) => {
      // console.log('后端返回:', res)
      // proxy.$message({ type: 'primary', message: '注册成功' })

      if (tackleCode(res.code)) {
        //注册成功
        proxy.$message({ type: 'primary', message: '注册成功' })
        proxy.$message({ type: 'primary', message: '3秒后跳转至登录页面' })

        setTimeout(()=>{
          router.push('/login')
        },3000)        
        
      }
    })
  } else {
    proxy.$message({ type: 'warning', message: '输入不完整！' })
  }
}
</script>

<style lang="less" scoped>
.login {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  background: @bg-color-m;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__main {
    padding: 48px;
    border-radius: @radius-xl;
    background: @bg-color-l;

    .name {
      font-size: 20px;
      font-weight: 600;
    }

    .logo {
      width: 200px;
      // height: 200px;
      // padding-bottom:1px;

    }
  }
}
</style>