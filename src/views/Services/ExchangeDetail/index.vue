<template>
    <div class="exchange-detail">
        <div class="card">
            <van-cell @click="showCards = !showCards" :title="formatId(curCards.card_id)"
                :label="curCards.card_cate + '(' + curCards.category + ')'" is-link />
        </div>
        <div style="padding: 8px;display: flex;justify-content: flex-end; font-size: 13px;font-weight: 700;color: #404040;">
            <div style="display: flex;align-items: center;" @click="handleShowFilter">
                <span>筛选</span>
                <SvgIcon name="筛选"></SvgIcon>
            </div>
        </div>
        <div class="detail">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="handleLoad">
                <div class="month-list" v-for="month in historyInfo">
                    <div class="month">{{ month.date }}</div>
                    <div class="day-container" v-for="day in month.monthList">
                        <div class="day">
                            <div class="top">{{ day.date }}</div>
                            <div class="bottom">{{ day.day }}</div>
                        </div>
                        <div class="day-list">
                            <div class="day-list-item" v-for="item in day.dayList">
                                <van-cell-group>
                                    <van-cell :title="item.title" :label="item.label">
                                        <template #value>
                                            <div class="top">{{ item.value }}</div>
                                            <span style="color: #000;">人民币元 </span><span style="color: rgb(43,130,102);">{{
                                                item.type === 'input' ? ' ' + item.money :
                                                '- ' +
                                                item.money }}</span>
                                        </template>
                                    </van-cell>
                                </van-cell-group>
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>

        </div>
        <van-calendar v-model:show="datePickerShow" :min-date="new Date(2023, 0, 1)" :max-date="new Date()" type="range"
            @confirm="onDateConfirm" />
        <van-popup style="font-size: 18px;font-weight: 700;" v-model:show="showFilterBoard" position="right"
            :style="{ width: '80%', height: '100%' }">
            <div class="cancel" @click="handleCloseFilter">取消</div>
            <div class="date" style="border-bottom: 1px solid gray;">
                <div class="title">交易日期</div>
                <div class="options">
                    <div class="option" :class="{ active: dateSelect === '近一周' }" @click="handleChangeDate('近一周')"><span
                            v-if="dateSelect === '近一周'"><van-icon name="success" /> {{ ' ' }}</span>近一周</div>
                    <div class="option" :class="{ active: dateSelect === '近一月' }" @click="handleChangeDate('近一月')"><span
                            v-if="dateSelect === '近一月'"><van-icon name="success" /> {{ ' ' }}</span>近一月</div>
                    <div class="option" :class="{ active: dateSelect === '近三月' }" @click="handleChangeDate('近三月')"><span
                            v-if="dateSelect === '近三月'"><van-icon name="success" /> {{ ' ' }}</span>近三月</div>
                </div>
                <div class="detail">
                    <div class="channel" @click="datePickerShow = true">
                        <div class="left">{{ startTime }}</div>
                        <span style="transform: scale(0.8); font-size: 12px;font-weight: normal;"> — </span>
                        <div class="right">{{ endTime }}</div>
                    </div>
                </div>
            </div>
            <div class="type" style="border-bottom: 1px solid gray;">
                <div class="title">币种</div>
                <div class="options">
                    <div class="option active">
                        <span><van-icon name="success" /> {{ ' ' }}</span>
                        <span>人民币元</span>
                    </div>
                </div>
            </div>
            <div class="inputOrOutput" style="border-bottom: 1px solid gray;">
                <div class="title">收支</div>
                <div class="options">
                    <div class="option" @click="handleSelectIe(2)" :class="{ active: inOrCome === 2 }"><van-icon
                            v-if="inOrCome === 2" name="success" />
                        {{ ' ' }}全部</div>
                    <div class="option" @click="handleSelectIe(0)" :class="{ active: inOrCome === 0 }"><van-icon
                            v-if="inOrCome === 0" name="success" />
                        {{ ' ' }}收入</div>
                    <div class="option" @click="handleSelectIe(1)" :class="{ active: inOrCome === 1 }"><van-icon
                            v-if="inOrCome === 1" name="success" />
                        {{ ' ' }}支出</div>
                </div>
            </div>
            <div class="money-channel" style="border-bottom: 1px solid gray;">
                <div class="title">金额区间</div>
                <div class="channel">
                    <div class="left">
                        <van-field v-model="min" style="font-size: 14px;" placeholder="最低" />
                    </div>
                    <span style="transform: scale(0.8); font-size: 12px;font-weight: normal;"> — </span>
                    <div class="right">
                        <van-field v-model="max" style="font-size: 14px;" placeholder="最高" />
                    </div>
                </div>
            </div>
            <div class="account-id" style="border-bottom: 1px solid gray;">
                <div class="title">对方账号</div>
                <van-field v-model="transfererId" style="font-size: 14px;" placeholder="请输入"></van-field>
            </div>
            <div class="btn">
                <div class="cancel" @click="handleCloseFilter">取消</div>
                <div class="confirm" @click="handleConfirmFilter">确认</div>
            </div>
        </van-popup>
        <van-popup v-model:show="showCards" round position="bottom">
            <div class="card-item" @click="handleSelect(card.card_id)" v-for="card in cardItems" :key="card.card_id">
                <van-cell :title="formatId(card.card_id)" :label="card.card_cate + '(' + card.category + ')'" is-link />
            </div>
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getAccountInfoById } from '@/service/api/bankAccount';
import { getBankCardAccountId } from '@/service/api/bankMobileRelation';
import { formatId, formatDate, days } from '@/utils'
import { getTransferDetail } from '@/service/api/transfer';
import { showToast } from 'vant';
import { user } from '@/store/user';
const userStore = user()
const showCards = ref(false)
const type = ['I类卡', 'II类卡', 'III类卡']
const realCard = ['非实体卡', '实体卡']
const cards = ref([])
const selectedCardId = ref()
const curCards = computed(() => {
    let curCard = cards.value.find((item: any) => item.defaultAccount === 0) as any
    if (selectedCardId.value) {
        curCard = cards.value.find((item: any) => item.number === selectedCardId.value) as any
    }
    return {
        card_id: curCard?.number,
        card_cate: curCard?.bankName + realCard[curCard?.medium],
        category: type[curCard?.type]
    }
})
const cardItems = computed(() => {
    return cards.value.map((curCard: any) => {
        return {
            card_id: curCard?.number,
            card_cate: curCard?.bankName + realCard[curCard?.medium],
            category: type[curCard?.type]
        }
    })
})

