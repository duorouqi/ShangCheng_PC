import request from '../request'

// 全部字典集合
export function getcollectionformatList(data) {
    return request({
        url:'/api/dictionaries/collection/format',
        method: 'get',
        data
    })
}
// 字典管理列表
export function getdictionariesList(data) {
    return request({
        url:'/api/dictionaries',
        method: 'get',
		params: data
    })
}
// 字典管理删除
export function deletedictionariesdelete(data) {
    return request({
        url:'/api/dictionaries/'+data,
        method: 'delete'
    })
}
// 字典管理更新
export function PUTdictionaries(data) {
    return request({
        url:'/api/dictionaries/'+data.id,
        method: 'put',
		data
    })
}

// 字典管理详情
export function getdictionariesdetails(data) {
    return request({
        url:'/api/dictionaries/'+data,
        method: 'get'
    })
}
// 创建字典管理
export function postdictionaries(data) {
    return request({
        url:'/api/dictionaries',
        method: 'post',
		data
    })
}
//按字典类型查询
export function get_dictionaries(data) {
    return request({
        url:'/api/dictionaries/collection/get_dictionaries',
        method: 'get',
        data
    })
}