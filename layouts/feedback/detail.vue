<template>
  <div>
    <el-dialog
      :title="'问题反馈详情'"
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
          label="标题:"
          prop="title"
        >
          {{ formData.title }}
        </el-form-item>
        <el-form-item
          label="所属应用:"
          prop="serviceNo"
        >
          <template
            v-for="(item) in serviceList">
            <template v-if="item.value === formData.serviceNo"> {{ item.label }} </template>
          </template>
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
          {{ formData.planFinishDate }}
        </el-form-item>
        <el-form-item
          label="联系方式:"
          prop="quesContact"
        >
          {{ formData.quesContact }}
        </el-form-item>
        <el-form-item
          v-if="attachList.length"
          label="图片描述:"
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
              />
            </li>
          </ul>
        </el-form-item>
        <el-form-item
          label="描述:"
          prop="description"
        >
          {{ formData.description }}
        </el-form-item>
        <el-form-item
          label="处理人联系方式:"
          prop="handleContact"
        >
          {{ formData.handleContact }}
        </el-form-item>
        <el-form-item
          label="处理意见:"
          prop="handleDesc"
        >
          {{ formData.handleDesc }}
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">关闭</el-button>
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
      deleteIds: []
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
    httpRequest(params) {},
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
    clearForm() {
      this.formData = {}
      this.uploadFiles = []
      this.attachList = []
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
