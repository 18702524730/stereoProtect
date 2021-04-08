<template>
  <div class="orderDetailWrap">
    <div class="header">
      <h2 v-if="orderDetail.orderState != -1" :class="{'red': !orderDetail.orderState}">{{orderDetail.orderStateText}}</h2>
      <h1 v-if="orderDetail.orderState == -1" :class="{'red': !orderDetail.orderState}">{{orderDetail.orderStateText}}</h1>
      <p v-if="!orderDetail.orderState">知产专家正火速赶来，请注意接听电话！</p>
      <p v-if="orderDetail.orderState == 1 && !orderDetail.paymentState">支付<i>剩余{{residueTime}}</i>，超时服务将自动关闭。 付款完成后将即刻开始为您出具报告，请尽快支付！</p>
      <p v-if="orderDetail.orderState == 2">正在为您出具报告，请耐心等待</p>
      <h3 v-if="orderDetail.orderState == 2 || orderDetail.orderState == 3">报告金额：￥{{orderDetail.reportAmountStr}}</h3>
      <p v-if="orderDetail.orderState == 1" class="price"><i>￥</i>{{orderDetail.reportAmountStr}}</p>
    </div>
    <div class="detail">
      <div class="item"><p class="des">专利类型</p><p class="content">{{orderDetail.patentTypeText}}</p></div>
      <div class="item"><p class="des">专利申请号</p><p class="content">{{orderDetail.patentApplySn}}</p></div>
      <div class="item"><p class="des">专利名称</p><p class="content">{{orderDetail.patentName}}</p></div>
      <div class="item"><p class="des">联系人</p><p class="content">{{orderDetail.contactName}}</p></div>
      <div class="item"><p class="des">联系电话</p><p class="content">{{orderDetail.contactPhone}}</p></div>
      <div class="item"><p class="des">侵权商品链接</p><p class="content">{{orderDetail.infringeGoodUrl}}</p>
      <button type="button" @click="copy">复制</button></div>
      <div class="botTtem" v-if="orderDetail.infringeImgArr">
        <p>侵权商品图片</p>
        <div class="imgWrap" @click="preview">
          <img v-for="(item, index) in orderDetail.infringeImgArr" :key="index" :data-index="index" mode="aspectFill" :src="item" alt="">
          <!-- <img mode="aspectFill" src="~assets/img/index/report.png" alt="">
          <img mode="aspectFill" src="~assets/img/index/report.png" alt="">
          <img mode="aspectFill" src="~assets/img/index/report.png" alt="">
          <img mode="aspectFill" src="~assets/img/index/report.png" alt="">
          <img mode="aspectFill" src="~assets/img/index/report.png" alt=""> -->
        </div>
      </div>
    </div>
    <div class="nextStepWrap" v-if="orderDetail.orderState == 1 && !orderDetail.paymentState">
      <button type="button" :class="['nextStepBtn', 'btnDisabled']" @click="pay">立即付款</button>
      <div class="iphoneX" v-if="isIphoneX"></div>
    </div>
    <div class="nextStepWrap" v-if="orderDetail.orderState == 3">
      <button type="button" class="preview" @click="previewPDF">预览报告</button>
      <div class="iphoneX" v-if="isIphoneX"></div>
    </div>
  </div>
</template>

