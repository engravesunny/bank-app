<template>
    <div class="account">
        <div class="user-info" v-if="token">
            <div class="avavtar">
                <SvgIcon name="avatar" width="120px" height="120px"></SvgIcon>
            </div>
            <div class="info">
                <div class="user">
                    {{ text_word }}
                    <div>{{ info.name }}</div>
                </div>
                <div class="time">
                    感谢使用，CUMT_BANK
                </div>
            </div>
        </div>
        <div class="user-info" v-else @click="handlePathTo('/login')">
            <div class="avavtar">
                <SvgIcon name="avatar" width="120px" height="120px"></SvgIcon>
            </div>
            <div class="info">
                <div class="user">
                    点击登录
                </div>
            </div>
        </div>
        <br>
        <van-grid class="grid" :column-num="4">
            <van-grid-item v-for="item in services" @click="handlePathTo(item.path)">
                <SvgIcon :name="item.title" width="45px" height="45px"></SvgIcon>
                <div class="text">{{ item.title }}</div>
            </van-grid-item>
        </van-grid>
        <div class="card">
            <div class="title">我的资产</div>
            <div class="content">
                <div class="zichan">
                    <div class="top">
                        资产
                        <SvgIcon v-if="moneyOpen" @click="handleOpen('资产')" name="睁眼" width="16px" height="16px"></SvgIcon>
                        <SvgIcon v-else @click="handleOpen('资产')" name="闭眼" width="16px" height="16px"></SvgIcon>
                    </div>
                    <div class="bottom">
                        {{ moneyOpen ? formatMoney(myMoney) : '******' }}
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="title">本月收支</div>
            <div class="content">
                <div class="zichan" style="width: 50%;">
                    <div class="top">
                        收入
                        <SvgIcon v-if="incomeOpen" @click="handleOpen('收入')" name="睁眼" width="16px" height="16px"></SvgIcon>
                        <SvgIcon v-else @click="handleOpen('收入')" name="闭眼" width="16px" height="16px"></SvgIcon>
                    </div>
                    <div class="bottom">
                        {{ incomeOpen ? formatMoney(income) : '******' }}
                    </div>
                </div>
                <div class="zichan" style="width: 50%;">
                    <div class="top">
                        支出
                        <SvgIcon v-if="outcomeOpen" @click="handleOpen('支出')" name="睁眼" width="16px" height="16px">
                        </SvgIcon>
                        <SvgIcon v-else @click="handleOpen('支出')" name="闭眼" width="16px" height="16px"></SvgIcon>
                    </div>
                    <div class="bottom">
                        {{ outcomeOpen ? formatMoney(outcome) : '******' }}
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="title">其他服务</div>
            <div class="content">暂无</div>
        </div>
        <br>
        <div v-if="token" class="btn" @click="handleClick">安全退出</div>
    </div>
</template>

<script setup lang="ts">
import { user } from '@/store/user'
import { storeToRefs } from 'pinia';
const { token, info } = storeToRefs(user());
const userStore = user()
import { logout } from '@/service/api/mobileBankAccount';
import { showToast } from 'vant';
import { formatMoney } from '@/utils';
const text_word = computed(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) {
        return '夜深了，晚安'
    } else if (hour >= 5 && hour < 8) {
        return '清晨，新的一天'
    } else if (hour >= 8 && hour < 12) {
        return '上午好'
    } else if (hour >= 12 && hour < 18) {
        return '下午好'
    } else if (hour >= 18 && hour < 23) {
        return '晚上好'
    }
    return '夜深了，晚安'
})

const services = [
    {
        title: '我的账户', path: '/account-detail'
    },
    {
        title: '个人信息', path: '/account-info'
    },
    {
        title: '安全中心', path: '/secuery-info'
    },
    {
        title: '更多设置', path: '/more-set'
    }
]

const router = useRouter()
const handlePathTo = (path: string) => {
    router.push({
        path
    })
}
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

const income = ref(0)
const outcome = ref(0)
const myMoney = ref(0)
const moneyOpen = ref(false)
const incomeOpen = ref(false)
const outcomeOpen = ref(false)
const handleOpen = (openitem: string) => {
    if (!token) {
        router.push('/sign-in')
    }
    if (openitem === '资产') {
        moneyOpen.value = !moneyOpen.value
    }
    if (openitem === '收入') {
        incomeOpen.value = !incomeOpen.value
    }
    if (openitem === '支出') {
        outcomeOpen.value = !outcomeOpen.value
    }
}



onMounted(() => {
    myMoney.value = Number(info.value.money) || 0
    income.value = Number(info.value.incomeMoney) || 0
    outcome.value = Number(info.value.outcomeMoney) || 0
})

</script>

<style lang="less" scoped>
:deep(.van-grid-item__content) {
    border-radius: 10px;
    background-color: transparent !important;
    border: none;

    &:active {
        background-color: rgba(255, 255, 255, .4) !important;
    }

    &::after {
        content: "";
        border: none;
    }
}

:deep(.van-hairline--top) {
    &::after {
        content: "";
        border: none;
    }
}

.account {
    padding: 20px;
}

.user-info {
    display: flex;

    .info {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;

        .user {
            font-size: 25px;
            font-weight: 700;
            text-align: center;
        }

        .time {
            font-size: 14px;
            text-align: center;
            font-weight: 700;
        }
    }
}

.card {
    display: flex;
    flex-direction: column;

    .title {
        font-size: 18px;
        font-weight: 700;
        padding: 10px;
    }

    .content {
        border-radius: 10px;
        padding: 20px;
        background-color: #fff;
        display: flex;
        justify-content: sapce-between;
    }
}

.zichan {
    display: flex;
    flex-direction: column;

    .top,
    .bottom {
        display: flex;
        align-items: center;
        gap: 5px;
        height: 30px;
        font-weight: 700;
    }
}

.btn {
    border-radius: 10px;
    background-color: #fff;
    padding: 10px 20px;
    text-align: center;

    &:active {
        background-color: rgba(255, 255, 255, .5);
    }
}
</style>