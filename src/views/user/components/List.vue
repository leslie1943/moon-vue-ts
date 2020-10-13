<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item prop="name" label="用户名称">
                <el-input v-model="form.name"></el-input>
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

      <el-table v-loading="isLoading" :data="userList" style="width: 100%">
        <el-table-column prop="id" label="用户ID"> </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-avatar
              :src="
                scope.row.portrait ||
                '//www.lgstatic.com/thumbnail_100x100/i/image2/M01/5E/65/CgotOVszSAOANi0LAAAse2IVWAE693.jpg'
              "
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column min-width="150" prop="name" label="用户名">
        </el-table-column>

        <el-table-column min-width="150" prop="phone" label="手机号">
        </el-table-column>
        <el-table-column min-width="150" prop="phone" label="注册时间">
          <template slot-scope="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column min-width="150" prop="status" label="状态">
          <template slot-scope="scope">
            <div
              class="status-success"
              v-if="scope.row.status === 'ENABLE'"
            ></div>
            <div class="status-error" v-else></div>
          </template>
        </el-table-column>
        <el-table-column min-width="150" prop="name" label="操作">
          <template>
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
import { getUserPages } from '@/services/user'
import { formatDate } from '@/utils/date'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'UserList',
  data() {
    return {
      formatDate,
      form: {
        name: '',
        currentPage: 1, // 默认查询第1页数据
        pageSize: 10, // 每页大小
      },
      userList: [],
      totalCount: 0,
      isLoading: true, // 加载状态
    }
  },
  created() {
    this.loadUsers()
  },
  methods: {
    async loadUsers() {
      this.isLoading = true
      const { data } = await getUserPages(this.form)
      this.userList = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },
    onSearch() {
      this.form.currentPage = 1
      this.loadUsers()
    },
    async onReset() {
      await (this.$refs.form as Form).resetFields()
      this.form.currentPage = 1
      this.form.pageSize = 10
      this.loadUsers()
    },
    handleSizeChange(val: number) {
      this.form.pageSize = val
      this.form.currentPage = 1 // 重置成第一页
      this.loadUsers()
    },
    handleCurrentChange(val: number) {
      this.form.currentPage = val
      this.loadUsers()
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