<script>
import mixins from 'mixins/';
export default {
  mixins: [mixins],
  data () {
    return {
      isIphoneX: false,
      loading: false,
      orderDetail: {},
      orderSn: '',
      residueTime: "0天00小时00分00秒",
      timer: '',
      doubleClickState: false
    }
  },
  components: {

  },
  onLoad () {
    console.log('onLoad', this.timer)
  },
  onShow () {
    clearInterval(this.timer);
    this.timer = null;
    this.isIphoneX = this.judgeIsPhoneX();
    this.orderSn = this.$route.query.orderSn;
    this.getDetail();
  },
  onHide(){

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
    pay () {
      if (this.doubleClickState) {
        return;
      }
      this.doubleClickState = true;
      this.wechatPay({orderSn: this.orderSn, paymentSn: this.orderDetail.paymentSn, openid: this.orderDetail.openid}, () => {
        this.doubleClickState = false;
        this.getDetail();
      }, (error) => {
        console.log('payError', error)
        this.doubleClickState = false;
      });
    },
    ShowCountDown(leftTime){
      let leftsecond = parseInt(leftTime/1000);
      let dayFirst=Math.floor(leftsecond/(60*60*24));
      let hour=Math.floor((leftsecond-dayFirst*24*60*60)/3600);
      let minute=Math.floor((leftsecond-dayFirst*24*60*60-hour*3600)/60);
      let second=Math.floor(leftsecond-dayFirst*24*60*60-hour*3600-minute*60);
      second = second < 10 ? '0' + second : second;
      minute = minute < 10 ? '0' + minute : minute;
      hour = hour < 10 ? '0' + hour : hour;
      this.residueTime = dayFirst+"天"+hour+"小时"+minute+"分"+second+"秒";
    },
    previewPDF () {
      if (this.loading) {
        return;
      }
      this.loading = true;
      wx.downloadFile({
        // 示例 url，并非真实存在
        url: this.orderDetail.reportUrl,
        success: (res) => {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath,
            success: (res) => {
              this.loading = false;
              console.log('打开文档成功')
            }
          })
        },
        fail: err => { this.loading = false; }
      })
    },
    async pdfToImage () {
      let data = await this.API.stereoProtect.preview({pdf_url: this.orderDetail.reportUrl});
      let imgArr = [];
      data.urls.forEach(item => {
        item = item.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
        imgArr.push(item);
      })
      wx.previewImage({
        current: imgArr[0], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      })
      console.log('data', data);
    },
    // 图片预览
    preview (e) {
      console.log(e, e.target.dataset.index)
      let index = e.target.dataset.index+1;
      let urls = this.orderDetail.infringeImgArr;
      if (index) {
        wx.previewImage({
          current: urls[index-1], // 当前显示图片的http链接
          urls // 需要预览的图片http链接列表
        })
      }
    },
    async getDetail () {
      try {
        let data = await this.API.stereoProtect.findPatentJudgeOrderDetail({orderSn: this.orderSn});
        switch (data.orderState) {
          case 0:
            data.orderStateText = '待受理';
            break;
          case 1:
            data.orderStateText = '已受理';
            break;
          case 2:
            data.orderStateText = '报告出具中...';
            break;
          case 3:
            data.orderStateText = '报告完成';
            break;
          case -1:
            data.orderStateText = '已关闭';
            break;
          default:
            data.orderStateText = '待受理'
        }
        switch (data.patentType) {
          case 1:
            data.patentTypeText = '外观设计专利';
            break;
          case 2:
            data.patentTypeText = '发明专利';
            break;
          case 3:
            data.patentTypeText = '实用新型专利';
            break;
          default:
            data.patentTypeText = '外观设计专利'
        }
        if (data.reportUrl) {
          data.reportUrl = data.reportUrl.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
        }
        this.orderDetail = data;
        this.orderDetail.reportAmountStr = this.orderDetail.reportAmount.toFixed(2);
        console.log('orderderail', this.orderDetail)
        if (data.lefttime) {
          this.ShowCountDown(data.lefttime);
          this.timer = setInterval(() => {
            console.log('timer', this.timer)
            data.lefttime -= 1000;
            this.ShowCountDown(data.lefttime);
          }, 1000);
        }
      } catch (error) {
        error.then((res) => {
          res ? this.getDetail() : ''
        })
      }
    },
    copy () {
      WXP.setClipboardData({
        data: this.orderDetail.infringeGoodUrl
      })
      .then(() => {
        this.$mptoast('已复制链接到剪贴板');
      }).catch((err) => {});
    }
  }
}
</script>
<style lang="scss">
page{background: #fff;}
.orderDetailWrap{background: #f8f8f8;
  .header{background: #fff;padding: 40px 60px;text-align: center;margin-bottom: 20px;
    h2{line-height: 45px;font-size: 32px;font-weight: 600;padding-bottom: 0;color: #333;
      &.red{color: #F64744;}
    }
    h1{font-size: 32px;line-height: 45px;padding: 30px 0;color: #999;}
    p{font-size: 26px;color: #999;line-height: 37px;padding-top: 15px;
      i{color: #F64744;}
    }
    .price{font-size: 46px;color: #F64744;padding: 30px 0 0;font-weight: 600;
      i{font-size: 28px;}
    }
    >h3{font-size: 28px;color: #333;line-height: 40px;padding-top: 20px;}
  }
  .detail{padding: 30px 30px 120px;line-height: 37px;font-size: 26px;background: #fff;
    .item{display: flex;padding-bottom: 25px;
      .des{flex:1;color: #999;}
      .content{max-width: 350px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;padding-right: 8px;}
      button{padding: 0;width: 88px;line-height: 43px;border: 1px solid #ddd;border-radius: 29px;color: #333;transform: translateY(-0px);font-size: 24px;}
    }
    .botTtem{
      p{color: #999;font-size: 26px;line-height: 37px;}
      div{display: flex;flex-wrap:wrap;font-size: 0;
        img{width: 150px;height: 150px;margin: 25px 30px 0 0;
          &:nth-child(4n+4){margin-right: 0;}
        }
      }
    }
  }
  .nextStepWrap{background:rgba(255,255,255,1);padding: 20px;text-align: center;
    position: fixed;bottom: 0;left: 0;width: 100%;z-index: 10;
      .nextStepBtn{display: block;padding: 0;border: none;line-height: 90px;color: #fff;font-size: 30px;background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);border-radius: 45px;}
      .iphoneX{height: 68px;background: #fff;}
      .preview{display: block;padding: 0;border: 1px solid #0096FF;color: #0096FF;font-size: 30px;border-radius: 45px;line-height: 88px;}
    }
  .phoneXWrap{
    padding-bottom: 276px;
  }
}
</style>
