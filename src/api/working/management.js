import request from '../request'
//审核管理
// 登录人可查看的下属
export function getusercollectionformat(data) {
    return request({
        url:'/api/user/collection/format',
        method: 'get',
        data
    })
}
// 登录人可查看的全部项目
export function getcollectionview(data) {
    return request({
        url:'/api/project/collection/view',
        method: 'get',
        data
    })
}

// 审核管理列表
export function getaudit(data) {
    return request({
        url:'/api/audit',
        method: 'get',
		params: data
    })
}

// 审核管理提交审核
export function PUTaudittimesheet(id,data) {
    return request({
        url:'/api/audit/timesheet/'+id,
        method: 'put',
		data
    })
}

// 批量审核
export function auditbatch(data) {
    return request({
        url:'/api/audit/batch',
        method: 'post',
        data
    })
}