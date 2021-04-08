<template>
  <div class="index_page">
    <pubHeader></pubHeader>
    <div class="bgcolor">
      <div class="bgpic">
        <div class="title">社会共治立体保护体系</div>
        <p class="introduce">中国产学研合作促进会反侵权假冒创新战略联盟在国家相关部门指导和支持下，联合行业商协会、国际组织、企业、志愿者团队等，与阿里巴巴、京东、360、微店等电商及社交媒体平台共建诚信投诉通道，共同构建多维度、线上线下联动的立体保护体系。</p>
      
      <div class="atcenter">
        <ul class="platformList clearfix">
            <li>
              <div class="correct" ><img :src="picArr[0]"/></div>
              <div class="opposite"><img :src="picArr[1]" /></div>
              <h4>协调保护</h4>
              <p>司法联动，打击保护</p>
            </li>
            <li>
              <div class="correct"><img :src="picArr[2]" /></div>
              <div class="opposite"><img :src="picArr[3]" /></div>
              <h4>电商保护</h4>
              <p>平台保护，有效打假</p>
            </li>
            <li>
              <div class="correct"><img :src="picArr[4]"/></div>
              <div class="opposite"><img :src="picArr[5]" /></div>
              <h4>国际化保护</h4><p>海外合作，延伸权利</p></li>
            <li>
              <div class="correct"><img :src="picArr[6]" /></div>
              <div class="opposite"><img :src="picArr[7]" /></div>
              <h4>专业保护</h4><p>审查专家，深度严查</p></li>
            <li>
              <div class="correct"><img :src="picArr[8]" /></div>
              <div class="opposite"><img :src="picArr[9]" /></div>
              <h4>海关保护</h4><p>跨境贸易，出入无忧</p></li>
            <li>
              <div class="correct"><img :src="picArr[10]" /></div>
              <div class="opposite"><img :src="picArr[11]" /></div>
              <h4>技术保护</h4><p>智能运用，创新安全</p></li>
            <li>
              <div class="correct"><img :src="picArr[12]" /></div>
              <div class="opposite"><img :src="picArr[13]" /></div>
              <h4>志愿者保护</h4><p>群策群力，全面治理</p></li>
            <li>
              <div class="correct"><img :src="picArr[14]" /></div>
              <div class="opposite"><img :src="picArr[15]" /></div>
              <h4>质检保护</h4><p>定期抽检，打击假冒</p></li>
        </ul>
      </div>
      <div class="whitebg"></div>
      </div>
    </div>
    <!-- 核心优势 -->
    <div class="bgbox">
      <div class="advantage">
        <div class="tit">核心优势</div>
        <ul>
          <li>
            <div class="itembg">
              <div class="itembg1"></div>
              <div class="pic bg1"></div>
            </div>
            <p>积极协调政府、行业商协会、电商及社交媒体平台、品牌企业、知识产权权利人、志愿者，共同推动知识产权保护事业的发展</p>
            
            
          </li>
          <li>
            <div class="itembg">
              <div class="itembg2"></div>
              <div class="pic bg2"></div>
            </div>
            <p>拥有国内顶尖知识产权领域专家智库，为全球企业、知识产权权利人提供专业、优质服务</p>
          </li>
          <li>
            <div class="itembg">
              <div class="itembg3"></div>
              <div class="pic bg3"></div>
            </div>
            <p>通过多元调解、快速维权、质量品控、诚信投诉、协调行政执法保护、支持司法维权为手段促进产业知识产权治理和转化升级的社会共治立体保护体系，形成了有效打击侵犯知识产权及制售假冒伪劣商品的立体保护模式，实现多方共赢，成为有效协调相关各方进行知识产权保护的重要力量</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 案例 -->
    <div class="case" :class="{bgpic1: picindex==0,bgpic2: picindex==1,bgpic3: picindex==2}">
      <div class="shade" ></div>
      <div class="contentbox">
        <div class="title">典型案例</div>
        <div class="slidebox">
            <div  class="slider">
              
              <ul class="slides">
                  <li :class="{active: picindex ==0}" @mouseover="enter" @mouseout="leave">
                    <div class="bluebg"></div>
                    <div class="text-item">
                        <div class="titles">立体保护新模式成立智能短交通联盟进行专利授权许可</div>
                        <div class="item-content">
                          <div>
                            <p>电动平衡车是近年来快速兴起的智能短途交通时尚出行工具，随着市场规模的扩大，假冒伪劣平衡车产品不断涌现。</p>
                            <p>行业龙头赛格威-纳恩博和杭州骑客共拥有平衡车产品的95%以上的核心专利，但两者专利诉讼纠纷也不断，商务部、海关总署多次调停未果。</p>
                            <p>联盟组织纳恩博、骑客进行了深度交流，促使双方停止专利战。2018年5月29日京交会上，联盟、赛格威、骑客三方共同发起智能短交通行业知识产权联盟，并构建电动平衡车专利池。</p>
                            <p>通过社会共治立体打击与专利池授权许可结合的模式，截止18年底短短六个月内，已有 20 余家平衡车企业加入联盟，并帮助权利人与 10余家平衡车厂商签订专利授权许可合同，预计19年专利授权许可费达到千万级。</p>
                          </div>
                          
                          <div class="rightpic">
                            <img :src="pic3" alt="">
                          </div>
                        </div>
                      </div>
                  </li>
                  <li :class="{active: picindex ==1}" @mouseover="enter" @mouseout="leave">
                    <div class="bluebg"></div>
                    <div class="text-item">
                        <div class="titles">小猪佩奇线上线下协同打击侵权案</div>
                        <div class="item-content">
                          <div>
                            <p>英国eOne 在中国享有“Peppa Pig（小猪佩奇）”商标专有权和著作权。随着小猪佩奇动画片在中国受欢迎程度的不断提高，其授权的儿童产品也出现了假冒侵权现象。 </p>
                            <p>联盟联合各大电商平台提供涉案数据，进行线上到线下的一系列数据信息对比、调查并进行固证，最终成功于2017年11月9日协同扬州市公安局生态科技新城分局对生产厂家、仓库完成执法打击，当场查获了儿童牙膏10余万支、儿童牙刷20余万支、儿童洗发沐浴露二合一2万余瓶、儿童湿纸巾10余万包、儿童漱口杯8万余只等大量侵权假冒商品，涉案金额高达450余万。</p>
                          </div>
                          
                          <div class="rightpic">
                            <img :src="pic2" alt="">
                          </div>
                        </div>
                      </div>
                  </li>
                  
                  <li :class="{active: picindex ==2}" @mouseover="enter" @mouseout="leave">
                      <div class="bluebg"></div>
                      <div class="text-item">
                        <div class="titles">江中制药线上线下“雷霆行动”打假案</div>
                        <div class="item-content">
                          <p>2017年4月26日，在联盟协调组织下，江中集团安全管理部、阿里巴巴打假特战队、湖南省公安厅、娄底市公安局等多个单位协同作战。通过大数据分析，准确得出售假犯罪行为的规律，快速完成了案件线索汇总、犯罪地址定位、犯罪证据调取等工作，历时不到一个月，在湖南省娄底市冷水江城区成功捣毁一个制售“江中猴姑”米稀产品的生产窝点，现场收缴了大量假冒伪劣产品及造假原材料，抓获犯罪嫌疑人3名。</p>
                          <div class="rightpic">
                            <img :src="pic1" alt="">
                          </div>
                        </div>
                      </div>
                    
                  </li>
              </ul>
              <div class="indicator">
                <span v-for="(item, index) in indicators" :key="index" :class="{active: picindex==index}" @click="change(index)"></span>
              </div>
          </div>

        </div>
      </div>
        
      
    </div>
    <!-- 内容 -->
    <div class="content_wrap">
      <div class="con_container">
        <!-- <h3 class="title">知识产权快速维权-30分钟获取维权方案</h3> -->
        <div class="form_box">
					<div class="flexbox">
						<div class="leftpart">
							<div class="form_item">
								<label>
									<i>*</i>联系人：
								</label>
                <i class="inputbox">
								<input
									type="text"
									v-model="dataObj.contactName"
									maxlength="10"
									name
									placeholder="请输入联系人名字"
                  @keyup="getname"
								>
                </i>
								<span class="err">{{err1}}</span>
							</div>
							<div class="form_item">
								<label>
									<i>*</i>联系方式：
								</label>
                <i class="inputbox">
								<input
									type="text"
									v-model="dataObj.contactPhone"
									maxlength="11"
									name
									placeholder="请输入手机号码"
                  @keyup="getpho"
								>
                </i>
								<span class="err">{{err2}}</span>
							</div>
						</div>
						<div class="form_item">
							<label><i></i>维权需求：</label>
							<textarea
								name
								v-model="dataObj.content"
								maxlength="200"
								placeholder="请简单描述您的维权需求"
							></textarea>
							<span>{{(dataObj.content && dataObj.content.length) || 0}}/200</span>
							<span class="err">{{err3}}</span>
						</div>
					</div>
          
          
          <div
            class="ask_btn"
            :class="{'hight': dataObj.contactName && dataObj.contactPhone}"
            @click="ask"
          >立即咨询</div>
        </div>
      </div>
    </div>
    <pubFooter></pubFooter>
    <!-- 弹窗 -->
    <div class="mask" v-if="visible"></div>
    <div class="confirm_box" v-if="visible">
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
      <p>您的咨询我们已经收到，专家会在30分钟内进行回访，请注意接听电话！</p>
      <div class="btn_wrap">
        <span class="btn no" @click="visible=false">关闭</span>
        <span class="btn yes" @click="visible=false">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from "utils/filters";
