import request from "../request";

// 获取用户信息
export const getUserInfo = () => request.get('/bank/bank/user-info')

// 更新用户信息
export const updateUserInfo = (data: {
    address?: string;
    /**
     * 国家/地区
     */
    country?: string;
    /**
     * 民族
     */
    ethnicity?: string;
    /**
     * 家庭状况 不得超过200字
     */
    familyStatus?: string;
    /**
     * 婚姻状况 0未婚1已婚
     */
    maritalStatus?: string;
    /**
     * 工作单位/学校
     */
    organization?: string;
    /**
     * 个人照片 url 网络存储
     */
    personalPhoto?: string;
    /**
     * 职业
     */
    profession?: string;
    /**
     * 省/市/区
     */
    region?: string;
}) => request.put('/bank/bank/user-info', data)