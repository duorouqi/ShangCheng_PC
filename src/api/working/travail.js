import request from '../request'
// 工时管理
export function getcollectionformat(data) {
    return request({
        url:'/api/task/collection/format',
        method: 'get',
        data
    })
}
// 工时集合
export function getpostcollectionformat(data) {
    return request({
        url:'/api/post/collection/format',
        method: 'get',
        data
    })
}

// 工时管理周列表
export function gettimesheet(data) {
    return request({
        url:'/api/timesheet',
        method: 'get',
		params: data
    })
}
// 工时管理删除
export function deletetimesheet(data) {
    return request({
        url:'/api/timesheet/'+data,
        method: 'delete'
    })
}
// 工时更新
export function PUTtimesheet(data) {
    return request({
        url:'/api/timesheet/'+data[0].id,
        method: 'put',
		data
    })
}

// 工时管理详情
export function gettimesheetdetails(data) {
    return request({
        url:'/api/timesheet/'+data,
        method: 'get'
    })
}
// 创建工时周
export function posttimesheet(data) {
    return request({
        url:'/api/timesheet',
        method: 'post',
		data
    })
}

// 登录人获取可选择的项目
export function getfilterproject(data) {
    return request({
        url:'/api/filter/project',
        method: 'get',
		data
    })
}
//登录人获取当前项目所有任务
export function getfiltertask(data) {
    return request({
        url:'/api/filter/task',
        method: 'get',
		params: data
    })
}

// 工时提交审核
export function PUTtimesheetcommit(data) {
    return request({
        url:'/api/timesheet/commit/'+data.id,
        method: 'put',
		data:{
			status:data.status
		}
    })
}
//工时右边日期一个个修改
export function PUTupdate_row(id,data) {
    return request({
        url:'/api/timesheet/update_row/'+id,
        method: 'put',
		data
    })
}
//全部项目
export function getprojectindex() {
    return request({
        url:'/api/project/index',
        method: 'get'
    })
}