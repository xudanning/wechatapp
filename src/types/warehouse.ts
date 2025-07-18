// src/types/warehouse.ts
export interface Warehouse {
  id: number
  name: string
  address: string
  contact_person: string
  phone: string
  status: number
  created_at: string
  updated_at: string
}

export interface WarehouseListParams {
  page: number
  page_size: number
  search?: string
  status?: number
}

export interface WarehouseListResponse {
  code: number
  message: string
  data: {
    data: Warehouse[]
    pagination: {
      total: number
      page: number
      page_size: number
      total_pages: number
    }
  }
}

export interface WarehouseFormData {
  id?: number
  name: string
  address: string
  contact_person: string
  phone: string
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
}

// 表单验证规则
export const warehouseValidationRules = {
  name: [
    { required: true, message: '请输入仓库名称' },
    { min: 2, max: 50, message: '仓库名称长度为2-50个字符' }
  ],
  address: [
    { required: true, message: '请输入详细地址' },
    { min: 5, max: 200, message: '地址长度为5-200个字符' }
  ],
  contact_person: [
    { required: true, message: '请输入联系人' },
    { min: 2, max: 20, message: '联系人姓名长度为2-20个字符' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
  ]
}

export default {
  Warehouse,
  WarehouseListParams,
  WarehouseListResponse,
  WarehouseFormData,
  ApiResponse,
  warehouseValidationRules
}