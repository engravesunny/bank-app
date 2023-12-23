import request from "../request";

// 注销银行卡账户
export const destroyBankCardAccount = (params: { bankcardId: number; }) => request.delete('/bank/bank/bankcard', params)

// 修改账户状态
export const changeAccountStatus = (data: {
    accountId: number;
    /**
     * 状态类型 0开户1正常2挂失3冻结4注销5休眠
     */
    status: number;
}) => request.put('/bank/bank/bankcard/status', data)

// 开通银行卡账户
export const createBankCardAccount = (data: {
    bankcardId?: number;
    /**
     * 支付密码
     */
    password?: string;
    /**
     * 开户预留手机号
     */
    phoneNumber?: string;
    /**
     * 用途
     */
    purpose?: string;
    /**
     * 对应账户类型  1 II 类 2 III类
     */
    type?: number;
}) => request.post('/bank/bank/bankcard/create', data)

// 根据银行卡id查询完整卡号
export const getCardIdById = (params: { bankcardId: number; }) => request.get('/bank/bank/bankcard/number', params)

// 根据银行卡id集合查询账户信息
export const getAccountInfoById = (params: { bankcardIds: string[] }) => request.get('/bank/bank/bankcard/info', params)

// 根据手机号查询查询I类账户id
export const getICardIdByPhoneNumber = (params: { phoneNumber: string; }) => request.get('/bank/bank/bankcard/first', params)
