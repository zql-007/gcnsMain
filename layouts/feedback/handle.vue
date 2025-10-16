<template>
  <div>
    <el-dialog
      :title="'问题反馈'"
      :visible.sync="visible"
      v-bind="$attrs"
      @close="clearForm"
      v-on="$listeners"
    >
      <el-form
        v-if="visible"
        ref="form"
        :model="formData"
        label-width="140px"
        size="medium"
      >
        <el-form-item
          :rules="[
            {
              required: true,
              message: '请输入标题',
              trigger: 'change'
            }
          ]"
          label="标题"
          prop="title"
        >
          <el-input
            v-model="formData.title"
            disabled
            placeholder="请输入标题" />

        </el-form-item>
        <el-form-item
          :rules="[
            {
              required: true,
              message: '请选择所属应用',
              trigger: 'change'
            }
          ]"
          label="所属应用"
          prop="serviceNo"
        >
          <el-select
            v-model="formData.serviceNo"
            size="small"
            clearable
            disabled
            placeholder="选择应用"
          >
            <el-option
              v-for="(item, index) in serviceList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属页面"
          prop="planFinishDate"
        >
          {{ formData.pageName }}
        </el-form-item>
        <el-form-item
          label="计划完成时间"
          prop="planFinishDate"
        >
          <el-date-picker
            v-model="formData.planFinishDate"
            disabled
            value-format="yyyy-MM-DD" />
        </el-form-item>
        <el-form-item
          label="图片"
          prop="attachList"
        >
          <ul class="el-upload-list el-upload-list--picture-card">
            <li
              v-for="(item, index) in attachList"
              :key="index"
              class="el-upload-list__item is-ready">
              <img-view
                :key="item.id"
                :id="item.id"
                @img-preview="handleImgPreview"
                @img-delete="handleImgDelete"
              />
            </li>
          </ul>
        </el-form-item>
        <el-form-item
          :rules="[
            {
              required: true,
              message: '请输入描述',
              trigger: 'change'
            }
          ]"
          label="描述"
          prop="description"
        >
          <el-input
            v-model="formData.description"
            :rows="6"
            disabled
            type="textarea"
            placeholder="请输入描述"/>

        </el-form-item>
        <el-form-item
          label="处理人联系方式"
          prop="handleContact"
        >
          <el-input
            v-model="formData.handleContact"
            placeholder="请输入处理人联系方式"/>
        </el-form-item>
        <el-form-item
          :rules="[
            {
              required: true,
              message: '请选择状态',
              trigger: 'change'
            }
          ]"
          label="处理状态"
          prop="handleContact"
        >
          <template v-for="item in statusList">
            <el-radio
              v-model="formData.handleStatus"
              :key="item.value"
              :label="item.value">{{ item.label }}</el-radio>
          </template>
        </el-form-item>
        <el-form-item
          :rules="[
            {
              required: true,
              message: '请输入处理说明',
              trigger: 'change'
            }
          ]"
          label="处理意见"
          prop="handleDesc"
        >
          <el-input
            v-model="formData.handleDesc"
            :rows="6"
            type="textarea"
            placeholder="请输入描述"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="handelSubmit"
        >确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { deleteFileByIds, saveFeedback, uploadFile } from '@/lib/system'
import { post } from '@/lib/Util'
import ImgView from '@/components/ImgView'
export default {
  components: { ImgView },
  inheritAttrs: false,
  props: {
    typeList: {
      type: Array,
      default: function() {
        return []
      }
    },
    serviceList: {
      type: Array,
      default: function() {
        return []
      }
    },
    quesType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      loading: false,
      visible: false,
      url: {
        edit: saveFeedback,
        add: saveFeedback,
        file: uploadFile
      },
      formData: {},
      dialogImageUrl: null,
      dialogVisible: false,
      attachList: [],
      uploadFiles: [], // 选择的文件
      deleteIds: [],
      statusList: [
        { label: '处理中', value: 5, type: '' },
        { label: '已处理', value: 2, type: 'success' },
        { label: '退回', value: 6, type: 'info' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    // console.log('')
  },
  methods: {
    /**
     * 开启编辑
     * @param data 编辑元数据
     */
    edit(data) {
      this.title = '编辑'
      this.editType = 'edit'
      this.formData = Object.assign({}, this.formData, data)
    },
    async handelUpload() {
      // 删除图片
      if (this.deleteIds.length) {
        const del = await post(deleteFileByIds, { ids: this.deleteIds })
      }
      //上传
      const files = this.$refs.upload.uploadFiles
      const formData = new FormData()
      files.forEach(item => {
        formData.append('files', item.raw)
      })
      const res = await post(this.url.file, formData, false, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.success) {
        this.uploadFiles = res.data
        return Promise.resolve(true)
      }
      return Promise.reject(false)
    },
    httpRequest(params) {},
    async handelSubmit() {
      this.$refs['form'].validate(async valid => {
        if (!valid) return
        this.loading = true
        this.handelConfirm()
      })
    },
    handelConfirm() {
      if (this.editType === 'edit') {
        if (!this.url || !this.url.edit) {
          this.$message.warning('请设置url.edit属性!')
          return
        }
        this.submitBefore()
        post(this.url.edit, this.formData).then(res => {
          this.loading = false
          if (res.success) {
            this.submitAfter(res)
            this.close()
          }
        })
      } else if (this.editType === 'add') {
        if (!this.url || !this.url.add) {
          this.$message.warning('请设置url.add属性!')
          return
        }
        this.submitBefore()
        post(this.url.add, this.formData).then(res => {
          this.loading = false
          if (res.success) {
            this.submitAfter(res)
            this.close()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    submitAfter(res) {
      // 成功提交后操作
      this.$emit('success', res)
    },
    submitBefore() {
      if (!this.formData.attachList) this.formData.attachList = []
      this.formData.anonymous = !!this.formData.anonymous
      this.formData.quesType = this.quesType
      this.formData.handleUserNo = localStorage.getItem('userId')
    },
    handleChange(file, fileList) {
      // console.log(file, fileList)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    close() {
      this.visible = false
      this.clearForm()
    },
    clearForm() {
      this.formData = {}
      this.uploadFiles = []
      this.deleteIds = []
    },
    handleImgPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleImgDelete(file) {
      this.attachList = this.attachList.filter(res => res.id !== file.id)
      this.deleteIds.push(file.id)
    }
  }
}
</script>
<style scoped>
</style>
