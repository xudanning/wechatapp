<!-- src/pages/inventory/WarehousePage.vue -->
<template>
  <div class="warehouse-page">
    <!-- 页面标题 -->
    <van-nav-bar title="仓库管理" left-arrow @click-left="$router.go(-1)" />

    <!-- 仓库列表组件 -->
    <warehouse-list />
  </div>
</template>

<script setup>
import WarehouseList from '@/components/inventory/WarehouseList.vue'
</script>

<style scoped>
.warehouse-page {
  height: 100vh;
  background: #f8f8f8;
}
</style>