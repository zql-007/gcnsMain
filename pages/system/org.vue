<template>
  <div>
    <!-- 模拟页面内容区域 -->
    <div
      id="section1"
      class="page-section">
      <h2>内容区域1</h2>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
      <p>这里是内容区域1的详细信息……</p>
    </div>
    <div
      id="section2"
      class="page-section">
      <h2>内容区域2</h2>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
      <p>这里是内容区域2的详细信息……</p>
    </div>
    <div
      id="section3"
      class="page-section">
      <h2>内容区域3</h2>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
      <p>这里是内容区域3的详细信息……</p>
    </div>

    <!-- 右侧导航组件 -->
    <!--    <div id="nav-container">
      <div
        id="nav-tooltip"
        class="hidden">
        <ul>
          <li data-target="section1">区域1</li>
          <li data-target="section2">区域2</li>
          <li data-target="section3">区域3</li>
        </ul>
      </div>
    </div>-->
    <!-- 右侧导航组件 -->
    <div
      id="nav-container"
      style="display: flex">
      <div
        id="nav-trigger"
        style="display: flex;justify-content: center;align-items: center">
        <span class="arrow">&#10095;&#10095;</span>
      </div>
      <div
        id="nav-content"
        class="hidden">
        <ul>
          <li data-target="section1">区域1</li>
          <li data-target="section2">区域2</li>
          <li data-target="section3">区域3</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
// import { getGroupProd } from '@/lib/steelmakingProcess'
import { post } from '@/lib/Util'
import NercarEcharts from '@/components/NercarEcharts.vue'

export default {
  layout: 'menuLayout',
  name: 'system-org',
  components: {
    NercarEcharts
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.getGroupProd()
  },
  methods: {
    getGroupProd() {
      /*const navContainer = document.getElementById('nav-container')
      const navTooltip = document.getElementById('nav-tooltip')
      const targetItems = navTooltip.querySelectorAll('li')

      // 鼠标移入移出事件
      navContainer.addEventListener('mouseenter', function() {
        navTooltip.classList.remove('hidden')
      })

      navContainer.addEventListener('mouseleave', function() {
        navTooltip.classList.add('hidden')
      })

      // 点击事件处理
      targetItems.forEach(function(item) {
        item.addEventListener('click', function() {
          const targetId = this.dataset.target
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
        })
      })*/
      const navTrigger = document.getElementById('nav-trigger')
      const navContainer = document.getElementById('nav-container')
      const navContent = document.getElementById('nav-content')
      const targetItems = navContent.querySelectorAll('li')
      // 点击ul-li事件处理
      targetItems.forEach(function(item) {
        item.addEventListener('click', function() {
          const targetId = this.dataset.target
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
        })
      })
      // 箭头
      navTrigger.addEventListener('click', function() {
        const currentWidth = window.getComputedStyle(navContainer).width
        if (currentWidth === '40px') {
          navContainer.style.width = '150px'
          navContent.classList.remove('hidden')
        } else {
          navContainer.style.width = '40px'
          navContent.classList.add('hidden')
        }
      })
    }
  }
}
</script>

<style
  lang="less"
  scoped
>
/*!* 页面内容区域样式 *!
.page-section {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

!* 导航容器样式 *!
#nav-container {
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 120px;
  height: 100px;
}

!* 悬浮提示框样式 *!
#nav-tooltip {
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.hidden {
  //display: none;
}

#nav-tooltip ul {
  list-style-type: none;
  padding: 0;
}

#nav-tooltip li {
  cursor: pointer;
  margin-bottom: 5px;
}*/
.page-section {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}
/* 页面内容区域样式 */
#nav-container {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  background-color: #f0f0f0;
  transition: width 0.3s ease;
}

#nav-trigger {
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

.arrow {
  font-size: 16px;
}

#nav-content {
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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
}
</style>
