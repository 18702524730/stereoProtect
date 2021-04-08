<template>
  <div class="web_certificate">
    <scroll-view :scroll-y="true" upper-threshold style="background-color:#f8f8f8;">
      <div class="web_list" v-if="czLists&&czLists.length" v-for="item in czLists" :key="item.orderSn" @click="toDetails(item)">
        <p class="row-between top_p"><span>订单编号：{{item.orderSn}}</span><span>{{item.createTime}}</span></p>
        <div class="info row-between">
          <img :src="item.imgUrl" alt="" mode="aspectFill" lazy-load="true" @click.stop="previewImage(item.imgUrl)">
          <div>
            <p class="url">{{item.url}}</p>
          </div>
        </div>
      </div>
      <div class="bottom_gif row-center" v-if="gifInfo">
        <text>加载中...</text>
      </div>

      <div class="footer mb30" v-if="nullInfo">到底啦~</div>
    </scroll-view>
    <!-- 没订单 -->
    <Null v-if="!czLists.length&&loading"></Null>
  </div>
</template>
<script>
import Filters from '../../utils/filters.js'
import Null from './components/Null.vue';
export default {
  components: {
    Null
  },
  data () {
    return {
      nullInfo: false,
      gifInfo: false,
      loading:false,
      total:0,
      pgCount:10,
      pgIndex:0,

      czLists:[]
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
  // 下拉刷新方法，与methods方法同级
  onPullDownRefresh() {
    // to doing..
    console.log('下拉刷新')
    this.search()
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  // 上拉加载，拉到底部触发
  onReachBottom() {
    // 到底部在这里需要做什么事情
    let pageAll = this.total / this.pgCount;
    if(this.pgIndex >= pageAll-1) {
      this.loading = true;
      this.nullInfo=true;
      this.gifInfo = false;
      return;
    } 
    this.pgIndex += 1;
    this.nullInfo=false;
    this.gifInfo = true;
    this.search()
    console.log('上拉加载',this.pgIndex)
  },
  methods:{
    previewImage(url){
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    },
    toDetails(item){
      this.$router.push({path: '/pages/my/czDetail?order_sn='+item.orderSn});
    },
    async search(){
      let self = this;
      let data = {
        state:3,
        notarizationType:1,
        page:this.pgIndex,
        size:this.pgCount
      }
      console.log(data)
      try{
        let resp = await this.API.stereoProtect.findNotarizationByNotarizationType(data);
        this.loading = true;
        this.total = resp.total_elements;
        resp.data.forEach((item) => {
          if (item.imgUrl) {
            item.imgUrl = item.imgUrl.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
          }
        });
        if(this.pgIndex == 0){
          self.czLists = resp.data;
          return;
        }
        for(var i = 0; i < resp.data.length; i++){
          self.czLists.push(resp.data[i]);
        }
      }
      catch(e){
      }
      
    }
  },
  mounted(){
    this.search()
  },
  computed:{
    czListsInfo:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return this.czLists.forEach((item) => {
          item.createTime = Filters.filters.dateFormat(item.createTime);
        })
      },
      set (value) {
      }
    }
  }
}
</script>

<style lang="scss">
.web_certificate{position: relative;top:0;left:0;right:0;bottom:0;background-color:#f8f8f8;height:100%;
  .web_list{
    min-height:247px;border-radius:6px;background-color:#fff;margin:20px 20px 0;padding: 20px;
    .top_p{width:100%;line-height:37px;height:37px;font-size:26px;color:#999;text-align:left;}
    .info{
      padding-top: 20px;
      img{width:150px;height:150px;border:1px solid #eee;}
      div{
        width:520px;padding-left: 20px;height:150px;overflow: hidden;
        .url{text-align:left;font-size:26px;line-height:37px;overflow: hidden;position: relative;height:150px;word-break: break-all;}
        .url::after{content: ""; position: absolute; bottom: 0; right: 0; padding-left: 40px;width:30px;height:40px;background:linear-gradient(90deg,rgba(255,255,255,0.3) 0%,rgba(255,255,255,1) 100%);}
        .timer{text-align:right;font-size:24px;color:#909090;line-height:30px;margin-right:2px;}
      }
    }
  }
  .footer{text-align: center;padding-top: 20px;color: #999;}
}

</style>
