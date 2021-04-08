<template>
  <div class="login_page">
    <swiper
      class="banner"
      :autoplay="true"
      :interval="3500"
      :duration="500"
      :circular="true"
      @change="bannerChange"
      indicator-color="rgba(255,255,255, .2)"
      indicator-active-color="#fff"
      :skip-hidden-item-layout="true"
    >
      <block>
        <swiper-item>
          <img src="../../assets/img/index/banner.png" mode="aspectFill">
        </swiper-item>
      </block>
    </swiper>
    <div class="content_wrap">
      
      <div class="box_wrap">
        <h2>电商侵权投诉/申诉</h2>
        <p>商标侵权、专利侵权、版权侵权、其他侵权投诉/申诉</p>
        <div class="box_footer" v-if="!isLogin">
          <button
            type="button"
            class="ts"
            open-type="getUserInfo"
            :data-type="1"
            @getuserinfo="getUserInfo"
          >立即投诉</button>
          <button
            type="button"
            open-type="getUserInfo"
            :data-type="2"
            @getuserinfo="getUserInfo"
          >立即申诉</button>
        </div>
        <div class="box_footer" v-if="isLogin">
          <button type="button" class="ts" :data-type="1" @click="goPage(1)">立即投诉</button>
          <button type="button" :data-type="2" @click="goPage(2)">立即申诉</button>
        </div>
      </div>
      <div class="box_wrap">
        <h2>网页侵权存证 保存侵权证据</h2>
        <p>淘宝、亚马逊等电商平台上涉及知识产权侵权行为,提交网址即可快速保存证据</p>
        <div class="box_footer">
          <button
            type="button"
            v-if="!isLogin"
            open-type="getUserInfo"
            :data-type="'/pages/index/subjectList'"
            @getuserinfo="getUserInfo"
            class="deal"
          >立即存证</button>
          <button
            type="button"
            v-else
            :data-type="'/pages/index/subjectList'"
            @click="goPage('/pages/index/subjectList')"
            class="deal"
          >立即存证</button>
        </div>
      </div>
      <div class="box_wrap">
        <h2>专利侵权判定咨询报告</h2>
        <p>最快24h判定，直通电商平台</p>
        <div class="box_footer">
          <button
            type="button"
            v-if="!isLogin"
            open-type="getUserInfo"
            :data-type="'/pages/index/patentForm'"
            @getuserinfo="getUserInfo"
            class="deal"
          >咨询办理</button>
          <button
            type="button"
            v-else
            :data-type="'/pages/index/patentForm'"
            @click="goPage('/pages/index/patentForm')"
            class="deal"
          >咨询办理</button>
        </div>
      </div>
      <div class="box_wrap">
        <h2>快速质量抽检鉴定</h2>
        <p>产品质量、真伪权威鉴定</p>
        <div class="box_footer">
          <button
            type="button"
            v-if="!isLogin"
            open-type="getUserInfo"
            :data-type="3"
            @getuserinfo="getUserInfo"
            class="deal"
          >咨询办理</button>
          <button type="button" v-else :data-type="3" @click="goPage(3)" class="deal">咨询办理</button>
        </div>
      </div>
      <div class="box_wrap">
        <h2>海关知识产权保护</h2>
        <p>海关知识产权备案、海关查处、专项行动</p>
        <div class="box_footer">
          <button
            v-if="!isLogin"
            type="button"
            open-type="getUserInfo"
            :data-type="4"
            @getuserinfo="getUserInfo"
            class="deal"
          >咨询办理</button>
          <button v-else type="button" :data-type="4" @click="goPage(4)" class="deal">咨询办理</button>
        </div>
      </div>
    </div>

    <!-- 在线咨询 -->
    <div @click="callPhone" :class="['wechat']"></div>
    <div :class="['weixin']">
      <img src="~assets/img/index/wechat.png" alt>
      <p>找客服</p>
      <button :class="['weixin', 'btnShow']" open-type="contact"></button>
    </div>
  </div>
</template>

