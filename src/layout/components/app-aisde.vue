<template>
  <div class="aside">
    <el-menu
      router
      default-active="/"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
      <template v-for="item in allMenuList">
        <!-- 有子菜单的 -->
        <template v-if="item.subMenuList && item.subMenuList.length > 0">
          <el-submenu index="" :key="item.href">
            <template slot="title">
              <i :class="'el-icon-' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>

            <template v-for="subItem in item.subMenuList">
              <el-menu-item
                v-if="subItem.shown"
                :index="'/' + subItem.href"
                :key="subItem.id"
              >
                <span slot="title">{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 无子菜单的 -->
        <el-menu-item v-else :index="'/' + item.href" :key="item.href">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>

      <!-- <el-submenu v-for="item in allMenuList" :key="item.id" :index="item.href">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>{{ item.name }}</span>
        </template>
        <template v-if="item.subMenuList && item.subMenuList.length > 0">
        </template>
      </el-submenu> -->
    </el-menu>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getUserPermissions } from '@/services/permission'
export default Vue.extend({
  name: 'AppAside',
  data() {
    return {
      allMenuList: [],
    }
  },
  created() {
    this.loadPermission()
  },
  methods: {
    async loadPermission() {
      const { data } = await getUserPermissions()
      console.info(data)
      if (data.state === 1) {
        this.allMenuList = data.content.menuList
      }
    },
    handleOpen(key: string, keyPath: string) {
      console.log(key, keyPath)
    },
    handleClose(key: string, keyPath: string) {
      console.log(key, keyPath)
    },
  },
})
</script>
<style lang="scss" scoped>
.aside {
  .el-menu {
    min-height: 100vh;
  }
}
</style>
