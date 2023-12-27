<template>
    <div class="account-detail">
        <div class="my-money">
            <div class="zichan">
                <div class="top">
                    资产
                    <SvgIcon v-if="open" @click="handleOpen" name="睁眼" width="16px" height="16px"></SvgIcon>
                    <SvgIcon v-if="!open" @click="handleOpen" name="闭眼" width="16px" height="16px"></SvgIcon>
                </div>
                <div class="bottom">
                    {{ open ? formatMoney(totalMoney) : '******' }}
                </div>
            </div>
        </div>
        <div class="my-account">
            <div style="display: flex;justify-content: space-between;align-items: center;">
                <span style="font-size: 25px; font-weight: 700;">借记账户</span>
                <SvgIcon name="刷新" width="30px" height="30px"></SvgIcon>
            </div>
            <div class="card" v-for="card in  cards ">
                <div class="top">
                    <div class="left">
                        <div class="bank-name">{{ card.bankName }}</div>
                        <div class="card-id">{{ formatId(card.number) }}</div>
                        <div class="options">
                            <div class="cate">{{ type[card.type as any] }}</div>
                            <div class="card-cate">{{ realCard[card.medium as any] }}</div>
                            <div v-if="card.alias" class="nickname">{{ card.alias }}</div>
                            <div v-else class="nickname" @click="handleSetnickname(card.id)">{{ '设置别名' }}</div>
                        </div>
                        <div class="rest-money"><span style="font-size: 16px; font-weight: normal;">可用余额： ￥</span>{{
                            formatMoney(card.balance) }}</div>
                    </div>
                    <div class="right">
                        <div class="btn" @click="handleSetDefault(card.defaultAccount === 0, card)">{{ card.defaultAccount
                            === 0 ? '默认账户' : '设为默认' }}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="left" @click="router.push('/transaction-detail')">明细查询</div>
                    <div class="right" @click="router.push('/tranfer-money')">{{ card.defaultAccount === 0 ? '转账汇款' : '转账汇款'
                    }}</div>
                    <div class="right" @click="handleDelete(card.id)" v-if="card.defaultAccount !== 0 && card.medium === 0">
                        销户
                    </div>
                </div>
            </div>
        </div>
        <van-dialog v-model:show="showDialog" title="输入别名" @confirm="confirmSetId" show-cancel-button>
            <van-field v-model="alias" label="别名" placeholder="请输入别名" /></van-dialog>
    </div>
</template>

<script setup lang="ts">
import { changeDefaultAccount, getBankCardAccountId, getMyTotalMoney, setAlias } from '@/service/api/bankMobileRelation'
import { destroyBankCardAccount, getAccountInfoById, getCardIdById } from '@/service/api/bankAccount'
import { formatMoney } from '@/utils';
const router = useRouter()
const cards = ref<{
    balance: string,
    bankName: string,
    createTime: string,
    id: string,
    medium: number,
    number: string,
    status: string,
    type: string,
    defaultAccount: number
    alias: string
}[]>([])
const totalMoney = ref<number>()
const type = ['I类卡', 'II类卡', 'III类卡']
const realCard = ['非实体卡', '实体卡']
const formatId = (id: string) => {
    if (id.length > 10) {
        return id.slice(0, 5) + '****' + id.slice(-5)
    } else {
        return id
    }
}

const defaultId = ref('')
const open = ref(false)
const handleOpen = () => {
    open.value = !open.value
}


const handleSetDefault = async (is: boolean, card: any) => {
    if (is) {
        return
    } else {
        await changeDefaultAccount({
            newBankcardId: Number(card.id),
            oldBankcardId: Number(defaultId.value)
        })
        cards.value = []
        await init()
    }
}

const init = async () => {
    const data = await getBankCardAccountId() as number[]
    await Promise.all(data.map(item => getCardIdById({ bankcardId: item })))
    const info = await getAccountInfoById({ bankcardIds: data as any })
    info.forEach((item: any) => {
        if (item.defaultAccount === 0) {
            defaultId.value = item.id
        }
    });
    cards.value = info
    const money = await getMyTotalMoney();
    totalMoney.value = Number(money) || 0
}

const alias = ref('')
const curId = ref('')
const showDialog = ref(false)
const handleSetnickname = async (id: string) => {
    curId.value = id
    showDialog.value = true
}
const confirmSetId = async () => {
    await setAlias({
        accountId: curId.value,
        alias: alias.value
    })
    await init()
}

const handleDelete = async (id: string) => {
    await destroyBankCardAccount({
        bankcardId: Number(id)
    })
    cards.value = []
    await init()
}


onMounted(async () => {
    init()
})


</script>

<style lang="less" scoped>
.account-detail {
    padding: 20px;
}

.my-money {
    padding: 10px 20px;
    background-color: #fff;
    margin-bottom: 20px;
}

.zichan {
    display: flex;
    flex-direction: column;

    .top,
    .bottom {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 20px;
        height: 30px;
        font-weight: 700;
    }
}

.card {
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    .top {
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            flex-direction: column;

            .bank-name {
                font-size: 18px;
                font-weight: 700;
                padding: 5px 0;
            }

            .card-id {
                font-size: 25px;
                font-weight: 700;
                padding: 10px 0;
            }

            .options {
                display: flex;
                gap: 5px;
                padding: 5px 0;
            }

            .rest-money {
                padding: 5px;
                font-size: 25px;
                font-weight: 700;
            }
        }

        .right {
            .btn {
                padding: 5px 10px;
                border-radius: 5px;
                border: 1px solid gray;

                &:active {
                    background-color: rgba(0, 0, 0, 0.1);
                }
            }
        }
    }

    .bottom {
        display: flex;
        justify-content: space-evenly;
        padding: 20px 0 5px;

        .left,
        .right {
            padding: 5px 15px;
            border: 1px solid gray;
            border-radius: 5px;

            &:active {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }
}
</style>