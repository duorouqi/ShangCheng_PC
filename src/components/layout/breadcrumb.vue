<template>
  <el-breadcrumb class="breadcrumb" separator="/">
<!--    <el-breadcrumb-item :to="{ path: '/' }">设备管理</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">设备列表</a></el-breadcrumb-item> -->
  </el-breadcrumb>
</template>

<script setup>

const props = defineProps({
  navList: Array
})
</script>

<style scoped lang="less">
.breadcrumb{
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 24px;
  border-bottom: 1px solid #cccccc;
  background: #ffffff;
}
</style>
