import request from '../request'
// // 全部省市区
// export function getchina_area(data) {
//     return request({
//         url:'/api/system/china_area',
//         method: 'get',
//         data
//     })
// }
// 获取列表
export function getbiaozhunku(data) {
	return request({
		url: `/api/cube/restful/interface/getModeDataPageList/biaozhunku?datajson=${data}`,
		method: 'POST',
		headers: {
			"content-type": "application/x-www-form-urlencoded"
		},
	})
}
export function getjpk(data) {
	return request({
		url: `/api/cube/restful/interface/getModeDataPageList/jpk?datajson=${data}`,
		method: 'POST',
		headers: {
			"content-type": "application/x-www-form-urlencoded"
		},
	})
}
export function getszxm(data) {
	return request({
		url: `/api/cube/restful/interface/getModeDataPageList/getProject?datajson=${data}`,
		method: 'POST',
		headers: {
			"content-type": "application/x-www-form-urlencoded"
		},
	})
}
export function getjpktotal(data) {
	return request({
		url: `/api/cube/restful/interface/getModeDataPageCount/jpkTotal?datajson=${data}`,
		method: 'POST',
		headers: {
			"content-type": "application/x-www-form-urlencoded"
		},
	})
}
export function getbzktotal(data) {
	return request({
		url: `/api/cube/restful/interface/getModeDataPageCount/bzkTotal?datajson=${data}`,
		method: 'POST',
		headers: {
			"content-type": "application/x-www-form-urlencoded"
		},
	})
}
// //时间限制
// export function getlimit_date(data) {
//     return request({
//         url:'/api/system/limit_date',
//         method: 'get',
//         data
//     })
// }





export let xmztlist= [
	{
		value:'0',
		lable:'拿地'
	},{
		value:'1',
		lable:'报批'
	},{
		value:'2',
		lable:'装修'
	},{
		value:'3',
		lable:'竣工'
	}
]