import request from "../request";

// 查询
export const getTransferManInfo = () => request.get('/bank/mobile/phone-payer')

// 修改
export const changeTransferManInfo = (data: {
    bankNum?: string;
    /**
     * 常用转账人id
     */
    id?: number;
    /**
     * 转账人名字
     */
    name?: string;
}) => request.put('/bank/mobile/phone-payer', data)

// 新增
export const addTransferManInfo = (data: {
    bankNum: string;
    /**
     * 转账人名字
     */
    name: string;
}) => request.post('/bank/mobile/phone-payer', data)

// 删除
export const delTransferManInfo = (params: { id: number; }) => request.delete('/bank/mobile/phone-payer', params)