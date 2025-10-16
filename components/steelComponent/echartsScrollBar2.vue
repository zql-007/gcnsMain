<template>
  <!--  <div
    ref="chartContainer"
    class="chart-container">
    <div ref="chart"></div>
  </div>-->
  <div
    id="main">
    <div id="chart"></div>
    <div id="endMessage">✅ 已加载全部数据</div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { post } from '@/lib/Util'
import { getAodRhythmByTime } from '@/lib/productDataApply/steelmakingProcess'
import { getLastMonthDate, getNowDay } from '@/utils/dateUtil'

export default {
  data() {
    return {
      times: {
        startDate: getLastMonthDate(),
        endDate: getNowDay()
      },
      // chart: null,
      // currentPage: 1,
      // pageSize: 20,
      allData: [],
      currentData: [],
      //-----------
      totalSeriesData: [], //总计
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
    const mainElement = document.getElementById('main')
    if (mainElement) {
      mainElement.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    initChart() {
      this.chartDom = document.getElementById('chart')
      this.chart = echarts.init(this.chartDom)
      this.endMessage = document.getElementById('endMessage')
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
            name: '等待',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
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
            name: '化钢',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
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
            name: '氧化',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
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
            name: '还原',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            itemStyle: {
              color: '#ffc000'
            }
          },
          {
            name: '精炼',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            itemStyle: {
              color: '#3391ff'
            }
          }
        ]
      }
      this.fetchData() // 初始加载

      const mainElement = document.getElementById('main')
      if (mainElement) {
        // 使用箭头函数确保 this 指向 Vue 实例
        mainElement.addEventListener('scroll', this.handleScroll)
        /*mainElement.addEventListener('scroll', () => {
          if (
            mainElement.scrollTop + mainElement.clientHeight >=
            mainElement.scrollHeight - 10
          ) {
            this.fetchData()
          }
        })*/
      }
    },
    handleScroll() {
      const mainElement = document.getElementById('main')
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
        const response = await post(getAodRhythmByTime, {
          startDate: this.times.startDate,
          endDate: this.times.endDate,
          pageNo: this.currentPage,
          pageSize: this.pageSize
        })
        if (response.success) {
          // console.log('接口调成功')
          let valueList = []
          response.data.forEach(item => {
            let itemList = []
            itemList.push(item.waitTime)
            itemList.push(item.steelDuration)
            itemList.push(item.oxidizeDuration)
            itemList.push(item.resDuration)
            itemList.push(item.refDuration)
            valueList.push({
              label: item.stove,
              values: itemList
            })
          })
          // console.log('valueList', valueList)
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
          // console.log('newHeight', newHeight)
          this.chartDom.style.height = newHeight + 'px'
          this.chart.resize()

          //鼠标移入tooltip-只展示'冶炼', '等待', '停时‘数据
          let legendData = ['等待', '化钢', '氧化', '还原', '精炼']
          this.option.tooltip = {
            trigger: 'axis',
            formatter: function(params) {
              let result = params[0].name + '<br>'
              for (let i = 0; i < params.length; i++) {
                if (legendData.includes(params[i].seriesName)) {
                  let unit = params[i].seriesType === 'bar' ? '' : ''
                  let dot =
                    '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                    params[i].color +
                    ';"></span>'
                  result +=
                    dot +
                    params[i].seriesName +
                    ': ' +
                    params[i].value +
                    unit +
                    '<br>'
                }
              }
              return result
            },
            axisPointer: {
              type: 'shadow'
            }
          }
          //-------计算顶部：总计-----
          // let totalSeriesData = []
          response.data.forEach(item => {
            this.totalSeriesData.push(
              Number(item.waitTime) +
                Number(item.steelDuration) +
                Number(item.oxidizeDuration) +
                Number(item.resDuration) +
                Number(item.refDuration)
            )
          })
          //顶部数据重叠问题，删除后再赋值
          this.option.series.forEach((item, index) => {
            if (item.name === '') {
              this.option.series.splice(index, 1)
            }
          })
          //总计-柱状图顶部展示
          this.option.series.push({
            name: '',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              color: 'rgba(0,0,0,0)' // 透明颜色
            },
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              },
              // position: 'top',
              formatter: params =>
                `       ${this.totalSeriesData[params.dataIndex]}`
            },
            data: this.totalSeriesData.map(value => 0.0) // 微小的值以便能显示标签但不影响图形
          })
          this.chart.setOption(this.option)
          this.currentPage++
        }
        //模拟数据测试
        /*const start = this.currentPage * this.pageSize
        const end = start + this.pageSize
        const fullData = this.generateBigData(200)
        const pageData = fullData.slice(start, end)

        if (pageData.length === 0) {
          this.endMessage.style.display = 'block'
          return
        }
        const newYAxis = pageData.map(item => item.label)
        this.option.yAxis.data.push(...newYAxis) // ✅ 添加到底部

        this.option.series.forEach((series, i) => {
          const newSeriesData = pageData.map(item => item.values[i])
          series.data.push(...newSeriesData) // ✅ 添加到底部
        })
        // 动态调整高度
        const newHeight = this.option.yAxis.data.length * 27
        console.log('newHeight', newHeight)
        this.chartDom.style.height = newHeight + 'px'
        this.chart.resize()
        this.chart.setOption(this.option)
        this.currentPage++*/
      } catch (error) {
        console.error('加载数据失败:', error)
      } finally {
        this.isLoading = false // 加载完成，设置为可以继续加载
      }
    },
    generateBigData(count) {
      const data = []
      for (let i = 0; i < count; i++) {
        data.push({
          label: 'Day ' + (i + 1),
          values: [
            Math.floor(Math.random() * 500),
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 400),
            Math.floor(Math.random() * 200),
            Math.floor(Math.random() * 600)
          ]
        })
      }
      return data
    }
  }
}
</script>

<style scoped lang="less">
.chart-container {
  height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
}
.chart-container > div {
  height: 100%;
}
//----------
#main {
  width: 100%;
  height: 330px;
  overflow-y: auto;
  overflow-x: hidden;
  //border: 1px solid #ccc;
}
#chart {
  width: 100%;
  height: auto;
}
#endMessage {
  text-align: center;
  color: #888;
  padding: 10px;
  display: none;
}
</style>
