import { RouteRecordRaw } from "vue-router"
import { user } from "@/store/user"
import pinia from '@/store'
import { getUserInfo } from "@/service/api/userInfo"
import { getMyTotalMoney } from "@/service/api/bankMobileRelation"
const userStore = user(pinia)

// TODO 这里不能用动态加载了
// Home
import Home from '@/views/Home/Home/index.vue'
import HomeLayout from '@/views/Home/Layout/index.vue'
import HomeService from '@/views/Home/Service/index.vue'
import HomeAccount from '@/views/Home/Account/index.vue'

// Set
import SetLayout from '@/views/Set/Layout/index.vue'
import AccoutnDetail from '@/views/Set/AccountDetail/index.vue'
import AccountInfo from '@/views/Set/AccountInfo/index.vue'
import MoreSet from '@/views/Set/MoreSet/index.vue'
import SecueryInfo from '@/views/Set/SecueryInfo/index.vue'

// Service
import ServiceLayout from '@/views/Services/Layout/index.vue'
import TransferMoney from '@/views/Services/TransferMoney/index.vue'
import QrcodeTransfer from '@/views/Services/QrcodeTransfer/index.vue'
import ExchangeDetail from '@/views/Services/ExchangeDetail/index.vue'
import OpenAccount from '@/views/Services/OpenAccount/index.vue'
import Report from '@/views/Services/Report/index.vue'

// Login
import LoginLayout from '@/views/Sign/Layout/index.vue'
import SignUp from '@/views/Sign/SignUp/index.vue'
import SignIn from '@/views/Sign/SignIn/index.vue'
import Auth from '@/views/Sign/Auth/index.vue'
import Card from '@/views/Sign/Card/index.vue'
import ChangeInfo from '@/views/Sign/changeInfo/index.vue'

// Result
import Result from '@/views/Result/index.vue'
import { getMonthCome } from "@/service/api/transfer"


