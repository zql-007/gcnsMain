<template>
  <div class="example-layout">
    <el-menu :default-active="$route.path" >
      <el-menu-item
        index="/example"
        @click="$router.push('/example')">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item
        index="/example-son#/example-son"
        @click="$router.push('/example-son#/example-son')">
        <i class="el-icon-document"></i>
        <span slot="title">子应用</span>
      </el-menu-item>
      <el-menu-item
        index="/example-son#/EquipDangerManage/factoryBoard3"
        @click="$router.push('/example-son#/EquipDangerManage/factoryBoard3')">
        <i class="el-icon-document"></i>
        <span slot="title">子应用1</span>
      </el-menu-item>
      <el-menu-item
        index="/example-son#/EquipDangerManage/historyDangerInformation"
        @click="$router.push('/example-son#/EquipDangerManage/historyDangerInformation')">
        <i class="el-icon-document"></i>
        <span slot="title">子应用2</span>
      </el-menu-item>
    </el-menu>
    <div class="body">
      <nuxt v-if="$route.path === '/example'"/>
      <div
        v-if="$route.path === '/example-son'"
        id="subapp-container"></div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.example-layout {
  height: 100vh;
  width: 100%;
  display: flex;

  .el-menu {
    width: 200px;
  }

  .body {
    width: calc(100% - 200px);

    #subapp-container {
      height: 100%;
      border: 1px red solid;
    }
  }
}
</style>
<script lang="ts">
</script>
