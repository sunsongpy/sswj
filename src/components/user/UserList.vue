<template>
  <div>
    <!-- 面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">控制台</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--表格-->
    <el-card>
      <el-row>
        <el-col :span="8" style="margin-right: 20px">
          <el-input
            placeholder="搜索用户..."
            v-model="queryParameters.search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="userList"
        :border="true"
        stripe
        style="width: 100%">
        <el-table-column align="center" type="index" label="#"></el-table-column>
        <el-table-column align="center" prop="username" label="姓名"></el-table-column>
        <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
        <el-table-column align="center" prop="is_active" label="是否激活">
          <template slot-scope="{row}">
            <el-switch v-model="row.is_active"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="date_joined" label="最后登录时间"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      userList: [],
      queryParameters: {
        page: 1,
        size: 10,
        search: ''
      }
    }
  },

  created () {
    this.getUserList()
  },

  methods: {
    async getUserList () {
      const { data: res } = await this.$request.get('/users')
      this.userList = res
    }
  }
}
</script>

<style scoped>

</style>
