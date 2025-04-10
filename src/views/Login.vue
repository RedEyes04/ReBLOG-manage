<template>
  <div class="login" :style="{ height: pageHeight + 'px' }">
    <yk-space dir="vertical" :size="48" class="login__main" align="center">
      <yk-space dir="vertical" align="center">
        <img src="../assets/yike.svg" class="logo" />
        <span class="name">欢迎使用逸刻博客后台</span>
      </yk-space>
      <yk-space dir="vertical">
        <yk-input v-model="user.name" placeholder="用户名" style="width:320px" size="xl" />
        <yk-input v-model="user.psw" placeholder="密码" type="password" style="width:320px" size="xl" />
      </yk-space>
      <yk-button long size="xl" @click="sumbit">登录</yk-button>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'

const proxy: any = getCurrentInstance()?.proxy

const pageHeight = ref(window.innerHeight)

//用户
const user = ref({
  name: '',
  psw: ''
})

//提交
const sumbit = () => {
  if (user.value.name && user.value.psw) {
    console.log('ok')
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
      width: 84px;

    }
  }
}
</style>