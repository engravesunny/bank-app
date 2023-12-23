<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset title="基本信息">
            <van-field v-model="infoFormdata.ethnicity" name="民族" label="民族" placeholder="民族"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="infoFormdata.familyStatus" name="家庭状况" label="家庭状况" placeholder="家庭状况"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field name="radio" label="婚姻状况" v-model="infoFormdata.maritalStatus">
                <template #input>
                    <van-radio-group v-model="infoFormdata.maritalStatus" direction="horizontal">
                        <van-radio name="1">已婚</van-radio>
                        <van-radio name="0">未婚</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
        </van-cell-group>
        <van-cell-group inset title="个人常住地址信息">
            <van-field v-model="infoFormdata.country" name="国家" label="国家" placeholder="国家" disabled
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="infoFormdata.region" is-link readonly name="area" label="地区选择" placeholder="点击选择省市区"
                @click="showArea = true" />
            <van-popup v-model:show="showArea" position="bottom">
                <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
            </van-popup>
            <van-field v-model="infoFormdata.address" name="详细地址" label="详细地址" placeholder="详细地址"
                :rules="[{ required: true, message: '请填写用户名' }]" />
        </van-cell-group>
        <van-cell-group inset title="工作信息">
            <van-field v-model="infoFormdata.organization" name="工作单位/学校" label="工作单位/学校" placeholder="工作单位/学校"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="infoFormdata.profession" name="职业" label="职业" placeholder="职业"
                :rules="[{ required: true, message: '请填写用户名' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import { updateUserInfo } from '@/service/api/userInfo';
import { areaList } from '@vant/area-data';
import { showToast } from 'vant';
import { user } from '@/store/user'
const userStore = user()

const props = defineProps<{
    info: any
}>()
const infoFormdata = ref<{
    address?: string;
    country?: string;
    ethnicity?: string;
    familyStatus?: string;
    maritalStatus?: string;
    organization?: string;
    personalPhoto?: string;
    profession?: string;
    region?: string;
}>({
    address: '',
    country: '',
    ethnicity: '',
    familyStatus: '',
    maritalStatus: '',
    organization: '',
    personalPhoto: '',
    profession: '',
    region: '',
})
const showArea = ref(false);
const onConfirm = ({ selectedOptions }: any) => {
    showArea.value = false;
    infoFormdata.value.region = selectedOptions.map((item: any) => item.text).join('');
};
const router = useRouter()
const onSubmit = () => {
    try {
        updateUserInfo({
            ...infoFormdata.value
        })
        userStore.setUserInfo({
            ...infoFormdata.value
        })
        router.push({
            path: '/result',
            query: {
                result: '个人信息修改成功',
                status: 'success'
            }
        })
    } catch (error: any) {
        showToast(error.message)
        router.push({
            path: '/result',
            query: {
                result: '个人信息修改失败',
                status: 'failed'
            }
        })
    }
}



onBeforeMount(() => {
    infoFormdata.value = { ...props.info }
})

</script>

<style lang="less" scoped></style>