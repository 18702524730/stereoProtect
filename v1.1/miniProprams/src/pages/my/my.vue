<template>
  <div class="myWrap">
    <div class="header">
      <div class="logoWrap">
        <img mode="aspectFill" v-if="headerUrl" :src="headerUrl" alt="">
        <img mode="aspectFill" v-else src="~assets/img/my/photo1.png" alt="">
      </div>
      <p v-if="nickname">您好，{{nickname}}</p>
      <p v-else>您好，请先<span>登录</span>！</p>
    </div>
    <div class="itemsWrap">
      <div class="item mys_01" @click="goList(1)">
        <span class="lf">我的投诉</span>
        <div class="rt">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
        <span class="divssion"></span>
      </div>
      <div class="item mys_02" @click="goList(2)">
        <span class="lf">我的申诉</span>
        <div class="rt">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
        <span class="divssion"></span>
      </div>
      <div class="item mys_03" @click="goList(3)">
        <span class="lf">网页侵权存证</span>
        <div class="rt">
          <span v-if="isAuth && czCount">{{czCount}}个</span>
          <i class="icon iconfont icon-jiantou"></i>
        </div>
        <span class="divssion"></span>
      </div>
      <div class="item mys_04" @click="goList(4)">
        <span class="lf">专利侵权判定</span>
        <div class="rt">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
        <span class="divssion"></span>
      </div>
      <div class="item mys_05" @click="goList(5)">
        <span class="lf">质量抽检鉴定</span>
        <div class="rt">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
        <span class="divssion"></span>
      </div>
      <div class="item mys_06" @click="goList(6)">
        <span class="lf">海关知识产权保护</span>
        <div class="rt">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
        <span class="divssion"></span>
      </div>
    </div>
    <button v-if="!isAuth" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" class="btn_auth">小程序授权</button>
  </div>
</template>

<script>
import mixins from 'mixins/';
export default {
  mixins: [mixins],
  data () {
    return {
      loading: false,
      headerUrl: '',
      nickname: '',
      isAuth: false,
      czCount: 0
    }
  },
  components: {},
  onShow () {
    this._init();
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
  methods: {
    // 初始化，getUserInfo的回调函数
    async _init() {
      this.isAuth = await this.API.interfaces.getAuthSetting('userInfo');
      if (this.isAuth) {
        this.findStaticCount();
      }
      this.headerUrl = this.$storage.get('headerUrl');
      this.nickname = this.$storage.get('nickname');
    },
    goList (type) {
      if (type === 1) {
        this.$router.push(`/pages/my/tsList`);
      } else if (type === 2) {
        this.$router.push(`/pages/my/ssList`);
      } else if (type === 3) {
        this.$router.push(`/pages/my/czList`);
      } else if (type === 4) {
        this.$router.push(`/pages/my/patentList`);
      } else if (type === 5) {
        this.$router.push(`/pages/my/qualityList`);
      } else if (type === 6) {
        this.$router.push(`/pages/my/customsList`);
      }
    },
    async findStaticCount () {
      try {
        let resp = await this.API.my.findStaticCount();
        this.czCount = resp.wyCount;
      } catch (error) {
        console.log('error', error)
        error.then((res) => {
          res ? this.findStaticCount() : ''
          this.headerUrl = this.$storage.get('headerUrl');
          this.nickname = this.$storage.get('nickname');
          console.log('err11', res)
        })
      }
    },
    // 授权直接登录，获取加密的用户信息
    async getUserInfo(e) {
      let self = this;
      let userInfo = e.target.userInfo;
      console.log('userInfo：', userInfo)
      if (userInfo) {
        await this.API.interfaces.setValidSession();
        await self.API.interfaces.getUserInfoByUser(e.target);
        this._init && this._init();
      }else{
        // 拒绝授权的情况
        /*wx.showModal({
          title: '提示',
          content: '拒绝授权,小程序将不可用',
          success:function(res){
            self.backIndexFn();
          }
        })*/
      }
    },
  }
}
</script>
<style lang="scss">
.myWrap{
  position: relative;min-height: 100%;background: #f8f8f8;
  .header{
    height:180px; background-color: #fff;display: flex;padding: 30px;
    .logoWrap{width: 120px;height: 120px;border-radius: 50%;display: flex;align-items: center;justify-content: center;
      img{width: 120px;height: 120px;border-radius: 50%;}
    }
    p{
      padding: 38px 0 0 30px;color: #333;font-size: 32px;line-height: 45px;max-width: 570px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-weight: 600;
      span{font-size: 32px; color: #0096FF;font-weight: 600;}
    }
  }
  .itemsWrap{margin-top: 20px;
    .item{
      position: relative;display: flex;justify-content: space-between;height:110px;padding: 35px 24px 0 30px;background: #fff;
      .lf{height:40px;color: #333;line-height: 40px;font-size:28px;padding-left: 56px;}
      .rt{
        vertical-align: top;
        span{height:40px;line-height: 40px;font-size:28px;color: #F64744;margin-right: 14px;}
        i{height:40px;line-height: 40px;color: #ddd;font-size: 20px;vertical-align: top;}
      }
      .divssion{position: absolute;right: 0;bottom: 1px;display:block;width:664px;height: 1px;background-color: #eee;}
      &:last-child{
        .divssion{display: none;}
      }
    }
    .mys_01 .lf{background: #fff url(~assets/img/my/img_01.png) 0 center no-repeat;background-size: 36px 36px;}
    .mys_02 .lf{background: #fff url(~assets/img/my/img_02.png) 0 center no-repeat;background-size: 36px 36px;}
    .mys_03 .lf{background: #fff url(~assets/img/my/img_03.png) 0 center no-repeat;background-size: 36px 36px;}
    .mys_04 .lf{background: #fff url(~assets/img/my/img_04.png) 0 center no-repeat;background-size: 36px 36px;}
    .mys_05 .lf{background: #fff url(~assets/img/my/img_05.png) 0 center no-repeat;background-size: 36px 36px;}
    .mys_06 .lf{background: #fff url(~assets/img/my/img_06.png) 0 center no-repeat;background-size: 36px 36px;}
  }
  .btn_auth{position: absolute;left: 0;top: 0;right: 0;height:860px;background-color: #fff;opacity: 0;}
}
 
</style>
