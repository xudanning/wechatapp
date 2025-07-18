<template>
  <div class="product-list">
    <van-search v-model="searchText" placeholder="搜索货品" />
    
    <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        :label="`库存：${item.stock_quantity} | 品牌：${item.brand}`"
        :value="item.status === 1 ? '正常' : '停用'"
        @click="showDetail(item)"
      />
    </van-list>
    
    <van-floating-bubble
      axis="xy"
      icon="plus"
      @click="showForm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProductList } from '@/api/inventory'

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const searchText = ref('')

const onLoad = async () => {
  try {
    const { data } = await getProductList({
      page: Math.floor(list.value.length / 10) + 1,
      limit: 10,
      keyword: searchText.value
    })
    
    list.value.push(...data.list)
    loading.value = false
    
    if (data.list.length < 10) {
      finished.value = true
    }
  } catch (error) {
    loading.value = false
  }
}

const showDetail = (item) => {
  // 跳转到详情页
}

const showForm = () => {
  // 跳转到新增页
}

onMounted(() => {
  onLoad()
})
</script>