const dateSelect = ref('')
const showFilterBoard = ref(false)
const datePickerShow = ref(false)
const transfererId = ref('')

const handleShowFilter = () => {
    showFilterBoard.value = true
}
const handleCloseFilter = () => {
    showFilterBoard.value = false
}
const onDateConfirm = (value: any) => {
    dateSelect.value = ''
    datePickerShow.value = false
    const [start, end] = value
    startTime.value = formatDate(start)
    endTime.value = formatDate(end)
    console.log(startTime.value)
}
const loading = ref(false)
const finished = ref(false)
const historyInfo = ref<any[]>([])
const pn = ref(-1)
const ps = ref(10)
const startTime = ref('2004-1-1')
const endTime = ref(formatDate(new Date()))
const inOrCome = ref(2)
const max = ref<any>(99999999999)
const min = ref<any>(0)
const minValue = computed(() => {
    return min.value !== '' ? Number(min.value) : 0
})
const maxValue = computed(() => {
    return max.value !== '' ? Number(max.value) : 99999999999
})
const updateHistory = async () => {
    try {
        loading.value = true
        const data = await getTransferDetail({
            type: 1,
            cardNum: curCards.value.card_id,
            startTime: startTime.value,
            endTime: endTime.value,
            startPage: pn.value,
            pageNum: ps.value
        })
        if (data.currentPage >= data.totals) {
            finished.value = true
        }
        const channels = ['线下', '手机银行']
        const types = ['input', 'output']
        let records = (data.records as any[])
        console.log(records)
        if (inOrCome.value !== 2) {
            records = records.filter((item: any) => item.ie === inOrCome.value)
        }
        records = records.filter(item => item.money > minValue.value && item.money < maxValue.value)
        if (transfererId.value) {
            records = records.filter(item => item.transfereeNum === transfererId.value || item.transferorNum === transfererId.value)
        }
        records.forEach((item: any) => {
            let date = item.createTime.split('-')[0] + '月/' + item.createTime.split('-')[1]
            let monthIndex = historyInfo.value?.findIndex(item => item.date === date) as number
            let dayDate = (item.createTime.split('-')[2] as string).slice(0, 2)
            let day = days[new Date(item.createTime).getDay()]
            let title = channels[item.channel]
            let type = types[item.ie]
            let money = item.money
            let value = item.transfereeName === userStore.info.name ? item.transferorName + '转账给你' : '你转账给' + item.transfereeName
            let orderNum = item.orderNum
            let label = '备注：' + item.remark
            if (monthIndex > -1) {
                const dayIndex = historyInfo.value[monthIndex].monthList.findIndex((item: any) => item.date === dayDate)
                if (dayIndex > -1) {
                    historyInfo.value[monthIndex].monthList[dayIndex].dayList.push({
                        title,
                        value,
                        label,
                        money,
                        type,
                        orderNum
                    })
                } else {
                    historyInfo.value[monthIndex].monthList.push(
                        {
                            date: dayDate,
                            day,
                            dayList: [
                                {
                                    title,
                                    value,
                                    label,
                                    money,
                                    type,
                                    orderNum
                                }
                            ]
                        }
                    )
                }
            } else {
                historyInfo.value?.push({
                    date,
                    monthList: [
                        {
                            date: dayDate,
                            day,
                            dayList: [
                                {
                                    title,
                                    value,
                                    label,
                                    money,
                                    type,
                                    orderNum
                                }
                            ]
                        }
                    ]
                })
            }
        })
    } catch (error: any) {
        showToast(error.message)
    } finally {
        loading.value = false
    }
}
const handleLoad = () => {
    pn.value = pn.value + 1
    updateHistory()
}

