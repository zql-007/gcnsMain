<template>
  <div
    id="main1">
    <div id="chart1"></div>
    <div id="endMessage1">✅ 已加载全部数据</div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { post } from '@/lib/Util'
import {
  getAodRhythmByTime,
  getLgProdRhythm
} from '@/lib/productDataApply/steelmakingProcess'
export default {
  name: 'echartsScrollSample',
  props: {},
  data() {
    return {
      chartDom: null,
      chart: null,
      endMessage: null,
      currentPage: 1,
      pageSize: 20,
      option: null,
      isLoading: false, // 添加标志位，用于控制是否正在加载数据
      hasMoreData: true // 添加标志位，用于判断是否还有更多数据
    }
  },
  watch: {},
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    const mainElement = document.getElementById('main1')
    if (mainElement) {
      mainElement.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    initChart() {
      this.chartDom = document.getElementById('chart1')
      this.chart = echarts.init(this.chartDom)
      this.endMessage = document.getElementById('endMessage1')
      this.option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: {
          show: true,
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          // top: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisTick: {
            show: false // 隐藏Y轴的刻度线
          },
          axisLine: { show: false } //只隐藏 Y 轴线
        },
        yAxis: {
          type: 'category',
          inverse: true, // ✅ 正序：旧在上，新在下
          data: [],
          axisTick: {
            show: false // 隐藏Y轴的刻度线
          },
          axisLine: { show: false } //只隐藏 Y 轴线
        },
        series: [
          {
            name: 'AOD冶炼时长',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: 'AOD到LF转运时长',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: 'LF冶炼时长',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            itemStyle: {
              color: '#55c6d4'
            }
          },
          {
            name: 'LF到连铸转运时长',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: '连铸浇铸时长',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            itemStyle: {
              color: '#ffda35'
            }
          }
        ]
      }
      this.fetchData() // 初始加载

      const mainElement = document.getElementById('main1')
      if (mainElement) {
        // 使用箭头函数确保 this 指向 Vue 实例
        mainElement.addEventListener('scroll', this.handleScroll)
      }
    },
    handleScroll() {
      const mainElement = document.getElementById('main1')
      if (
        mainElement &&
        mainElement.scrollTop + mainElement.clientHeight >=
          mainElement.scrollHeight - 10 &&
        !this.isLoading &&
        this.hasMoreData
      ) {
        this.fetchData()
      }
    },
    async fetchData() {
      if (this.isLoading || !this.hasMoreData) return
      this.isLoading = true // 设置为正在加载数据
      //调用后台接口
      try {
        const response = await post(getLgProdRhythm, {
          pageNo: this.currentPage,
          pageSize: this.pageSize
        })
        if (response.success) {
          let valueList = []
          response.data.forEach(item => {
            let itemList = []
            itemList.push(item.aodTime)
            itemList.push(item.aodTranshipment)
            itemList.push(item.lfTime)
            itemList.push(item.lfTranshipment)
            itemList.push(item.ccTime)
            valueList.push({
              label: item.c_stove,
              values: itemList
            })
          })
          if (valueList.length === 0) {
            this.endMessage.style.display = 'block'
            this.hasMoreData = false // 设置为没有更多数据
            return
          }
          const newYAxis = valueList.map(item => item.label)
          this.option.yAxis.data.push(...newYAxis) // ✅ 添加到底部

          this.option.series.forEach((series, i) => {
            const newSeriesData = valueList.map(item => item.values[i])
            series.data.push(...newSeriesData) // ✅ 添加到底部
          })
          // 动态调整高度
          let newHeight = null
          newHeight = this.option.yAxis.data.length * 25
          this.chartDom.style.height = newHeight + 'px'
          this.chart.resize()
          this.chart.setOption(this.option)
          this.currentPage++
        }
      } catch (error) {
        console.error('加载数据失败:', error)
      } finally {
        this.isLoading = false // 加载完成，设置为可以继续加载
      }
    }
  }
}
</script>

<style scoped lang="less">
#main1 {
  width: 100%;
  height: 330px;
  overflow-y: auto;
  overflow-x: hidden;
  //border: 1px solid #ccc;
}
#chart1 {
  width: 100%;
  height: auto;
}
#endMessage1 {
  text-align: center;
  color: #888;
  padding: 10px;
  display: none;
}
</style>
