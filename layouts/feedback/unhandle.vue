<template>
  <div
    v-if="unHandleNum"
    style="margin-right: 8px">
    <el-popover
      :append-to-body="false"
      placement="bottom-end"
      width="750"
      trigger="click"
      @show="handleSearch">
      <el-table
        v-loading="loading"
        :data="tableData"
        :size="size"
        border
        style="width: 100%"
      >
        <el-table-column
          label="标题"
          prop="title"
          show-overflow-tooltip
        >
          <template v-slot="{ row }">
            <div class="one-line">
              <span v-if="row.warning">
                <el-tag
                  :type="'warning'"
                  disable-transitions
                >
                  <i class="el-icon-warning-outline" />
                </el-tag>
              </span>
              {{ row.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          prop="description"
          show-overflow-tooltip
        />
        <el-table-column
          label="所属页面"
          prop="pageName"
          show-overflow-tooltip
        />
        <el-table-column
          label="建议人"
          prop="quesUserName"
          width="70"
          show-overflow-tooltip
        />
        <el-table-column
          label="状态"
          prop="handleStatus"
          width="80"
        >
          <template
            v-slot="{row}"
          >
            <el-tag
              :type="getName('statusList', row.handleStatus).type"
              disable-transitions
            >{{ getName('statusList', row.handleStatus).label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200px"
        >
          <template
            v-slot="{row}"
          >
            <span>
              <el-button
                size="small"
                type="text"
                @click="handleDetail(row)"
              >详情
              </el-button>
            </span>
            <template v-if="row.quesUserNo === userId">
              <span v-if="row.handleStatus == 1">
                <el-divider direction="vertical" />
                <el-button
                  size="small"
                  type="text"
                  @click="handleRemind(row)"
                >催办
                </el-button>
              </span>
              <span v-if="[1, 3].includes(row.handleStatus)">
                <el-divider direction="vertical" />
                <el-button
                  size="small"
                  type="text"
                  @click="handleEdit(row)"
                >编辑
                </el-button>
              </span>
              <span>
                <el-divider direction="vertical" />
                <el-button
                  slot="reference"
                  type="text"
                  @click="handleDelete(row)"
                >{{ '删除' }}
                </el-button>
              </span>
            </template>
            <template v-else>
              <span v-if="row.handleStatus == 1 || row.handleStatus == 3 || (row.handleStatus == 2 && row.handleUserNo === userId)">
                <el-divider direction="vertical" />
                <el-button
                  size="small"
                  type="text"
                  @click="handlePop(row)"
                >处理
                </el-button>
              </span>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-row
        align="middle"
        class="table-pagination"
        justify="end"
        type="flex"
      >
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="page.total"
          background
          layout="total, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
      <div
        slot="reference">
        <el-badge
          :value="unHandleNum">
          <div
            class="feedback-btn">
            未处理
          </div>
        </el-badge>
      </div>
    </el-popover>
    <Detail
      ref="modalDetailForm"
      :service-list="serviceList"
      :ques-type="searchForm.quesType"
      @success="handleSearch"
    />
    <Edit
      ref="modalForm"
      :service-list="serviceList"
      :ques-type="searchForm.quesType"
      @success="handleSearch"
    />
    <Handle
      ref="modalHandleForm"
      :service-list="serviceList"
      :ques-type="searchForm.quesType"
      @success="handleSearch"
    />
  </div>
</template>
<script>
import {
  delFeedback,
  dictionaryDtlFindByDictCode,
  findFeedback,
  saveFeedback,
  uploadFile
} from '@/lib/system'
import ImgView from '@/components/ImgView'
import { post } from '@/lib/Util'
import { mapState } from 'vuex'
import Detail from '@/layouts/feedback/detail'
import Edit from '@/layouts/feedback/edit'
import Handle from '@/layouts/feedback/handle'

export default {
  components: { Handle, Edit, Detail, ImgView },
  inheritAttrs: false,
  data() {
    return {
      loading: false,
      visible: false,
      url: {
        edit: saveFeedback,
        save: saveFeedback,
        file: uploadFile,
        list: findFeedback, //分页接口地址
        delete: delFeedback, //删除接口地址
        getDict: dictionaryDtlFindByDictCode
      },
      size: 'mini', // medium / small / mini
      searchForm: {
        quesType: 2,
        handleStatus: 1
      },
      page: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
      },
      tableData: [],
      statusList: [
        { label: '待处理', value: 1, type: 'warning' },
        { label: '处理中', value: 5, type: '' },
        { label: '已处理', value: 2, type: 'success' },
        { label: '催办', value: 3, type: 'danger' },
        { label: '已关闭', value: 4, type: 'info' },
        { label: '退回', value: 6, type: 'info' }
      ],
      serviceList: [],
      userId: null,
      unHandleNum: 0
    }
  },
  computed: {
    ...mapState('menu', ['pageOpenedList', 'allMenus', 'currentPageName'])
  },
  watch: {
    currentPageName: function() {
      this.mateMenu()
    }
  },
  created() {
    // console.log('')
    this.getServiceInfo()
    this.mateMenu()
    this.$nextTick(() => {
      this.userId = localStorage.getItem('userId')
    })
  },
  methods: {
    // 匹配menu数据
    mateMenu() {
      const matchMenu = this.allMenus.find(
        item => item.url === this.currentPageName
      )
      this.searchForm.serviceNo = 'iom'
      post(
        this.url.list,
        Object.assign({}, this.searchForm, {
          pageIndex: 1,
          pageSize: 1
        })
      ).then(res => {
        this.unHandleNum = res.data.totalElements
      })
    },
    async getServiceInfo() {
      const { data: module } = await post(this.url.getDict, {
        dictCode: 'service'
      })
      this.serviceList = module.map(item => {
        return {
          value: item.code,
          label: item.value
        }
      })
      return new Promise(resolve => resolve(true))
    },
    async handleSearch(reset = false) {
      if (!this.url || !this.url.list) {
        console.log(this.url)
        this.$message.warning('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (reset) {
        this.page.pageIndex = 1
      }
      if (!this.searchForm.serviceNo) {
        return (this.tableData = [])
      }
      // 搜索
      this.loading = true
      const { data } = await post(
        this.url.list,
        Object.assign({}, this.searchForm, {
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize
        })
      )
      // console.log(data)
      this.tableData = data ? data.content : []
      this.page.pageSize = data.pageable.pageSize
      this.page.totalPages = data.totalPages
      this.page.total = data.totalElements
      this.unHandleNum = data.totalElements
      this.loading = false
      this.tableData.forEach(item => {
        if (
          item.handleStatus === 1 &&
          new Date() > new Date(item.planFinishDate)
        ) {
          item.warning = true
        }
      })
    },
    handleReset() {
      this.searchForm = {
        quesType: 2,
        handleStatus: 1
      }
      this.handleSearch(true)
    },
    changeTableSize(size) {
      console.log('改变尺寸')
      this.size = size
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page.pageIndex = val
      this.handleSearch()
    },
    getName: function(list, status) {
      return this[list].find(item => item.value === status) || {}
    },
    handleAdd: function() {
      this.$refs.modalForm.add()
      this.$refs.modalForm.visible = true
    },
    // 编辑
    handleEdit: function(row) {
      this.$refs.modalForm.edit(row)
      this.$refs.modalForm.visible = true
      this.$refs.modalForm.attachList = row.attachList || []
    },

    // 详情
    handleDetail: function(row) {
      this.$refs.modalDetailForm.edit(row)
      this.$refs.modalDetailForm.visible = true
      this.$refs.modalDetailForm.attachList = row.attachList || []
    },

    // 处理
    handlePop: function(row) {
      this.$refs.modalHandleForm.edit(row)
      this.$refs.modalHandleForm.visible = true
      this.$refs.modalHandleForm.attachList = row.attachList || []
    },

    // 催办
    handleRemind: function(row) {
      this.$confirm(`是否确认催办此条记录?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 催办操作
        post(
          this.url.save,
          Object.assign({}, row, {
            handleStatus: 3
          })
        ).then(() => {
          this.handleSearch()
        })
      })
    },
    // 关闭
    handleClose: function(row) {
      this.$confirm(`是否确认关闭此条记录?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 催办操作
        post(
          this.url.save,
          Object.assign({}, row, {
            handleStatus: 4
          })
        ).then(() => {
          this.handleSearch()
        })
      })
    },

    handleDelete: function(data) {
      if (!this.url.delete) {
        this.$message('请设置url.delete属性!')
        return
      }
      this.$confirm('是否确认删除此数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除操作
        post(this.url.delete, { id: data.id }).then(res => {
          this.handleSearch()
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
.feedback-btn {
  font-size: 14px;
  padding: 3px 5px;
  margin-left: 5px;
  border: 1px solid #e4e7ed;
  cursor: pointer;
  user-select: none;
  transition: all 0.5s;
  &:hover {
    color: #4458fe;
    border-color: #4458fe;
  }
}
.one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.operate-box {
  text-align: right;
  margin-bottom: 10px;
}
/deep/ .el-badge__content.is-fixed {
  top: 7px !important;
}
</style>
