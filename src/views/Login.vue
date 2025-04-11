<template>
  <div class="login" :style="{ height: pageHeight + 'px' }">
    <yk-space dir="vertical" :size="48" class="login__main" align="center">
      <yk-space dir="vertical" align="center">
        <img src="../assets/icon不透明1.png" class="logo" />
        <span class="name">欢迎使用REBLOG管理系统</span>
        
      </yk-space>
      <yk-space dir="vertical">
        <yk-input v-model="user.name" placeholder="用户名" style="width:320px" size="xl" />
        <yk-input v-model="user.psw" placeholder="密码" type="password" style="width:320px" size="xl" />
      </yk-space>
      <yk-button long size="xl" @click="sumbit">登录</yk-button>
      <!-- <yk-button @click="abc">显示user</yk-button> -->
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import { signinApi } from '../api';
import { useCode } from "../hooks/code";
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
const router = useRouter()
const { tackleCode } = useCode()
const proxy: any = getCurrentInstance()?.proxy

const pageHeight = ref(window.innerHeight)
const userStore = useUserStore()

//用户
const user = ref({
  name: '',
  psw: ''
})

//提交
const sumbit = () => {
  if (user.value.name && user.value.psw) {
     // console.log('ok')
     let data = {
      name: user.value.name,
      psw: user.value.psw,
      moment:new Date()
    }
    signinApi(data).then((res:any) => {
      // console.log('后端返回:', res)
      // proxy.$message({ type: 'primary', message: '注册成功' })

      if(res.code === 200){
        userStore.$patch(res.data)
        // console.log(userStore.name)
        router.push('/')
        // console.log(res.data)
      }else if(res.code === 400) {
        proxy.$message({ type: 'error', message: '用户名或密码错误' })

      }
    })

  } else {
    proxy.$message({ type: 'warning', message: '输入不完整！' })
  }
}
// const abc = () =>{
//   console.log(userStore.name)

// }
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