<template>
  <div>
    <nercar-echarts
      :tooltip="aodFurnaceProductRhythmOption.tooltip"
      :legend="aodFurnaceProductRhythmOption.legend"
      :grid="aodFurnaceProductRhythmOption.grid"
      :x-axis="aodFurnaceProductRhythmOption.xAxis"
      :y-axis="aodFurnaceProductRhythmOption.yAxis"
      :series="aodFurnaceProductRhythmOption.series"
      :data-zoom="aodFurnaceProductRhythmOption.dataZoom"
      :_height="'330px'"
      @dataZoom="changeDataZoom"
    />
  </div>
</template>

<script>
import NercarEcharts from '@/components/NercarEcharts.vue'
import { post } from '@/lib/Util'
import { getAodRhythmByTime } from '@/lib/productDataApply/steelmakingProcess'
import { getLastMonthDate, getNowDay } from '@/utils/dateUtil'

export default {
  components: {
    NercarEcharts
  },
  data() {
    return {
      aodFurnaceProductRhythmOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        yAxis: [
          {
            type: 'category',
            scrollBar: {
              show: true, // 显示滚动条
              height: 10, // 滚动条高度
              width: 10, // 滚动条宽度
              left: '90%' // 滚动条位置
              // 其他滚动条样式和交互配置
            },
            data: [
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
              'Sun',
              'Mon1',
              'Tue1',
              'Wed1',
              'Thu1',
              'Fri1',
              'Sat1',
              'Sun1',
              'Mon2',
              'Tue2',
              'Wed2',
              'Thu2',
              'Fri2',
              'Sat2',
              'Sun2'
            ],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '等待',
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
            data: [
              320,
              302,
              301,
              334,
              390,
              330,
              320,
              320,
              302,
              301,
              334,
              390,
              330,
              320,
              320,
              302,
              301,
              334,
              390,
              330,
              320
            ],
            itemStyle: {
              color: '#55c6d4'
            }
          },
          {
            name: '化钢',
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
            data: [
              120,
              132,
              101,
              134,
              90,
              230,
              210,
              120,
              132,
              101,
              134,
              90,
              230,
              210,
              320,
              302,
              301,
              334,
              390,
              330,
              320
            ],
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: '氧化',
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
            data: [
              220,
              182,
              191,
              234,
              290,
              330,
              310,
              220,
              182,
              191,
              234,
              290,
              330,
              310,
              320,
              302,
              301,
              334,
              390,
              330,
              320
            ],
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '还原',
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
            data: [
              150,
              212,
              201,
              154,
              190,
              330,
              410,
              150,
              212,
              201,
              154,
              190,
              330,
              410,
              320,
              302,
              301,
              334,
              390,
              330,
              320
            ],
            itemStyle: {
              color: '#ffc000'
            }
          },
          {
            name: '精炼',
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
            data: [
              150,
              212,
              201,
              154,
              190,
              330,
              410,
              150,
              212,
              201,
              154,
              190,
              330,
              410,
              320,
              302,
              301,
              334,
              390,
              330,
              320
            ],
            itemStyle: {
              color: '#3391ff'
            }
          }
        ],
        dataZoom: [
          /*{
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 20, //滑块高度设置
            start: Math.max(0, ((21 - 6) / 21) * 100),
            zoomOnMouseWheel: true, // 禁止鼠标滚轮缩放
            moveOnMouseWheel: true, // 允许鼠标滚轮移动
            moveOnMouseMove: true, // 允许鼠标拖动移动
            end: 100 // 初始显示前 20% 的数据
          }*/
        ]
      },
      times: {
        startDate: getLastMonthDate(),
        endDate: getNowDay()
      },
      currentData: [],
      currentPage: 1,
      pageSize: 30,
      visibleSize: 15
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      console.log('调接口成功')
      if (this.currentPage < 1) {
        this.currentPage = 1
      }
      //调用后台接口
      try {
        const response = await post(getAodRhythmByTime, {
          startDate: this.times.startDate,
          endDate: this.times.endDate,
          pageNo: this.currentPage,
          pageSize: this.pageSize
        })

        const newData = response.data || []
        this.currentData = newData

        this.updateChart()
      } catch (error) {
        console.error('加载数据失败:', error)
      }
    },
    updateChart() {
      const xData = this.currentData.map(item => item.stove)
      const waitTimeData = this.currentData.map(item => item.waitTime)
      const steelDurationData = this.currentData.map(item => item.steelDuration)
      const oxidizeDurationData = this.currentData.map(
        item => item.oxidizeDuration
      )
      const resDurationData = this.currentData.map(item => item.resDuration)
      const refDurationData = this.currentData.map(item => item.refDuration)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          top: '4%',
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
          // show: false
        },
        grid: [
          {
            left: '3%',
            right: '8%',
            bottom: '3%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: xData,
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '等待',
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
            data: waitTimeData,
            itemStyle: {
              color: '#55c6d4'
            }
          },
          {
            name: '化钢',
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
            data: steelDurationData,
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: '氧化',
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
            data: oxidizeDurationData,
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '还原',
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
            data: resDurationData,
            itemStyle: {
              color: '#ffc000'
            }
          },
          {
            name: '精炼',
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
            data: refDurationData,
            itemStyle: {
              color: '#3391ff'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty',
            showDetail: false, //左右文字展示
            width: 20, //滑块高度设置
            start: Math.max(0, ((21 - 6) / 21) * 100),
            zoomOnMouseWheel: true, // 禁止鼠标滚轮缩放
            moveOnMouseWheel: true, // 允许鼠标滚轮移动
            moveOnMouseMove: true, // 允许鼠标拖动移动
            end: 100 // 初始显示前 20% 的数据
          }
        ]
      }
      this.aodFurnaceProductRhythmOption = option
    },
    changeDataZoom(params) {
      const { start, end } = params.data
      if (end === 100) {
        this.currentPage--
        this.fetchData()
      }
      if (start === 0) {
        this.currentPage++
        this.fetchData()
      }
    }
  }
}
</script>
