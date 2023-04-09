import request from '../request'
// 全部任务集合
export function getcollectionformat(data) {
    return request({
        url:'/api/task/collection/format',
        method: 'get',
		params: data,
        data
    })
}
export function gettaskcollectionformat(data) {
    return request({
        url:'/api/task/collection/format',
        method: 'get',
		params: data,
        data
    })
}
// 全部岗位集合
export function getpostcollectionformat(data) {
    return request({
        url:'/api/post/collection/format',
        method: 'get',
        data
    })
}

// 任务管理列表
export function gettask(data) {
    return request({
        url:'/api/task',
        method: 'get',
		params: data
    })
}
// 任务管理删除
export function deletetask(data) {
    return request({
        url:'/api/task/'+data,
        method: 'delete'
    })
}
// 任务更新
export function PUTtask(data) {
    return request({
        url:'/api/task/'+data.id,
        method: 'put',
		data
    })
}

// 任务管理详情
export function gettaskdetails(data) {
    return request({
        url:'/api/task/'+data,
        method: 'get'
    })
}
// 创建任务
export function posttask(data) {
    return request({
        url:'/api/task',
        method: 'post',
		data
    })
}