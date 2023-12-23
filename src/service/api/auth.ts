import request from "../request";

// 根据类型获取验证码
export const getCode = (params: {
    exp?: number;
    /**
     * 手机号
     */
    phoneNumber?: string;
    /**
     * 0为图形验证码，1为短信验证码
     */
    type: number;
}) => request.get('/bank/common/auth/vc', params)

// 验证码校验
export const authCode = (data: {
    "type": number;
    "phoneNumber"?: string;
    "smsCode"?: string;
    "uuid"?: string;
    "imgCode"?: string;
}) => request.post('/bank/common/auth/vc', data)
