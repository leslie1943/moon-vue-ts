<template>
  <div class="role-add-edit">
    <el-dialog
      :visible="visible"
      :title="isEdit ? '编辑角色' : '添加角色'"
      @close="onClose"
      @closed="onClose"
    >
      <el-form
        v-loading="loading"
        :rules="rules"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { createRole, getRole } from '@/services/role'

export default Vue.extend({
  name: 'RoleAddOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    roleId: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        code: '',
        description: '',
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称' }],
        code: [{ required: true, message: '请输入角色编码' }],
      },
    }
  },
  methods: {
    async onClose() {
      this.form = { name: '', code: '', description: '' }
      await (this.$refs.form as Form).resetFields()
      this.$emit('update:visible', false)
      this.$emit('update:roleId', 0)
    },
    async onSubmit() {
      const valid = await (this.$refs.form as Form).validate()
      if (valid) {
        const { data } = await createRole(this.form)
        if (data.code === '000000') {
          this.$message.success('操作成功')
          this.onClose()
          this.$emit('refresh')
        }
      }
    },
  },
  watch: {
    async roleId(val) {
      if (val !== 0) {
        this.loading = true
        const { data } = await getRole(val)
        if (data.code === '000000') {
          this.form = data.data
        }
        this.loading = false
      }
    },
  },
})
</script>
