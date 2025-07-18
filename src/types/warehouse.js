// 仓库状态常量
export const WarehouseStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance'
}

// 仓库类型常量
export const WarehouseType = {
  MAIN: 'main',
  BRANCH: 'branch',
  TEMPORARY: 'temporary'
}

// 仓库状态选项（用于下拉选择）
export const WarehouseStatusOptions = [
  { value: WarehouseStatus.ACTIVE, label: '正常' },
  { value: WarehouseStatus.INACTIVE, label: '停用' },
  { value: WarehouseStatus.MAINTENANCE, label: '维护中' }
]

// 仓库类型选项（用于下拉选择）
export const WarehouseTypeOptions = [
  { value: WarehouseType.MAIN, label: '主仓库' },
  { value: WarehouseType.BRANCH, label: '分仓库' },
  { value: WarehouseType.TEMPORARY, label: '临时仓库' }
]

// 仓库数据验证规则
export const WarehouseValidationRules = {
  name: [
    { required: true, message: '请输入仓库名称' },
    { min: 2, max: 50, message: '仓库名称长度在 2 到 50 个字符' }
  ],
  address: [
    { required: true, message: '请输入仓库地址' },
    { min: 5, max: 200, message: '仓库地址长度在 5 到 200 个字符' }
  ],
  type: [
    { required: true, message: '请选择仓库类型' }
  ],
  status: [
    { required: true, message: '请选择仓库状态' }
  ],
  manager: [
    { required: false, message: '请输入仓库管理员' }
  ],
  phone: [
    { required: false, message: '请输入联系电话' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
  ],
  capacity: [
    { required: false, message: '请输入仓库容量' },
    { type: 'number', min: 1, message: '仓库容量必须大于0' }
  ]
}

// 默认仓库数据结构
export const DefaultWarehouse = {
  id: null,
  name: '',
  address: '',
  type: WarehouseType.BRANCH,
  status: WarehouseStatus.ACTIVE,
  manager: '',
  phone: '',
  capacity: null,
  description: '',
  createdAt: null,
  updatedAt: null
}

// 仓库搜索过滤器
export const WarehouseFilters = {
  all: { label: '全部', value: '' },
  active: { label: '正常', value: WarehouseStatus.ACTIVE },
  inactive: { label: '停用', value: WarehouseStatus.INACTIVE },
  maintenance: { label: '维护中', value: WarehouseStatus.MAINTENANCE }
}

// 工具函数
export const WarehouseUtils = {
  // 获取状态标签
  getStatusLabel(status) {
    const option = WarehouseStatusOptions.find(opt => opt.value === status)
    return option ? option.label : '未知'
  },
  
  // 获取类型标签
  getTypeLabel(type) {
    const option = WarehouseTypeOptions.find(opt => opt.value === type)
    return option ? option.label : '未知'
  },
  
  // 获取状态颜色
  getStatusColor(status) {
    const colors = {
      [WarehouseStatus.ACTIVE]: 'success',
      [WarehouseStatus.INACTIVE]: 'danger',
      [WarehouseStatus.MAINTENANCE]: 'warning'
    }
    return colors[status] || 'default'
  },
  
  // 验证仓库数据
  validateWarehouse(warehouse) {
    const errors = {}
    
    if (!warehouse.name || warehouse.name.trim().length < 2) {
      errors.name = '仓库名称至少需要2个字符'
    }
    
    if (!warehouse.address || warehouse.address.trim().length < 5) {
      errors.address = '仓库地址至少需要5个字符'
    }
    
    if (!warehouse.type || !Object.values(WarehouseType).includes(warehouse.type)) {
      errors.type = '请选择有效的仓库类型'
    }
    
    if (!warehouse.status || !Object.values(WarehouseStatus).includes(warehouse.status)) {
      errors.status = '请选择有效的仓库状态'
    }
    
    if (warehouse.phone && !/^1[3-9]\d{9}$/.test(warehouse.phone)) {
      errors.phone = '请输入正确的手机号码'
    }
    
    if (warehouse.capacity && (isNaN(warehouse.capacity) || warehouse.capacity <= 0)) {
      errors.capacity = '仓库容量必须是大于0的数字'
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}