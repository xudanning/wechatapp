<template>
  <div class="icon-button" :style="{ backgroundColor: bg }">
    <div class="icon">{{ icon }}</div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  icon: String,
  bg: String
})
</script>

<style scoped>
.icon-button {
  text-align: center;
  padding: 12px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
}
.icon {
  font-size: 24px;
}
.label {
  margin-top: 6px;
}
</style>
