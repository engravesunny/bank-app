export const formatId = (id: string) => {
    if (!id) return
    if (id.length > 10) {
        return id.slice(0, 5) + '****' + id.slice(-5)
    } else {
        return id
    }
}
export const days = ['-', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
export const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year + '-' + month + '-' + day
}
export const formatMoney = (money: any) => {
    let trueMoney = (money / 100).toString()
    if (trueMoney.includes('.')) {
        if (trueMoney.split('.')[1].length === 1) {
            return trueMoney + '0'
        } else {
            return trueMoney
        }
    } else {
        return trueMoney + '.' + '00'
    }

}
