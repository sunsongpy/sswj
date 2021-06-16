<template>
  <el-container direction="horizontal">
    <div class="under-aside" :style="{'min-width': collapseSetting.collapse ? '64px' : '200px'}"></div>

    <el-aside :style="{width: collapseSetting.collapse ? '64px' : '200px'}">
      <el-header style="padding: 0">oneops</el-header>
      <el-menu
        :default-active="$router.currentRoute.fullPath"
        :collapse="collapseSetting.collapse"
        background-color="rgb(84, 92, 100)"
        :unique-opened="true"
        :collapse-transition="false"
        :router="true">
        <li :key="menu.id" v-for="menu in menuList">
          <el-submenu v-if="menu.children" :index="menu.id + ''">
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item
              :index="submenu.path"
              :key="submenu.id"
              v-for="submenu in menu.children">
              <i class="el-icon-menu"></i>
              <span slot="title">{{submenu.name}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            v-else
            :index="menu.path">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
          </el-menu-item>
        </li>
      </el-menu>
      <span @click="toggleMenu">|||</span>
    </el-aside>

    <div class="main">
      <el-header style="display: flex; justify-content: space-between">
        主体头部
        <el-button @click="logout" style="margin: 10px 0">退出</el-button>
      </el-header>
      <el-main>
        <router-view />
        <el-footer><a href="">我是注脚</a></el-footer>
      </el-main>
    </div>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menuList: [],
      collapseSetting: {
        collapse: false
      }
    }
  },
  mounted () {
    if ('collapse' in localStorage) {
      if (localStorage.collapse === 'true') {
        this.collapseSetting.collapse = true
      } else {
        this.collapseSetting.collapse = false
      }
    } else {
      this.collapseSetting.collapse = false
    }
  },

  created () {
    this.getMenuList()
  },
  methods: {
    getMenuList () {
      let menuList = [
        {
          id: 1,
          path: '/dashboard',
          name: '仪表盘',
          icon: 'el-icon-menu'
        },
        {
          id: 30,
          name: '资源管理',
          icon: 'el-icon-platform-eleme',
          children: [
            {
              id: 31,
              path: '/resource/ipSegment',
              name: 'ip网段扫描'
            },
            {
              id: 32,
              path: '/resource/hardHost',
              name: '物理主机'
            },
            {
              id: 33,
              path: '/resource/virtualHost',
              name: '虚拟机'
            },
            {
              id: 34,
              path: '/resource/networkDevice',
              name: '网络设备'
            },
            {
              id: 35,
              path: '/resource/cloudHost',
              name: '云主机'
            }
          ]
        },
        {
          id: 60,
          name: '自动化运维',
          icon: 'el-icon-platform-eleme',
          children: [
            {
              id: 61,
              path: '/ops/script',
              name: '脚本管理'
            },
            {
              id: 62,
              path: '/ops/command',
              name: '命令管理'
            },
            {
              id: 63,
              path: '/ops/pipeline',
              name: '故障自愈'
            },
            {
              id: 64,
              path: '/ops/ansible',
              name: 'ansible'
            }
          ]
        },

        {
          id: 40,
          name: 'DevOps',
          icon: 'el-icon-s-help',
          children: [
            {
              id: 41,
              path: '/devops/pipeline',
              name: '流水线'
            },
            {
              id: 42,
              path: '/devops/ci',
              name: '持续集成'
            },
            {
              id: 43,
              path: '/devops/test',
              name: '持续测试'
            },
            {
              id: 44,
              path: '/devops/cd',
              name: '持续部署'
            },
            {
              id: 45,
              path: '/setting/hostGroup',
              name: '部署主机组'
            }
          ]
        },
        {
          id: 50,
          name: 'k8s集群',
          icon: 'el-icon-upload',
          children: [
            {
              id: 51,
              path: '/k8s/node',
              name: '节点列表'
            }
          ]
        },
        {
          id: 10,
          name: '用户管理',
          icon: 'el-icon-user-solid',
          children: [
            {
              id: 11,
              path: '/user/list',
              name: '用户列表'
            },
            {
              id: 12,
              path: '/user/center',
              name: '个人中心'
            }
          ]
        },
        {
          id: 20,
          name: '系统设置',
          icon: 'el-icon-s-tools',
          children: [
            {
              id: 21,
              path: '/setting/security',
              name: '安全'
            },
            {
              id: 22,
              path: '/setting/tag',
              name: '标签'
            },
            {
              id: 23,
              path: '/setting/servicePoint',
              name: '第三方服务访问点'
            }
          ]
        }
      ]
      this.menuList = menuList
    },

    toggleMenu () {
      localStorage.collapse = !this.collapseSetting.collapse
      if (localStorage.collapse === 'true') {
        this.collapseSetting.collapse = true
      } else {
        this.collapseSetting.collapse = false
      }
    },

    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login?redirect=' + this.$route.fullPath)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-container {
    height: 100%;
    min-width: 800px;

    .under-aside {
      min-width: 200px
    }
  ;

    .el-aside {
      //width: 200px !important;
      height: 100%;
      position: fixed;
      z-index: 10;
      top: 0;
      left: 0;

      header {
        line-height: 60px;
        text-align: center;
        background-color: pink;
      }

      & > span {
        background-color: purple;
        letter-spacing: 0.1em;
        display: inline-block;
        width: 100%;
        text-align: center;
        color: red;
        cursor: pointer;
      }

      .el-menu {
        height: calc(100% - 82px);
        border: none;
      }

      .el-menu--collapse {
        & > li {
          .el-menu-item, .el-submenu > .el-submenu__title {
            span {
              height: 0;
              width: 0;
              overflow: hidden;
              visibility: hidden;
              display: inline-block;
              color: red;
            }
          }
          .el-submenu > .el-submenu__title {
            i ~ :last-of-type {
              display: none;
            }
          }
        }
      }
    }

    .main {
      width: 100%;
      background-color: #EAEDF1;

      &>header {
        text-align: center;
        line-height: 60px;
        background-color: blueviolet;
      }
    }
  }
</style>
