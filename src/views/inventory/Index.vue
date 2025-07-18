<!-- src/views/inventory/Index.vue -->
<template>
  <div class="inventory-page">
    <van-nav-bar title="库存管理" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-icon name="bell-o" @click="showAlert" />
      </template>
    </van-nav-bar>
    
    <!-- 统计卡片 -->
    <div class="stats-cards">
      <div class="stats-card">
        <div class="stats-number">{{ stats.totalWarehouses }}</div>
        <div class="stats-label">仓库总数</div>
      </div>
      <div class="stats-card">
        <div class="stats-number">{{ stats.totalProducts }}</div>
        <div class="stats-label">货品总数</div>
      </div>
      <div class="stats-card warning">
        <div class="stats-number">{{ stats.alertProducts }}</div>
        <div class="stats-label">预警货品</div>
      </div>
    </div>
    
    <!-- 快捷操作 -->
    <div class="quick-actions">
      <div class="action-item" @click="$router.push('/inventory/inbound/create')">
        <van-icon name="plus" />
        <span>快速入库</span>
      </div>
      <div class="action-item" @click="$router.push('/inventory/outbound/create')">
        <van-icon name="minus" />
        <span>快速出库</span>
      </div>
      <div class="action-item" @click="showAlert">
        <van-icon name="warning-o" />
        <span>库存预警</span>
      </div>
    </div>
    
    <!-- 功能模块 -->
    <van-tabs v-model:active="activeTab" sticky>
      <van-tab title="仓库管理">
        <warehouse-list />
      </van-tab>
      <van-tab title="货品管理">
        <product-list />
      </van-tab>
      <van-tab title="入库管理">
        <inbound-list />
      </van-tab>
      <van-tab title="出库管理">
        <outbound-list />
      </van-tab>
    </van-tabs>
    
    <!-- 预警弹窗 -->
    <van-popup v-model:show="showAlertPopup" position="bottom" :style="{ height: '60%' }">
      <div class="alert-popup">
        <div class="alert-header">
          <h3>库存预警</h3>
          <van-icon name="cross" @click="showAlertPopup = false" />
        </div>
        <div class="alert-content">
          <div v-if="alertList.length === 0" class="no-alert">
            <van-icon name="smile-o" size="48" />
            <p>暂无预警信息</p>
          </div>
          <div v-else>
            <div v-for="item in alertList" :key="item.id" class="alert-item">
              <div class="alert-info">
                <div class="product-name">{{ item.name }}</div>
                <div class="warehouse-info">{{ item.warehouse_name }} | {{ item.category_name }}</div>
              </div>
              <div class="alert-status" :class="item.alert_type">
                <span>{{ item.alert_text }}</span>
                <div class="stock-count">{{ item.stock_quantity }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getStockAlert } from '@/api/inventory'
import WarehouseList from '@/components/inventory/WarehouseList.vue'
import ProductList from '@/components/inventory/ProductList.vue'
import InboundList from '@/components/inventory/InboundList.vue'
import OutboundList from '@/components/inventory/OutboundList.vue'

const activeTab = ref(0)
const showAlertPopup = ref(false)
const alertList = ref([])

const stats = ref({
  totalWarehouses: 0,
  totalProducts: 0,
  alertProducts: 0
})

const showAlert = async () => {
  try {
    const { data } = await getStockAlert()
    alertList.value = data
    showAlertPopup.value = true
  } catch (error) {
    console.error('获取预警信息失败:', error)
  }
}

onMounted(() => {
  // 获取统计数据
  loadStats()
})

const loadStats = async () => {
  // 这里可以调用统计接口
  stats.value = {
    totalWarehouses: 5,
    totalProducts: 120,
    alertProducts: 8
  }
}
</script>

<style scoped>
.inventory-page {
  background: #f5f5f5;
  min-height: 100vh;
}

.stats-cards {
  display: flex;
  padding: 16px;
  gap: 12px;
}

.stats-card {
  flex: 1;
  background: white;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stats-card.warning {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
}

.stats-number {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.stats-label {
  font-size: 12px;
  opacity: 0.8;
}

.quick-actions {
  display: flex;
  padding: 0 16px 16px;
  gap: 12px;
}

.action-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.action-item:active {
  transform: scale(0.95);
}

.action-item .van-icon {
  font-size: 24px;
  margin-bottom: 8px;
  color: #1890ff;
}

.action-item span {
  font-size: 12px;
  color: #666;
}

.alert-popup {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.alert-header h3 {
  margin: 0;
  font-size: 16px;
}

.alert-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.no-alert {
  text-align: center;
  padding: 40px 0;
  color: #999;
}

.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.alert-info {
  flex: 1;
}

.product-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.warehouse-info {
  font-size: 12px;
  color: #999;
}

.alert-status {
  text-align: center;
  min-width: 60px;
}

.alert-status.danger {
  color: #ff4757;
}

.alert-status.warning {
  color: #ffa502;
}

.stock-count {
  font-size: 18px;
  font-weight: bold;
  margin-top: 4px;
}
</style>