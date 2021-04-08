<template>
  <div class="certificate_detail">
    <div class="images">
      <scroll-view class="imgList" scroll-x :class="{'maxWidth':detailsInfo.egzCzhUrl&&detailsInfo.zjlCzhUrl}">
        <img v-if="detailsInfo.egzCzhUrl" @longpress="upImage(detailsInfo.egzCzhUrl)" @click="lookImage(detailsInfo.egzCzhUrl)" :src="detailsInfo.egzCzhUrl" alt="">
        <img v-if="detailsInfo.zjlCzhUrl" @longpress="upImage(detailsInfo.zjlCzhUrl)" @click="lookImage(detailsInfo.zjlCzhUrl)" :src="detailsInfo.zjlCzhUrl" alt="">
      </scroll-view>
    </div>
    <scroll-view @touchstart="touchStart" @touchend="touchEnd" class="infoList" :class="{'maxHeight':bolHeight,'minHeight':!bolHeight}" scroll-y :scroll-top="firstTop">
      <div class="data_lists">
        <img src="~assets/img/deposit/more.png" alt="">
        <p>存证网址：<span class="name">{{detailsInfo.url}}</span><span v-if="detailsInfo.url" class="look_img" @click="lookFileImage">查看</span></p> 
        <p>申请人：{{detailsInfo.name}}</p>
        <p>申请人身份证：{{detailsInfo.identificationCard}}</p>
        <p>存证渠道：{{czChannel}}</p>
        <p>存证种类：{{notarizationPurpose}}</p>
        <p>存证申请时间：{{createTime}}</p>
        <p>存证完成时间：{{updateTime}}</p>
        <p style="margin-bottom: 0;">存证到期时间：{{validTime}}</p>
      </div>
    </scroll-view>
    <null v-if="false"></null>
  </div>
</template>

<script>
import Filters from '../../utils/filters.js'
import Null from './components/Null.vue';
import mixins from 'mixins/';
import { log } from 'util';
const { czUrl } = CONFIG;
export default {
  components: {
    Null
  },
  mixins: [mixins],
  data () {
    return {
      detailsInfo:{},
      bolHeight:false,
      firstTop:null,
      touchDotY:0,
      touchMoveY:0,
      access_token:''
    }
  },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    obj = {
      path: "/pages/index/index"
    }
    return obj;
  },
  methods:{
    upImage(imageUrl){
      wx.getImageInfo({ //将获取图片的信息
        src: imageUrl,// 需要下载的图片
        success(res){
          let filePath = res.path //得到本地的路径
          wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success(res) {
              console.log(res)
              wx.showToast({
                title: '保存成功成功',
                icon: 'success'
              })
            }
          })
        }
      })
    },
    async search(){
      let data = {
        order_sn:this.$root.$mp.query.order_sn
      }
      try{
        this.detailsInfo = await this.API.stereoProtect.findNotarizationDetails(data);
      }
      catch(e){}
    },
    lookImage(url){
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    },
      // 触摸开始事件
    touchStart(e) {
      if (this.isIphoneX) {return;}
      this.touchDotY = e.touches[0].pageY;
      this.bolHeight = true;
      console.log(this.touchDotY,'开始')
    },
     // 触摸结束事件
    touchEnd(e) {
      if (this.isIphoneX) {return;}
      this.touchMoveY = e.mp.changedTouches[0].pageY;
      if(this.touchMoveY<this.touchDotY){//向上
        this.bolHeight = true;
        this.firstTop = 187;
        console.log('向上')
      }else{
        this.firstTop = 0;
        this.bolHeight = false;
        console.log('向下')
      }
      console.log(this.touchMoveY,'结束')
    },
    lookFileImage(){
      let url = czUrl+'/cunnar/downSaveFile.do?fileId='+this.detailsInfo.fileId+'&access_token='+this.access_token;;
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    }
  },
  onShow(){
    this.access_token = this.$storage.get('key');
    this.isIphoneX = this.judgeIsPhoneX();
    this.search();
  },
  computed:{
    createTime:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return Filters.filters.dateFormat(this.detailsInfo.createTime);
      },
      set (value) {
      }
    },
    updateTime:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return Filters.filters.dateFormat(this.detailsInfo.updateTime);
      },
      set (value) {
      }
    },
    validTime:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return Filters.filters.dateFormat(this.detailsInfo.validTime);
      },
      set (value) {
      }
    },
    notarizationPurpose(){
      return Filters.filters.notarizationUsesformat(this.detailsInfo.notarizationPurpose);
    },
    czChannel(){
      return Filters.filters.czChannelFormat(this.detailsInfo.czChannel);
    },
    

  }
}
</script>

<style lang="scss">
.certificate_detail{position: absolute;top:0;left:0;right:0;bottom:0;background-color:#f8f8f8;
  .images{overflow: scroll;width:100%;position: relative;z-index: 1;}
  .maxWidth{width:1240px;}
  .imgList{overflow-x: scroll;height:720px;margin-top: 65px;white-space: nowrap;text-align:center;
    img{width:508px;height:720px;}
  }
  .imageList{width:530px;height:750px;margin-left: 70px;}
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .maxHeight{height:676px;
    .data_lists{top:346px;}
  }
  .minHeight{top:785px;
    .data_lists{top:60px;}
  }
  .infoList{position: absolute;bottom:0;z-index: 20;text-align:center;font-size:0;
    img{width: 200px;height: 40px;position: absolute;top:-38px;left:50%;margin-left: -100px;}
    .data_lists{background-color:#fff;width:670px;border-radius:20px 20px 0 0;box-shadow:0 2px 6px 0 rgba(0,0,0,0.07);margin:0 auto 0;padding-left: 40px;padding-top:40px;height:630px;position: absolute;left:0;right:0;bottom:0;
      p{font-size:26px;color:#333;line-height:37px;margin-bottom: 20px;width:590px;text-align: left;position: relative;overflow: hidden;text-overflow:ellipsis;white-space :nowrap;}
        .look_img{position:absolute;right:0;top:0;color:#22aaf9;}
        .name{width: 375px;overflow: hidden;text-overflow:ellipsis;white-space :nowrap;display: inline-block;vertical-align: top;}
    }
  }

}

</style>
