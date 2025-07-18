// src/api/warehouse.js
import request from '@/utils/request'

export const warehouseApi = {
  // 获取仓库列表
  getList(params) {
    return request({
      url: '/api/warehouse/list',
      method: 'get',
      params
    })
  },

  // 获取仓库详情
  getDetail(id) {
    return request({
      url: `/api/warehouse/${id}`,
      method: 'get'
    })
  },

  // 创建仓库
  create(data) {
    return request({
      url: '/api/warehouse',
      method: 'post',
      data
    })
  },

  // 更新仓库
  update(data) {
    return request({
      url: `/api/warehouse/${data.id}`,
      method: 'put',
      data
    })
  },

  // 删除仓库
  delete(id) {
    return request({
      url: `/api/warehouse/${id}`,
      method: 'delete'
    })
  },

  // 批量删除仓库
  batchDelete(ids) {
    return request({
      url: '/api/warehouse/batch-delete',
      method: 'post',
      data: { ids }
    })
  },

  // 导出仓库数据
  export(params) {
    return request({
      url: '/api/warehouse/export',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

// 仓库状态枚举
export const WarehouseStatus = {
  ACTIVE: 1,
  INACTIVE: 0
}

// 仓库状态文本映射
export const WarehouseStatusText = {
  [WarehouseStatus.ACTIVE]: '启用',
  [WarehouseStatus.INACTIVE]: '禁用'
}

export default warehouseApi