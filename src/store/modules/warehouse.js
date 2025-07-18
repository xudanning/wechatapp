// src/store/modules/warehouse.js
import { warehouseApi } from '@/api/warehouse'

const state = {
  warehouseList: [],
  currentWarehouse: null,
  loading: false,
  pagination: {
    total: 0,
    page: 1,
    pageSize: 10
  },
  searchParams: {
    keyword: '',
    status: null
  }
}

const mutations = {
  SET_WAREHOUSE_LIST(state, list) {
    state.warehouseList = list
  },
  
  ADD_WAREHOUSE_LIST(state, list) {
    state.warehouseList.push(...list)
  },
  
  SET_CURRENT_WAREHOUSE(state, warehouse) {
    state.currentWarehouse = warehouse
  },
  
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  
  SET_PAGINATION(state, pagination) {
    state.pagination = { ...state.pagination, ...pagination }
  },
  
  SET_SEARCH_PARAMS(state, params) {
    state.searchParams = { ...state.searchParams, ...params }
  },
  
  ADD_WAREHOUSE(state, warehouse) {
    state.warehouseList.unshift(warehouse)
    state.pagination.total += 1
  },
  
  UPDATE_WAREHOUSE(state, warehouse) {
    const index = state.warehouseList.findIndex(item => item.id === warehouse.id)
    if (index !== -1) {
      state.warehouseList.splice(index, 1, warehouse)
    }
  },
  
  DELETE_WAREHOUSE(state, id) {
    const index = state.warehouseList.findIndex(item => item.id === id)
    if (index !== -1) {
      state.warehouseList.splice(index, 1)
      state.pagination.total -= 1
    }
  }
}

const actions = {
  // 获取仓库列表
  async getWarehouseList({ commit, state }, { refresh = false } = {}) {
    try {
      commit('SET_LOADING', true)
      
      const params = {
        page: refresh ? 1 : state.pagination.page,
        page_size: state.pagination.pageSize,
        search: state.searchParams.keyword,
        status: state.searchParams.status
      }
      
      const response = await warehouseApi.getList(params)
      
      if (response.code === 200) {
        const { data, pagination } = response.data
        
        if (refresh) {
          commit('SET_WAREHOUSE_LIST', data)
        } else {
          commit('ADD_WAREHOUSE_LIST', data)
        }
        
        commit('SET_PAGINATION', pagination)
        return response
      } else {
        throw new Error(response.message || '获取仓库列表失败')
      }
    } catch (error) {
      console.error('获取仓库列表失败:', error)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // 获取仓库详情
  async getWarehouseDetail({ commit }, id) {
    try {
      const response = await warehouseApi.getDetail(id)
      
      if (response.code === 200) {
        commit('SET_CURRENT_WAREHOUSE', response.data)
        return response.data
      } else {
        throw new Error(response.message || '获取仓库详情失败')
      }
    } catch (error) {
      console.error('获取仓库详情失败:', error)
      throw error
    }
  },
  
  // 创建仓库
  async createWarehouse({ commit }, data) {
    try {
      const response = await warehouseApi.create(data)
      
      if (response.code === 200) {
        commit('ADD_WAREHOUSE', response.data)
        return response.data
      } else {
        throw new Error(response.message || '创建仓库失败')
      }
    } catch (error) {
      console.error('创建仓库失败:', error)
      throw error
    }
  },
  
  // 更新仓库
  async updateWarehouse({ commit }, data) {
    try {
      const response = await warehouseApi.update(data)
      
      if (response.code === 200) {
        commit('UPDATE_WAREHOUSE', response.data)
        return response.data
      } else {
        throw new Error(response.message || '更新仓库失败')
      }
    } catch (error) {
      console.error('更新仓库失败:', error)
      throw error
    }
  },
  
  // 删除仓库
  async deleteWarehouse({ commit }, id) {
    try {
      const response = await warehouseApi.delete(id)
      
      if (response.code === 200) {
        commit('DELETE_WAREHOUSE', id)
        return true
      } else {
        throw new Error(response.message || '删除仓库失败')
      }
    } catch (error) {
      console.error('删除仓库失败:', error)
      throw error
    }
  },
  
  // 设置搜索参数
  setSearchParams({ commit }, params) {
    commit('SET_SEARCH_PARAMS', params)
  },
  
  // 重置搜索参数
  resetSearchParams({ commit }) {
    commit('SET_SEARCH_PARAMS', {
      keyword: '',
      status: null
    })
  }
}

const getters = {
  warehouseList: state => state.warehouseList,
  currentWarehouse: state => state.currentWarehouse,
  loading: state => state.loading,
  pagination: state => state.pagination,
  searchParams: state => state.searchParams,
  
  // 根据状态筛选仓库
  warehousesByStatus: state => status => {
    if (status === null || status === undefined) {
      return state.warehouseList
    }
    return state.warehouseList.filter(item => item.status === status)
  },
  
  // 根据关键词搜索仓库
  warehousesByKeyword: state => keyword => {
    if (!keyword) {
      return state.warehouseList
    }
    return state.warehouseList.filter(item => 
      item.name.includes(keyword) || 
      item.address.includes(keyword) ||
      item.contact_person.includes(keyword)
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}