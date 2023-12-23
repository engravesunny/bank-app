import request from "../request";

// 设置别名
export const setAlias = (data: {
    accountId: string;
    /**
     * 别名
     */
    alias: string;
}) => request.put('/bank/mobile/ref/alias', data);

// 比较手机银行交易密码
export const comparePayPwd = (params: {
    bankcardId: number;
    /**
     * 手机交易密码
     */
    paypwd: string;
}) => request.other('put', '/bank/mobile/ref/compare', undefined, params)

// 切换已绑定默认账户
export const changeDefaultAccount = (data: {
    newBankcardId: number;
    /**
     * 旧绑定银行卡账户id
     */
    oldBankcardId: number;
}) => request.other('put', '/bank/mobile/ref/bind', undefined, data)

// 查询已绑定的银行卡账户id
export const getBankCardAccountId = () => request.get('/bank/mobile/ref');

// 查询我的总资产
export const getMyTotalMoney = () => request.get('/bank/mobile/ref/asset')
