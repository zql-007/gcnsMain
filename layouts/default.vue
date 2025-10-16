<!--<template>
  <div
    style="height: 100vh; width: 100vw; overflow: hidden;">
    <transition name="loading-fade">
      <div
        v-if="loading"
        class="loading">
        <svg
          class="circular"
          viewBox="25 25 50 50">
          <circle
            class="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"/>
        </svg>
        <div class="loading-text">loading</div>
      </div>
    </transition>
    &lt;!&ndash;    <client-only>&ndash;&gt;
    <el-container
      v-if="!loading"
      direction="vertical"
      style="height: 100%; width: 100%;">
      <el-header>
        <el-row
          :gutter="20"
          :align="'center'">
          <el-col :span="9">
            <div
              v-show="sideShow"
              class="grid-content bg-purple company-info">
              <div class="logo">
                <img
                  v-if="!menuCollapse"
                  src="../assets/images/imipLogo.png"
                  alt="">
                <img
                  v-if="!menuCollapse"
                  src="../assets/images/logo-bei.png"
                  alt="">
                <img
                  v-if="menuCollapse"
                  style="height: 70%"
                  src="../assets/images/IMIP_h30PX.png"
                  alt="">
              </div>
              <div class="company"/>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <div class="search">
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <div
                v-if="showHeaderName"
                class="user-info">
                <el-avatar
                  icon="el-icon-user-solid"
                  style="vertical-align: middle; margin-right: 5px"/>
                <span style="margin-right: 5px;cursor: pointer">{{ userName }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container
        :style="'height:'+(parseInt(windowHeight) - 48)+'px'">
        <el-aside
          v-show="sideShow"
          width="auto"
          height="100%">
          <side-bar/>
        </el-aside>
        <el-container>
          <div
            :class="{'no-header': !showHeaderName}"
            class="main-wrapper">
            <page-tag-bar
              v-show="sideShow"
              class="fixed"/>
            <div class="main-content">
              <el-main class="page-component__scroll">
                <el-backtop
                  target=".page-component__scroll"></el-backtop>
                <nuxt
                  :keep-alive-props="{include:cacheList}"
                  class="nuxt-view"
                  keep-alive/>
              </el-main>
            </div>
          </div>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>-->

<script>
import SideBar from '@/layouts/component/SideBar'
import { post } from '@/lib/Util'
import { mapState } from 'vuex'
import PageTagBar from '@/layouts/component/PageTagBar'
import { filterUrl, getMenus } from '@/lib/Menu'
import { getDicInfo } from '@/lib/productDataApply/coldRollingProcess'
export default {
  head() {
    return {
      title: this.title
    }
  },
  components: { PageTagBar, SideBar },
  data() {
    return {
      showHeaderName: false,
      sideShow: true,
      windowHeight: '',
      headerInput: '',
      userName: this.$store.getters['user/getUserName'] || '',
      userNo: this.$store.getters['user/getUserNo'] || '',
      userInfo: this.$store.getters['user/getUserInfo'] || {},
      title: 'IMIP数据应用',
      loading: true
    }
  },
  computed: {
    ...mapState('menu', ['showHeader', 'pageOpenedList', 'menuCollapse']),
    cacheList: function() {
      return this.pageOpenedList.map(item => {
        return item.name
      })
    },
    activeMenu() {
      const route = this.$route
      const { fullPath } = route
      return filterUrl(fullPath)
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {},
      immediate: false
    }
  },
  beforeCreate() {},
  created() {
    if (Boolean(this.$route.fullPath.includes('GasStatusmainpage'))) {
      return (this.sideShow = false)
    } else {
      return (this.sideShow = true)
    }
  },
  mounted() {
    this.getDicInfoData()
    //页面初始化加载菜单资源
    getMenus(this.$store)

    let pageId = this.$store.getters['menu/getCurrentPageId']
    this.$store.commit('menu/SET_CURRENT_PAGE_ID', pageId)

    this.loading = false
    this.userNo = this.$store.getters['user/getUserNo']
    window.addEventListener('resize', this.handleWindowHeight)
    this.handleWindowHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowHeight)
  },
  methods: {
    //-----------数据字典
    async getDicInfoData() {
      const res = await post(getDicInfo, {
        codeList: [
          'lz-rawInvType',
          'lz-FGInvOccType',
          'lz-steel',
          'lg-steel',
          'lg-lfStaid',
          'lg-aodStaid',
          'rtsx-productionLine',
          'tx-rawInvType',
          'tx-FGInvOccType',
          'tx-appSurfaceDefect',
          'lg-cgType',
          'rz-rollFrameAll',
          'rz-rollFrame',
          'rz-defectType',
          'tx-rawMaterialType',
          'tx-finishGoodsType',
          'tx-efficiencyStatType'
        ]
      })
      if (res.success) {
        this.$store.commit('menu/setDataDictionary', res.data)
      }
    },
    handleWindowHeight() {
      this.windowHeight = document.documentElement.clientHeight
    }
  }
}
</script>
<style scoped lang="less">
/* 移除默认的内外边距 */
body,
html {
  margin: 0;
  padding: 0;
}
loading-fade-enter,
loading-fade-leave-active {
  opacity: 0;
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  text-align: center;
  padding: 15% 0;
  background: #fff;
  transition: opacity 0.5s ease-in-out;
  .loading-text {
    color: #13356f;
    font-size: 20px;
    margin-top: 10px;
  }
  .circular {
    height: 50px;
    width: 50px;
    -webkit-animation: loading-rotate 2s linear infinite;
    animation: loading-rotate 2s linear infinite;
  }
  .path {
    -webkit-animation: loading-dash 1.5s ease-in-out infinite;
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #13356f;
    stroke-linecap: round;
  }
  @-webkit-keyframes loading-rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes loading-rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
}
.home {
  width: 220px;
  margin: 0 auto;
  text-align: center;
  background-color: #93a9e1;
  height: 50px;
  line-height: 50px;
  border-radius: 4px;
  color: #ffffff;
  letter-spacing: 3px;
}
.el-menu {
  padding-right: 10px;
  .is-active {
    background-color: #43425f !important;
    border-radius: 5px;
  }
}
.el-header {
  height: 48px !important;
  padding-left: 0;
  line-height: 48px;
  background: #fff;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.04);
  .company-info {
    width: 370px;
    //text-align: center;

    .logo {
      height: 48px;
      width: auto;
      padding: 10px 110px 10px 0;
      img {
        width: auto;
        height: 100%;
      }
    }
  }

  .search {
    height: 36px;
    width: 250px;
  }

  .user-info {
    float: right;
    font-size: 14px;
    /deep/ .el-avatar {
      width: 32px;
      height: 32px;
      line-height: 32px;
    }
  }
}

