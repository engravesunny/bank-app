<template>
    <div class="secuery-info">
        <div style="margin: 10px 0;" v-for="info in infos">
            <div style="font-size: 18px; font-weight: 700;">{{ info.title }}</div>
            <div class="service" v-for="service in info.list">
                <div style="padding: 4px 0;text-align: center;color: gray;">{{ service.title }}</div>
                <van-cell-group :border="false">
                    <van-cell v-for="item in service.services" :title="item.title" is-link
                        @click="handleClick(item.path, item.query)" />
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { destroyAccount } from '@/service/api/mobileBankAccount';
import { user } from '@/store/user';
import { showConfirmDialog, showToast } from 'vant';
const userStore = user()
const router = useRouter()


const handleClick = async (path: string, query: any) => {
    if (path === 'destroy') {
        showConfirmDialog({ title: "确定要销户吗" }).then(async () => {
            await destroyAccount({
                phoneAccountId: userStore.info.id
            })
            localStorage.setItem('TOKEN', '')
            userStore.setToken('')
            router.push('/')
        }).catch((err: any) => {
            showToast(err.message)
        })
        return
    }
    router.push({
        path,
        query
    })
}

const infos = [
    {
        title: '手机号码',
        list: [
            {
                title: '',
                services: [{ title: '手机号码修改', path: '/change-info', query: { text: '更改手机号码' } }]
            }
        ]
    },
    {
        title: '密码设置',
        list: [
            {
                title: '账户',
                services: [{ title: '密码修改', path: '/change-info', query: { text: '修改账户密码' } }, { title: '密码重置', path: '/change-info', query: { text: '账户密码重置' } }]
            },
            {
                title: '支付',
                services: [{ title: '密码修改', path: '/change-info', query: { text: '支付密码修改' } }, { title: '密码重置', path: '/change-info', query: { text: '支付密码重置' } }]
            },
        ]
    },
    {
        title: '其他安全服务',
        list: [
            {
                title: '证书',
                services: [
                    {
                        title: '证书更新',
                        path: '/change-info', query: { text: '证书更新' }
                    }
                ]
            },
            {
                title: '账户',
                services: [
                    {
                        title: '注销账户',
                        path: 'destroy', query: { text: '注销账户' }
                    }
                ]
            }
        ]
    }
]


</script>

<style lang="less" scoped>
.secuery-info {
    padding: 20px;
}

:deep(.van-cell) {
    border-radius: 10px;
}

:deep(.van-cell-group) {
    border-radius: 10px;
}
</style>