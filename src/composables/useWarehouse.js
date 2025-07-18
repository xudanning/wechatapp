// src/composables/useWarehouse.js
import { ref, computed } from 'vue'
import { showToast, showConfirmDialog } from 'vant'
import { warehouseApi } from '@/api/warehouse'

export function useWarehouse() {
  // 响应式状态
  const loading = ref(false)
  const refreshing = ref(false)
  const finished = ref(false)
  const list = ref([])
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const searchText = ref('')

  // 计算属性
  const hasMore = computed(() => list.value.length < total.value)
  const isEmpty = computed(() => !loading.value && list.value.length === 0)

  // 加载仓库列表
  const loadList = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        currentPage.value = 1
        finished.value = false
      }
      
      loading.value = true
      
      const params = {
        page: currentPage.value,
        page_size: pageSize.value,
        search: searchText.value
      }
      
      const response = await warehouseApi.getList(params)
      
      if (response.code === 200) {
        const { data, pagination } = response.data
        
        if (isRefresh) {
          list.value = data
        } else {
          list.value.push(...data)
        }
        
        total.value = pagination.total
        finished.value = list.value.length >= total.value
        
        if (!finished.value) {
          currentPage.value++
        }
      } else {
        showToast(response.message || '加载失败')
      }
    } catch (error) {
      console.error('加载仓库列表失败:', error)
      showToast('加载失败')
    } finally {
      loading.value = false
      refreshing.value = false
    }
  }

  // 搜索
  const search = (keyword) => {
    searchText.value = keyword
    loadList(true)
  }

  // 刷新
  const refresh = () => {
    refreshing.value = true
    loadList(true)
  }

  // 加载更多
  const loadMore = () => {
    if (!finished.value && !loading.value) {
      loadList(false)
    }
  }

  // 删除仓库
  const deleteWarehouse = async (item) => {
    try {
      await showConfirmDialog({
        title: '确认删除',
        message: `确定要删除仓库"${item.name}"吗？`,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonColor: '#ee0a24'
      })
      
      const response = await warehouseApi.delete(item.id)
      
      if (response.code === 200) {
        showToast('删除成功')
        refresh()
      } else {
        showToast(response.message || '删除失败')
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('删除仓库失败:', error)
        showToast('删除失败')
      }
    }
  }

  // 批量删除
  const batchDelete = async (ids) => {
    try {
      await showConfirmDialog({
        title: '确认删除',
        message: `确定要删除选中的 ${ids.length} 个仓库吗？`,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonColor: '#ee0a24'
      })
      
      const response = await warehouseApi.batchDelete(ids)
      
      if (response.code === 200) {
        showToast('删除成功')
        refresh()
      } else {
        showToast(response.message || '删除失败')
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('批量删除失败:', error)
        showToast('删除失败')
      }
    }
  }

  return {
    // 状态
    loading,
    refreshing,
    finished,
    list,
    currentPage,
    pageSize,
    total,
    searchText,
    
    // 计算属性
    hasMore,
    isEmpty,
    
    // 方法
    loadList,
    search,
    refresh,
    loadMore,
    deleteWarehouse,
    batchDelete
  }
}

// 仓库表单管理
export function useWarehouseForm() {
  const showFormPopup = ref(false)
  const formMode = ref('create') // create | edit
  const formRef = ref(null)
  const submitting = ref(false)
  const formData = ref({
    id: null,
    name: '',
    address: '',
    contact_person: '',
    phone: ''
  })

  // 重置表单
  const resetForm = () => {
    formData.value = {
      id: null,
      name: '',
      address: '',
      contact_person: '',
      phone: ''
    }
    formRef.value?.resetValidation()
  }

  // 显示新增表单
  const showCreateForm = () => {
    formMode.value = 'create'
    resetForm()
    showFormPopup.value = true
  }

  // 显示编辑表单
  const showEditForm = (item) => {
    formMode.value = 'edit'
    formData.value = { ...item }
    showFormPopup.value = true
  }

  // 关闭表单
  const closeForm = () => {
    showFormPopup.value = false
    resetForm()
  }

  // 提交表单
  const submitForm = async () => {
    try {
      submitting.value = true
      
      const isEdit = formMode.value === 'edit'
      const apiMethod = isEdit ? warehouseApi.update : warehouseApi.create
      const apiParams = isEdit 
        ? { id: formData.value.id, ...formData.value }
        : formData.value
      
      const response = await apiMethod(apiParams)
      
      if (response.code === 200) {
        showToast(isEdit ? '更新成功' : '创建成功')
        closeForm()
        return true
      } else {
        showToast(response.message || '操作失败')
        return false
      }
    } catch (error) {
      console.error('提交表单失败:', error)
      showToast('操作失败')
      return false
    } finally {
      submitting.value = false
    }
  }

  return {
    // 状态
    showFormPopup,
    formMode,
    formRef,
    submitting,
    formData,
    
    // 方法
    resetForm,
    showCreateForm,
    showEditForm,
    closeForm,
    submitForm
  }
}