.el-aside {
  background-color: #fff;
}
.el-main {
  background-color: #f4f4f5;
  height: 100%;
  //padding: 16px 24px 0;
}
/deep/ .el-badge__content.is-fixed {
  top: 22px;
}
.main-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  &.no-header {
    top: -32px;
    position: relative;
    height: calc(100% + 32px);
    /deep/ .tag-wrapper {
      &.tag-menu-collapse {
        margin-left: 196px;
      }
      .el-tabs__nav-prev,
      .el-tabs__nav-next,
      .close-tag-content {
        border: 1px solid #e4e7ed;
      }
      .el-tabs__nav-next {
        border-right: none;
      }
      .el-tabs__nav {
        border-top: 1px solid #e4e7ed;
      }
    }
  }
  .main-content {
    flex: 1;
    overflow: hidden;
    background: #f2f4f7;
    //margin-top: 30px;
  }
}
//导航栏滚动条样式
/deep/.menu-box::-webkit-scrollbar-thumb {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: #c1cbdb;
  width: 6px;
  height: 6px;
  background-clip: content-box;
}

/deep/.menu-box::-webkit-scrollbar {
  background: transparent;
  width: 6px;
  height: 6px;
}
/deep/.menu-box::-webkit-scrollbar-track {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: transparent;
}
/deep/.menu-box::-webkit-scrollbar-corner {
  background-color: transparent;
}
/deep/.el-aside {
  background-color: #13356f;
  color: #ffffff;
  transition: width ease-in-out 0.5s;
  .home {
    margin-bottom: 10px;
  }
}
.page-component__scroll {
  // 确保父元素有高度
  //height: 100vh;
  //overflow-y: auto;
  //overflow-x: hidden;
}
/*.fixed {
  position: fixed;
}*/
</style>
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
  overflow: hidden;
  display: flex;

  .el-menu {
    width: 200px;
  }

  .body {
    width: calc(100% - 200px);

    #subapp-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border: 1px red solid;
    }
  }
}
</style>
