<template>
    <van-nav-bar fixed :clickable="false">
        <template #left>
            <h1>{{ title }}</h1>
        </template>
        <template #right>
            <van-icon @click="handleReport" name="service-o" size="30" color="black" />
            &nbsp;
            <template v-if="userStore.token">
                <SvgIcon @click="handleClick" v-if="path === '/account'" name="退出" width="30px" height="30px"></SvgIcon>
            </template>
        </template>
    </van-nav-bar>
</template>

<script setup lang="ts">
import { logout } from '@/service/api/mobileBankAccount'
import { user } from '@/store/user';
import { storeToRefs } from 'pinia';
import { showToast } from 'vant';
const useStore = storeToRefs(user())
const userStore = user()

const route = useRoute()
const router = useRouter()
const title = computed(() => {
    return route.meta.title
})
const path = computed(() => {
    return route.path
})
const handleClick = async () => {
    try {
        router.push({
            path: "/result",
            query: {
                status: 'success',
                result: "退出成功"
            }
        })
        await logout()
        userStore.setToken('')
        userStore.setUserInfo({})
    } catch (error: any) {
        showToast(error.message)
    }
}
const handleReport = () => {
    router.push('/report')
}

</script>

<style lang="less" scoped>
.van-nav-bar {
    background-color: rgb(180, 181, 233);
    color: #fff;
    z-index: 999;
}
</style>