export const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login-page',
        component: LoginLayout,
        redirect: '/sign-in',
        children: [
            {
                path: '/sign-in',
                name: 'sign-in',
                component: SignIn,
                meta: {
                    title: '登录'
                }
            },
            {
                path: '/sign-up',
                name: 'sign-up',
                component: SignUp,
                meta: {
                    title: '注册'
                }
            },
            {
                path: '/auth',
                name: 'auth',
                component: Auth,
                meta: {
                    title: '安全验证'
                }
            },
            {
                path: '/card',
                name: 'card',
                component: Card,
                meta: {
                    title: '银行卡信息填写'
                }
            },
            {
                path: '/change-info',
                name: 'change-info',
                component: ChangeInfo,
                meta: {
                    title: ""
                }
            }
        ]
    },
    {
        path: '/',
        name: 'home-page',
        component: HomeLayout,
        redirect: '/home',
        async beforeEnter() {
            if (userStore.token && !(Object.keys(userStore.userInfo.info).length > 2)) {
                const data = await getUserInfo()
                const money = await getMyTotalMoney()
                userStore.setUserInfo({ ...data, money })
            }
        },
        children: [
            {
                path: '/home',
                component: Home,
                name: 'Home',
                async beforeEnter() {
                    if (userStore.token && !(Object.keys(userStore.userInfo.info).length > 2)) {
                        const data = await getUserInfo()
                        const money = await getMyTotalMoney()
                        userStore.setUserInfo({ ...data, money })
                    }
                },
                meta: {
                    title: "掌上银行",
                }
            },
            {
                path: '/services',
                component: HomeService,
                name: 'services',
                async beforeEnter() {
                    if (userStore.token && !(Object.keys(userStore.userInfo.info).length > 2)) {
                        const data = await getUserInfo()
                        const money = await getMyTotalMoney()
                        userStore.setUserInfo({ ...data, money })
                    }
                },
                meta: {
                    title: "服务",
                }
            },
            {
                path: '/account',
                component: HomeAccount,
                name: 'account',
                async beforeEnter() {

                    if (userStore.token && !(Object.keys(userStore.userInfo.info).length > 2)) {
                        const data = await getUserInfo()
                        const money = await getMyTotalMoney()
                        userStore.setUserInfo({ ...data, money })
                    }
                    let incomeMoney = 0
                    let outcomeMoney = 0
                    if (!userStore.userInfo.info.incomeMoney) {
                        incomeMoney = await getMonthCome({ type: 0 })
                        outcomeMoney = await getMonthCome({ type: 1 })
                        userStore.setUserInfo({ ...userStore.userInfo.info, incomeMoney, outcomeMoney })
                    }

                },
                meta: {
                    title: "个人中心",
                }
            },

        ]
    },
    {
        path: '/set',
        name: 'set',
        redirect: '/secuery-info',
        component: SetLayout,
        children: [
            {
                path: '/secuery-info',
                component: SecueryInfo,
                name: 'secuery-info',
                meta: {
                    title: "安全信息",
                }
            },
            {
                path: '/account-info',
                component: AccountInfo,
                name: 'account-info',
                meta: {
                    title: '个人信息'
                }
            },
            {
                path: '/more-set',
                component: MoreSet,
                name: 'more-set',
                meta: {
                    title: "更多设置",
                }
            },
            {
                path: '/account-detail',
                component: AccoutnDetail,
                name: 'account-detail',
                meta: {
                    title: "我的账户  ",
                }
            }
        ]
    },
    {
        path: '/home-layout',
        component: ServiceLayout,
        name: 'home-layout',
        redirect: '/my-account-info',
        children: [
            {
                path: '/my-account-info',
                component: AccoutnDetail,
                name: 'my-account-info',
                meta: {
                    title: "我的账户",
                }
            },
            {
                path: '/tranfer-money',
                name: 'tranfer-money',
                component: TransferMoney,
                meta: {
                    title: "转账汇款",
                }
            },
            {
                path: '/qrcode-transfer',
                name: 'qrcode-transfer',
                component: QrcodeTransfer,
                meta: {
                    title: "二维码收付款",
                }
            },
            {
                // 交易明细
                path: '/transaction-detail',
                component: ExchangeDetail,
                name: 'transaction-detail',
                meta: {
                    title: "交易明细",
                }
            },
            {
                // 开通账户
                path: '/open-account',
                component: OpenAccount,
                name: 'open-account',
                meta: {
                    title: "开通账户",
                }
            },
            {
                // 开通账户
                path: '/report',
                component: Report,
                name: 'report',
                meta: {
                    title: "反馈",
                }
            },
        ]
    },
    {
        path: '/sweep',
        name: 'sweep',
        component: Home,
        meta: {
            title: "扫一扫",
        }
    },
    {
        path: '/system-service',
        name: 'system-service',
        component: Home,
        redirect: '/account-manage',
        children: [
            {
                path: '/account-manage',
                component: AccoutnDetail,
                name: 'account-manage',
                meta: {
                    title: "账户管理",
                }
            },
            {
                // 开通账户
                path: '/openaccount',
                component: Home,
                name: 'openaccount',
                meta: {
                    title: "开通账户",
                }
            },

            {
                // 转账记录
                path: '/transfer-record',
                component: Home,
                name: 'transfer-record',
                meta: {
                    title: "转账记录",
                }
            },
            {
                // 余额查询
                path: '/balance-query',
                component: Home,
                name: 'balance-query',
                meta: {
                    title: "余额查询",
                }
            }
        ]
    },
    {
        path: '/school-service',
        name: 'school-service',
        component: Home,
        redirect: '/school-manage',
        children: [
            {
                // 校园卡充值
                path: '/recharge-card',
                component: Home,
                name: 'recharge-card',
                meta: {
                    title: "校园卡充值",
                }
            },
            {
                // 校园卡余额
                path: '/card-balance',
                component: Home,
                name: 'card-balance',
                meta: {
                    title: "校园卡余额",
                }
            },
            {
                // 最近消费
                path: '/recent-consume',
                component: Home,
                name: 'recent-consume',
                meta: {
                    title: "最近消费",
                }
            }
        ]
    },
    {
        path: '/other-service',
        name: 'other-service',
        component: Home,
        redirect: '/',
        meta: {
            title: "其他服务",
        },
        children: [
            {
                // 话费充值
                path: '/phone-recharge',
                component: Home,
                name: 'phone-recharge',
                meta: {
                    title: "话费充值",
                }
            },
            {
                // 利息计算
                path: '/interest-calculation',
                component: Home,
                name: 'interest-calculation',
                meta: {
                    title: "利息计算",
                }
            },
        ]
    },
    {
        path: '/my-page',
        name: 'my-page',
        component: Home,
        redirect: '/',
        children: [
            {
                // 我的资产
                path: '/my-asset',
                component: Home,
                name: 'my-asset',
                meta: {
                    title: "我的资产",
                }
            },
            {
                // 本月收支
                path: '/monthly-revenue',
                component: Home,
                name: 'monthly-revenue',
                meta: {
                    title: "本月收支",
                }
            },
            {
                // 其他服务
                path: '/other-service',
                component: Home,
                name: 'other-service',
                meta: {
                    title: "其他服务",
                }
            }
        ]
    },
    {
        path: '/result',
        name: 'result',
        component: Result,
    }
]

