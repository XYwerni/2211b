<template>
  <div class="about">
    <el-container>
      <el-aside width="200px">
        <div style="margin-top: 10px">面经</div>
        <el-menu router active-text-color="#fff" background-color="#2c3641" class="el-menu-vertical-demo" :default-active="route.path" text-color="#fff">
          <el-menu-item index="/about/look">
            <el-icon><PieChart /></el-icon>
            <span>数据看板</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <el-icon><PieChart /></el-icon>
            <span>面经管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="lef">
            <el-icon><Refresh /></el-icon>
            <el-icon><Platform /></el-icon>
          </div>
          <div class="rgt">
            <div class="user">
              {{ user }}
            </div>
            <el-popconfirm title="您确认退出面运营后台吗?" @confirm="confirmEvent" @cancel="cancelEvent">
              <template #reference>
                <el-button
                  ><el-icon><SwitchButton /></el-icon
                ></el-button>
              </template>
            </el-popconfirm>
          </div>
        </el-header>
        <el-main>
          <div v-if="route.path != '/index'">
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item v-for="item in route.meta.title">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { userApi } from '../utils/api';
import { ElMessage } from 'element-plus';
import { Refresh, Platform, SwitchButton, PieChart, ArrowRight } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const user = ref('');
userApi().then((res) => {
  console.log(res, '用户信息');
  user.value = res.data.username;
});

const confirmEvent = () => {
  localStorage.removeItem('token');
  router.push('/');
  ElMessage.success('退出成功');
};
const cancelEvent = () => {
  ElMessage.error('已取消退出');
};
</script>

<style lang="scss" scoped>
.about,
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
  color: #fff;
  text-align: center;
  background-color: #2c3641;
  .el-menu-vertical-demo {
    border-right: 0px solid;
  }
}
.el-header {
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  background-color: #fff;

  .reg {
    display: flex;
    .user {
      padding: 10px;
      box-sizing: border-box;
      background-color: #f8fafc;
    }
  }
}
.el-main {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fefefe;
}
</style>
