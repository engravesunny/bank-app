import request from "../request";

// 完成转账订单
export const complete = (data: {
    orderId: number;
    /**
     * 状态 1成功结束 2异常结束
     */
    status: number;
}) => request.other('put', '/bank/bank/transfer/complete', undefined, data)

//创建转账订单
export const createTransferOrder = (data: {
    money: string;
    /**
     * 备注
     */
    remark?: null | string;
    /**
     * 收款人卡号
     */
    transfereeCardNum: string;
    /**
     * 收款人姓名
     */
    transfereeName: string;
    /**
     * 转账人卡号
     */
    transferorCardNum: string;
    /**
     * 转账人姓名
     */
    transferorName: string;
    /**
     * 类型（0行内转账1行外转账）
     */
    type: number;
}) => request.post('/bank/bank/transfer/create', data)

// 查询订单状态
export const checkOrderStatus = (data: { orderId: number; }) => request.get('/bank/bank/transfer/status', data)

// 获取支持的转账银行
export const getSupportBank = () => request.get('/bank/bank/transfer/bank')

// 获取交易明细
export const getTransferDetail = (data: {/**
* 电子回单卡号hash
*/
    cardNum?: string;
    /**
    * 结束时间
    */
    endTime?: string;
    /**
    * 查询条数
    */
    pageNum?: number;
    /**
    * 查询页码
    */
    startPage?: number;
    /**
    * 开始时间
    */
    startTime?: string;
    /**
    * 电子回单卡号截断部分
    */
    truncateCardNum?: string;
    /**
    * 收支类型 0全部 1收入 2支出 需要默认为0
    */
    type?: number;
}) => request.post('/bank/bank/history/details', data)

// 获取本月收支
export const getMonthCome = (params: { type: number }) => request.get('/bank/bank/history/ie', params)
