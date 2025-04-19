<template>
    <div class="head-bar">
        <yk-space align="center" :size="12" style="cursor: pointer;" @click="backHome">
            <img src="../../assets/icon透明1.png" class="logo">
            <span class="name">ReBLOG管理后台</span>
        </yk-space>
        <yk-space align="center" size="xl">
            <yk-badge is-dot>
                <IconMailOutline style="font-size: 20px;" @click="changeActive(true)" />
            </yk-badge>
            <yk-avatar img-url="https://bucket.redeyes.top/avater.webp"></yk-avatar>
            <div>
                <yk-theme style="font-size: 20px;" />
            </div>
            <yk-button @click="logOut">退出</yk-button>
        </yk-space>
        <Information :active="active" @close="changeActive(false)" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRouter } from 'vue-router';
import { Information } from '../../components/reply/index'; //导入私信
import router from "../../router";
import { isRegisterApi } from "../../api"
import { useCode } from "../../hooks/code";
import { useUserStore } from "../../store/user";
import { noreadMessageApi } from "../../api";

const userStore = useUserStore()
const active = ref<boolean>(false)
const backHome = () => {
    router.push('/')
}
//code验证
const { tackleCode } = useCode()
//展开关私信
const changeActive = (e: boolean) => {
    active.value = e
}
const isRegister = () => {
    let data = {}
    isRegisterApi(data).then((res: any) => {
        // console.log(res)
        if (tackleCode(res.code)) {
            //已注册
            isLogin()
        }
    })
}

//是否登录验证
//默认主路由跳转注册/登录
const isLogin = () => {
    if (!userStore.token) {
        // router.push('/register')
        router.push('/login')

    }
}

// //获取私信未读数
// const isread =ref(false)
// const noreadMsg = () => {
//     let data = {
//         token:userStore.token
//     }
//     noreadMessageApi(data).then((res: any) => {

//         if (tackleCode(res.code)) {
//             if(res.data>=0){
//                 isread.value = true
//             }
//             console.log(res.data)

//         }


//     })
// }
//退出
const logOut = () => {
    userStore.$patch({
        id: -1,
        name: '',
        token: ''
    })
    router.push('/login')

}
onMounted(() => {
    isRegister()
    // noreadMsg() 
})
</script>

<style lang="less" scoped>
.head-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background: @bg-color-l;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 @space-xl;

    .logo {
        height: 95px;
        /* 这里设置logo的高度 */
        width: 130px;
        /* 这里设置logo的宽度 */
    }

    .name {
        font-weight: 600;
        font-size: 20px;
    }
}
</style>
