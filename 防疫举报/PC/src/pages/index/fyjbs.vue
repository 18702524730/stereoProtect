<template>
  <div class="fyjbhome_pages" id="home_page">
    <div>
      <leagueHeader></leagueHeader>
    </div>
    <div class="topbanner">
      <!-- <img src="~assets/img/fyjb/banner.jpg" alt=""> -->
    </div>
    <div class="ebgbox">
      <div class="fyjbtext">
        <div class="titletext">
            疫情就是命令·防控就是责任
        </div>
        <p>为响应国家市场监督管理总局2月6日下发的《关于依法从重从快严厉打击新型冠状病毒疫情防控期间违法行为的意见》，北京反侵权假冒联盟开通打击侵权假冒防疫物资线索举报平台，相关举报线索将推送至国家相关行政执法部门，并跟踪线索处置进度。</p>

        <p>
          以下电商及社交媒体平台将对本平台推送的侵权假冒防疫物资线索快速响应和处置：
          <strong>阿里巴巴、京东、拼多多等</strong>。
        </p>
        <div class="iconbox">
          <img src="~assets/img/fyjb/ali.png" alt />
          <img src="~assets/img/fyjb/jd.jpg" alt />
          <img src="~assets/img/fyjb/pdd.png" alt />
          <!-- <img src="~assets/img/fyjb/wx.png" alt /> -->
          
        </div>
        <p>
         以下防伪公司向符合国家认证要求的防疫物资生产企业免费捐赠一定数量的防伪标签，帮助消费者快速鉴别：
          <strong>兆信股份等</strong>。
        </p>
        <div class="iconbox">
          <img src="~assets/img/fyjb/zx.png" alt />
        </div>
        <p>
          以下电子存证平台在疫情期间向企业提供存取证费用减免服务：
          <strong>杭州互联网公证处知识产权服务平台、保全网等</strong>。
        </p>
        <div class="iconbox">
          <a href="https://ips.netnotary.cn/activity" target="_blank"><img src="~assets/img/fyjb/gongzheng.png" alt /></a>
          <a href="https://ips.netnotary.cn/activity" target="_blank"><img src="~assets/img/fyjb/baoquan.png" alt /></a>
        </div>
        <p>
          以下知识产权服务公司在疫情期间向防疫物资生产企业免费捐赠知识产权申请服务和电商平台侵权假冒监测服务：
          <strong>拾贝知识产权等</strong>。
        </p>
        <div class="iconbox">
          <a href="https://zixun.ipsebe.com/#/index?type=1" target="_blank"><img src="~assets/img/fyjb/sebe.png" alt /></a>
        </div>
      </div>
	  <div>
        <div class="evidence">
          <div class="evidencemsg">
            <p></p>
            <h3>打击侵权假冒防疫物资·线索举报</h3>
          </div>

          <h3 class="requireItem">举报对象：</h3>
          <div class="inputItem">
            <input type="text" placeholder="请输入举报对象" v-model="dataObj.reportObject" maxlength="40" />
            <span class="err" v-if="err1">{{err1}}</span>
          </div>
          <h3 class="requireItem">线下地址/线上网址：</h3>
          <div class="inputItem hasmore">
            <!-- <span @click="tomap"><img src="~assets/img/home/location.png" alt=""></span> -->
            <input type="text" placeholder="请输入举报单位的线下地址或线上网址" v-model="dataObj.address" />
            <span class="err" v-if="err2">{{err2}}</span>
          </div>
          <!-- <h3 class="requireItem">商品/服务名称：</h3>
          <div class="inputItem">
            <input
              type="text"
              placeholder="请输入商品/服务名称"
              v-model="dataObj.productName"
              maxlength="40"
            />
          </div> -->
          <!-- <h3 class="requireItem">举报类型：</h3>
		  <div class="inputItem hasmore" @click="toselect">
			  <span class="moreicon"><i></i></span>
			  <input type="text" placeholder="请选择" readonly v-model="type">
          </div>-->
          <h3>线索描述：</h3>
          <div class="desc">
            <div class="fontnum">
              <span style="color:#0455B1;">{{dataObj.clueDesc.length}}</span>
              <span>/2000</span>
            </div>
            <textarea
              placeholder="请详细填写时间、地点、事情经过、基本诉求等"
              maxlength="2000"
              v-model="dataObj.clueDesc"
            ></textarea>
          </div>
          <h3>证据照片：</h3>
          <div class="picbox">
            <div class="selectpic" v-for="(item,key) in evidenceArr" :key="key">
              <img :src="item" alt />
              <i class="close" @click="remove(key)"></i>
            </div>
            <div class="hasselect" v-if="evidenceArr.length<5">
              <uploader
                @complete="setUploadedData"
                @resetUploader="resetUploader"
                :valueName="'standby2'"
                :url="standby2"
                :fileName="standby2_name"
                :size="5"
                :extensions="'jpg,jpeg,bmp,png'"
                :canPreview="false"
              ></uploader>
            </div>
          </div>
          <p class="selectintr">支持格式jpg/jpeg/png，文件最大5MB，数量最多5个。</p>
		  <div class="wxts">
			  您填写的个人信息将严格保密，仅向行政执法部门提供，用于线索核实。
		  </div>
          <h3 class="requireItem">姓名：</h3>
          <div class="inputItem">
            <input
              type="text"
              placeholder="请输入联系人姓名"
              v-model="dataObj.contactName"
              maxlength="20"
              @keyup="getname"
              id="nmblur"
            />
            <span class="err" v-if="err3">{{err3}}</span>
          </div>
          <h3 class="requireItem">联系电话：</h3>
          <div class="inputItem">
            <input
              type="text"
              placeholder="请输入联系人手机号码"
              v-model="dataObj.contactPhone"
              maxlength="11"
              @keyup="getpho"
              id="phblur"
            />
            <span class="err" v-if="err4">{{err4}}</span>
          </div>
        </div>
        <div class="submitbtn" :class="{'notempty': dataObj.reportObject&&dataObj.address&&dataObj.contactPhone&&dataObj.contactName}" @click="check">立即提交</div>
      </div>
    </div>
    <div class="evidencefooter">
      <leagueNewFooter></leagueNewFooter>
    </div>
    <div class="mask" v-if="visible"></div>
    <div class="confirm_box" v-if="visible">
      <div class="resultbox">
        <img src="~assets/img/fyjb/s.png" alt="">
        <p>提交成功!</p>
      </div>
      <span class="close" @click="visible=false">
        <i class="ant-modal-close-icon anticon anticon-close">
          <svg
            viewBox="64 64 896 896"
            data-icon="close"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            class
          >
            <path
              d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            ></path>
          </svg>
        </i>
      </span>
      <p>感谢您为抗击疫情做出的贡献，由于收到举报信息较多，平台工作人员会在8小时内与您联系进行回访，请留意接听电话。</p>
      <div class="btn_wrap">
        <!-- <span class="btn no" @click="visible=false">关闭</span> -->
        <span class="btn yes" @click="visible=false">确定</span>
      </div>
    </div>
    <div class="mask" v-if="evisible"></div>
    <div class="confirm_box" v-if="evisible">
      <div class="resultbox">
        <img src="~assets/img/fyjb/e.png" alt="">
        <p>提交失败!</p>
      </div>
      <span class="close" @click="evisible=false">
        <i class="ant-modal-close-icon anticon anticon-close">
          <svg
            viewBox="64 64 896 896"
            data-icon="close"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            class
          >
            <path
              d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            ></path>
          </svg>
        </i>
      </span>
      <p>您已提交过相关信息，请耐心等待！感谢您为抗击疫情做出的贡献，平台工作人员会在8小时内与您联系进行回访，请留意接听电话。</p>
      <div class="btn_wrap">
        <!-- <span class="btn no" @click="visible=false">关闭</span> -->
        <span class="btn yes" @click="evisible=false">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from "utils/filters";
