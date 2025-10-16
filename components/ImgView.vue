<template>
  <div
    class="img">
    <img
      :src="isId ? baseURL + id : src"
      alt=""
    >
    <span class="img-actions">
      <span
        class="el-upload-list__item-preview"
        @click="handlePreview">
        <i class="el-icon-zoom-in"/>
      </span>
      <span
        v-if="deleteable"
        class="el-upload-list__item-delete"
        @click="handleDelete">
        <i class="el-icon-delete"/>
      </span>
    </span>
    <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :width="'1200px'"
      :append-to-body="true">
      <img
        :src="isId ? baseURL + id : src"
        width="100%"
        alt="">
    </el-dialog>
  </div>
</template>

<script>
import { downloadFileById } from '@/lib/system'

export default {
  name: 'ImgView',
  props: {
    id: {
      type: String,
      default: ''
    },
    deleteable: {
      type: Boolean,
      default: false
    },
    isId: {
      type: Boolean,
      default: true
    },
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      baseURL: 'http://172.25.63.67:9800/' + downloadFileById
    }
  },
  mounted() {},
  methods: {
    handlePreview() {
      this.dialogVisible = true
      this.$emit('img-preview', {
        url: this.isId ? this.baseURL + this.id : this.src,
        id: this.id
      })
    },
    handleDelete() {
      this.$emit('img-delete', {
        url: this.isId ? this.baseURL + this.id : this.src,
        id: this.id
      })
    }
  }
}
</script>

<style scoped lang="less">
.img {
  position: relative;
  display: inline-block;
  height: 100%;
  width: 100%;
  min-height: 140px;
  min-width: 140px;
  img {
    height: 100%;
    width: 100%;
  }
}
.img-actions {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}

.img-actions::after {
  display: inline-block;
  content: '';
  height: 100%;
  vertical-align: middle;
}

.img-actions span {
  display: none;
  cursor: pointer;
}

.img-actions span + span {
  margin-left: 15px;
}
.img-actions .el-upload-list__item-delete {
  position: static;
  font-size: inherit;
  color: inherit;
}

.img-actions:hover {
  opacity: 1;
}

.img-actions:hover span {
  display: inline-block;
}
</style>
