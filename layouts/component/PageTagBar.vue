<template>
  <div
    class="tag-wrapper">
    <div class="tag-content">
      <el-tabs
        :value="activeName"
        type="card"
        @edit="handleTabsEdit"
        @tab-click="handleTabsClick">
        <el-tab-pane
          label="首页"
          name="index"
        />
        <template
          v-for="(item) in pageOpenedList">
          <el-tab-pane
            v-if="!!getName(item.path, item.fullPath)"
            :key="item.fullPath"
            :closable="!item.fixed"
            :label="getName(item.path, item.fullPath)"
            :name="item.fullPath"
          />
        </template>
      </el-tabs>
    </div>
    <div class="close-tag-content">
      <el-dropdown
        placement="bottom-start"
        @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down icon"/>
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="padding: 7px 0;">
          <el-dropdown-item
            command="closeOther"
            style="padding: 0 10px;">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { notKeepalivePage } from '~/lib/Menu'
import FeedBack from '@/layouts/feedback/FeedBack'
import Unhandle from '@/layouts/feedback/unhandle'

export default {
  name: 'PageTagBar',
  components: { FeedBack, Unhandle },
  data() {
    return {
      popVisible: false,
      timer: null
    }
  },
  computed: {
    ...mapState('menu', [
      'pageOpenedList',
      'allMenus',
      'currentPageName',
      'menuCollapse'
    ]),
    activeName: function() {
      return notKeepalivePage.includes(this.currentPageName)
        ? 'defaultPage'
        : this.currentPageName
    },
    openObj: function() {
      // 获取当前打开页面的责任人信息
      const match = this.allMenus.find(
        item => item.url === this.currentPageName
      )
      if (!match)
        return {
          user: '',
          dev: '',
          users: [],
          devs: []
        }
      const users = match.handleUser
        ? match.handleUser.split(',').map(item => item.split('|'))
        : ''
      const devs = match.handleDeveloper
        ? match.handleDeveloper.split(',').map(item => item.split('|'))
        : ''
      return {
        user: users.length ? users[0][1] : '',
        dev: devs.length ? devs[0][1] : '',
        users,
        devs
      }
    }
  },
  watch: {
    currentPageName: function() {
      this.popVisible = true
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.popVisible = false
      }, 2000)
    }
  },
  mounted() {
    // console.log('activeName', this.activeName)
  },

  methods: {
    getName(path, fullPath) {
      const match = this.allMenus.find(item => item.url.split('?')[0] === path)
      const matchFull = this.allMenus.find(item => item.url === fullPath)
      const menu = matchFull || match || null
      return menu ? menu.name : ''
    },
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        this.$store.commit('menu/removePageTag', targetName)
        let pageOpenedList = this.$store.state.menu.pageOpenedList
        // let pageOpenedList = this.pageOpenedList
        let lastPageObj = pageOpenedList.filter(
          item => !!this.getName(item.path, item.fullPath)
        )[0]
        if (this.currentPageName === targetName) {
          let len = pageOpenedList.length
          for (let i = 1; i < len; i++) {
            if (pageOpenedList[i].path === targetName) {
              if (i < len - 1) {
                lastPageObj = pageOpenedList[i + 1]
              } else {
                lastPageObj = pageOpenedList[i - 1]
              }
              break
            }
          }
        }
        if (this.currentPageName === targetName) {
          this.linkTo(lastPageObj)
        }
      }
    },
    linkTo(item) {
      //点击tab页侧边栏对应高亮显示
      const matchFull = this.allMenus.find(b => {
        if (b.url === item.path) {
          return b
        }
      })
      if (matchFull) {
        this.$store.commit('menu/SET_CURRENT_PAGE_ID', matchFull.id)
      }
      if (this.$route.path === item.fullPath) {
        return
      }
      let routerObj = {}
      routerObj.path = item.path
      if (item.params) {
        routerObj.params = item.params
      }
      if (item.query) {
        routerObj.query = item.query
      }
      this.$router.push(routerObj)
    },
    handleTabsClick(tab) {
      console.log(tab)
      if (tab.name == 'index') {
        this.$store.commit('menu/SET_CURRENT_PAGE_ID', '')
        this.$router.push('/')
        return
      }

      // tab点击
      const menu = this.pageOpenedList.find(item => {
        return item.fullPath === tab.name
      })
      this.linkTo(menu)
    },
    handleCommand(command) {
      if (command === 'closeOther') {
        this.$store.commit('menu/closeOtherPage')
      }
    }
  }
}
</script>

