<template>
  <div class="list_info patent_list_info">
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
        <div class="item"><p class="des">报告编号：</p><p class="content">{{item.orderSn}}</p><p :class="['btn', !item.orderState ? 'redBtn' : '']">{{item.orderStateText}}</p></div>
        <div class="item"><p class="des">专利申请号：</p><p class="content">{{item.patentApplySn}}</p></div>
        <div class="item"><p class="des">侵权商品链接：</p><p class="content">{{item.infringeGoodUrl}}</p></div>
        <div class="itemBot">
          <p v-if="!item.orderState">知产专家正火速赶来，请注意接听电话！</p>
          <p class="itemDes" v-if="item.orderState == 1 && !item.paymentState">
            <i class="black litle">待付金额:</i><i class="red litle">￥</i><i class="big red">{{item.reportAmount}}</i>
          </p>
          <p class="btnWrap">
            <button type="button">详情</button>
            <button type="button" v-if="item.orderState == 1 && !item.paymentState" class="red" @click.stop="pay(item)">去付款</button>
            <button type="button" v-if="item.orderState == 3" @click.stop="previewPDF(item.reportUrl)">预览报告</button>
          </p>
        </div>
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
      <div class="txt mt10">暂无订单信息</div>
    </div>
    <u-message/>
    <!-- 弹窗 -->
    <u-modal :showModal="showModal" :options="options" content="确认取消该订单吗？" @confirmBtn="confirmFn" @hide="hideFn" />
  </div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  import { _debounce } from 'utils/public';
  import mixin from 'mixins/';
  export default {
    mixins: [mixin],
    data(){
      return{
        nullInfo: false,
        gifInfo: false,
        pgIndex: 1,
        orderState: '',
        dataLists: [],
        pgCount: 10,
        scrollY: false,
        indexTop:0,
        scrollH:0,
        total:0,
        loaded:false,
        options: {
          confirmText: '确认',
          confirmColor: '#4272FF'
        },
        showModal:false,
        orderFictitiousSn:'',
        doubleClickState: false
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
      let query = this.$root.$mp.query;
      console.log(this.$root)
      this.orderState = this.orderState ? this.orderState : query.orderState ? query.orderState - 0 : 99;
      console.log('orderState:',this.orderState)
      //this.search()
    },
    computed:{
      dataListInfo:{
        // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
        get () {
          return this.dataLists.forEach((item) => {
            item.createTime = Filters.filters.dateFormat(item.createTime);
            item.orderAmount = Filters.filters.priceformat(item.orderAmount);
          })
        },
        set (value) {
        }
      },
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
      // 支付
      pay (item) {
        if (this.doubleClickState) {
          return;
        }
        this.doubleClickState = true;
        this.wechatPay({orderSn: item.orderSn, paymentSn: item.paymentSn, openid: item.openid}, () => {
          this.doubleClickState = false;
          this.pgIndex = 1;
          this.search();
        }, (error) => {
          console.log('payError', error)
          this.doubleClickState = false;
        });
      },
      cancel(item) {
        this.showModal = true;
        this.orderFictitiousSn = item.orderSn;
      },
      // 签约
      toSigning(item) {
        let dqyState = item.dqyState;
        let orderSn = item.orderSn;
        if (dqyState === 0) {
          this.$router.push({
            path: '/pages/order/submitMaterial',
            query: {
              orderSn
            }
          })
        } else {
          this.goH5(orderSn);
        }
      },
      // 申请邮寄
      applyPost(item) {
        let orderSn = item.orderSn;
        this.$router.push({
          path: '/pages/my/selectAddress',
          query: {
            orderSn
          }
        })
      },
      // 获取第三方h5页面跳转链接
      async goH5(orderSn) {
        let resp = await this.API.orderBs.startNotary(orderSn);
        if (resp.url) {
          this.$storage.set('signingUrl', resp.url);
          this.$router.push({
            path: '/pages/order/webView',
          })
        }
      },
      // 隐藏弹窗
      hideFn () {
        this.showModal = false;
      },
      // 弹窗回调
      async confirmFn (data) {
        if (data) {
          try {
            let resp = await this.API.order.cancleOrder(this.orderFictitiousSn);
            this.search()
          }
          catch (e) {
          }
        }
        else{
          console.log('取消回调')
        }
        this.showModal = false;
      },
      removeList(item){//删除关闭订单
        this.showModal = true;
        this.orderFictitiousSn = item.orderFictitiousSn
      },
      goDetail(orderSn) {
        this.$router.push({path: '/pages/my/patentDetail?orderSn=' + orderSn});
      },
      scrollT(e){
        console.log(e.detail)
        if(e.detail.scrollTop > 10){
          this.scrollY = true;
        }else{
          this.scrollY = false;
        }
        this.$apply();
      },
      async search(){//初始化
        let self = this;
        let data = {
          //orderState:this.orderState,
          pgIndex:this.pgIndex,
          pgCount:this.pgCount
        }
        try {
          let resp = await this.API.stereoProtect.findPatentJudgeOrderList(data);
          this.loaded = true;
          this.total = resp.totalElements;
          resp.elements.forEach((item, index) => {
            item.orderStateText = Filters.filters.patentOrderState(item.orderState);
            item.reportAmount = Filters.filters.priceformat(item.reportAmount);
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
      orderStateChange(state) {//切换大类初始化
        this.orderState = state;
      },
      previewPDF: _debounce(async function (reportUrl) {
        reportUrl = reportUrl.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
        wx.downloadFile({
          url: reportUrl,
          success: (res) => {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath,
              success: (res) => {
                console.log('打开文档成功')
              }
            })
          },
          fail: err => {}
        })
      }, 800, true)
    },
    watch: {
      orderState() {
        if(this.orderState || this.orderState === 0){
          this.pgIndex = 1;
          this.nullInfo=false;
          this.loaded = false;
          this.search();
          /*wx.pageScrollTo({
            scrollTop: 0
          })*/
        }
      },
    }
  }
</script>
<style lang="scss">
  // 列表部分样式
  .patent_list_info{background-color:#f8f8f8;height:100%;position: relative;padding-top: 20px;
    // 列表内容部分
    .orderWrap{padding: 0 20px 20px;
      .orderItem{padding: 20px;background: #fff;border-radius: 6px;margin-bottom: 20px;font-size: 26px;line-height: 37px;
        .item{display: flex;padding-bottom: 20px;
          .des{color: #999;}
          .content{color: #333;max-width: 480px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
          .btn{flex: 1;text-align: right;color: #999;}
          .redBtn{color: #F64744;}
        }
        .itemBot{padding-top: 19px;border-top: 1px solid #eee;display: flex;text-align: right;
          p{line-height: 56px;color:#F64744;
            .black{color: #333;}
            .litle{font-size: 24px;}
            .big{font-size: 30px;}
            .red{color:#F64744;}
          }
          .btnWrap{flex: 1;text-align: right;}
          button{line-height: 54px;border: 1px solid #ddd;padding: 0;border-radius: 29px;color: #333;margin-left: 10px;width: 145px;
            &.red{background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);color: #fff;border: none;line-height: 56px;}
          }
        }
      }
    }
  }
</style>
