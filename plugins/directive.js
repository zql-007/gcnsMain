import Vue from 'vue'
import uuid from 'uuid'
// import locale from 'element-ui/lib/locale/lang/en'
export default app => {
  // 注册一个全局自定义指令 `v-command`
  Vue.directive('command', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el, binding) {
      // 聚焦元素
      // console.log('command show control =========')
      let resources = app.store.state['menu']['pageButtonPower'] || []
      if (resources.indexOf(binding.value) === -1) {
        // el.style.display = 'none'
        el.remove()
      }
    }
  })

  Vue.directive('isrc', {
    // 当被绑定的元素插入到 DOM 中时……
    update: function(el, binding) {
      // 聚焦元素
      let url = $nuxt.$store.state.baseUrl + '/' + binding.value
      el.src = url
    }
  })

  // let page = 3
  function getDataPage(el) {
    console.log('prepare tag directive')
    var page = ''
    if (!el.childNodes || el.childNodes.length < 1) return el.dataset.page
    for (var i = 0; i < el.childNodes.length; i++) {
      var child = el.childNodes[i]
      if (child.childNodes && child.childNodes.length > 0) {
        var tmp = getDataPage(child)
        if (tmp && tmp.length > 1) {
          page = tmp
          break
        }
      } else {
        if (child.dataset && child.dataset.page) {
          page = child.dataset.page
          break
        }
      }
    }
    return page
  }

  Vue.directive('tag', {
    // 当被绑定的元素插入到 DOM 中时……
    bind: function(el, binding) {
      // 聚焦元素
      // console.log(binding.arg + ': tag')
      // 指令所在的页面
      // var page = el.dataset.page
      var page = getDataPage(el)
      // 如果没传入页面，则视为无效的绑定
      if (!page) return
      // 是消息还是tag
      var type = binding.arg + 's'
      // 存储的当前页面的消息
      // pageItem 格式如下
      // pageItem = {tags:[{name: '', ts: 0}], msgs: [{name: '', ts: 0}]}
      var pageItem = JSON.parse(localStorage.getItem('hmi/' + page) || '{}')
      // localStorage.clear('hmi/' + page)
      // localStorage.clear()
      // tag名
      var tagName = binding.value
      // 如果该页面没有需要从后台取数的变量，那么直接更新
      if (!pageItem[type]) {
        if (!pageItem) pageItem = {}
        pageItem[type] = []
        var obj = {
          tagName: tagName,
          timestamp: 0,
          value: []
        }
        if (type === 'msgs') {
          obj.ticket = uuid().replace(new RegExp('-', 'g'), '')
          obj.id = tagName
          obj.reply = true
          obj.timeout = 0
        }
        pageItem[type][0] = obj
        localStorage.setItem('hmi/' + page, JSON.stringify(pageItem))
      } else {
        // 判断原有集合中是否已经包含变量名
        let exist = pageItem[type].some(o => {
          return o.tagName === tagName
        })
        // 如果已经包含了，不用加入任何信息
        if (exist) return
        // 如果没有包含，则将变量名加入列表
        else {
          var obj1 = {
            tagName: tagName,
            timestamp: 0,
            value: []
          }
          if (type === 'msgs') {
            obj.ticket = uuid().replace(new RegExp('-', 'g'), '')
            obj.id = tagName
            obj.reply = true
            obj.timeout = 0
          }
          pageItem[type].push(obj1)
        }
        // 更新当前页面的变量列表项
        localStorage.setItem('hmi/' + page, JSON.stringify(pageItem))
      }
    }
  })
  // v-dialogDrag: 弹窗拖拽
  Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
      const dialogHeaderEl = el.querySelector('.el-dialog__header')
      const dragDom = el.querySelector('.el-dialog')
      dialogHeaderEl.style.cursor = 'move'

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

      dialogHeaderEl.onmousedown = e => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop

        // 获取到的值带px 正则匹配替换
        let styL, styT

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes('%')) {
          styL =
            +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
          styT =
            +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
        } else {
          styL = +sty.left.replace(/px/g, '')
          styT = +sty.top.replace(/px/g, '')
        }

        document.onmousemove = function(e) {
          // 通过事件委托，计算移动的距离
          const l = e.clientX - disX
          const t = e.clientY - disY

          // 移动当前元素
          dragDom.style.left = `${l + styL}px`
          dragDom.style.top = `${t + styT}px`

          // 将此时的位置传出去
          // binding.value({x:e.pageX,y:e.pageY})
        }

        document.onmouseup = function(e) {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  })

  // v-dialogDragWidth: 弹窗宽度拖大 拖小
  Vue.directive('dialogDragWidth', {
    bind(el, binding, vnode, oldVnode) {
      const dragDom = binding.value.$el.querySelector('.el-dialog')

      el.onmousedown = e => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - el.offsetLeft

        document.onmousemove = function(e) {
          e.preventDefault() // 移动时禁用默认事件

          // 通过事件委托，计算移动的距离
          const l = e.clientX - disX
          dragDom.style.width = `${l}px`
        }

        document.onmouseup = function(e) {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  })

  //修正表格错位
  Vue.directive('tableFit', {
    //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    componentUpdated(el, binding, vnode) {
      setTimeout(() => {
        adjustColumnWidth(el, vnode)
      }, 0)
    }
  })
  function adjustColumnWidth(table, vnode) {
    //中文和全角正则
    const CN = new RegExp('[\u4E00-\u9FA5]|[^\uFF00-\uFFFF]')
    const NUM = new RegExp('[0-9]')
    //中文字体的像素宽度比例
    const CN_RATE = 1.1
    //数字字体的像素宽度比例
    const NUM_RATE = 0.65
    //其他字体的像素宽度比例
    const OTHER_RATE = 0.5

    const columns = vnode.child.columns.slice()
    //el-table通过colgroup标签设置html宽度
    const colgroup = table.querySelector('colgroup')
    const colDefs = [...colgroup.querySelectorAll('col')]
    //忽略 设置了宽度 序号 多选框 的列
    //判断gutter是否已存在
    const gutter = colgroup.querySelector(`col[name=gutter]`)
    const gutterx = colgroup.querySelector(`col[name=gutterx]`)
    let except = 0
    if (gutter || gutterx) {
      //删除gutter
      colDefs.pop()
    }
    //若有序号 多选框则删除
    except = colDefs.length - columns.length
    colDefs.splice(0, except)
    for (let i = columns.length - 1; i >= 0; i--) {
      if (columns[i].width) {
        colDefs.splice(i, 1)
        columns.splice(i, 1)
      }
    }

    //设置每列宽度
    colDefs.forEach((col, index) => {
      //colgroup中 和 表头标签的class名相同 通过class寻找相同列
      const clsName = col.getAttribute('name')
      const cells = [
        ...table.querySelectorAll(`.el-table__body-wrapper td.${clsName}`),
        ...table.querySelectorAll(`th.${clsName}`)
      ]
      const widthList = cells.map(el => {
        const cell = el.querySelector('.cell')
        if (cell) {
          let fontSize = parseInt(window.getComputedStyle(cell, null).fontSize)
          fontSize = fontSize ? fontSize : 14
          let width = 0
          //计算每个字符的宽度
          for (let str of cell.innerText) {
            if (CN.test(str)) {
              width += fontSize * CN_RATE
            } else if (NUM.test(str)) {
              width += fontSize * NUM_RATE
            } else {
              width += fontSize * OTHER_RATE
            }
          }
          return Math.ceil(width)
        } else {
          return 0
        }
      })

      //取一列中的最大宽度
      const max = Math.max(...widthList)
      if (max !== 0) {
        //在表格数据中设置minWidth 防止尺寸变化重新计算原来的宽度
        //20 + 2  20 是cell类的padding 2 是给予额外空间
        columns[index].minWidth = max + 22
        table.querySelectorAll(`col[name=${clsName}]`).forEach(el => {
          el.setAttribute('width', max + 22)
        })
      }
    })

    //设置完后调用el-table方法更新布局
    vnode.child.doLayout()

    tableRevise(table)
  }

  //修正el-table错位
  function tableRevise(table) {
    const tableWrapper = table.querySelector('.el-table__body-wrapper')
    const tableBody = table.querySelector('.el-table__body')
    const colgroup = table.querySelector('colgroup')
    /**
     * (以下数值为滚动条高度，可以自己根据情况通过class重新修改)
     */
    //内容大于容器时
    if (tableBody.clientWidth > tableWrapper.offsetWidth) {
      //设置x轴滚动
      tableWrapper.style.overflowX = 'auto'
      //解决固定列错位 （没有错位的可以忽略以下内容）
      let fixedWrap = table.querySelectorAll(
        '.el-table .el-table__fixed-body-wrapper'
      )
      if (fixedWrap.length > 0) {
        fixedWrap.forEach(item => {
          item.style.paddingBottom = 8 + 'px'
        })
      }
      //解决固定列覆盖滚动条
      let fixed_left = table.querySelector('.el-table .el-table__fixed')
      let fixed_right = table.querySelector('.el-table .el-table__fixed-right')
      if (fixed_left) {
        fixed_left.style.height = 'calc(100% - 8px)'
      }
      if (fixed_right) {
        fixed_right.style.height = 'calc(100% - 8px)'
      }
      //解决表头偏移
      //没有原生的gutter时自己新增一个
      const gutter = colgroup.querySelector(`col[name=gutter]`)
      const gutterx = colgroup.querySelector(`col[name=gutterx]`)
      if (!gutter && !gutterx) {
        let col = document.createElement('col')
        col.setAttribute('name', 'gutterx')
        col.setAttribute('width', '8')
        colgroup.appendChild(col)
      }
    }
  }
}
