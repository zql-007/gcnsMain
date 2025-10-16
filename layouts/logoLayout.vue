<template>
  <nuxt/>
</template>
<style >
/* html body {
  height: 100% !important;
} */
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
/* 导航菜单样式 */
.tag-nav-wrapper {
  padding: 0;
  height: 40px;
  background: #f0f0f0;
}
/* 侧导航栏宽度 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: 0px;
  width: 200px;
  left: 0px;
}
.el-menu-vertical-demo {
  border: 0px;
  width: 60px;
}
.el-header {
  padding: 0px;
  /* background-color: #3c8dbc;
  color: #fff;*/
}
.el-footer {
  background: #fff;
  padding: 5px 15px 5px 20px;
  color: #444;
  border-top: 1px solid #d2d6de;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  /*text-align: center;*/
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  background-color: #ecf0f5;
  padding: 0px;
  height: 100%;
  /*padding: 5px;*/
  overflow-x: hidden;
  /* overflow-y: hidden;
  overflow-x: hidden; */
  /* line-height: 160px; */
}
/* .el-tabs__content:not(el-tabs__content) {
  padding: 1px;
} */
.el-tabs--border-card .el-tabs__content {
  padding: 0px;
}
.el-tabs__header {
  margin: 0px;
}
.el-main .header {
  /* background-color: #b3c0d1; */
  line-height: 50px;
  border: 1px solid #333;
  color: #333;
  -moz-box-shadow: 0px 2px 5px #333333;
  -webkit-box-shadow: 0px 2px 5px #333333;
  box-shadow: 0px 2px 5px #333333;
  margin-bottom: 10px;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable {
  background-color: #ecf0f5;
  border-bottom-color: #ecf0f5;
}

.el-menu-parentDiv {
  height: 100%;
  width: 200px;
  overflow-x: hidden;
  overflow-y: auto;
}
.el-menu-parentDiv::-webkit-scrollbar-track-piece {
  background-color: #303133cc;
}
.el-menu-parentDiv::-webkit-scrollbar-thumb {
  background-color: #99999959;
}
</style>
