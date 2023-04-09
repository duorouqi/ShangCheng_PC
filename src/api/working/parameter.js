import request from '../request'
// 全部参数集合
export function getcollectionformat(data) {
    return request({
        url:'/api/params/collection/format',
        method: 'get',
        data
    })
}

// 参数管理列表
export function getparams(data) {
    return request({
        url:'/api/params',
        method: 'get',
		params: data
    })
}
// 参数管理删除
export function deleteparams(data) {
    return request({
        url:'/api/params/'+data,
        method: 'delete'
    })
}
// 参数更新
export function PUTparams(data) {
    return request({
        url:'/api/params/'+data.id,
        method: 'put',
		data
    })
}

// 参数管理详情
export function getparamsdetails(data) {
    return request({
        url:'/api/params/'+data,
        method: 'get'
    })
}
// 创建参数
export function postparams(data) {
    return request({
        url:'/api/params',
        method: 'post',
		data
    })
}