<template>
  <img
    style="width: 100%;height: 100%"
    src="../assets/IMIP-welcome.png"
    alt="">
    <!-- <HomePage></HomePage> -->
</template>


<script>
import HomePage from '@/pages/system/org.vue'
export default {
  name: 'App',
  components: { HomePage }
}
</script>

<style scoped lang="less">
.circleStyle {
  border-radius: 80%;
  background-color: white;
  width: 500px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#app {
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
