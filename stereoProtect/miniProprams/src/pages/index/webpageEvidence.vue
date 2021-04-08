<template>
  <div class="webpage_wrap">
    <div class="inputItem">
      <div class="des"><span></span>申请人：</div>
      <input type="text" v-model="authInfo.apply_name" :maxlength="10" disabled placeholder-class="placeholder" placeholder="请填写申请人真实姓名" />
    </div>
    <div class="inputItem" style="position: relative">
      <div class="des"><span></span>存证网址（证据信息保存时间三年）：</div>
      <input type="text" v-model="url" placeholder-class="placeholder" placeholder="请输入侵权网址，点击“截取”保存图片" />
      <span class="webpage_btn" @click="regTest">网页截取</span>
    </div>
    <div class="webpage_des">
      注意： <br/>1.不支持对要求登录的网页进行存证； <br/>2.请直接复制浏览器地址栏网址，所存网址需含http/https等相关元素； <br/>3.上传的存证版权归用户所有，未经用户授权，平台绝对不会私自使用用户上传的作品。
    </div>
    <div :class="['webpage_item_wrap', isIphoneX ? 'phoneX' : '']" v-if="imgUrls.length">
      <p>证据信息：(保存时间三年）</p>
      <div class="webpage_item" v-for="(item, index) in imgUrls" :key="index">
        <div class="url">{{item.url}}</div>
        <div class="btn_wrap">
          <button type="button" @click.stop="previewImg(item)">预览</button>
          <button type="button" class="del" @click.stop="moveImg(index)">删除</button>
        </div>
      </div>
    </div>
    <div class="nextStepWrap">
      <div>5.00元/条，实付：<i style="color:#F64744;font-weight: 500;">0.00元(限时免费)</i></div>
      <button type="button" :class="['nextStepBtn', imgUrls.length ? '' : 'btnDisabled']" @click="shopCzb">立即存证</button>
      <div class="iphoneX" v-if="isIphoneX"></div>
    </div>
     <u-message/>
  </div>
</template>

<script>
import mixins from 'mixins/';
import {mapState} from 'vuex';
import { _debounce } from 'utils/public';
const { cartUrl, wxUrl, czUrl, indexUrl, userUrl } = CONFIG;
  export default {
    mixins: [mixins],
    data () {
      return {
        url:'',
        timer:'',
        isIphoneX: false,
        imgUrls:[],//网页截图列表
        czUrl:czUrl,
        cznum:0,
        notarizationPurpose:8,
        addUrls:false,
        evidId:[],
        showModal:false,
        order_sn:''
      }
    },
    computed:{
      ...mapState('auth', ['authInfo'])
    },
    onLoad () {
      wx.hideNavigationBarLoading()
      this.isIphoneX = this.judgeIsPhoneX();
      this.url = this.$storage.get('website') ? this.$storage.get('website') : '';
    },
    onUnload(){
      this.imgUrls = [];
      this.evidId = [];
      clearInterval(this.timer)
    },
    methods:{
      regTest () {//网页地址校验
        if (!this.url) {
          this.tips('请输入需要存证的网页地址');
          return false;
        }
        let strRegex = "^((https|http|ftp|rtsp|mms)?:\/\/)"; 
        let re = new RegExp(strRegex);
        if (re.test(this.url)){
          this.cutImage();
          console.log('成功')
        }else{
          this.tips('网址不合法，检查是否已包含http、https等元素')
          console.log('失败')
        }
      },
      async cutImage () {//截取网页
        if(this.imgUrls.length >= 5){
          this.tips('网页存证数量不能够超过五个')
          return false;
        }
        let data = {
          orderApplySubjectId: this.authInfo.apply_id,
          urls: [this.url]
        }
        this.addUrls = true;//初始化
        try {
          let cutImg = await this.API.evidence.addWebThread(data);
          if (cutImg.desc == '请求成功') {
            this.cutImgSuccess(cutImg.data[0].evidId);
          } else {
            this.tips(cutImg.desc);
          }
        }
        catch(e){}
      },
      cutImgSuccess (evidId) {//截图是否成功
        console.log('截图是否成功');
        wx.showLoading({
          title: '网页截取中...',
          mask: true
        })
        this.timer = setInterval(() => {
          this.cutImageSuccess(evidId)
        }, 1000)
      },
      async cutImageSuccess (evidId) {//截图是否成功请求接口
        let data = {
          evidId: evidId
        }
        try {
          let cutImg = await this.API.evidence.isSuccess4WebThread(data);
          if (cutImg.status == '1' && this.addUrls) {//请求十次或者是成功后就停止
            this.addUrls = false;
            clearInterval(this.timer);
            let imgUrl = {
              evidId: cutImg.evidId,
              url: this.url
            }
            console.log('url', this.url)
            this.url = '';
            this.evidId.push(cutImg.evidId);
            this.imgUrls.push(imgUrl);
            console.log('urls', this.imgUrls)
            wx.hideLoading();
            return;
          } else if (cutImg.resultMsg == 'fail' || cutImg.status === '0') {
            clearInterval(this.timer);
            wx.hideLoading();
            this.tips('截取失败，请重试')
          }
        }
        catch(e){}
      },
      previewImg (item) {//图片预览
        let url = `${this.czUrl}/EvidenceController/downloadWebEvid.do?evidId=${item.evidId}&access_token=${this.$storage.get('key')}`;
        console.log(url)
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [url] // 需要预览的图片http链接列表
        })
      },
      moveImg(index){//删除截图
      let self = this;
        wx.showModal({
          title: '',
          content: '删除后无法恢复，是否确认删除该数据？',
          success(res) {
            if (res.confirm) {
              self.imgUrls.splice(index, 1);
              self.evidId.splice(index, 1);
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      async czbNumber(){//存证包数量
        try{
          let cznum = await this.API.evidence.querycznum();
           this.cznum = cznum.data;
        }
        catch(e){}
      },
      shopCzb: _debounce(async function () {
        if (!this.imgUrls.length) {
          this.tips('请输入需要存证的网页地址并截取');
          return;
        }
        console.log(this.authInfo);
        wx.showModal({
          title: '温馨提示',
          content: '请您仔细核对网址，提交后不可修改',
          confirmText: '确认',
          showCancel: true,
          confirmColor: '#0096FF',
          success: (res) => {
            if (res.confirm) {
              this.search();
            } else if (res.cancel) {

            }
          }
        })
      }, 2000, true),
      async search () {
        let self = this;
        let data = {
          sourceType: 1,
          orderApplySubjectId: this.authInfo.apply_id,
          notarizationPurpose: 1,
          source: 1,
          notarizationType: 1,
          fileData: this.evidId,
          payType: 2,
          czChannel: 3
        }
        try{
          let resp = await this.API.evidence.addWebAttestations(data);
          if (resp.code === '0') {
            this.order_sn = resp.data[0].ordersn;
            // 初始化
            this.imgUrls = [];
            this.evidId = [];
            wx.showModal({
              title: '温馨提示',
              content: '网页侵权存证成功！',
              confirmText: '查看存证',
              cancelText: '回首页',
              showCancel: true,
              confirmColor: '#0096FF',
              success: (res) => {
                if (res.confirm) {
                  this.$router.replace(`/pages/my/czDetail?order_sn=${this.order_sn}`)
                } else if (res.cancel) {
                  wx.switchTab({
                    url: '/pages/index/index'
                  })
                }
              }
            })
          } else if (resp.code == '4010023') {
            wx.showModal({
              title: '温馨提示',
              content: '目前最多支持免费存证20条，更多请联系客服4000-315-426',
              confirmText: '联系客服',
              showCancel: false,
              confirmColor: '#0096FF',
              success: (res) => {
                wx.makePhoneCall({
                  phoneNumber: '4000315426' // 仅为示例，并非真实的电话号码
                })
              }
            })
          }
        }
        catch(e){
          wx.showModal({
           title: '温馨提示',
            content: '订单生成失败，请重试！',
            showCancel: true,
            confirmColor: '#0096FF',
            success: (res) => {
            }
          })
        }
      },
      // 弹框处理事件
      confirmFn (data) {
        console.log(data)
        if (data) {//继续存证
          //留在当前页面
          this.showModal = false;
        } else{//查看详情
          this.showModal = false;
          this.$router.push({path: '/pages/certificate/certificateWebDetail?order_sn='+this.order_sn});
        }
      },
    },
    onShow(){
      // this.czbNumber();
      clearInterval(this.timer)
      console.log(this.authInfo,'测试数据')
    }
  }
</script>

<style lang="scss">
page{background: #fff;}
.webpage_wrap{padding: 40px 30px 0;
  .inputItem{margin-left: 10px;margin-right: 10px;
    input{width: 480px;overflow: hidden;}
    .webpage_btn{position: absolute;right: 0;bottom: 15px;padding: 0 20px;line-height: 57px;border-radius: 28px;background:rgba(0,150,255,1);color: #fff;font-size: 26px;}
  }
  .webpage_des{background:rgba(253,247,247,1);padding: 20px;font-size: 24px;line-height: 40px;color: #999;margin-bottom: 40px;}
  .webpage_item_wrap{padding: 0 10px;padding-bottom: 204px;
    >p{font-size: 28px;line-height: 40px;}
    .webpage_item{display: flex;padding: 18px 0;border-bottom: 1px solid #eee;
      .url{width: 500px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;line-height: 40px;height: 40px;}
      .btn_wrap{flex: 1;transform: translateY(-2px);}
      button{padding: 0;border: none;border-radius: 0;width: 50%;text-align: right;line-height: 40px;color: #0096FF;
        &.del{color: #BBBBBB;}
      }
    }
    &.phoneX{padding-bottom: 272px;}
  }
  .nextStepWrap{background:rgba(255,255,255,1);padding: 20px;text-align: center;
    position: fixed;bottom: 0;left: 0;width: 100%;z-index: 10;
      >div{line-height: 40px;padding-bottom: 15px;font-size: 28px;}
      .nextStepBtn{display: block;padding: 0;border: none;line-height: 90px;color: #fff;font-size: 30px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(36,125,255,1) 100%);border-radius: 45px;}
      .btnDisabled{opacity: 0.5;}
      .iphoneX{height: 68px;background: #fff;}
    }
}
 
</style>
