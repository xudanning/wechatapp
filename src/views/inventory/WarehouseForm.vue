<!-- src/pages/inventory/WarehouseForm.vue -->
<template>
  <div class="warehouse-form-page">
    <van-nav-bar 
      :title="isEdit ? '编辑仓库' : '新增仓库'" 
      left-arrow 
      @click-left="goBack"
    />
    
    <div class="form-container">
      <van-form @submit="onSubmit" ref="formRef">
        <van-cell-group>
          <van-field
            v-model="formData.name"
            name="name"
            label="仓库名称"
            placeholder="请输入仓库名称"
            :rules="validationRules.name"
            required
          />
          
          <van-field
            v-model="formData.address"
            name="address"
            label="详细地址"
            placeholder="请输入详细地址"
            :rules="validationRules.address"
            required
          />
          
          <van-field
            v-model="formData.contact_person"
            name="contact_person"
            label="联系人"
            placeholder="请输入联系人"
            :rules="validationRules.contact_person"
            required
          />
          
          <van-field
            v-model="formData.phone"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="validationRules.phone"
            required
          />
        </van-cell-group>
        
        <div class="form-actions">
          <van-button 
            round 
            block 
            type="primary" 
            native-type="submit"
            :loading="submitting"
          >
            {{ isEdit ? '更新' : '创建' }}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'
import { warehouseApi } from '@/api/warehouse'
import { warehouseValidationRules } from '@/types/warehouse'

const router = useRouter()
const route = useRoute()

// 表单相关
const formRef = ref(null)
const submitting = ref(false)
const formData = ref({
  id: null,
  name: '',
  address: '',
  contact_person: '',
  phone: ''
})

// 计算属性
const isEdit = computed(() => route.name === 'WarehouseEdit')
const validationRules = warehouseValidationRules

// 返回上一页
const goBack = () => {
  router.go(-1)
}

// 加载仓库详情
const loadWarehouseDetail = async (id) => {
  try {
    const response = await warehouseApi.getDetail(id)
    
    if (response.code === 200) {
      formData.value = response.data
    } else {
      showToast(response.message || '加载失败')
      goBack()
    }
  } catch (error) {
    console.error('加载仓库详情失败:', error)
    showToast('加载失败')
    goBack()
  }
}

// 提交表单
const onSubmit = async () => {
  try {
    submitting.value = true
    
    const apiMethod = isEdit.value ? warehouseApi.update : warehouseApi.create
    const apiParams = isEdit.value 
      ? { id: formData.value.id, ...formData.value }
      : formData.value
    
    const response = await apiMethod(apiParams)
    
    if (response.code === 200) {
      showToast(isEdit.value ? '更新成功' : '创建成功')
      router.push('/inventory/warehouse')
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

// 组件挂载
onMounted(() => {
  if (isEdit.value) {
    const id = route.params.id
    if (id) {
      loadWarehouseDetail(id)
    } else {
      showToast('参数错误')
      goBack()
    }
  }
})
</script>

<style scoped>
.warehouse-form-page {
  min-height: 100vh;
  background: #f8f8f8;
}

.form-container {
  padding: 16px;
}

.van-cell-group {
  margin-bottom: 24px;
}

.form-actions {
  margin-top: 24px;
}

.van-field {
  margin-bottom: 16px;
}
</style>