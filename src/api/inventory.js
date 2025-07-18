// src/api/inventory.js
import request from '@/utils/request'

// 仓库管理
export const getWarehouseList = (params) => {
  return request({
    url: '/api/inventory/warehouse/index',
    method: 'get',
    params
  })
}

export const createWarehouse = (data) => {
  return request({
    url: '/api/inventory/warehouse/create',
    method: 'post',
    data
  })
}

export const updateWarehouse = (data) => {
  return request({
    url: '/api/inventory/warehouse/update',
    method: 'post',
    data
  })
}

export const deleteWarehouse = (id) => {
  return request({
    url: '/api/inventory/warehouse/delete',
    method: 'post',
    data: { id }
  })
}

// 货品管理
export const getProductList = (params) => {
  return request({
    url: '/api/inventory/product/index',
    method: 'get',
    params
  })
}

export const getProductDetail = (id) => {
  return request({
    url: '/api/inventory/product/detail',
    method: 'get',
    params: { id }
  })
}

export const createProduct = (data) => {
  return request({
    url: '/api/inventory/product/create',
    method: 'post',
    data
  })
}

export const getStockAlert = () => {
  return request({
    url: '/api/inventory/product/stockAlert',
    method: 'get'
  })
}

// 入库管理
export const getInboundList = (params) => {
  return request({
    url: '/api/inventory/inbound/index',
    method: 'get',
    params
  })
}

export const createInboundOrder = (data) => {
  return request({
    url: '/api/inventory/inbound/create',
    method: 'post',
    data
  })
}

export const confirmInbound = (id) => {
  return request({
    url: '/api/inventory/inbound/confirm',
    method: 'post',
    data: { id }
  })
}

// 货类管理
export const getCategoryList = (params) => {
  return request({
    url: '/api/inventory/category/index',
    method: 'get',
    params
  })
}