<script>
import mixin from "mixins/";
import filter from "utils/filters";
import { async } from "q";
export default {
  mixins: [mixin],
  components: {},
  data() {
    return {
      isLogin: false,
      weixinStatus: false,
      checked:false
    };
  },
  async mounted() {
    
    this.$storage.remove("website");
    this.isLogin = (await this.API.interfaces.checkLogin()).isLogin;
  },
  onShareAppMessage() {
    let obj = {};
    obj = {
      title: "多维快速知识产权保护平台",
      path: "/pages/index/index",
      imageUrl: "/static/icon/test.jpg"
    };
    return obj;
  },

  onPageScroll(e) {},
  methods: {
    async getUserInfo(e) {
      let self = this;
      console.log("target", e.target.dataset.type);
      let userInfo = e.target.userInfo;
      if (userInfo) {
        await this.API.interfaces.setValidSession();
        await self.API.interfaces.getUserInfoByUser(e.target);
        this.goPage(e.target.dataset.type);
      } else {
        // 拒绝授权的情况
        wx.showModal({
          title: "提示",
          content: "拒绝授权,小程序将不可用",
          success: function(res) {}
        });
      }
    },
    callPhone() {
      wx.makePhoneCall({
        phoneNumber: "4000315426" // 仅为示例，并非真实的电话号码
      });
    },
    goPage(type) {
      if (typeof type == "number") {
        this.$router.push(`/pages/index/eCommerceForm?type=${type}`);
      } else {
        this.$router.push(type);
      }
    },
  },
  watch: {}
};
</script>

<style lang="scss">
page {
  background: #f8f8f8;
}
.login_page {
  padding-bottom: 60px;
  .banner {
    height: 400px;
    swiper-item {
      img {
        width: 100%;
        height: 400px;
      }
    }
  }
  .content_wrap {
    margin-top: -220px;
    position: relative;
    z-index: 1;
  }
  .box_wrap {
    margin: 20px 30px 0;
    background: #fff;
    border-radius: 6px;
    text-align: center;
    padding-top: 40px;
    box-shadow: 2px 4px 20px 0px rgba(11, 34, 67, 0.08);
    h2 {
      line-height: 45px;
      font-size: 32px;
      font-weight: 600;
    }
    p {
      font-size: 24px;
      color: #666;
      line-height: 33px;
      padding: 10px 60px 30px;
    }
    .box_footer {
      display: flex;
      border-top: 1px #eee solid;
      border-radius: 0 0 6px 6px;
      button {
        flex: 1;
        border: none;
        padding: 0;
        line-height: 88px;
        border-radius: 0;
        font-size: 28px;
        color: #0096ff;
        border-radius: 0 0 6px 0;
        &.ts {
          border-right: 1px solid #eee;
          border-radius: 0 0 0 6px;
        }
        &.deal {
          border-radius: 0 0 6px 6px;
        }
      }
    }
  }
  .wechat {
    border-radius: 50px;
    position: fixed;
    width: 100px;
    height: 100px;
    box-shadow: 0px 2px 20px 0px rgba(232, 26, 20, 0.2);
    right: 20px;
    z-index: 100;
    transition: all 0.3s ease;
    text-align: center;
    bottom: 150px;
    background: url("../../assets/img/index/phone.png") no-repeat 0 0;
    background-size: 100px 100px;
    z-index: 10;
  }
  .weixin {
    width: 100px;
    height: 100px;
    padding: 0;
    text-align: center;
    background: linear-gradient(
      123deg,
      rgba(159, 216, 142, 1) 0%,
      rgba(98, 185, 78, 1) 100%
    );
    position: relative;
    z-index: 10;
    box-shadow: 0px 2px 20px 0px rgba(30, 134, 31, 0.25);
    font-size: 0;
    position: fixed;
    bottom: 30px;
    right: 20px;
    border-radius: 60px;
    border: none;
    transition: all 0.3s ease;
    padding-top: 18px;
    img {
      width: 59px;
      height: 42px;
    }
    p {
      font-size: 18px;
      line-height: 24px;
      color: #fff;
      padding-top: 0px;
    }
    button {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      box-shadow: none;
      background: none;
      &.btnShow {
        z-index: 1;
      }
    }
  }
  .weixinShow {
    right: 20px;
  }
}
</style>
