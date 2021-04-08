<template>
	<!-- LocaleProvider 用于全局配置国际化文案 -->
	<!-- <a-locale-provider :locale="locale">
	  
  </a-locale-provider> -->
  <div id="app">
      <keep-alive >
        <router-view v-if="$route.meta.keepalive"></router-view>
      </keep-alive>
	    <router-view v-if="!$route.meta.keepalive"></router-view>
      <!-- <router-view></router-view> -->
	  </div>
</template>

<script>
// import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'app',
  data() {
    return {
      // locale: zhCN,
    }
  }
}
</script>

<style lang="scss">
</style>