const handleSelect = (id: string) => {
    selectedCardId.value = id
    showCards.value = false
    historyInfo.value = []
    updateHistory()
}

const handleChangeDate = (date: string) => {
    dateSelect.value = date
    endTime.value = formatDate(new Date())
    let [year, month, day] = formatDate(new Date()).split('-')
    if (date === '近一周') {
        startTime.value = year + '-' + month + '-' + (Number(day) - 7)
    } else if (date === '近一月') {
        startTime.value = year + '-' + (+month - 1) + '-' + day
    } else if (date === '近三月') {
        startTime.value = year + '-' + (+month - 3) + '-' + day
    }
}

const handleSelectIe = (type: number) => {
    inOrCome.value = type
}

const handleConfirmFilter = () => {
    historyInfo.value = []
    updateHistory()
    handleCloseFilter()
}

onBeforeMount(async () => {
    const data = await getBankCardAccountId() as number[]
    const info = await getAccountInfoById({ bankcardIds: data as any })
    cards.value = info
    await updateHistory()

})

</script>

<style lang="less" scoped>
.card,
.card-item {
    padding: 20px;

    :deep(.van-cell) {
        border-radius: 10px;
    }

    :deep(.van-cell-group) {
        border-radius: 10px;
    }
}

.note {
    display: flex;
    justify-content: space-between;
}

.detail {
    display: flex;
    flex-direction: column;

    :deep(.van-cell__value) {
        font-size: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;
    }

    :deep(.van-cell__title) {
        font-size: 18px;
        font-weight: 700;
    }

    .month-list {
        display: flex;
        flex-direction: column;

        .month {
            background-color: #fff;
            border-bottom: 1px solid gray;
            border-top: 1px solid gray;
            padding: 10px;
        }

        .day-container {
            display: flex;
            justify-content: space-between;

            .day {
                width: 50px;
                padding-top: 15px;
                display: flex;
                flex-direction: column;
                background-color: rgb(249, 249, 249);
                justify-content: flex-start;
                align-items: center;

                .top {
                    font-size: 20px;
                    font-weight: 700;
                    color: rgb(102, 102, 102);
                }

                .bottom {
                    font-size: 12px;
                    font-weight: 700;
                    color: rgb(102, 102, 102);

                }
            }

            .day-list {
                display: flex;
                flex-direction: column;
                flex: 1;
            }
        }
    }
}

:deep(.van-cell) {
    font-size: 20px;
    font-weight: 700;
}

.cancel {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    color: rgb(255, 45, 45);
    border-bottom: 1px solid gray;
}

.title {
    padding: 10px;
    font-size: 19px;
}

.options {
    display: flex;
    padding: 10px;
    gap: 10px;

    .option {
        border: 1px solid gray;
        padding: 5px 10px;
        border-radius: 5px;

        &:active {
            border-color: red;
        }

        &.active {
            color: red;
            border-color: red;
        }

    }
}

.channel {
    display: flex;
    align-items: center;
}

.date {
    .channel {
        border-top: 1px solid gray;
        display: flex;

        .left,
        .right {
            flex: 1;
            padding: 15px;
            color: rgb(107, 107, 107);
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

.btn {
    display: flex;
    justify-content: space-between;

    .cancel,
    .confirm {
        color: #333;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
    }

    .confirm {
        background-color: red;
        color: #fff;
    }
}
</style>