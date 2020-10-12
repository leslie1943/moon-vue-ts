<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ path: '/menu/create' })"
          >添加菜单</el-button
        >
      </div>
      <el-table v-loading="loading" :data="menus" style="width: 100%">
        <el-table-column
          min-width="150"
          label="编号"
          type="index"
        ></el-table-column>
        <el-table-column
          min-width="150"
          label="菜单名称"
          prop="name"
        ></el-table-column>
        <el-table-column
          min-width="150"
          label="菜单级数"
          prop="level"
        ></el-table-column>
        <el-table-column
          min-width="150"
          label="前端图标"
          prop="icon"
        ></el-table-column>
        <el-table-column
          min-width="150"
          label="排序"
          prop="orderNum"
        ></el-table-column>
        <el-table-column min-width="150" label="操作">
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
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu'
export default Vue.extend({
  name: 'MenuIndex',
  data() {
    return {
      menus: [],
      loading: false,
    }
  },
  created() {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus() {
      this.loading = true
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
      this.loading = false
    },
    // eslint-disable-next-line
    handleEdit(item: any) {
      this.$router.push({ name: 'menu-edit', params: { id: item.id } })
    },
    // eslint-disable-next-line
    handleDelete(item: any) {
      this.$confirm('确认删除吗?', '删除提示', {})
        .then(async () => {
          const { data } = await deleteMenu(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus()
          }
        })
        // eslint-disable-next-line
        .catch((err: any) => {
          this.$message.info('取消删除')
        })
    },
  },
})
</script>

<style lang="scss" scoped></style>
