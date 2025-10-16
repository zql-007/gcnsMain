<template>
  <div v-if="menu.isShow">
    <el-submenu
      v-if="menu.children && menu.children.length"
      :index="menu.id"
      popper-class="pop-sub"
    >
      <template slot="title">
        <IconPng
          :icon-name="menu.iconUrl"
          class="icon-svg" />
        <span slot="title"> {{ menu.name }} </span>
      </template>
      <menu-item
        v-for="item in menu.children"
        :show-icon="false"
        :key="item.id"
        :menu="item"/>
    </el-submenu>
    <el-menu-item
      v-else
      :index="menu.id"
      :key="menu.id"
      :data-params="menu.isExternalUrl"
      :data-ip="menu.ip"
      :data-name="menu.name"
      :data-path="menu.path"
      :data-port="menu.port"
      :data-url="menu.url"
    >
      <IconPng
        :icon-name="menu.iconUrl"
        class="icon-svg icon-child" />
      <span slot="title"> {{ menu.name }}</span>
    </el-menu-item>
  </div>

</template>

<script>
import IconPng from '@/components/IconPng'
export default {
  name: 'MenuItem',
  components: { IconPng },
  props: {
    menu: {
      type: Object,
      require: true,
      default: function() {
        return {}
      }
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="less">
.icon-svg {
  height: 32px;
  width: 32px;
  display: inline-block;
  vertical-align: middle;
  //margin-right: 6px;
}
.icon-child {
  position: relative;
  z-index: 999;
  height: 32px;
  width: 32px;
  //margin-right: 6px;
}
/deep/ .el-submenu .el-menu-item {
  height: 56px;
  line-height: 56px;
}
/deep/ .el-menu-item {
  transition: border ease-in-out 0.3s;
  background: transparent !important;
  &:hover:before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 0;
    right: 0;
    //border-radius: 8px;
    background-color: #36a03c;
    z-index: 1;
  }
  span {
    position: relative;
    z-index: 999;
  }
}
/deep/ .el-menu-item.is-active {
  color: #f2f2f2;
  &:before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 0;
    right: 0;
    //border-radius: 8px;
    background-color: #36a03c;
    z-index: 1;
  }
}
/deep/ .el-menu .el-menu-item.is-active {
  background: transparent !important;
}
/deep/ .el-submenu__title i {
  color: #fff;
  font-size: 16px;
  right: 30px;
}
//.icon-svg {
//  width: 1em;
//  height: 1em;
//  vertical-align: -0.15em;
//  fill: currentColor;
//  overflow: hidden;
//  user-select: none;
//}
//img {
//  opacity: 1;
//  transition: opacity ease-in 0.2s;
//}
//img[src=''] {
//  opacity: 0;
//}
</style>
