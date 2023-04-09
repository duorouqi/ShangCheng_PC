import request from '@/api/request'
export function exportCouponStatistics (name, params) {
  return request({
    url: '/api/project/export_template',
    method: 'get',
    // responseType: 'blob',
    params: { params }
  })
}

const download = (data, fileName, type) => {
  if (!data) {
    return
  }
  const url = window.URL.createObjectURL(new Blob([data], {
    type: 'application/force-download'
  }))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName + `.${type || 'csv'}`)
  document.body.appendChild(link)
  link.click()
}
//导出
export function activityImportCompress (file) {
  var formdata = new FormData()
  formdata.append('obj', file.raw)
  return request({
    url: '/api/project/import_template',
    method: 'post',
    data: formdata,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
