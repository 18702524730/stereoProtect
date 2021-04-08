<template>
  <div :class="['page_wrap', isIphoneX ? 'phoneX_wrap' : '']">
    <p class="authDes">应公证机构要求，申请人需进行实名认证，以保证存证内容真实有效！</p>
    <div class="empty_wrap" v-if="!dataList.length">
      <img src="~assets/img/my/emptyImg.png" alt="">
      <p>还没有添加任何申请人哦！</p>
    </div>
    <div class="subject_item" v-for="(item, index) in dataList" @click="goResult(item)" :key="index">
      {{item.apply_name}}
      <span v-if="item.is_checked == 1">已认证</span>
    </div>
    <div class="bt_footer" :class="['bt_footer', isIphoneX ? 'bt_footer_X' : '']">
      <div class="btn_wrap">
        <button type="button" class="confirm_btn" @click="addUser">添加申请人</button>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from 'mixins/';
import { mapState, mapActions } from 'vuex';
export default {
  mixins: [mixins],
  data () {
    return {
      isIphoneX: false,
      dataList: []
    }
  },
  components: {

  },
  mounted () {
    this.isIphoneX = this.judgeIsPhoneX()
    this.subject(5);
  },
  methods: {
    ...mapActions('auth', [
      'initInfo'
    ]),
    // 去结果页
    goResult (item) {
      this.$store.dispatch('auth/initInfo', {info: item});
      if (item.is_checked == 1) { // 已认证跳转至存证页面
        this.$router.push({path: '/pages/index/webpageEvidence'})
      } else {
        this.$router.push({path: '/pages/index/addSubject?type=edit'}) // 未认证将信息带过去跳转至认证页面
      }
    },
    addUser () {
      if (this.dataList.length >= 10) {
        wx.showModal({
          title: '温馨提示',
          content: '最多只可添加10个申请人',
          showCancel: false,
          confirmText: '联系客服',
          confirmColor: '#0096FF',
          success: (res) => {
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: '4000315426' // 仅为示例，并非真实的电话号码
              })
            }
          }
        })
        return;
      }
      this.$router.push({path: '/pages/index/addSubject'})
    },
    // 获取申请人、企业列表
    async subject (type) {
      console.log('type', type, this.$storage.get('key'))
      let data = await this.API.subject.subject({typesList: type, access_token: this.$storage.get('key')});
      console.log('data', data);
      if (data.elements && data.elements.length) {
        data.elements.map(item => {
          if (item.apply_type === 2) {
            item.applyText = '大陆企业'
          } else {
            item.applyText = '大陆个人'
          }
          switch (item.is_checked) {
            case 1:
              item.authText = '已认证';
              return;
            case 2:
              item.authText = '待审核';
              return;
            case 3:
              item.authText = '待验证';
              return;
            case 4:
              item.authText = '认证失败';
              return;
            default:
              item.authText = '';
          }
        })
      }

      this.dataList = data.elements || [];
      console.log('data', this.dataList)
    }
  }
}
</script>

<style lang="scss">
page{background: #fff;}
.page_wrap{padding: 20px 30px 161px;
  &.phoneX_wrap{padding-bottom: 228px;}
  .authDes{padding: 20px;background:rgba(253,247,247,1);line-height: 40px;color: #F64744;}
  .empty_wrap{text-align: center;font-size: 0;padding-top: 148px;
    img{width: 422px;height: 384px;}
    p{font-size: 28px;color: #999;line-height: 40px;padding-top: 10px;}
  }
  .subject_item{padding: 30px;line-height: 45px;color: #333;font-size: 32px;font-weight: 600;margin-top: 20px;border: 1px solid #eee;border-radius: 6px;
    position: relative;
    >span{width: 112px;text-align: center;line-height: 48px;border-radius: 24px;background:linear-gradient(270deg,rgba(255,149,0,1) 0%,rgba(255,190,77,1) 100%);position: absolute;top: 30px; right: 30px;font-size: 24px;color: #fff;font-weight: 400;}
  }
  .bt_footer{position: fixed;bottom:0; text-align: center;z-index: 10000; width: 100%;line-height: 96px;font-size: 32px;background: #fff;left: 0;
    .btn_wrap{height: 130px;padding-top: 20px;
      button{display: block; border: none;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(36,125,255,1) 100%);line-height: 90px;padding: 0;margin: 0 40px;color: #fff;border-radius: 45px;font-size: 30px;}
    }
  }
  .bt_footer_X{padding-bottom: 68px;}
}
 
</style>
