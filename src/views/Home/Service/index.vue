<template>
    <div class="service">
        <div class="card" v-for="service in services">
            <div class="title">{{ service.title }}</div>
            <van-grid class="grid" :column-num="3" :gutter="10">
                <van-grid-item v-for="item in service.list" @click="handleClick(item)">
                    <SvgIcon :name="item.title" width="65px" height="65px"></SvgIcon>
                    <div class="text">{{ item.title }}</div>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant';

const router = useRouter()
const services = [
    {
        title: '系统服务',
        list: [
            {
                title: '账号管理',
                path: '/account-detail'
            },
            {
                title: '开通账户',
                path: '/open-account'
            },
            {
                title: '交易明细',
                path: '/transaction-detail'
            },
            {
                title: '转账记录',
                path: '/transaction-detail'
            }
        ]
    },
    {
        title: '校园服务',
        list: [
            {
                title: '校园卡充值',
                path: '/'
            },
            {
                title: '校园卡余额',
                path: ''
            },
            {
                title: '最近消费',
                path: '/'
            },
        ]
    },
    {
        title: '其他',
        list: [
            {
                title: '话费充值',
                path: '/'
            },
            {
                title: '利息计算',
                path: ''
            },
        ]
    }
]

const handleClick = (item: any) => {
    if (item.path === '/') {
        showToast('敬请期待')
        return
    }
    router.push(item.path)
}

</script>

<style lang="less" scoped>
:deep(.van-grid-item__content) {
    border-radius: 10px;
    background-color: transparent !important;
    border: none;

    &:active {
        background-color: rgba(0, 0, 0, .1) !important;
    }

    &::after {
        content: "";
        border: none;
    }
}

.service {
    padding: 20px;
}

.icon {
    width: 100px;
    height: 100px;
}

.card {
    width: 100%;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    padding-top: 45px;

    .title {
        padding: 10px 15px;
        border: 1px solid gray;
        border-radius: 10px;
        font-weight: 700;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;

    }
}

.card+.card {
    margin-top: 10px;
}
</style>