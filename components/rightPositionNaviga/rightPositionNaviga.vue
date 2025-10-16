<template>
  <div>
    <!-- 右侧导航定位组件 -->
    <div
      id="nav-container"
      style="display: flex">
      <div
        id="nav-trigger"
        class="nav-trigger-init"
        style="display: flex;justify-content: center;align-items: center">
        <span class="arrow">&#10095;&#10095;</span>
      </div>
      <div
        id="nav-content"
        class="hidden">
        <ul>
          <li
            v-for="(item, index) in rightPositionNavigaName"
            :data-target="item.id"
            :style="{ backgroundColor: selectedIndex === index || isHovered === index? '#ebf6ec' : 'transparent' }"
            :key="item.id"
            @click="handleItemClick(index, item.id)"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave()"
          >{{ item.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  layout: 'menuLayout',
  name: 'system-org',
  components: {},
  props: {
    rightPositionNavigaName: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      navTriggerFlag: false,
      selectedIndex: -1, // 初始化选中索引为 -1，表示没有选中项
      isHovered: -1 // 初始化悬停索引为 -1，表示没有悬停项
    }
  },
  created() {},
  mounted() {
    this.getInitNavigation()
    // 添加全局点击事件监听器
    // document.addEventListener('click', this.handleOutsideClick)
  },
  beforeDestroy() {
    // 移除全局点击事件监听器，防止内存泄漏
    // document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    getInitNavigation() {
      const navTrigger = document.getElementById('nav-trigger')
      const navContainer = document.getElementById('nav-container')
      const navContent = document.getElementById('nav-content')
      const targetItems = navContent.querySelectorAll('li')
      // 点击ul-li内容定位事件处理
      targetItems.forEach(function(item) {
        item.addEventListener('click', function() {
          const targetId = this.dataset.target
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
        })
      })
      //点击箭头事件处理
      navTrigger.addEventListener(
        'click',
        function() {
          const currentWidth = window.getComputedStyle(navContainer).width
          if (currentWidth === '40px') {
            this.navTriggerFlag = true
            const newClass = 'nav-trigger'
            navTrigger.className = newClass
            navContainer.style.width = '140px'
            navContent.classList.remove('hidden')
          } else {
            this.navTriggerFlag = false
            const newClassInit = 'nav-trigger-init'
            navTrigger.className = newClassInit
            navContainer.style.width = '40px'
            navContent.classList.add('hidden')
          }
          // 重置选中和悬停状态
          this.selectedIndex = -1
          this.isHovered = -1
        }.bind(this)
        /*1、.bind(this) 把事件处理函数内部的 this 绑定到了外部作用域的 this 上,
      也就是说，事件处理函数里的 this 不再指向 navTrigger 这个 DOM 元素，而是指向调用
      getInitNavigation 方法的对象
      2、getInitNavigation 是 myObject 的方法。使用 .bind(this) 后，事件处理函数内部的
       this 就指向了 myObject，这样就能正确访问和修改 myObject 的属性（如 selectedIndex、
       navTriggerFlag 和 isHovered）*/
      )
    },
    //点击变底色
    handleItemClick(index, targetId) {
      this.selectedIndex = index // 更新选中索引
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
    },
    handleMouseEnter(index) {
      this.isHovered = index
    },
    handleMouseLeave() {
      this.isHovered = -1
    },
    //点击右侧导航之外
    handleOutsideClick(event) {
      const navContainer = document.getElementById('nav-container')
      if (navContainer && !navContainer.contains(event.target)) {
        this.navTriggerFlag = false
        const navTrigger = document.getElementById('nav-trigger')
        const navContent = document.getElementById('nav-content')
        const newClassInit = 'nav-trigger-init'
        navTrigger.className = newClassInit
        navContainer.style.width = '40px'
        navContent.classList.add('hidden')
        // 重置选中和悬停状态
        this.selectedIndex = -1
        this.isHovered = -1
      }
    }
  }
}
</script>

<style
  lang="less"
  scoped
>
/* 右侧导航组件样式 */
#nav-container {
  position: fixed;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  background-color: #f0f0f0;
  transition: width 0.3s ease;
  -webkit-transition: width 0.3s ease;
  -moz-transition: width 0.3s ease;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.2);
}

.nav-trigger {
  padding: 5px;
  text-align: center;
  cursor: pointer;
  background-color: #ffffff;
  border-right: 1px solid #ccc;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.nav-trigger-init {
  padding: 5px;
  text-align: center;
  cursor: pointer;
  background-color: #ffffff;
}

.arrow {
  font-size: 14px;
}

#nav-content {
  padding: 10px;
  background-color: white;
  transition: transform 0.3s ease; /* 添加过渡动画 */
  transform: scaleX(0);
}
#nav-content:not(.hidden) {
  transform: scaleX(1);
}
.hidden {
  display: none;
}

#nav-content ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#nav-content li {
  margin-bottom: 5px;
  cursor: pointer;
  width: 145px; //防止抖动
  padding: 7px;
  border-radius: 8px;
}

#nav-content li:first-child {
  margin-top: 10px;
}

#nav-content li:last-child {
  margin-bottom: 10px;
}
</style>
