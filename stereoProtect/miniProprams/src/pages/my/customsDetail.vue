<template>
  <div class="orderDetail customsDetail">
    <div class="box" v-if="orderDetail.orderState==2">
      <h3>结案反馈</h3>
      <p>{{orderDetail.settleContent}}</p>
      <p class="time">反馈时间：{{orderDetail.settleTimeText}}</p>
      <i class="status" :class="['status'+ orderDetail.orderState]"></i>
    </div>
    <div class="box" v-if="orderDetail.orderState==0">
      <h3>受理情况</h3>
      <p>知产专家正火速赶来，请注意接听电话！</p>
      <i class="status" :class="['status'+ orderDetail.orderState]"></i>
    </div>
    <div class="box" v-if="orderDetail.orderState==1 || orderDetail.orderState==2">
      <h3>受理情况</h3>
      <p>{{orderDetail.acceptContent}}</p>
      <p class="time">受理时间：{{orderDetail.acceptTimeText}}</p>
      <i v-if="orderDetail.orderState==1" class="status" :class="['status'+ orderDetail.orderState]"></i>
    </div>
    <div class="box detail">
      <h3>详情信息</h3>
      <div class="item"><p class="des">知识产权类型</p><p class="content">{{orderDetail.intellectualPropertyTypeText}}</p></div>
      <div class="item"><p class="des">服务类型</p><p class="content">{{orderDetail.ciqServiceTypeText}}</p></div>
      <div class="item"><p class="des">线索说明</p><p class="content">{{orderDetail.content}}</p></div>
      <i v-if="orderDetail.orderState==-1" class="status" :class="['status'+ orderDetail.orderState]"></i>
    </div>
    <div class="box">
      <h3>联系信息</h3>
      <div class="item"><p class="des">联系人</p><p class="content">{{orderDetail.contactName}}</p></div>
      <div class="item"><p class="des">联系电话</p><p class="content">{{orderDetail.contactPhone}}</p></div>
    </div>
  </div>
</template>

<script>
import Filters from '../../utils/filters.js'
import mixins from 'mixins/';
export default {
  mixins: [mixins],
  data () {
    return {
      loading: false,
      orderDetail: {
        orderState: 0
      },
      orderSn: '',
    }
  },
  components: {

  },
  onLoad () {
    console.log('onLoad', this.timer)
  },
  onShow () {
    this.orderSn = this.$route.query.orderSn;
    this.getDetail();
  },
  onHide(){

  },
  onShareAppMessage() {
    let obj = {};
    obj = {
      title: '多维快速知识产权保护平台',
      path: "/pages/login/authorize",
      imageUrl: '/static/icon/test.jpg'
    }
    return obj;
  },
  methods: {
    // 图片预览
    preview (e) {
      console.log(e, e.target.dataset.index)
      let index = e.target.dataset.index+1;
      let urls = this.orderDetail.voucherUrlsArr;
      if (index) {
        wx.previewImage({
          current: urls[index-1], // 当前显示图片的http链接
          urls // 需要预览的图片http链接列表
        })
      }
    },
    async getDetail () {
      try {
        let data = await this.API.stereoProtect.findStereoProtectDetail(this.orderSn);
        data.settleTimeText = Filters.filters.dateFormat(data.settleTime);
        data.acceptTimeText = Filters.filters.dateFormat(data.acceptTime);
        data.intellectualPropertyTypeText = Filters.filters.intellectualPropertyType(data.intellectualPropertyType);
        data.ciqServiceTypeText = Filters.filters.ciqServiceType(data.ciqServiceType);
        data.voucherUrlsArr = data.voucherUrls.split(';');
        this.orderDetail = data;
        console.log('orderDetail：', this.orderDetail)
      } catch (error) {
        console.log('error：', error)
        error.then((res) => {
          res ? this.getDetail() : ''
        })
      }
    },
  }
}
</script>
<style lang="scss">

</style>
