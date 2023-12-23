<template>
    <div class="more-set">
        <van-cell-group :border="false" v-for="set in settings" :title="set.title">
            <van-cell v-for="item in set.list" :title="item.title" is-link />
        </van-cell-group>
    </div>
</template>

<script setup lang="ts">
const settings = [
    {
        title: '隐私管理',
        list: [
            {
                title: '系统管理权限',
                path: '/'
            },
            {
                title: '第三方授权管理',
                path: '/'
            }
        ]
    },
]
</script>

<style lang="less" scoped>
.more-set {
    padding: 20px;
}

:deep(.van-cell) {
    border-radius: 10px;
}

:deep(.van-cell-group) {
    border-radius: 10px;
}
</style>