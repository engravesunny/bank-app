<template>
    <div class="report">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field autosize v-model="formData.description" name="反馈" type="textarea" label="反馈" placeholder="感谢反馈"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { report } from '@/service/api/report';
const formData = ref({
    "type": 0,
    "description": "",
    "snapshot": "",
    "questionType": 4
})

const router = useRouter()
const onSubmit = async () => {
    try {
        await report({
            ...formData.value as any
        })
        router.replace({
            path: '/result',
            query: {
                result: '反馈成功',
                status: 'success'
            }
        })
    } catch (error: any) {
        router.replace({
            path: '/result',
            query: {
                result: '反馈失败' + error.message,
                status: 'failed'
            }
        })
    }
}

</script>

<style lang="less" scoped></style>