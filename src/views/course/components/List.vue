<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item prop="courseName" label="课程名称">
                <el-input v-model="form.courseName"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item prop="status" label="状态">
                <el-select
                  v-model="form.status"
                  placeholder="请选择状态"
                  clearable
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="item in status"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="onSearch"
                  :disabled="isLoading"
                  >查询搜索</el-button
                >
                <el-button @click="onReset" :disabled="isLoading"
                  >重置</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-table v-loading="isLoading" :data="courseList" style="width: 100%">
        <el-table-column type="index" label="编号"> </el-table-column>
        <el-table-column min-width="150" prop="courseName" label="课程名称">
        </el-table-column>
        <el-table-column min-width="150" prop="price" label="价格">
          <template slot-scope="scope"> ￥{{ scope.row.price }} </template>
        </el-table-column>
        <el-table-column min-width="150" prop="sortNum" label="排序">
        </el-table-column>
        <el-table-column min-width="150" prop="status" label="状态">
          <template slot-scope="scope">
            <div class="status-error" v-if="scope.row.status === 0"></div>
            <div class="status-success" v-if="scope.row.status === 1"></div>
          </template>
        </el-table-column>
        <el-table-column min-width="150" prop="name" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleChangeStatus(scope.row.id, scope.row.status)"
              :type="scope.row.status === 0 ? 'success' : 'danger'"
              >{{ scope.row.status === 0 ? '上架' : '下架' }}</el-button
            >
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="primary">内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="form.currentPage"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          :disabled="isLoading"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getCoursePages, changeState } from '@/services/course'
import { formatDate } from '@/utils/date'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'CourseList',
  data() {
    return {
      formatDate,
      form: {
        courseName: '',
        status: '',
        currentPage: 1, // 默认查询第1页数据
        pageSize: 10, // 每页大小
      },
      courseList: [],
      totalCount: 0,
      status: [
        { id: 0, name: '草稿' },
        { id: 1, name: '上架' },
      ], // 资源分类列表
      isLoading: true, // 加载状态
    }
  },
  created() {
    this.loadCourses()
  },
  methods: {
    async loadCourses() {
      this.isLoading = true
      const { data } = await getCoursePages(this.form)
      this.courseList = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },
    onSearch() {
      this.form.currentPage = 1
      this.loadCourses()
    },
    async onReset() {
      await (this.$refs.form as Form).resetFields()
      this.form.currentPage = 1
      this.form.pageSize = 10
      this.loadCourses()
    },

    async handleChangeStatus(id: number, status: number) {
      const { data } = await changeState(id, status === 0 ? 1 : 0)
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.loadCourses()
      }
    },
    handleSizeChange(val: number) {
      this.form.pageSize = val
      this.form.currentPage = 1 // 重置成第一页
      this.loadCourses()
    },
    handleCurrentChange(val: number) {
      this.form.currentPage = val
      this.loadCourses()
    },
  },
})
</script>

<style lang="scss" scoped>
.status {
  display: inline-block;
  cursor: pointer;
  width: 0.875rem;
  height: 0.875rem;
  vertical-align: middle;
  border-radius: 50%;
}
.status-success {
  @extend .status;
  background: #51cf66;
}
.status-error {
  @extend .status;
  background: #f56c6c;
}
</style>