<style scoped lang="less">
.tag-wrapper {
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  .tag-content {
    flex: 1;
    width: calc(100% - 32px);
    overflow: hidden;
  }
  .close-tag-content {
    width: 32px;
    line-height: 32px;
    height: 32px;
    text-align: center;
    border-bottom: 1px solid #e4e7ed;
    border-left: 1px solid #e4e7ed;
    border-right: 1px solid #e4e7ed;
    /deep/.el-dropdown {
      color: #b0bfb1;
    }
    .el-dropdown-link:focus {
      outline: none;
      color: #b0bfb1;
    }
  }
  /deep/.feedback-btn {
    font-size: 14px;
    padding: 3px 5px;
    margin-left: 5px;
    border: 1px solid #e4e7ed;
    cursor: pointer;
    user-select: none;
    transition: all 0.5s;
    &:hover {
      color: #b0bfb1;
      border-color: #b0bfb1;
    }
  }
  .tag-duty {
    height: 100%;
    padding: 3px 5px;
    font-weight: bold;
    font-size: 14px;
    line-height: 22px;
    color: #606266;
    border-bottom: 1px solid #e4e7ed;
    .label {
      padding: 4px 5px;
      height: 26px;
      display: inline-block;
      vertical-align: middle;
      line-height: 16px;
      border: 1px solid #ebeef5;
      color: #909399;
      background: #fafafa;
    }
    .name {
      vertical-align: middle;
      height: 26px;
      padding: 4px 5px;
      line-height: 16px;
      display: inline-block;
      border: 1px solid #ebeef5;
      border-left: none;
    }
  }
  .duty-type {
    font-size: 16px;
    color: #5e5d5e;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .duty-item {
    line-height: 24px;
    padding: 5px 10px;
    border: 1px solid #eee;
    border-bottom: none;
    &:last-child {
      border-bottom: 1px solid #eee;
    }
  }
}
/deep/ .custom-pop {
  background: #d1d3d3;
  border-color: #eee;
  .popper__arrow {
    border-bottom-color: #d1d3d3;
    &:after {
      border-bottom-color: #d1d3d3;
    }
  }
}

/deep/ .el-tabs__header {
  margin-bottom: 0;
}
/deep/ .el-tabs__item {
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
  color: #b0bfb1;
}
/deep/ .el-tabs__content {
  display: none;
}
/deep/ .el-tabs__item.is-active {
  color: #3aa240;
}
/deep/.el-tabs__item:hover {
  color: #b0bfb1;
  cursor: pointer;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background: #f2f4f7;
  border-bottom-color: transparent;
  font-weight: bold;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-top: none;
  border-radius: 0;
  height: 32px;
}
/deep/ .el-tabs__nav-next,
/deep/ .el-tabs__nav-prev {
  line-height: 32px;
  width: 32px;
  text-align: center;
}
/deep/ .el-tabs__nav-wrap.is-scrollable {
  padding: 0 32px;
}
/deep/
  .el-tabs--card
  > .el-tabs__header
  .el-tabs__item.is-active.is-closable
  .el-icon-close {
  width: 16px;
  margin-left: 5px;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close {
  font-size: 16px;
  height: 16px;
  line-height: 16px;
}
/deep/
  .el-tabs--card
  > .el-tabs__header
  .el-tabs__item.is-closable:hover
  .el-icon-close {
  width: 16px;
}
/deep/
  .el-tabs--top.el-tabs--card
  > .el-tabs__header
  .el-tabs__item:last-child {
  padding-right: 12px;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable {
  padding-right: 12px;
  padding-left: 12px;
}
</style>
