<template>
  <div class="home-page">
    <div class="menu-grid">
      <div class="menu-item" @click="$router.push('/inventory')">
        <van-icon name="orders-o" />
        <span>库存管理</span>
      </div>
      <div class="menu-item" @click="$router.push('/service')">
        <van-icon name="service-o" />
        <span>售后管理</span>
      </div>
    </div>
  </div>
</template>