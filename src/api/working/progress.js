import request from '../request'

// 项目管理列表
export function getprojectprogress(data) {
    return request({
        url:'api/project/progress',
        method: 'get',
		params: data
    })
}