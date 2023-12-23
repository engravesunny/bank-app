import request from "../request";

export const report = (data: {/**
* 描述
*/
    description?: string;
    /**
    * 问题类别（0账户1转账2查询3便捷服务4其他）
    */
    questionType?: string;
    /**
    * 截图base64编码
    */
    snapshot?: string;
    /**
    * 类型（0反馈1建议）
    */
    type?: string;
}) => request.post('/bank/mobile/phone-feedback', data)