import pubHeader from "components/public/header.vue";
import pubFooter from "components/public/leagueFooter.vue";
import { setInterval, setTimeout, clearTimeout, clearInterval } from 'timers';
const Data = {
  contactName: "",
  contactPhone: "",
  content: "",
  // source: 1, //来源:1,联盟官网;2,联盟服务号;3,拾贝服务号;4,拾贝订阅号
  consultationType: 11 //咨询类型:维权咨询
};
export default {
  data() {
    return {
      dataObj: { ...Data },
      err1: "",
      err2: "",
      err3: "",
      submitted: false,
      visible: false,
      ashow: false,
      pic1: require('../../assets/img/index/001.jpg'),
      pic2: require('../../assets/img/index/002.jpg'),
      pic3: require('../../assets/img/index/003.jpg'),
      picArr:[
        require('../../assets/img/index/platform_01.png'),
        require('../../assets/img/index/platform_01_active.png'),
        require('../../assets/img/index/platform_02.png'),
        require('../../assets/img/index/platform_02_active.png'),
        require('../../assets/img/index/platform_03.png'),
        require('../../assets/img/index/platform_03_active.png'),
        require('../../assets/img/index/platform_04.png'),
        require('../../assets/img/index/platform_04_active.png'),
        require('../../assets/img/index/platform_05.png'),
        require('../../assets/img/index/platform_05_active.png'),
        require('../../assets/img/index/platform_06.png'),
        require('../../assets/img/index/platform_06_active.png'),
        require('../../assets/img/index/platform_07.png'),
        require('../../assets/img/index/platform_07_active.png'),
        require('../../assets/img/index/platform_08.png'),
        require('../../assets/img/index/platform_08_active.png'),
      ],
      picindex: 0,
      indicators:[1,2,3],
      show1: true,
      show2: false,
      show3: false,
      timer: null,
    };
  },
  components: {
    pubHeader,
    pubFooter
  },
  mounted() {
    this.API.homePage.statis();
    
    this.setslider();
    $(".platformList").find('li').hover(function(){
    $(this).find(".correct").removeClass("test2");
    $(this).find(".opposite").removeClass("test");
    $(this).find(".correct").addClass("test");
    $(this).find(".opposite").addClass('test2');
  },function(){
    $(this).find(".correct").removeClass("test");
    $(this).find(".opposite").removeClass("test2");
    $(this).find(".correct").addClass("test2");
    $(this).find(".opposite").addClass('test');
  });
  },
  methods: {
    enter(){
      clearInterval(this.timer);
    },
    leave(){
      this.setslider()
    },
    setslider(){
      clearInterval(this.timer)
      let that = this;
      this.timer =setInterval(()=>{
        that.slider()
      },3000)
    },
    change(i){
      let that = this;
      clearInterval(this.timer);
      this.picindex = i;
      setTimeout(()=>{
        that.setslider()
      },3000)
    },
    changes(i){
      this.picindex = i;
    },
    slider(){
      let _this = this;
      this.picindex++;
      if(this.picindex>=3){
        this.picindex =0
      }
      this.changes(this.picindex)
    },
    checkValid() {
      this.err1 = "";
      this.err2 = "";
      this.err3 = "";
      let { contactName, contactPhone, content } = this.dataObj;
      if (!contactName) {
        this.err1 = "联系人不能为空";
        return false;
      }
      if (!contactPhone) {
        this.err2 = "联系电话不能为空";
        return false;
      }
      if (!/^1\d{10}$/.test(contactPhone)) {
        this.err2 = "手机号码格式不正确";
        return false;
			}
      if (this.dataObj.content && this.dataObj.content.length > 200) {
        this.err3 = "维权说明不能超过200个字符";
        return false;
      }
      return true;
    },
    getname(){
      let exp = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[~!@#$%^&*(),./\\=<>'";:{}\|`\[\]]|[0-9]/g;
      this.dataObj.contactName = this.dataObj.contactName.replace(exp,'')
    },
    getpho(){
      let exp = /[^0-9]/g;
      this.dataObj.contactPhone = this.dataObj.contactPhone.replace(exp,'')
    },
    async ask() {
      let s = localStorage.getItem('source');
      this.dataObj.source = s;
      if (this.checkValid()) {
        if (this.submitted) {
          return;
        }
        this.submitted = true;
        try {
          let resp = await this.API.homePage.ask(this.dataObj);
          this.visible = true;
          this.submitted = false;
        } catch (e) {
          this.submitted = false;
          this.$message.error(e && e.response.data && e.response.data.msg);
        }
      }
    }
  },
  watch: {
    visible() {
      if (this.visible === false) {
        this.dataObj = { ...Data };
      }
    }
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
};
</script>


<style lang="scss">
@keyframes flipOutYtest {
  from {
    -webkit-transform: perspective(1400px);
    transform: perspective(1400px);
  }

  40% {
    -webkit-transform: perspective(1400px) rotate3d(0, 1, 0, 60deg);
    transform: perspective(1400px) rotate3d(0, 1, 0, 60deg);
    opacity: 1;
  }

  50% {
    -webkit-transform: perspective(1400px) rotate3d(0, 1, 0, 90deg);
    transform: perspective(1400px) rotate3d(0, 1, 0, 90deg);
    opacity: 0;
  }

  to {
    -webkit-transform: perspective(1400px) rotate3d(0, 1, 0, 180deg);
    transform: perspective(1400px) rotate3d(0, 1, 0, 180deg);
    opacity: 0;
  }
}

.test{
  -webkit-animation: flipOutYtest 0.5s linear;
  animation: flipOutYtest 0.5s linear;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}


@keyframes flipInYtest {
  from {
    -webkit-transform: perspective(1400px) rotate3d(0, 1, 0, -180deg);
    transform: perspective(1400px) rotate3d(0, 1, 0, -180deg);
    opacity: 0;
  }

  50% {
    -webkit-transform: perspective(1400px) rotate3d(0, 1, 0, -90deg);
    transform: perspective(1400px) rotate3d(0, 1, 0, -90deg);
    opacity: 0;
  }

  60% {
    -webkit-transform: perspective(1400px) rotate3d(0, 1, 0, -60deg);
    transform: perspective(1400px) rotate3d(0, 1, 0, -60deg);
    opacity: 1;
  }

  to {
    -webkit-transform: perspective(1400px);
    transform: perspective(1400px);
    opacity: 1;
  }
}

.test2{
  -webkit-animation: flipInYtest 0.5s linear;
  animation: flipInYtest 0.5s linear;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.index_page {
  width: 100%;
  min-height: 100%;
  background: #fff;
  .bgbox {
    background-color: #fff;
  }
  .platformList{margin:0 auto}
  .platformList li{float: left;height: 100px;width: 100px;border-radius: 50px;text-align: center;font-size: 0;
    margin-right: 43px;position: relative;}
  .platformList .correct{position: absolute;border-radius: 50%;width: 100px;height: 100px;padding: 5px;}
  .opposite{border-radius: 50%;width: 100px;height: 100px;padding: 5px;}
  .platformList li:hover h4, .platformList li:hover p{color:#ECDCB7;}
  .platformList li:first-child{margin-left: 43px;}
  .platformList li:last-child{margin-right: 0;}
  .platformList li img{height: 90px;width: 90px;border-radius: 45px;}
  .platformList h4{font-size: 14px;line-height: 22px;color: #fff;padding: 14px 0 3px;font-weight: bold;font-family:'Microsoft YaHei';letter-spacing: 1px;margin:0;}
  .platformList p{font-size: 12px;line-height: 22px;color: #fff;width: 108px;}
  .atcenter{
    width: 1200px;
    margin: 0 auto;
  }
  .bgcolor {
		height: 630px;
		margin-bottom: 80px;
    background: -webkit-linear-gradient(360deg,#3180DA 0%,#0455B1 100%);
    background: -o-linear-gradient(360deg,#3180DA 0%,#0455B1 100%);
    background: -moz-linear-gradient(360deg,#3180DA 0%,#0455B1 100%);
    background: -ms-linear-gradient(360deg,#3180DA 0%,#0455B1 100%);
    background: linear-gradient(360deg,#3180DA 0%,#0455B1 100%);
    .bgpic{
      position: relative;
      height: 100%;
      background:url('~assets/img/index/head_bk.png') center bottom no-repeat ;
      .title{
        padding-top: 118px;
      }
      .whitebg{
        position: absolute;
        bottom: 0;
        width: 100%;
        min-height: 92px;
        background-image: url('~assets/img/index/white.png');
        background-position: center bottom;
        background-size: 100% 100%;
        z-index: 999;
      }
    }
  }
  
  .title {
    line-height: 42px;
    padding-top: 80px;
    margin-bottom: 15px;
    font-size: 32px;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
  .introduce {
    width: 1000px;
    margin: 0 auto 60px;
    font-size: 14px;
    line-height: 24px;
    color: #fff;
    text-align: center;
  }
  .advantage {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 80px;
    .tit {
      padding-bottom: 65px;
      font-size: 32px;
      font-weight: bold;
      color: #333;
      line-height: 42px;
      text-align: center;
    }
    > ul {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      > li {
        position: relative;
        width: 320px;
        .itembg{
          position: relative;
          width: 160px;
          height: 160px;
          padding: 5px;
          border-radius: 100%;
          overflow: hidden;
          margin:0 auto 27px;
        }
        .itembg1{
          position: absolute;
          left: 0;
          top:0;
          width: 160px;
          height: 160px;
          border-radius: 100%;
          background-color: #0455B1;
          opacity: 0.2;
        }
        .itembg2{
          position: absolute;
          left: 0;
          top:0;
          width: 160px;
          height: 160px;
          border-radius: 100%;
          background-color: #04AEB1;
          opacity: 0.2;
        }
        .itembg3{
          position: absolute;
          left: 0;
          top:0;
          width: 160px;
          height: 160px;
          border-radius: 100%;
          background-color: #04B15D;
          opacity: 0.2;
        }
        .pic {
          position: relative;
          z-index: 2;
          width: 150px;
					height: 150px;
					font-size: 20px;
          margin: 0 auto;
          border-radius: 50%;
          overflow: hidden;
        }
        .bg1{
          background: url('~assets/img/index/1.png') center center no-repeat #0455B1;
        }
        .bg2{
          background: url('~assets/img/index/2.png') center center no-repeat #04AEB1;
        }
        .bg3{
          background: url('~assets/img/index/3.png') center center no-repeat #04B15D;
        }
        > p {
          font-size: 14px;
          line-height: 24px;
          color: #333;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }
  .case {
    position: relative;
    &.bgpic1{
       background-image: url('~assets/img/index/01.jpg');
    }
    &.bgpic2{
       background-image: url('~assets/img/index/02.jpg');
    }
    &.bgpic3{
       background-image: url('~assets/img/index/03.jpg');
       
    }
    background-size: 100% 100%;
    .title{
        padding-bottom: 40px;
    }
    .shade {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: -webkit-linear-gradient(180deg,#00234B 0%,#001328 100%);
      background: -o-linear-gradient(180deg,#00234B 0%,#001328 100%);
      background: -moz-linear-gradient(180deg,#00234B 0%,#001328 100%);
      background: -ms-linear-gradient(180deg,#00234B 0%,#001328 100%);
      background: linear-gradient(180deg,#00234B 0%,#001328 100%);
      opacity: 0.8;
    }
    .contentbox{
      position: relative;
      z-index: 10;
    }
    .slidebox {
			width: 1200px;
			position: relative;
      margin: 0 auto;
      height: 360px;
      background-color: #0455B1;
			overflow: hidden;
			.slider{
        position: relative;
				.slides{
          position: relative;
          width: 1200px;
          height: 360px;
					>li{
            position: absolute;
            left: 0;
            top: 0;
            width: 1200px;
						height: 360px;
            opacity: 0;
             transition: opacity 1s linear;
            &.active{
              opacity: 1;
             transition: opacity 1s linear;
            }
					}
          .bluebg{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #0455B1;
            z-index: 2;
            opacity: 0.8;
          }
				}
        .indicator{
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          z-index: 30;
          span{
            display: inline-block;
            width: 10px;
            height: 10px;
            margin: 5px;
            border-radius: 5px;
            overflow: hidden;
            background-color: #fff;
            opacity: 0.5;
            cursor: pointer;
            &:last-child{
              margin-bottom: 0;
            }
            &.active{
              opacity: 1;
            }
          }
        }
			}
			.am-slider-default{
				.am-control-nav{
					width: 20px;
					height: 100px;
					top: 130px;
					right: 10px;
					line-height: 20px;
					a{
						background: rgba(255, 255, 255, 0.5);
					}
					a.am-active{
						background-color: #fff;
					}
				}
			}
			.text-item{
        position: relative;
        z-index: 20;
				padding: 70px 80px 50px;
				height: 360px;
				color:#fff;
				// background-color: #0455B1;
        // opacity: 0.8;
				.titles{
					font-size: 20px;
					line-height: 26px;
					text-align: center;
					padding-bottom: 20px;
					font-weight: bold;
				}
        .item-content{
          display: -webkit-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          p{
            text-indent: 2em;
            width: 690px;
            font-size: 14px;
            line-height: 24px;
          }
          .rightpic{
            width: 300px;
            height: 200px;
            img{
              vertical-align: middle;
              width: 100%;
              height: 100%;
            }
          }
        }
				
			} 
    }
  }
  .content_wrap {
    width: 100%;
    min-height: 310px;
    background: url('~assets/img/index/bk.jpg') center center no-repeat;
    .con_container {
      width: 1200px;
			margin: 0 auto;
			padding: 60px 0;
      border-radius: 4px;
    }
    .form_box {
      width: 1200px;
			margin: 0 auto;
			.flexbox{
				display: -webkit-flex;
				display: flex;
				justify-content: space-between;
				.leftpart{
					width: 580px;
          padding-left: 60px;
				}
			}
      .form_item {
        position: relative;
        width: 580px;
        display: inline-block;
        min-height: 46px;
        padding-bottom: 20px;
        label {
          display: inline-block;
          width: 80px;
          font-size: 14px;
          color: #333;
          font-weight: normal;
          i {
            color: #f64744;
            display: inline-block;
            width: 10px;
          }
        }
        .inputbox{
          width: 400px;
          display: inline-block;
          font-style: normal;
          border: 1px solid #eee;
          height: 40px;
          padding: 7px 0 7px 15px;
          background-color: #fff;
        }
        input {
          width: 100%;
          font-size: 14px;
          // line-height: 38px;
          // border: 1px solid #eee;
          // padding-left: 15px;
          color: #333;
          border:none;
          outline: none;
          vertical-align: middle;
        }
        textarea {
          width: 440px;
          height: 100px;
          font-size: 14px;
          border: 1px solid #eee;
          padding: 10px 15px;
          vertical-align: top;
          resize: none;
          color: #333;
        }
        span {
          position: absolute;
          bottom: 30px;
          right: 75px;
          font-size: 14px;
          color: #999;
        }
        > span.err {
          position: absolute;
          bottom: 1px;
          left: 98px;
          font-size: 12px;
          color: #f64744;
        }
      }
    }
    .ask_btn {
      width: 300px;
      margin: 10px auto 0;
      height: 50px;
      background: #db1f1c;
      border-radius: 30px;
      font-size: 20px;
      line-height: 50px;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
    .hight {
      opacity: 1;
    }
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
    width: 360px;
    height: 155px;
    margin-top: -78px;
    margin-left: -180px;
    background-color: #fff;
    z-index: 2001;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    padding: 40px 30px 30px;
    p {
      font-size: 14px;
      line-height: 20px;
      color: #333;
    }
    .btn_wrap {
      text-align: right;
      padding-top: 15px;
      span {
        display: inline-block;
        width: 68px;
        height: 30px;
        line-height: 28px;
        border-radius: 2px;
        border: 1px solid #e6e6e6;
        font-size: 14px;
        color: #666;
        text-align: center;
        cursor: pointer;
      }
      .yes {
        background-color: #0e63b0;
        border-color: #0e63b0;
        color: #fff;
        margin-left: 10px;
      }
    }
    .close {
      float: right;
      margin-right: -25px;
      margin-top: -30px;
      color: #ddd;
      width: 30px;
      height: 30px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
