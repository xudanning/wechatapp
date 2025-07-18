// 简化版 store，不使用 Vuex
import { reactive } from 'vue'

// 创建响应式状态
const state = reactive({
  // 仓库相关状态
  warehouses: [],
  currentWarehouse: null,
  warehouseLoading: false,
  
  // 用户相关状态
  userInfo: null,
  token: localStorage.getItem('token') || null,
  permissions: [],
  
  // 全局状态
  loading: false,
  theme: 'light'
})

// 仓库操作方法
const warehouseActions = {
  async fetchWarehouses() {
    state.warehouseLoading = true
    try {
      // 这里应该是你的 API 调用
      // const response = await api.getWarehouses()
      // state.warehouses = response.data
      
      // 临时模拟数据
      const mockData = [
        { id: 1, name: '主仓库', address: '北京市朝阳区', status: 'active', type: 'main' },
        { id: 2, name: '分仓库A', address: '上海市浦东新区', status: 'active', type: 'branch' }
      ]
      state.warehouses = mockData
    } catch (error) {
      console.error('获取仓库列表失败:', error)
    } finally {
      state.warehouseLoading = false
    }
  },
  
  async createWarehouse(warehouseData) {
    try {
      // 这里应该是你的 API 调用
      // const response = await api.createWarehouse(warehouseData)
      // const newWarehouse = response.data
      
      // 临时模拟
      const newWarehouse = {
        id: Date.now(),
        ...warehouseData,
        createdAt: new Date().toISOString()
      }
      state.warehouses.push(newWarehouse)
      return newWarehouse
    } catch (error) {
      console.error('创建仓库失败:', error)
      throw error
    }
  },
  
  async updateWarehouse(warehouseData) {
    try {
      // 这里应该是你的 API 调用
      // const response = await api.updateWarehouse(warehouseData)
      // const updatedWarehouse = response.data
      
      // 临时模拟
      const index = state.warehouses.findIndex(w => w.id === warehouseData.id)
      if (index !== -1) {
        state.warehouses.splice(index, 1, warehouseData)
      }
      return warehouseData
    } catch (error) {
      console.error('更新仓库失败:', error)
      throw error
    }
  },
  
  async deleteWarehouse(warehouseId) {
    try {
      // 这里应该是你的 API 调用
      // await api.deleteWarehouse(warehouseId)
      
      const index = state.warehouses.findIndex(w => w.id === warehouseId)
      if (index !== -1) {
        state.warehouses.splice(index, 1)
      }
    } catch (error) {
      console.error('删除仓库失败:', error)
      throw error
    }
  },
  
  setCurrentWarehouse(warehouse) {
    state.currentWarehouse = warehouse
  }
}

// 用户操作方法
const userActions = {
  async login(loginData) {
    try {
      // 这里应该是你的登录 API
      // const response = await api.login(loginData)
      // state.token = response.data.token
      // state.userInfo = response.data.user
      
      // 临时模拟
      const mockToken = 'mock-token-' + Date.now()
      const mockUser = {
        id: 1,
        username: loginData.username,
        name: '测试用户',
        avatar: ''
      }
      state.token = mockToken
      state.userInfo = mockUser
      localStorage.setItem('token', mockToken)
      return mockUser
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  },
  
  logout() {
    state.token = null
    state.userInfo = null
    state.permissions = []
    localStorage.removeItem('token')
  }
}

// 全局操作方法
const globalActions = {
  setLoading(loading) {
    state.loading = loading
  },
  
  setTheme(theme) {
    state.theme = theme
  }
}

// 计算属性（getters）
const getters = {
  // 仓库相关
  activeWarehouses: () => state.warehouses.filter(w => w.status === 'active'),
  warehouseById: (id) => state.warehouses.find(w => w.id === id),
  
  // 用户相关
  isLoggedIn: () => !!state.token,
  hasPermission: (permission) => state.permissions.includes(permission)
}

// 导出 store
export default {
  state,
  actions: {
    ...warehouseActions,
    ...userActions,
    ...globalActions
  },
  getters
}