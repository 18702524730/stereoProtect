<template>
  <div v-if="show" class="authorize_wrap">
    <div class="logo_box column-center">
      <img src="~assets/img/icon/logo.png" alt="">
      <p class="name">欢迎来到知识产权快速维权平台！</p>
      <p class="info">为了更好的体验，请先完成以下授权！</p>
    </div>
    <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" class="btn_auth">小程序授权</button>
  </div>
</template>
<script>
  import mixin from 'mixins/';
  export default{
    components:{
    },
    mixins: [mixin],
    data(){
      return{
        show: false
      }
    },
    async onLoad(){
      let res = await this.checkLoginAndMark();
      this.show = !res;
      console.log('res', res);
      if (res) {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    },
  onShareAppMessage() {
    let obj = {};
    obj = {
      title: '多维快速知识产权保护平台',
      path: "/pages/index/index",
      imageUrl: '/static/icon/test.jpg'
    }
    return obj;
  },
    methods :{
      // 获取加密的用户信息
      async getUserInfo(e) {
        let self = this;
        let userInfo = e.target.userInfo;
        console.log('as', userInfo)
        if (userInfo) {
          await this.API.interfaces.setValidSession();
          await self.API.interfaces.getUserInfoByUser(e.target);
          wx.switchTab({
            url: '/pages/index/index'
          })
        }else{
          // 拒绝授权的情况
          wx.showModal({
            title: '提示',
            content: '拒绝授权,小程序将不可用',
            success:function(res){
              self.backIndexFn();
            }
          })
        }
      },
    },
  }
</script>
<style lang="scss">
page{background: #fff;}
.authorize_wrap {
  .logo_box {
    margin-top: 160px; width: 100%;
    img {width: 190px; height: 190px; border-radius: 100%;}
    .name {font-size: 36px; color: #333; font-weight: 500; line-height: 50px; margin-top: 30px;}
    .info {color: #999; font-size: 26px; line-height: 37px; margin-top: 12px;}
  }
  .btn_auth {width: 600px; height: 90px; line-height: 90px; padding: 0; border-radius:45px; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(36,125,255,1) 100%); color: #fff; font-size: 32px; text-align: center; margin: 60px auto 0 ;display: block; }
}
</style>
