<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item prop="name" label="资源名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="url" label="资源路径">
                <el-input v-model="form.url"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item prop="categoryId" label="资源分类">
                <el-select
                  v-model="form.categoryId"
                  placeholder="请选择资源分类"
                  clearable
                >
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="item in resourceCategories"
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

      <el-table v-loading="isLoading" :data="resourceList" style="width: 100%">
        <el-table-column type="index" label="编号"> </el-table-column>
        <el-table-column min-width="150" prop="name" label="资源名称">
        </el-table-column>
        <el-table-column min-width="150" prop="url" label="资源路径">
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
              type="primary"
              plain
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
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
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { formatDate } from '@/utils/date'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'ResourceList',
  data() {
    return {
      formatDate,
      form: {
        name: '',
        url: '',
        current: 1, // 默认查询第1页数据
        size: 10, // 每页大小
        categoryId: undefined, // 资源分类
      },
      resourceList: [],
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true, // 加载状态
    }
  },
  created() {
    this.loadResources()
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories() {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    async loadResources() {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      this.resourceList = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },
    onSearch() {
      this.form.current = 1
      this.loadResources()
    },
    async onReset() {
      await (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResources()
    },
    // eslint-disable-next-line
    handleEdit(item: any) {
      console.info(item)
    },
    // eslint-disable-next-line
    handleDelete(item: any) {
      console.info(item)
    },
    handleSizeChange(val: number) {
      this.form.size = val
      this.form.current = 1 // 重置成第一页
      this.loadResources()
    },
    handleCurrentChange(val: number) {
      this.form.current = val
      this.loadResources()
    },
  },
})
</script>

<style lang="scss" scoped></style>
