<template>
  <div>
    <el-dialog
      :title="'问题反馈'"
      :visible.sync="visible"
      v-bind="$attrs"
      @close="clearForm"
      @open="onOpen"
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
            disabled
            clearable
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
          prop="resourceName"
        >
          {{ formData.pageName }}
        </el-form-item>
        <el-form-item
          label="计划完成时间"
          prop="planFinishDate"
        >
          <el-date-picker
            v-model="formData.planFinishDate"
            value-format="yyyy-MM-dd"
            placeholder="请选择时间"/>
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="quesContact"
        >
          <el-input
            v-model="formData.quesContact"
            placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item
          label="上传图片"
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
                deleteable
                @img-delete="handleImgDelete"
              />
            </li>
            <li
              v-for="(item, index) in pasteList"
              :key="index"
              class="el-upload-list__item is-ready">
              <img-view
                :key="item.id"
                :src="item.src"
                :is-id="false"
                deleteable
                @img-delete="handlePasteImgDelete($event, index)"
              />
            </li>
          </ul>
          <el-upload
            ref="upload"
            :auto-upload="false"
            :http-request="httpRequest"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
            multiple
            list-type="picture-card"
            action="#"
            style="display: inline">
            <i class="el-icon-plus"/>
          </el-upload>
          <input
            ref="paste"
            readonly
            class="el-input__inner paste-div"
            placeholder="点击此处，ctrl+v粘贴截图">
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
    <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :width="'1200px'"
      :append-to-body="true">
      <img
        :src="dialogImageUrl"
        width="100%"
        alt="">
    </el-dialog>
  </div>
</template>
<script>
import { deleteFileByIds, saveFeedback, uploadFile } from '@/lib/system'
import { post } from '@/lib/Util'
import ImgView from '@/components/ImgView'
import { mapState } from 'vuex'

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
      pasteList: [],
      uploadFiles: [], // 选择的文件
      deleteIds: []
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
    this.mateMenu()
  },
  mounted() {},
  methods: {
    add() {
      this.title = '新增'
      this.editType = 'add'
    },
    /**
     * 开启编辑
     * @param data 编辑元数据
     */
    edit(data) {
      this.title = '编辑'
      this.editType = 'edit'
      this.formData = Object.assign({}, this.formData, data)
    },
    onOpen() {
      this.$nextTick(() => {
        this.$refs.paste.addEventListener('paste', e => {
          console.dir(e.clipboardData.files)
          let file = null
          const files = (e.clipboardData || window.clipboardData).files
          if (files && files.length) {
            for (let i = 0; i < files.length; i++) {
              if (files[i].type.indexOf('image') !== -1) {
                // 如果是image类型存为file
                let windowURL = window.url || window.webkitURL
                const imgUrl = windowURL.createObjectURL(files[i])
                file = {
                  raw: files[i],
                  src: imgUrl
                }
                break
              }
            }
          }
          if (file) {
            this.pasteList.push(file)
            this.$message.success('图片粘贴成功')
          } else {
            this.$message.warning('未识别到图片')
          }
        })
      })
    },
    // 匹配menu数据
    mateMenu() {
      console.log('this.allMenus', this.allMenus)
      const matchMenu = this.allMenus.find(
        item => item.url === this.currentPageName
      )
      console.log('this.currentPageName', this.currentPageName)
      console.log('matchMenu', matchMenu)
      this.formData.resourceId = matchMenu ? matchMenu.id : ''
      this.formData.pageName = matchMenu ? matchMenu.name : ''
      this.formData.serviceNo = matchMenu ? matchMenu.serviceName : 'iom'
      // console.log('matchMenu.serviceName', matchMenu.serviceName)
    },
    async handelUpload() {
      // 删除图片
      if (this.deleteIds.length) {
        const del = await post(deleteFileByIds, { ids: this.deleteIds })
      }
      //上传
      if (!this.$refs.upload.uploadFiles.length && !this.pasteList.length)
        return
      const files = this.$refs.upload.uploadFiles.concat(this.pasteList)
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
      } else {
        this.$message.warning('图片上传失败！')
        this.loading = false
        return Promise.resolve(false)
      }
      return Promise.reject(false)
    },
    httpRequest(params) {},
    async handelSubmit() {
      this.$refs['form'].validate(async valid => {
        if (!valid) return
        this.loading = true
        const file = await this.handelUpload()
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
      this.formData.attachList.push(...this.uploadFiles, ...this.attachList)
      this.formData.anonymous = !!this.formData.anonymous
      this.formData.quesType = this.quesType
      this.formData.quesUserNo = localStorage.getItem('userId')
    },
    handleChange(file, fileList) {
      // console.log(file, fileList)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log('file图片', file)
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
      this.attachList = []
      this.pasteList = []
      this.deleteIds = []
      this.mateMenu()
    },
    handleImgPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleImgDelete(file) {
      this.attachList = this.attachList.filter(res => res.id !== file.id)
      this.deleteIds.push(file.id)
    },
    handlePasteImgDelete(file, index) {
      this.pasteList.splice(index, 1)
    }
  }
}
</script>
<style scoped lang="less">
.paste-div {
  color: #666;
  margin-top: 20px;
  &:focus {
    border-color: #1a386c;
  }
}
/deep/ input[disabled],
input:disabled,
input.disabled {
  -webkit-text-fill-color: #3a3f63;
  background: #f5f7fa;
  -webkit-opacity: 1;
  opacity: 1;
  cursor: not-allowed;
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}
</style>