import leagueNewFooter from "components/public/fyjbfooter.vue";
import leagueHeader from "components/public/fyjbheader.vue";
import uploader from "components/uploader/uploader.vue";
const { adminUrl, indexUrl } = CONFIG;
const Data = {
  contactName: "",
  contactPhone: "",
  clueDesc: "",
  reportObject: "",
  source:1,//1,web;2,h5
  address: "",
  reportObject: "" 
};
export default {
  data() {
    return {
      dataObj: { ...Data },
      isexist: false,
      standby2: "",
      standby2_name: "",
      evidenceArr: [],
      err1:'',
      err2:'',
      err3:'',
      err4:'',
      type: "",
      isIos: false,
      show: false,
      submitted: false,
      visible: false,
      evisible: false,
      serviceTypeList: [
        { name: "侵犯知识产权", method: this.typeone },
        { name: "伪劣商品", method: this.typetwo }
      ]
    };
  },
  components: {
    leagueNewFooter,
    leagueHeader,
    uploader
  },
  computed:{
    isempty(){
      let  r = false;
      for(var k in this.dataObj){
        if(this.dataObj[k]){
          r = true;
          break
        }
      }
      return r
    }
  },
  mounted() {
    console.log(this.isempty)
    // let fills = this.$store.state.progress.fills;
    // let arr = this.$store.state.progress.pics;
    // if (fills) {
    //   this.dataObj = { ...fills };
    //   if (fills.reportType == 1) {
    //     this.type = "侵犯知识产权";
    //   } else if (fills.reportType == 2) {
    //     this.type = "伪劣商品";
    //   } else {
    //     this.type = "";
    //   }
    // }
    // if (arr) {
    //   this.evidenceArr = [...arr];
    // }
    // let local = this.$store.state.progress.location;
    // this.dataObj.address = local;
    let user = navigator.userAgent.toLowerCase();
    if (user.indexOf("iphone") > -1||user.indexOf("android") > -1) {
      window.location.href = 'http://jb.caasa.org.cn/h5/#/index'
    }
    console.log(user);
  },
  methods: {
    // uppic(){
    // 	this.chooseImage(function(data){
    // 		alert(1)
    // 		alert(JSON.stringify(data))
    // 	});
    // },
    toselect() {
      this.show = true;
    },
    typeone() {
      this.dataObj.reportType = 1;
      this.type = "侵犯知识产权";
    },
    typetwo() {
      this.dataObj.reportType = 2;
      this.type = "伪劣商品";
    },
    resetUploader(valueName) {
      this[valueName] = "";
      this[valueName + "_name"] = "";
    },
    tomap() {
      this.$store.dispatch("set_fills", this.dataObj);
      if (this.evidenceArr.length > 0) {
        this.$store.dispatch("set_pics", this.evidenceArr);
      }
      this.$router.push("/map");
    },
    //上传成功后设置数据
    setUploadedData(data) {
      var dat = data.data;
      let d = Object.assign({}, dat);
      let isrepeat = false;
      let md = this.evidenceArr;
      for (let i = 0; i < md.length; i++) {
        if (d.url == md[i]) {
          isrepeat = true;
          break;
        }
      }
      if (!isrepeat) {
        md.push(d.url);
      }
      if (d.url) {
        this[data.valueName] = d.url;
        this[data.valueName + "_name"] = d.fileName;
        // this.trademarkData.contract_url = d.url;
      } else {
        this.uploaderErrCallback(d);
      }
      console.log(data);
    },
    remove(i) {
      this.evidenceArr.splice(i, 1);
    },
    getname() {
      let exp = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[~!@#$%^&*(),./\\=<>'";:{}\|`\[\]]|[0-9]/g;
      this.dataObj.contactName = this.dataObj.contactName.replace(exp, "");
    },
    getpho() {
      let exp = /[^0-9]/g;
      this.dataObj.contactPhone = this.dataObj.contactPhone.replace(exp, "");
    },
    checkValid() {
      this.err1='';
      this.err2='';
      this.err3= '';
      this.err4='';
      if (!this.dataObj.reportObject) {
        this.err1="举报对象不能为空";
        return false;
      }
      if (!this.dataObj.address) {
        this.err2="线下地址/线上网址不能为空";
        return false;
      }
      if(this.dataObj.clueDesc.length>2000){
        this.$message.warning('线索描述大于2000字')
        return false
      }
      if (!this.dataObj.contactName) {
        this.err3="姓名不能为空";
        return false;
      }
      if (!this.dataObj.contactPhone) {
        this.err4="联系电话不能为空";
        return false;
      }

      if (!/^1\d{10}$/.test(this.dataObj.contactPhone)) {
        this.err4="手机号码格式不正确";
        return false;
      }

      return true;
    },
    // chooseImg(){
    // 	var self = this;
    // 	//self.testData = 'click55';
    // 	this.chooseImage(function(dataURL){
    // 	//self.testData = dataURL;
    // 	alert(dataURL)
    // 	if (dataURL.indexOf('base64') === -1) {
    // 		dataURL = 'data:image/jpeg;base64,' + dataURL
    // 	}
    // 	self.$store.dispatch('change_Img', {
    // 		img: dataURL
    // 	});
    // 	// changeAnotherImg用于重新上传后的原图
    // 	self.$store.dispatch('change_another', {
    // 		anotherImg: dataURL
    // 	});
    // 	});
    // },
    check() {
      let res = this.checkValid();
      if (res) {
        this.handleOk();
      }
    },
    async handleOk() {
      let data = { ...this.dataObj };
      if (this.evidenceArr.length > 0) {
        data.evidenceArr = this.evidenceArr;
      }

      if (this.submitted) {
        return;
      }
      this.submitted = true;
      try {
        let resp = await this.API.homePage.fyjbsubmit(data);
        // this.$message.success('提交成功');
        this.submitted = false;
        this.visible = true
        this.dataObj = { ...Data };
        this.evidenceArr = [];
        window.scrollTo(0, 0);
      } catch (e) {
        this.submitted = false;
        this.evisible = true
        // this.$message.error(e && e.response.data && e.response.data.msg);
      }
    },
  }
};
</script>


<style lang="scss">
.fyjbhome_pages {
  input,
  textarea {
    outline: none;
    border: none;
  }
  width: 100%;
  .topbanner {
    height: 550px;
    background-image: url(~assets/img/fyjb/banner.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: auto 100%;
    >img{
      display: block;
      height: 100%;
      max-width: 100%;
    }
  }
  .ebgbox {
    position: relative;
    width: 1140px;
    padding: 0 70px 60px;
    margin-top: -160px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 60px;
    background-color: #fff;
    box-shadow: 0px -30px 40px 0px rgba(0, 26, 85, 0.15);
    color: #333;
  }
  .fyjbtext {
    // width: 1200px;
	position: relative;
    padding: 50px 120px 20px;
	top: -60px;
    margin-bottom: -50px;
    background-color: #fff;
	box-shadow: 0px -30px 40px 0px rgba(0, 26, 85, 0.15);
    color: #333;
    .iconbox {
      padding: 10px 0;
      text-align: center;
      a{
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
      }
      img {
        width: 70px;
        height: 70px;
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .titletext {
      margin-bottom: 20px;
      text-align: center;
	  font-size: 26px;
	  font-weight: bold;
	  height: 27px;
	  color: #0455b1;
	  line-height: 27px;
    font-weight: bold;
    }
    > p {
      font-size: 16px;
      line-height: 27px;
      text-indent: 2em;
    }
  }
  .evidence {
    background-color: #fff;
    padding: 20px 120px;
    border-radius: 4px;
    margin-bottom: 10px;
	.wxts{
		height:20px;
		margin-bottom: 10px;
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(247,148,0,1);
		line-height:20px;
	}
    > h3 {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #333333;
      margin-bottom: 10px;
    }
    .desc {
      position: relative;
      padding: 10px 15px;
      line-height: 20px;
      border: 1px solid #e6e6e6;
      border-radius: 2px;
      margin-bottom: 10px;
      .fontnum {
        position: absolute;
        right: 0;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        color: #999;
        top: -25px;
      }
      textarea {
        padding: 0;
        margin: 0;
        width: 100%;
        min-height: 100px;
        font-size: 14px;
        line-height: 18px;
        word-break: break-all;
        color: #333;
      }
    }
  }
  .tips {
    margin-top: -12px;
    margin-bottom: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(247, 148, 0, 1);
    line-height: 33px;
  }
  .evidencemsg {
    position: relative;
    height: 45px;
    margin-bottom: 15px;
    &:before,
    &:after {
      position: absolute;
      top: 20px;
      // transform: translateY(-50%);
      content: "";
      width: 1px;
      height: 3px;
      overflow: hidden;
      background-color: #0455b1;
    }
    &:before {
      left: 0;
    }
    &:after {
      right: 0;
    }
    > p {
      position: relative;
      top: 22px;
      border-bottom: 1px dashed #0455b1;
    }
    > h3 {
      position: absolute;
      left: 180px;
      top: 0;
      // -ms-transform: translateX(-50%);
      // -moz-transform: translateX(-50%);
      // -webkit-transform: translateX(-50%);
      // -o-transform: translateX(-50%);
      // transform: translateX(-50%);
	    width: 400px;
      height: 45px;
	    line-height: 45px;
      font-size: 26px;
      color: #0455b1;
      text-align: center;
      background-color: #fff;
      z-index: 999;
      font-family: "PingFangSC-Semibold", "PingFangSC";
      font-weight: bold;
    }
  }
  .requireItem {
    &:before {
      display: inline-block;
      content: "*";
      color: #db1f1c;
      font-size: 14px;
      vertical-align: middle;
    }
  }
  .inputItem {
    position: relative;
    padding: 10px 15px;
    height: 40px;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
    line-height: 40px;
    font-size: 14px;
    margin-bottom: 20px;
    input {
      float: left;
      width: 100%;
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #333;
    }
    > span.err {
      position: absolute;
      height: 14px;
      line-height: 14px;
      bottom: -17px;
      left: 0px;
      font-size: 12px;
      color: #f64744;
    }
  }
  .picbox {
    overflow: hidden;
    .selectpic {
      position: relative;
      width: 120px;
      height: 120px;
      float: left;
      margin-right: 20px;
      margin-bottom: 10px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.15);
      &:last-child {
        margin-right: 0;
      }
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 17px;
        height: 17px;
        // background-color: #000;
        // opacity: 0.3;
        background-image: url(~assets/img/fyjb/close.png);
        background-position: center center;
        background-size: 100% 100%;
        text-align: center;
        line-height: 17px;
        font-size: 17px;
        color: #fff;
        // background-color: #000;
        border-radius: 50%;
        cursor: pointer;
        // opacity: 0.3;
      }
    }
    .hasselect{
      float: left;
      margin-bottom: 10px;
    }
  }
  .selectintr {
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 17px;
    color: #999;
  }
  .submitbtn {
    width: 400px;
    height: 60px;
    border-radius: 30px;
    background-color: #db1f1c;
    color: #fff;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    opacity: 0.5;
  }

  .notempty{
    opacity: 1;
  }
  .evidencefooter {
    background-color: #0255b1;
    opacity: 0.95;
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .confirm_box {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 260px;
    margin-top: -130px;
    margin-left: -200px;
    background-color: #fff;
    z-index: 2001;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    padding: 20px;
    .resultbox{

      text-align: center;
      >img{
        width: 56px;
        height: 56px;
        margin-bottom: 15px;
      }
      >p{
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-bottom: 15px;
      }

    }
    p {
      font-size: 16px;
      line-height: 20px;
      color: #333;
    }
    .btn_wrap {
      text-align: center;
      padding-top: 15px;
      span {
        display: inline-block;
        width: 92px;
        height: 36px;
        line-height: 36px;
        border-radius: 2px;
        border: 1px solid #e6e6e6;
        font-size: 16px;
        color: #666;
        text-align: center;
        cursor: pointer;
      }
      .yes {
        background-color: #0e63b0;
        border-color: #0e63b0;
        color: #fff;
      }
    }
    .close {

      position: absolute;
      right: 20px;
      top: 20px;
      color: #ddd;
      width: 30px;
      height: 30px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>


