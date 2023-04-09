import request from '../request'

// 项目管理列表
export function getprojectlist(data) {
    return request({
        url:'/api/project',
        method: 'get',
		params: data
    })
}
//项目岗位工时列表
export function getprojectman_hour(data) {
    return request({
        url:'/api/project/man_hour/'+data,
        method: 'get'
    })
}

//全部岗位集合
export function getcollectionformatlist(data) {
    return request({
        url:'/api/post/collection/format',
        method: 'get',
		params: data
    })
}

// 创建合同工时
export function posaddproject(data,id) {
    return request({
        url:'/api/project/store_man_hour/'+id,
        method: 'put',
		data
    })
}

// 项目管理列表
export function getprojectprogress(data,id) {
    return request({
        url:'api/project/progress/'+id,
        method: 'get',
		params: data
    })
}

// 项目进度新增
export function postprojectprogress(data) {
    return request({
        url:'/api/project/progress',
        method: 'post',
		data
    })
}

// 项目进度修改
export function putProjectProgress(data,progress_id) {
    return request({
        url:'api/project/progress/'+progress_id,
        method: 'put',
		data
    })
}

// 项目进度修改
export function deleteprogress(progress_id) {
    return request({
        url:'api/project/progress/'+progress_id,
        method: 'delete'
    })
}