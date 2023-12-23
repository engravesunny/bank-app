import request from "../request";

// 重置密码
export const resetPassword = (data: {
    password: string;
    /**
     * 类型 0为账户密码 1为支付密码
     */
    type: number;
}) => request.put('/bank/mobile/account/pwd/reset', data)

// 修改密码
export const changePassword = (data: {
    "type": number,
    "password": string,
    "oldPassword": string
}) => request.put('/bank/mobile/account/pwd/modify', data)

// 修改账户手机号
export const changePhoneNumber = (params: { phoneNumber: string | number; }) => request.other('put', '/bank/mobile/account/phone-number', undefined, params)

// 注册
export const signup = (data: {
    accountPWD: string;
    /**
     * 证件号码
     */
    documentsNumber: string;
    /**
     * I类银行卡id
     */
    firstBankcardId: string;
    /**
     * 支付密码
     */
    payPWD: string;
    /**
     * 手机号码
     */
    phoneNumber: string;
    username: string
}) => request.post('/bank/mobile/account/register', data)

// 账号密码登录
export const loginByAccount = (data: {
    documentsNumber?: null | string;
    /**
     * 密码
     */
    password?: null | string;
    /**
     * 手机号
     */
    phoneNumber?: null | string;
    /**
     * 短信验证码
     */
    smsCode?: null | string;
    /**
     * 登录方式  0为手机号短信码 1为手机号密码 2为证件号密码
     */
    type: number;
}) => request.post('/bank/mobile/account/login/up', data)

// 手机号登陆
export const loginByPhoneNumber = (data: {
    "type": 0,
    "phoneNumber": string,
    "smsCode": string
}) => request.post('/bank/mobile/account/login/sms', data)

// 退出登录
export const logout = () => request.get('/bank/mobile/account/logout')

// 注销账户
export const destroyAccount = (params: { phoneAccountId: number; }) => request.delete('/bank/mobile/account/destroy', params)
