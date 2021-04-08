<template>
  <div class="list_info ts_list_info">
    <!-- <div class="tab weui-flex" :class="{'boxShow':scrollY}">
      <div class="ml30 mr30 weui-flex__item" :class="{'bdc':orderState == 99}" @click="orderStateChange(99)">全部</div>
      <div class="weui-flex__item mr30" :class="{'bdc':orderState == 0}" @click="orderStateChange(0)">待付款</div>
      <div class="weui-flex__item mr30" :class="{'bdc':orderState == 1}" @click="orderStateChange(1)">未完成</div>
      <div class="weui-flex__item mr30" :class="{'bdc':orderState == 2}" @click="orderStateChange(2)">已完成</div>
      <div class="weui-flex__item mr30" :class="{'bdc':orderState == -1}" @click="orderStateChange(-1)">已关闭</div>
    </div> -->
    <template v-if="dataLists && dataLists.length">
    <scroll-view :scroll-y="true" class="orderWrap" v-if="dataLists && dataLists.length && loaded" upper-threshold @bindscrolltoupper="scrollT" @bindscroll="scrollT" @bindscrolltolower="addLists" :scroll-top="indexTop">
      <div class="orderItem" v-for="(item, index) in dataLists" :key="index" @click="goDetail(item.orderSn)">
        <div class="item"><p class="des">订单编号：</p><p class="content">{{item.orderSn}}</p><p :class="['btn', 'status'+ item.orderState]">{{item.orderStateText}}</p></div>
        <div class="item"><p class="des">投诉平台：</p><p class="content">{{item.platform}}</p></div>
        <div class="item"><p class="des">投诉网址：</p><p class="content">{{item.website}}</p></div>
        <div class="item"><p class="des">提交时间：</p><p class="content">{{item.createTimeText}}</p></div>
      </div>

      <div class="bottom_gif row-center" v-if="gifInfo">
        <text>加载中...</text>
      </div>

      <div class="footer mb30" v-if="nullInfo">到底啦~</div>
    </scroll-view>
    </template>

    <!-- 没订单 -->
    <div class="column-start null_single" v-if="dataLists && !dataLists.length && loaded">
      <img src="~assets/img/my/emptyImg.png">
      <div class="txt mt10">还没有任何记录哦</div>
    </div>
    <u-message/>
  </div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  import mixin from 'mixins/';
  export default {
    mixins: [mixin],
    data(){
      return{
        nullInfo: false,
        gifInfo: false,
        pgIndex: 1,
        pgCount: 10,
        orderState: '',
        dataLists: [],
        scrollY: false,
        indexTop:0,
        total:0,
        loaded:false,
      }
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
      if(this.pgIndex >= pageAll) {
        this.loaded = true;
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
    onShow(){
      /*let query = this.$root.$mp.query;
      console.log(this.$root)
      this.orderState = this.orderState ? this.orderState : query.orderState ? query.orderState - 0 : 99;
      console.log('orderState:',this.orderState)*/
      this.search()
    },
    computed:{
    },
    // 监听用户点击页面内转发按钮
    onShareAppMessage() {
      let obj = {};
      obj = {
        title: '多维快速知识产权保护平台',
        path: "/pages/index/index",
      }
      return obj;
    },
    methods: {
      goDetail(orderSn) {
        this.$router.push(`/pages/my/tsDetail?orderSn=${orderSn}`);
      },
      async search(){//初始化
        let self = this;
        let data = {
          // orderState:this.orderState,
          stereoProtectType: 1, //1,电商侵权投诉；2,电商维权申诉,3;质量抽检鉴定;4,海关知产保护
          pgIndex:this.pgIndex,
          pgCount:this.pgCount
        }
        try {
          let resp = await this.API.stereoProtect.findStereoProtectOrderList(data);
          this.loaded = true;
          this.total = resp.totalElements;
          resp.elements.forEach((item, index) => {
            item.orderStateText = Filters.filters.orderState(item.orderState);
            item.createTimeText = Filters.filters.dateFormat(item.createTime);
          });
          self.gifInfo = false;
          if(this.pgIndex == 1){
            self.dataLists = resp.elements;
            return;
          }
          self.dataLists = [...self.dataLists, ...resp.elements]
        }
        catch (e) {
          if(self.pgIndex > 1){
            self.pgIndex -= 1;
          }
          this.gifInfo = false;
        }
      },
      /*
      scrollT(e){
        console.log(e.detail)
        if(e.detail.scrollTop > 10){
          this.scrollY = true;
        }else{
          this.scrollY = false;
        }
        this.$apply();
      },
      orderStateChange(state) {//切换大类初始化
        this.orderState = state;
      },
      */
    },
    watch: {
      /*orderState() {
        if(this.orderState || this.orderState === 0){
          this.pgIndex = 1;
          this.nullInfo=false;
          this.loaded = false;
          this.search();
          wx.pageScrollTo({
            scrollTop: 0
          })
        }
      },*/
    }
  }
</script>
<style lang="scss">
</style>
