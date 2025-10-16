<template>
  <client-only>
    <div class="side-wrapper">
      <div class="menu-box">
        <el-menu
          :collapse="menuCollapse"
          :default-active="currentPageId"
          :unique-opened="true"
          class="el-menu-demo"
          background-color="#153617"
          text-color="#f1f1f1"
          active-text-color="#fff"
          @open="handleOpenNav"
          @select="handleChangeNav"
          @close="handleCloseNav">
          <menu-item
            v-for="item in userMenuList"
            :key="item.id"
            :menu="item"/>
        </el-menu>
      </div>
      <div
        :title="menuCollapse ? '展开' : '收起'"
        class="collapse-btn"
        @click="handleCollapse">
        <i :class="menuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"/>
      </div>
    </div>
  </client-only>
</template>

<script>
import menuItem from '@/layouts/component/MenuItem'
import { mapState } from 'vuex'
import { filterUrl } from '@/lib/Menu'

export default {
  components: {
    menuItem
  },
  data: () => {
    return {
      isCollapse: true,
      menuList: [],
      userMenuList: [
        {
          code: 'RES_296539866827722752_002-001',
          deskIcon: '48d67c3e-f3f6-487e-94b1-679a78b43463',
          deskUrl: '生产业务_1742881868568.svg',
          icon: 'a595f252-9f81-4d24-a47b-d14e90499181',
          iconUrl: '生产业务_面性_1742888500108.svg',
          id: '5b05b9e8-16b4-475b-82da-f29f3b4e4a41',
          ip: '10.1.11.181',
          isShow: 1,
          name: '设备运维信息管理',
          parentCode: 'RES_293213021419999232_002',
          parentId: 'ee05a912-0c99-4575-8dd2-6cc7912a7a32',
          port: '9731',
          serviceName: 'report-service',
          sort: 1,
          status: 1,
          type: 'menu',
          url: '/',
          routes: '设备运维信息管理',
          disabled: false,
          children: [
            {
              code: 'RES_323993351550537728_002-001-006',
              deskIcon: '05590487-6aca-453d-a982-58857d1f4056',
              deskUrl: '镍铁工序_1742883295537.svg',
              icon: '893e5d07-db01-4890-b311-da577834d9dd',
              iconUrl: '镍铁工序_面性_1742890966366.svg',
              id: '84b47ca93d8d48ae94a1f3c97772511b',
              ip: '10.1.11.181',
              isShow: 1,
              name: '设备精度管理',
              parentCode: 'RES_296539866827722752_002-001',
              parentId: '5b05b9e8-16b4-475b-82da-f29f3b4e4a41',
              port: '9731',
              serviceName: 'report-service',
              sort: 1,
              status: 1,
              type: 'menu',
              url: '/',
              routes: '设备精度管理',
              disabled: false,
              children: [
                {
                  code: 'RES_346916212514623488_002-002-001',
                  deskIcon: '0033fbf3-8061-4140-8cd1-fd1927ece440',
                  deskUrl: '任务监测_1742884951776.svg',
                  icon: '004e110e-8654-4a72-858d-032c56aaa0f3',
                  iconUrl: 'Presto自助查询页面_面性_1742891386522.svg',
                  id: '178f757bd4f14b0e9fb1682b32ca01d6',
                  ip: '10.1.11.181',
                  isShow: 1,
                  name: '精度看板',
                  parentCode: 'RES_346915619406483456_002-002',
                  parentId: 'a0e87168ab57414b86075997945d0634',
                  port: '9731',
                  serviceName: 'report-service',
                  sort: 1,
                  status: 1,
                  type: 'menu',
                  url: '/EquipPrecisManage/divisionalBoard',
                  routes: '精度看板',
                  disabled: false
                },
                {
                  code: 'RES_347252093704343552_002-002-002',
                  deskIcon: '00d2d4a4-392a-435f-bb2a-3f3c6b70fe7c',
                  deskUrl: '菜单权限管理_1742882501305.svg',
                  icon: '00f285c6-83b2-44c3-8387-681af2baf131',
                  iconUrl: '消息推送_面性_1742891155090.svg',
                  id: 'df5fed1179f0417985f19a447b4a4c09',
                  ip: '10.1.11.181',
                  isShow: 1,
                  name: '标准维护',
                  parentCode: 'RES_346915619406483456_002-002',
                  parentId: 'a0e87168ab57414b86075997945d0634',
                  port: '9731',
                  serviceName: 'report-service',
                  sort: 2,
                  status: 1,
                  type: 'menu',
                  url: '/EquipPrecisManage/standard',
                  routes: '标准维护',
                  disabled: false
                },
                {
                  code: 'RES_347252093704343552_002-002-004',
                  deskIcon: '00d2d4a4-392a-435f-bb2a-3f3c6b70fe7c',
                  deskUrl: '菜单权限管理_1742882501305.svg',
                  icon: '00f285c6-83b2-44c3-8387-681af2baf131',
                  iconUrl: '消息推送_面性_1742891155090.svg',
                  id: 'df5fed1179f0417985f19a447b4a4c08',
                  ip: '10.1.11.181',
                  isShow: 1,
                  name: '数据录入',
                  parentCode: 'RES_346915619406483456_002-002',
                  parentId: 'a0e87168ab57414b86075997945d0634',
                  port: '9731',
                  serviceName: 'report-service',
                  sort: 2,
                  status: 1,
                  type: 'menu',
                  url: '/EquipPrecisManage/informat',
                  routes: '数据录入',
                  disabled: false
                },
                {
                  code: 'RES_347252093704343552_002-002-004',
                  deskIcon: '00d2d4a4-392a-435f-bb2a-3f3c6b70fe7c',
                  deskUrl: '菜单权限管理_1742882501305.svg',
                  icon: '00f285c6-83b2-44c3-8387-681af2baf131',
                  iconUrl: '消息推送_面性_1742891155090.svg',
                  id: 'df5fed1179f0417985f19a447b4a4c088',
                  ip: '10.1.11.181',
                  isShow: 1,
                  name: '漏项管理',
                  parentCode: 'RES_346915619406483456_002-002',
                  parentId: 'a0e87168ab57414b86075997945d0634',
                  port: '9731',
                  serviceName: 'report-service',
                  sort: 2,
                  status: 1,
                  type: 'menu',
                  url: '/EquipPrecisManage/leak',
                  routes: '漏项管理',
                  disabled: false
                },
                {
                  code: 'RES_347252093704343552_002-002-004',
                  deskIcon: '00d2d4a4-392a-435f-bb2a-3f3c6b70fe7c',
                  deskUrl: '菜单权限管理_1742882501305.svg',
                  icon: '00f285c6-83b2-44c3-8387-681af2baf131',
                  iconUrl: '消息推送_面性_1742891155090.svg',
                  id: 'df5fed1179f0417985f19a447b4a4c089',
                  ip: '10.1.11.181',
                  isShow: 1,
                  name: '数据查询',
                  parentCode: 'RES_346915619406483456_002-002',
                  parentId: 'a0e87168ab57414b86075997945d0634',
                  port: '9731',
                  serviceName: 'report-service',
                  sort: 2,
                  status: 1,
                  type: 'menu',
                  url: '/EquipPrecisManage/dataQuery',
                  routes: '数据查询',
                  disabled: false
                },
                {
                  code: 'RES_347252093704343552_002-002-004',
                  deskIcon: '00d2d4a4-392a-435f-bb2a-3f3c6b70fe7c',
                  deskUrl: '菜单权限管理_1742882501305.svg',
                  icon: '00f285c6-83b2-44c3-8387-681af2baf131',
                  iconUrl: '消息推送_面性_1742891155090.svg',
                  id: 'df5fed1179f0417985f19a447b4a4c087',
                  ip: '10.1.11.181',
                  isShow: 1,
                  name: '我的打分',
                  parentCode: 'RES_346915619406483456_002-002',
                  parentId: 'a0e87168ab57414b86075997945d0634',
                  port: '9731',
                  serviceName: 'report-service',
                  sort: 2,
                  status: 1,
                  type: 'menu',
                  url: '/EquipPrecisManage/mark',
                  routes: '我的打分',
                  disabled: false
                }
              ]
            },
            {
              code: 'RES_323993351550537728_002-001-006',
              deskIcon: '05590487-6aca-453d-a982-58857d1f4056',
              deskUrl: '镍铁工序_1742883295537.svg',
              icon: '893e5d07-db01-4890-b311-da577834d9dd',
              iconUrl: '镍铁工序_面性_1742890966366.svg',
              id: '84b47ca93d8d48ae94a1f3c97772511b1',
              ip: '10.1.11.181',
              isShow: 1,
              name: '设备隐患管理',
              parentCode: 'RES_296539866827722752_002-001',
              parentId: '5b05b9e8-16b4-475b-82da-f29f3b4e4a41',
              port: '9731',
              serviceName: 'report-service',
              sort: 1,
              status: 1,
              type: 'menu',
              url: '/',
              routes: '设备隐患管理',
              disabled: false,
              children: [
                {
                  code: 'RES_346916212514623488_002-002-001',
                  deskIcon: '0033fbf3-8061-4140-8cd1-fd1927ece440',
                  deskUrl: '任务监测_1742884951776.svg',
                  icon: '004e110e-8654-4a72-858d-032c56aaa0f3',
                  iconUrl: 'Presto自助查询页面_面性_1742891386522.svg',
                  id: '178f757bd4f14b0e9fb1682b32ca01d61',
                  ip: '10.1.11.181',
                  isShow: 1,
                  name: '隐患看板',
                  parentCode: 'RES_346915619406483456_002-002',
                  parentId: 'a0e87168ab57414b86075997945d0634',
                  port: '9731',
                  serviceName: 'report-service',
                  sort: 1,
                  status: 1,
                  type: 'menu',
                  url: '/EquipDangerManage/factoryBoard3',
                  routes: '隐患看板',
                  disabled: false
                },
                {
                  code: 'RES_347252093704343552_002-002-002',
                  deskIcon: '00d2d4a4-392a-435f-bb2a-3f3c6b70fe7c',
                  deskUrl: '菜单权限管理_1742882501305.svg',
                  icon: '00f285c6-83b2-44c3-8387-681af2baf131',
                  iconUrl: '消息推送_面性_1742891155090.svg',
                  id: 'df5fed1179f0417985f19a447b4a4c092',
                  ip: '10.1.11.181',
                  isShow: 1,
                  name: '信息填报',
                  parentCode: 'RES_346915619406483456_002-002',
                  parentId: 'a0e87168ab57414b86075997945d0634',
                  port: '9731',
                  serviceName: 'report-service',
                  sort: 2,
                  status: 1,
                  type: 'menu',
                  url: '/EquipDangerManage/riskInformationFill',
                  routes: '信息填报',
                  disabled: false
                },
                {
                  code: 'RES_347252093704343552_002-002-004',
                  deskIcon: '00d2d4a4-392a-435f-bb2a-3f3c6b70fe7c',
                  deskUrl: '菜单权限管理_1742882501305.svg',
                  icon: '00f285c6-83b2-44c3-8387-681af2baf131',
                  iconUrl: '消息推送_面性_1742891155090.svg',
                  id: 'df5fed1179f0417985f19a447b4a4c083',
                  ip: '10.1.11.181',
                  isShow: 1,
                  name: '信息处理',
                  parentCode: 'RES_346915619406483456_002-002',
                  parentId: 'a0e87168ab57414b86075997945d0634',
                  port: '9731',
                  serviceName: 'report-service',
                  sort: 2,
                  status: 1,
                  type: 'menu',
                  url: '/EquipDangerManage/historyInformDeal',
                  routes: '信息处理',
                  disabled: false
                },
                {
                  code: 'RES_347252093704343552_002-002-004',
                  deskIcon: '00d2d4a4-392a-435f-bb2a-3f3c6b70fe7c',
                  deskUrl: '菜单权限管理_1742882501305.svg',
                  icon: '00f285c6-83b2-44c3-8387-681af2baf131',
                  iconUrl: '消息推送_面性_1742891155090.svg',
                  id: 'df5fed1179f0417985f19a447b4a4c0884',
                  ip: '10.1.11.181',
                  isShow: 1,
                  name: '历史信息',
                  parentCode: 'RES_346915619406483456_002-002',
                  parentId: 'a0e87168ab57414b86075997945d0634',
                  port: '9731',
                  serviceName: 'report-service',
                  sort: 2,
                  status: 1,
                  type: 'menu',
                  url: '/EquipDangerManage/historyDangerInformation',
                  routes: '历史信息',
                  disabled: false
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState('menu', [
      // 'userMenuList',
      'menuCollapse',
      // 'menuStore',
      'currentPageId',
      'currentPageName'
    ]),
    activeMenu() {
      const route = this.$route
      const { fullPath } = route
      return filterUrl(fullPath)
    }
    // userMenuList() {
    //   return this.menuStore ? this.menuStore[0].children : []
    // }
  },
  mounted() {
    console.log('侧边栏菜单缓存menuStore', this.menuStore)
    // console.log('活跃菜单id', this.currentPageId)
    // console.log('tab标签name', this.currentPageName)
    //修复：智慧桌面小部件跳转指定页面，侧边栏未对应高亮显示bug
    /* this.menuStore[0].children[0].children.forEach(item => {
      if (item.url === this.currentPageName) {
        this.$store.commit('menu/SET_CURRENT_PAGE_ID', item.id)
      }
    })*/
  },
  methods: {
    handleOpenNav(key, keyPath, e) {
      this.clickParentItem(key, keyPath)
    },
    handleCloseNav(key, keyPath, e) {
      this.clickParentItem(key, keyPath)
    },
    handleChangeNav(key, keyPath, e) {
      console.log('e', e)
      let url = null
      if (e.$attrs['data-url']) {
        url = '/example-son#' + e.$attrs['data-url']
      }

      this.$router.push(url)
      this.$store.commit('menu/SET_CURRENT_PAGE_ID', key)
    },
    handleCollapse() {
      this.$store.commit('menu/menuCollapse', !this.menuCollapse)
      // this.menuCollapse = !this.menuCollapse
    },
    clickParentItem(key, keyPath) {
      let list = this.menuList
      let url = ''
      keyPath.forEach(item => {
        const ml = list.find(menuItem => menuItem.id === item)
        if (ml) {
          list = ml.children
          url = ml.url
        }
      })
      if (url === '/') return
      this.$router.push(url)
    }
  }
}
</script>

<style scoped lang="less">
.home {
  width: 220px;
  margin: 0 auto 10px;
  text-align: center;
  background-color: #93a9e1;
  height: 50px;
  line-height: 50px;
  border-radius: 4px;
  color: #ffffff;
  letter-spacing: 3px;
  cursor: pointer;
  .el-icon-s-home {
    font-size: 20px;
  }
}
.el-menu {
  border-right: none;
  //padding-left: 10px;
  &:not(.el-menu--collapse) {
    width: 260px;
  }
  .el-menu-item {
    font-size: 16px;
    letter-spacing: 2px;
  }
}
/deep/ .el-menu-demo {
  > div > .el-menu-item {
    padding-left: 30px !important;
  }
  > div > .el-submenu > .el-submenu__title {
    padding-left: 30px !important;
  }
  > div > .el-submenu > .el-menu > div > .el-submenu > .el-submenu__title {
    padding-left: 40px !important;
  }
  > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-menu-item,
  > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-submenu__title {
    padding-left: 48px !important;
  }
  > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-menu-item {
    padding-left: 60px !important;
  }
  > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-submenu__title {
    padding-left: 60px !important;
  }
  > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-menu-item,
  > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-submenu__title {
    padding-left: 94px !important;
  }
  > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu
    > .el-menu
    > div
    img {
    display: none;
  }

  > div > .el-submenu > .el-menu > div > .el-submenu.is-opened > .el-menu,
  > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu.is-opened
    .el-menu
    .el-submenu__title,
  > div
    > .el-submenu
    > .el-menu
    > div
    > .el-submenu.is-opened
    .el-menu
    .el-menu-item {
    background-color: #153617 !important;
  }
  &.el-menu--collapse {
    > div > .el-menu-item {
      padding-left: 20px !important;
    }
    > div > .el-submenu > .el-submenu__title {
      padding-left: 16px !important;
    }
  }
}

/deep/.el-menu .el-menu-item {
  transition: border ease-in-out 0.3s;
  background: transparent !important;
  &:hover:before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 16px;
    right: 16px;
    border-radius: 8px;
    background-color: #36a03c;
    z-index: 1;
  }
  span {
    position: relative;
    z-index: 999;
  }
}

/deep/ .el-menu .el-menu-item.is-active {
  color: #f2f2f2;
  &:before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 16px;
    right: 16px;
    border-radius: 8px;
    background-color: #36a03c;
    z-index: 1;
  }
}
/deep/ .el-menu-item.is-active {
  background-color: transparent !important;
}
/deep/ .el-submenu__title {
}
/deep/ .el-menu--collapse .el-menu-item.is-active:before {
  display: none;
}
/deep/
  .el-menu--collapse
  .el-submenu
  .el-submenu__title
  .el-submenu__icon-arrow {
  display: none;
}
/deep/ .el-menu--collapse .el-menu-item span,
/deep/ .el-menu--collapse .el-submenu .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
/deep/ .el-menu--popup .el-submenu__title {
  background-color: transparent !important;
}
/deep/ .is-opened > .el-submenu__title span {
  position: relative;
}
/deep/ .is-opened > .el-submenu__title span:before {
  content: '';
  position: absolute;
  border-radius: 50%;
  background-color: #36a03c;
  width: 8px;
  height: 8px;
  left: -50px;
  top: 50%;
  margin-top: -4px;
}
.side-wrapper {
  height: 100%;
  position: relative;
  background: #153617;
  .collapse-btn {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 22px;
    padding-left: 20px;
    background: #153617;
    color: #fff;
    cursor: pointer;
  }
  .menu-box {
    height: calc(100% - 56px);
    overflow: auto;
  }
}
.menu-box {
  /*滚动条样式 chrome内核*/
  /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
  &::-webkit-scrollbar {
    width: 6px; /*对垂直流动条有效*/
    height: 6px; /*对水平流动条有效*/
  }
  /*定义滚动条的轨道颜色、内阴影及圆角*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }
  /*定义滑块颜色、内阴影及圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 7px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.15);
    background: #c1cbdb;
  }
  /*定义两端按钮的样式*/
  &::-webkit-scrollbar-button {
    display: none;
  }
  /*定义右下角汇合处的样式*/
  &::-webkit-scrollbar-corner {
    display: none;
  }
}
//---侧边栏收缩后宽度变为56px，且图标居中展示----
.side-wrapper {
  height: 100%;
  position: relative;
  background: #153617;
  .collapse-btn {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 22px;
    padding-left: 20px;
    background: #153617;
    color: #fff;
    cursor: pointer;
  }
  .menu-box {
    height: calc(100% - 56px);
    overflow: auto;
  }
}

.el-menu {
  border-right: none;
  //padding-left: 10px;
  &:not(.el-menu--collapse) {
    width: 260px;
  }
  .el-menu-item {
    font-size: 16px;
    letter-spacing: 2px;
  }

  // 新增样式：侧边栏收缩时的宽度和图标居中
  &.el-menu--collapse {
    width: 56px; // 收缩时侧边栏宽度变为56px

    .el-menu-item,
    .el-submenu > .el-submenu__title {
      display: flex !important; // 使用 flex 布局，增加 !important 提高优先级
      justify-content: center !important; // 水平居中，增加 !important 提高优先级
      align-items: center !important; // 垂直居中，增加 !important 提高优先级
    }

    .el-menu-item [class^='el-icon'],
    .el-submenu > .el-submenu__title [class^='el-icon'] {
      margin: 0 auto !important; // 图标水平居中，增加 !important 提高优先级
      display: block !important; // 确保图标作为块级元素，增加 !important 提高优先级
      text-align: center !important; // 文本居中，增加 !important 提高优先级
    }
  }
}
</style>
