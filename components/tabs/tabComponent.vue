<template>
  <div class="tabComponent">
    <el-row :gutter="7">
      <el-col 
        :span="12" 
        class="el_height">
        <el-table
          ref="multipleTable"
          :data="tableData.data"
          :row-class-name="tabRowClassName"
          :height="'calc(100vh - 210px)'"
          :border="true"
          style="width: 100%"
          @row-click="rowClick">
          <el-table-column
            v-for="(item,ind) in tableData.infoHead"
            :key="ind"
            :prop="item.key"
            :show-overflow-tooltip="true"
            :label="item.lable"/>
        </el-table>
      </el-col>
      <el-col
        :span="12"
        class="el_height barStyel">
        <tasily-echarts
          v-for="(item,ind) in lineOptions"
          :key="ind"
          :title="{text:item.title,top:'5%',left: '2%'}"
          :legend="item.daylegend"
          :series="item.lineSeries"
          :x-axis="item.lineXaxis"
          :y-axis="item.lineYaxis"
          :tooltip="{show:true,trigger: 'axis'}"
          :_width="'600px'"
          :_height="'300px'"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TasilyTable from '@/components/TasilyTableEasy'
import tasilyEcharts from '@/components/TasilyEcharts'
export default {
  name: 'TabComponent',
  components: {
    TasilyTable,
    tasilyEcharts
  },
  props: {
    tableData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    lineOptions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {
    tableData: {
      handler(tableData) {
        //console.log('tableData is change ==========', tableData)
      },
      immediate: true,
      deep: true
    },
    lineOptions: {
      handler(lineOptions) {
        //console.log('lineOptions=======', lineOptions)
      },
      deep: true
    }
  },
  methods: {
    //斑马线效果
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1
      if (index % 2 == 0) {
        return 'light-row'
      } else {
        return 'dack-row'
      }
    },
    /**
     * @author: wangHongFei
     * @description: 行单击事件
     */
    rowClick(data) {
      this.$emit('tabClick', data)
    }
  }
}
</script>

<style scoped>
</style>
