<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/login"></router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
export default {
  name: 'App',
  comments: {
    Login,
    Home
  }
}
</script>

<style lang="less">
</style>
