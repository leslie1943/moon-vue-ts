<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item prop="name" label="角色名称">
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
      <div style="margin-left: 5px">
        <el-button size="small" @click="handleAdd">添加角色</el-button>
      </div>
      <el-divider />
      <el-table
        border
        v-loading="isLoading"
        :data="roleList"
        style="width: 100%"
      >
        <el-table-column width="120" type="index" label="编号">
        </el-table-column>
        <el-table-column min-width="150" prop="name" label="角色名称">
        </el-table-column>
        <el-table-column min-width="150" prop="description" label="描述">
        </el-table-column>
        <el-table-column min-width="150" prop="createdTime" label="添加时间">
          <template slot-scope="scope">
            {{ formatDate(scope.row.createdTime) }}
          </template>
        </el-table-column>
        <el-table-column min-width="150" prop="name" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleAssignMenu(scope.row)"
              >分配菜单</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleAssignResource(scope.row)"
              >分配资源</el-button
            >
            <el-button size="mini" type="text" @click="handleEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="form.current"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          :disabled="isLoading"
        >
        </el-pagination>
      </div>
    </el-card>
    <AddOrEdit
      :visible.sync="visible"
      :isEdit="isEdit"
      @refresh="loadRoles"
      :roleId.sync="roleId"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AddOrEdit from './addOrEdit.vue'
import { getRolePages, deleteRole } from '@/services/role'
import { formatDate } from '@/utils/date'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'RoleList',
  components: { AddOrEdit },
  data() {
    return {
      isEdit: false,
      visible: false,
      formatDate,
      form: {
        name: '',
        current: 1, // 默认查询第1页数据
        size: 10, // 每页大小
      },
      roleId: 0,
      roleList: [],
      totalCount: 0,
      isLoading: true, // 加载状态
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      this.isLoading = true
      const { data } = await getRolePages(this.form)
      this.roleList = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },
    onSearch() {
      this.form.current = 1
      this.loadRoles()
    },
    async onReset() {
      await (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadRoles()
    },
    handleAdd() {
      this.visible = true
      this.roleId = 0
    },
    async handleEdit(id: number) {
      this.visible = true
      this.isEdit = true
      this.roleId = id
    },
    async handleAssignResource() {
      this.$message.success('分配资源')
    },
    async handleAssignMenu() {
      this.$message.success('分配菜单')
    },
    async handleDelete(id: number) {
      this.$confirm('确定删除', '提示', {})
        .then(async () => {
          const { data } = await deleteRole(id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadRoles()
          }
        })
        .catch((err) => {
          console.info(err)
        })
    },
    handleSizeChange(val: number) {
      this.form.size = val
      this.form.current = 1 // 重置成第一页
      this.loadRoles()
    },
    handleCurrentChange(val: number) {
      this.form.current = val
      this.loadRoles()
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
