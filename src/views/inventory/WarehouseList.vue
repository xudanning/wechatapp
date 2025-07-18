<!-- src/components/inventory/WarehouseList.vue -->
<template>
    <div class="warehouse-list">
        <van-search 
            v-model="searchText"
            placeholder="搜索仓库"
            @search="onSearch"
            @clear="onSearch"
        />
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list 
                v-model:loading="loading"
                :finished="finished"
                @load="onLoad"
                :immediate-check="false"
            >
            <div v-for="item in list" :key="item.id" class="warehouse-item">
                <div class="warehouse-header">
                    <div class="warehouse-name">{{ item.name }}</div>
                    <div class="warehouse-actions">
                        <van-icon name="edit" @click="editWarehouse(item)" />
                        <van-icon name="delete-o" @click="deleteWarehouse(item)" />
                    </div>
                </div>
                <div class="warehouse-info">
                    <div class="info-item">
                        <van-icon name="location-o" />
                        <span>{{ item.address }}</span>
                    </div>
                    <div class="info-item">
                        <van-icon name="contact" />
                        <span>{{ item.contact_person }}</span>
                    </div>
                    <div class="info-item">
                        <van-icon name="phone-o" />
                        <span>{{ item.phone }}</span>
                    </div>
                </div>
            </div>
        
            <!-- 空状态 -->
            <van-empty v-if="!loading && list.length === 0" description="暂无仓库数据" />
            </van-list>
        </van-pull-refresh>
        
        <van-floating-bubble
            axis="xy"
            icon="plus"
            @click="showForm"
            :style="{ right: '20px', bottom: '80px' }"
        />
        
        <!-- 表单弹窗 -->
        <van-popup v-model:show="showFormPopup" position="bottom" :style="{ height: '70%' }">
            <div class="form-popup">
                <div class="form-header">
                    <h3>{{ formMode === 'create' ? '新增仓库' : '编辑仓库' }}</h3>
                    <van-icon name="cross" @click="showFormPopup = false" />
                </div>
                <div class="form-content">
                    <van-form @submit="onSubmit" ref="formRef">
                        <van-field
                            v-model="formData.name"
                            name="name"
                            label="仓库名称"
                            placeholder="请输入仓库名称"
                            :rules="[{ required: true, message: '请输入仓库名称' }]"
                        />
                        <van-field
                            v-model="formData.address"
                            name="address"
                            label="详细地址"
                            placeholder="请输入详细地址"
                            :rules="[{ required: true, message: '请输入详细地址' }]"
                        />
                        <van-field
                            v-model="formData.contact_person"
                            name="contact_person"
                            label="联系人"
                            placeholder="请输入联系人"
                            :rules="[{ required: true, message: '请输入联系人' }]"
                        />
                        <van-field
                            v-model="formData.phone"
                            name="phone"
                            label="手机号"
                            placeholder="请输入手机号"
                            :rules="[
                                { required: true, message: '请输入手机号' },
                                { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
                            ]"
                        />
                        <div class="form-actions">
                            <van-button 
                                round
                                block
                                type="primary"
                                native-type="submit"
                                :loading="submitting"
                            >
                                {{ formMode === 'create' ? '创建' : '更新' }}
                            </van-button>
                        </div>
                    </van-form>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
    import { ref, onMounted, nextTick } from 'vue'
    import { showToast, showConfirmDialog } from 'vant'
    import { warehouseApi } from '@/api/warehouse'

    // 响应式数据
    const searchText = ref('')
    const refreshing = ref(false)
    const loading = ref(false)
    const finished = ref(false)
    const list = ref([])
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(0)

    // 表单相关
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

    // 重置表单数据
    const resetFormData = () => {
        formData.value = {
            id: null,
            name: '',
            address: '',
            contact_person: '',
            phone: ''
        }
    }

    // 加载仓库列表
    const loadWarehouseList = async (isRefresh = false) => {
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
                // 判断是否已加载完所有数据
                if (list.value.length >= total.value) {
                    finished.value = true
                }
                currentPage.value++
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

    // 搜索处理
    const onSearch = () => {
        currentPage.value = 1
        finished.value = false
        loadWarehouseList(true)
    }

    // 下拉刷新
    const onRefresh = () => {
        loadWarehouseList(true)
    }

    // 上拉加载
    const onLoad = () => {
        if (!finished.value) {
            loadWarehouseList(false)
        }
    }

    // 显示表单
    const showForm = () => {
        formMode.value = 'create'
        resetFormData()
        showFormPopup.value = true
    }

    // 编辑仓库
    const editWarehouse = (item) => {
        formMode.value = 'edit'
        formData.value = { ...item }
        showFormPopup.value = true
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
                // 重新加载列表
                onRefresh()
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

    // 提交表单
    const onSubmit = async () => {
        try {
            submitting.value = true
            const isEdit = formMode.value === 'edit'
            const apiMethod = isEdit ? warehouseApi.update : warehouseApi.create
            const apiParams = isEdit ? { id: formData.value.id, ...formData.value } : formData.value
            
            const response = await apiMethod(apiParams)
    
            if (response.code === 200) {
                showToast(isEdit ? '更新成功' : '创建成功')
                showFormPopup.value = false
                resetFormData()
                onRefresh()
            } else {
                showToast(response.message || '操作失败')
            }
        } catch (error) {
            console.error('提交表单失败:', error)
            showToast('操作失败')
        } finally {
            submitting.value = false
        }
    }

    // 组件挂载时加载数据
    onMounted(() => {
        loadWarehouseList(true)
    })
</script>

<style scoped>
    .warehouse-list {
        padding-bottom: 60px;
    }
    .warehouse-item {
        background: #fff;
        margin: 8px 16px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .warehouse-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
    .warehouse-name {
        font-size: 16px;
        font-weight: 600;
        color: #333;
    }
    .warehouse-actions {
        display: flex;
        gap: 12px;
    }
    .warehouse-actions .van-icon {
        font-size: 18px;
        color: #666;
        cursor: pointer;
    }
    .warehouse-actions .van-icon:hover {
        color: #1989fa;
    }
    .warehouse-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .info-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #666;
    }
    .info-item .van-icon {
        font-size: 14px;
        color: #999;
    }
    .form-popup {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #eee;
    }
    .form-header h3 {
        margin: 0;
        font-size: 18px;
        color: #333;
    }
    .form-header .van-icon {
        font-size: 20px;
        color: #666;
        cursor: pointer;
    }
    .form-content {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
    }
    .form-actions {
        margin-top: 24px;
    }
    /* 搜索框样式 */
    .van-search {
        background: #f8f8f8;
        padding: 8px 16px;
    }
    /* 空状态样式 */
    .van-empty {
        padding: 40px 16px;
    }
    /* 浮动按钮样式 */
    .van-floating-bubble {
        background: #1989fa;
        color: #fff;
    }
    /* 表单字段样式 */
    .van-field {
        margin-bottom: 16px;
    }
    /* 加载更多样式 */
    .van-list__loading,
    .van-list__finished-text {
        padding: 16px;
        text-align: center;
        color: #969799;
        font-size: 14px;
    }
    /* 下拉刷新样式 */
    .van-pull-refresh__track {
        min-height: 100vh;
    }
    /* 移动端适配 */
    @media (max-width: 768px) {
        .warehouse-item {
            margin: 8px 12px;
            padding: 12px;
        }
        .warehouse-name {
            font-size: 15px;
        }
        .info-item {
            font-size: 13px;
        }
        .form-popup {
            padding: 0;
        }
    }
</style>