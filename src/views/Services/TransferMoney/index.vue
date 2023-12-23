<template>
    <div class="transfer-money">
        <div v-if="orderId && !compared" class="payPwd">
            <van-form @submit="handleCompare">
                <van-cell-group inset>
                    <van-field v-model="payPwd" name="支付密码" label="支付密码" placeholder="支付密码"
                        :rules="[{ required: true, message: '请填写支付密码' }]" />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
        <template v-else>
            <div class="output-account">
                <div class="top">付款账户</div>
                <van-cell @click="showCards = !showCards" :title="formatId(curCards.card_id)"
                    :label="'可用余额： ￥' + curCards.balance" is-link />
            </div>
            <div v-if="showInputCard" class="input-account">
                <div class="top">收款账户</div>
                <van-cell :title="inputAccountForm.id" :label="inputAccountForm.name" is-link />
                <div class="top">转账金额</div>
                <van-cell :title="'￥' + inputAccountForm.money" is-link />
                <div class="btn"><van-button @click="handleCompleteOrder"
                        style="font-size: 18px;font-weight: 700;">确认转账</van-button></div>
            </div>
            <div v-else class="input-form">
                <div class="top">收款账户</div>
                <van-form @failed="onFailed" @submit="onSubmit">
                    <van-cell-group inset>
                        <van-field label="收款人名称" v-model="inputAccountForm.name" name="pattern" placeholder="请输入"
                            :rules="[{ validator, message: '请输入收款人名称' }]" />
                        <van-field label="收款账号" v-model="inputAccountForm.id" name="pattern" placeholder="请输入"
                            :rules="[{ validator, message: '请输入收款账号' }]" />
                        <van-field :rules="[{ validator, message: '请输入转账金额' }]" v-model="inputAccountForm.money" autosize
                            label="转账金额" placeholder="不超过50万" />
                        <van-field :maxlength="20" show-word-limit v-model="inputAccountForm.note" rows="1" autosize
                            label="附言" type="textarea" placeholder="可选，最多20字" />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            下一步
                        </van-button>
                    </div>
                </van-form>
            </div>
            <van-popup v-model:show="showCards" round position="bottom">
                <div class="output-account" @click="handleSelect(card.card_id)" v-for="card in cardItems"
                    :key="card.card_id">
                    <div style="padding: 20px;border-bottom: 1px solid gray;">
                        <van-cell :title="formatId(curCards.card_id)" :label="'可用余额： ￥' + curCards.balance" is-link />
                    </div>
                </div>
            </van-popup>
        </template>
    </div>
</template>

<script setup lang="ts">
import { getAccountInfoById } from '@/service/api/bankAccount';
import { getBankCardAccountId } from '@/service/api/bankMobileRelation';
import { formatId } from '@/utils';
import { user } from '@/store/user';
import { createTransferOrder, complete } from '@/service/api/transfer';
import { showToast } from 'vant';
import { comparePayPwd } from '@/service/api/bankMobileRelation';
const userStore = user()
const { userInfo } = userStore

const orderId = ref('')
const inputAccountForm = ref({
    type: 0,
    name: '',
    id: '',
    money: '',
    note: ''
})

const cards = ref([])
const selectedCardId = ref()
const curCards = computed(() => {
    let curCard = cards.value.find((item: any) => item.defaultAccount === 0) as any
    if (selectedCardId.value) {
        curCard = cards.value.find((item: any) => item.number === selectedCardId.value) as any
    }
    return {
        card_id: curCard?.number,
        balance: curCard?.balance,
        bankcardId: curCard?.id
    }
})
const cardItems = computed(() => {
    return cards.value.map((curCard: any) => {
        return {
            card_id: curCard?.number,
            balance: curCard?.balance,
            bankcardId: curCard?.id
        }
    })
})

const showPicker = ref(false);
const showInputCard = ref(false);

const validator = (value: any) => {
    return value !== ''
}

const onFailed = (errorInfo: any) => {
    console.log('failed', errorInfo);
};

const onConfirm = (value: any) => {
    console.log(value);
}
const onSubmit = async () => {
    try {
        const data = await createTransferOrder({
            money: inputAccountForm.value.money,
            remark: inputAccountForm.value.note,
            transfereeCardNum: inputAccountForm.value.id,
            transfereeName: inputAccountForm.value.name,
            transferorCardNum: curCards.value.card_id,
            transferorName: userInfo.info.name as string,
            type: 0
        })
        orderId.value = data
        showInputCard.value = true
    } catch (error: any) {
        showToast(error.message)
    }
}

const payPwd = ref('')
const compared = ref(false)

const router = useRouter()
const handleCompleteOrder = async () => {
    await complete({
        orderId: Number(orderId.value),
        status: 1
    })
    inputAccountForm.value = {
        type: 0,
        name: '',
        id: '',
        money: '',
        note: ''
    }
    router.replace({
        path: '/result',
        query: {
            result: '',
            status: '',
            isOrder: 'true',
            orderId: orderId.value
        }
    })
}

const handleCompare = async () => {
    try {
        const id = curCards.value.bankcardId
        await comparePayPwd({
            bankcardId: id,
            paypwd: payPwd.value,
        })
        compared.value = true
    } catch (error: any) {
        showToast(error.message)
        handleCompleteOrder()
    }
}
const showCards = ref(false)
const handleSelect = (id: string) => {
    selectedCardId.value = id
    showCards.value = false
}
onMounted(async () => {
    const data = await getBankCardAccountId() as number[]
    const info = await getAccountInfoById({ bankcardIds: data as any })
    cards.value = info
})

</script>

<style lang="less" scoped>
.transfer-money {
    padding: 20px;
}

:deep(.van-cell) {
    border-radius: 10px;
}

:deep(.van-cell-group) {
    border-radius: 10px;
}

.output-account,
.input-account {
    :deep(.van-cell) {
        font-size: 20px;
        font-weight: 700;
    }
}

:deep(.van-cell-group--inset) {
    margin: 0;
}

.top {
    padding: 10px 0 10px 10px;
    font-size: 18px;

}

.btn {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%);
    width: 100%;
    text-align: center;
}
</style>