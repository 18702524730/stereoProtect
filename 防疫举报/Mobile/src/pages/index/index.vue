<template>
  <div class="pageindex" >
    <div class="bgcolor">
      <div class="bgpic">
        <div class="title" ref="pages">社会共治立体保护体系</div>
        <p class="introduce">中国产学研合作促进会反侵权假冒创新战略联盟在国家相关部门指导和支持下，联合行业商协会、国际组织、企业、志愿者团队等，与阿里巴巴、京东、360、微店等电商及社交媒体平台共建诚信投诉通道，共同构建多维度、线上线下联动的立体保护体系。</p>
        <div class="circlebox">
          <img :src="circle" alt="">
        </div>
        <div class="whitebg"></div>
      </div>
    </div>
    <!-- 核心优势 -->
    <div class="advantage">
      <div class="blueborder"></div>
      <div class="commontitle">核心优势</div>
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
      <!-- 经典案例 -->
    <div class="case">
      
      <div class="blueborder"></div>
      <div class="commontitle">经典案例</div>
      <div class="swipebox">
      <mt-swipe :auto="0" :speed='100'>
        <mt-swipe-item v-for="(item,index) in content" :key="index">
          <div class="shadowbox">
                <ul class="sliderbox">
                    <li>
                        <div class="text-item">
                          <h3 class="titles" v-if="item.first">{{item.first}}</h3>
                          <h3 class="titles">{{item.title}}</h3>
                          <div class="item-content">
                            <p v-for="(article,key) in item.val" :key="key">{{article}}</p>
                          </div>
                          <div class="rightpic">
                            <img :src="item.pic" alt="">
                          </div>
                        </div>
                    </li>
                </ul>
            </div>
          
        </mt-swipe-item>
      </mt-swipe>
      </div> 
    </div>
    <!-- 内容 -->
    <div class="content_wrap">
      <!-- <input type="text" class="hideinput"> -->
      <div class="blueborder"></div>
      <div class="commontitle">联系联盟</div>
      <div class="con_container">
        <div class="form_box">
					<div class="flexbox">
						<div class="leftpart">
							<div class="form_item">
                <div class="mb10">
                  <label>
                    <i>*</i>联系人：
                  </label>
                </div>
								
								<input
									type="text"
									v-model="dataObj.contactName"
									maxlength="10"
									name
									placeholder="请输入联系人姓名"
                  id="userblur"
                  @keyup="getname"
                  @blur="userblur"
								>
								
							</div>
							<div class="form_item">
                <div class="mb10">
								<label>
									<i>*</i>联系方式：
								</label>
                </div>
								<input
									type="text"
									v-model="dataObj.contactPhone"
									maxlength="11"
									name
									placeholder="请输入手机号码"
                  id="psdblur"
                  @keyup="getpho"
                  @blur="psdblur"
								>
								
							</div>
						</div>
						<div class="form_item nomg">
              <div class="mb10">
							<label>维权需求：</label>
              </div>
							<textarea
								name
								v-model="dataObj.content"
								maxlength="200"
								placeholder="请简单描述您的维权需求"
                id="textblur"
                @blur="textblur"
							></textarea>
							<span class="number">{{(dataObj.content && dataObj.content.length) || 0}}/200</span>							
						</div>
					</div>
          
          
          
      </div>
      
    </div>
    <div class="bottombg">
        <div
            class="ask_btn"
            :class="{'hight': dataObj.contactName && dataObj.contactPhone}"
            @click="ask"
          >立即咨询</div>
        </div>
      </div>
    <div class="footerh5">
      <pubFooter></pubFooter>
    </div>
  </div>
</template>

<script>
// import Filters from "utils/filters";
import { Toast,MessageBox} from 'mint-ui';
// import Vue from 'vue'
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
import pubFooter from "components/public/leagueFooter.vue";
// import { setInterval, setTimeout, clearTimeout, clearInterval } from 'timers';
const Data = {
  contactName: "",
  contactPhone: "",
  content: "",
  source: '2', //1联盟官网;2联盟服务号;3拾贝服务号;4拾贝订阅号
  consultationType: 11 //咨询类型:11维权咨询
};
export default {
  data() {
    return {
      dataObj: { ...Data },
      submitted: false,
      pic2: require('../../assets/img/index/002.jpg'),
      pic3: require('../../assets/img/index/003.jpg'),
      circle:require('../../assets/img/index/circle.png'),
      timer: null,
      isIos: false,
      content:[
        {
          first:'立体保护新模式 ',
          title:'成立智能短交通联盟进行专利授权许可',
          val:[
            '电动平衡车是近年来快速兴起的智能短途交通时尚出行工具，随着市场规模的扩大，假冒伪劣平衡车产品不断涌现。',
            '行业龙头赛格威-纳恩博和杭州骑客共拥有平衡车产品的95%以上的核心专利，但两者专利诉讼纠纷也不断，商务部、海关总署多次调停未果。',
            '联盟组织纳恩博、骑客进行了深度交流，促使双方停止专利战。2018年5月29日京交会上，联盟、赛格威、骑客三方共同发起智能短交通行业知识产权联盟，并构建电动平衡车专利池。',
            '通过社会共治立体打击与专利池授权许可结合的模式，截止18年底短短六个月内，已有 20 余家平衡车企业加入联盟，并帮助权利人与 10余家平衡车厂商签订专利授权许可合同，预计19年专利授权许可费达到千万级。'
          ],
          pic:require('../../assets/img/index/003.jpg')
        },
        {
          first:'',
          title:'小猪佩奇线上线下协同打击侵权案',
          val:[
            '电动平衡车是近年来快速兴起的智能短英国eOne 在中国享有“Peppa Pig（小猪佩奇）”商标专有权和著作权。随着小猪佩奇动画片在中国受欢迎程度的不断提高，其授权的儿童产品也出现了假冒侵权现象。 ',
            '联盟联合各大电商平台提供涉案数据，进行线上到线下的一系列数据信息对比、调查并进行固证，最终成功于2017年11月9日协同扬州市公安局生态科技新城分局对生产厂家、仓库完成执法打击，当场查获了儿童牙膏10余万支、儿童牙刷20余万支、儿童洗发沐浴露二合一2万余瓶、儿童湿纸巾10余万包、儿童漱口杯8万余只等大量侵权假冒商品，涉案金额高达450余万。途交通时尚出行工具，随着市场规模的扩大，假冒伪劣平衡车产品不断涌现。',
          ],
          pic:require('../../assets/img/index/002.jpg')
        },
        {
          first:'',
          title:'江中制药线上线下“雷霆行动”打假案',
          val:[
            '2017年4月26日，在联盟协调组织下，江中集团安全管理部、阿里巴巴打假特战队、湖南省公安厅、娄底市公安局等多个单位协同作战。通过大数据分析，准确得出售假犯罪行为的规律，快速完成了案件线索汇总、犯罪地址定位、犯罪证据调取等工作，历时不到一个月，在湖南省娄底市冷水江城区成功捣毁一个制售“江中猴姑”米稀产品的生产窝点，现场收缴了大量假冒伪劣产品及造假原材料，抓获犯罪嫌疑人3名。'
          ],
          pic:require('../../assets/img/index/001.jpg')
        },
      ]
    };
  },
  components: {
    pubFooter
  },
  mounted() {
    let source = localStorage.getItem('source');
    this.dataObj.source = source;
    this.API.homePage.statis();
    let user = navigator.userAgent.toLowerCase();
    if(user.indexOf('iphone')>-1){
      this.isIos = true;
      // let cheight = document.documentElement.scrollHeight || document.body.scrollHeight
      // console.log(cheight)
      // $('input').on('blur',function(){
      //   setTimeout(function(){
      //     window.scrollTo(0,2500)
      //   },100)
      // })
    }
  },
  methods: {
    async ask() {
      let that = this;
      if(this.dataObj.contactName.trim()==''){
        Toast({
          message:'请输入联系人姓名',
        })
      }else if(this.dataObj.contactPhone.trim() ==''){
        Toast({
          message:'请输入联系电话',
        })
      }else{
        if (this.submitted) {
          return;
        }
        this.submitted = true;
        try {
          let resp = await this.API.homePage.ask(this.dataObj);
          this.submitted = false;
          MessageBox.alert('您的咨询我们已经收到，专家会在30分钟内进行回访，请注意接听电话')
            that.dataObj = {...Data};
        } catch (e) {
          this.submitted = false;
          MessageBox.alert(e && e.response.data && e.response.data.msg);
        }
      }
      
    },
    getname(){
      let exp = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[~!@#$%^&*(),./\\=<>'";:{}\|`\[\]]|[0-9]/g;
      this.dataObj.contactName = this.dataObj.contactName.replace(exp,'')
    },
    getpho(){
      let exp = /[^0-9]/g;
      this.dataObj.contactPhone = this.dataObj.contactPhone.replace(exp,'')
    },
    userblur(){
      if(this.isIos){
        let height = $('#userblur').offset().top
        console.log(height)
        window.scrollTo(0,2000)
      }
      
    },
    psdblur(){
      if(this.isIos){
        let height = $('#psdblur').offset().top
        console.log(height)
        window.scrollTo(0,2000)
      }
      
    },
    textblur(){
      if(this.isIos){
        let height = $('#textblur').offset().top
        console.log(height)
        window.scrollTo(0,2000)
      }
      
    }
  },
  watch: {
    // visible() {
    //   if (this.visible === false) {
    //     this.dataObj = { ...Data };
    //   }
    // }
  }
};
</script>


<style lang="scss">
.hideinput{
  visibility: hidden;
  width: 0;
  height: 0;
}
.pageindex{
  width: 7.5rem;
  height: 100%;
  background-color: #fff;
  overflow-y: scroll;
}
.bgcolor {
    height: 13.7rem;
    width: 7.5rem;
    overflow: hidden;
    margin-bottom: 0.9rem;
    background:linear-gradient(360deg,rgba(49,128,218,1) 0%,rgba(4,85,177,1) 100%);
    .bgpic{
      position: relative;
      width: 100%;
      height: 100%;
      background-image:url('~assets/img/index/head_bkh5.png');
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: bottom center;
      .title{
        padding: 1.35rem 0.3rem 0;
        text-align: center;
        font-size: 0.4rem;
        margin-bottom: 0.2rem;
        color: #fff;
        font-weight: bold;
      }
      .whitebg{
        position: absolute;
        bottom: -1px;
        width: 7.52rem;
        height: 20px;
        background-image: url('~assets/img/index/whiteh5.png');
        background-position: center bottom;
        background-size: 100% 100%;
        z-index: 999;
      }
      .introduce {
        padding:0 0.3rem;
        font-size: 0.28rem;
        line-height: 0.44rem;
        color: #fff;
        text-align: center;
        margin-bottom: 0.6rem;
      }
      .circlebox{

        width: 7rem;
        height: 7.6rem;
        margin: 0 auto;
        img{
          outline: none;
          border: none;
          vertical-align: middle;
          width: 100%;
        }
      }
    }
  }
  .footerh5{
    padding: 0 0.3rem;
    background-color: #0255B1;
  }
  .blueborder{
    width: 0.4rem;
    margin: 0 auto;
    border-bottom: 0.08rem solid #0455B1;
  }
  .commontitle {
    padding-top: 0.2rem;
    padding-bottom: 0.4rem;
    font-size: 0.44rem;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
  .advantage {
    padding: 0 0.3rem;
    margin-bottom: 0.2rem;
    
    > ul {
      text-align: left;
      > li {
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.6rem;
        .itembg{
          position: relative;
          width: 1.3rem;
          height: 1.3rem;
          padding: 0.04rem;
          border-radius: 100%;
          overflow: hidden;
        }
        .itembg1{
          position: absolute;
          left: 0;
          top: 0;
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 100%;
          background-color: #0455B1;
          opacity: 0.2;
        }
        .itembg2{
          position: absolute;
          left: 0;
          top: 0;
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 100%;
          background-color: #04AEB1;
          opacity: 0.2;
        }
        .itembg3{
          position: absolute;
          left: 0;
          top: 0;
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 100%;
          background-color: #04B15D;
          opacity: 0.2;
        }
        .pic {
          position: relative;
          z-index: 2;
          width: 1.22rem;
					height: 1.22rem;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 45%;
          overflow: hidden;
        }
        .bg1{
          background-image: url('~assets/img/index/1.png');
          background-color: #0455B1;
        }
        .bg2{
          background-image: url('~assets/img/index/2.png');
          background-color: #04AEB1;
        }
        .bg3{
          background-image: url('~assets/img/index/3.png');
          background-color: #04B15D;
        }
        > p {
          width: 5.3rem;
          font-size: 0.28rem;
          line-height: 0.4rem;
          color: #333;
          font-family: 'Lucida Sans Regular';
          font-weight: normal;
        }
      }
    }
  }
  .case {
    margin-bottom: 0.9rem;
    padding: 0 0.3rem;
    .mint-swipe-indicators{
      bottom: 0.12rem;
    }
    .mint-swipe-indicator{
      width: 8px;
      height: 8px;
      border-radius: 5px;
      overflow: hidden;
      margin: 0 5px;
      background-color: #eee;
      opacity: 1;
      &.is-active{
        background-color: #0455B1;
      }
    }
    .swipebox{
      height: 670px;
      border-radius: 0.1rem;
      box-shadow:0px 0px 10px 4px rgba(0,0,0,0.08); 
    }
    .shadowbox{
      padding: 0.5rem 0.3rem;
    }
    .sliderbox{
      >li{
        width: 100%;
        
      }
      
    }
    .indicator{
      width: 100%;
      text-align: center;
      span{
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        overflow: hidden;
        margin: 0 0.1rem;
        background-color: #eee;
        &:last-child{
          margin-bottom: 0;
        }
        &.active{
          background-color: #0455B1;
        }
      }
    }
			.text-item{
        color: #333;
				.titles{
					font-size: 16px;
					line-height: 23px;
					text-align: center;
					font-weight: bold;
				}
        .item-content{
          padding-top: 0.2rem;
          margin-bottom: 0.3rem;
          p{
            font-size: 14px;
            line-height: 22px;
            text-indent: 2em;
          }
        }
				.rightpic{
          height: 4.2rem;
          img{
            vertical-align: middle;
            width: 100%;
            height: 100%;
          }
        }
      } 
      
  }
  .content_wrap {
    width: 100%;
    .mb10{
      margin-bottom: 0.2rem;
    }
    .con_container {
      padding: 0 0.3rem;
    }
    .form_box {
      text-align: left;
      background-color: #fff;
      .form_item {
        position: relative;
        margin-bottom: 0.2rem;
        &.nomg{
          margin-bottom: 0;
        }
        label {
          display: inline-block;
          width: 160px;
          font-size: 0.28rem;
          color: #333;
          font-weight: normal;
          vertical-align: middle;
          i {
            color: #f64744;
            display: inline-block;
            width: 0.2rem;
            line-height: 0.2rem;
            overflow: hidden;
          }
        }
        input {
          width: 100%;
          height: 0.8rem;
          padding: 0.1rem 0.2rem;
          font-size: 0.24rem;
          line-height: 0.6rem;
          border: 1px solid #eee;
          color: #333;
          border-radius: 4px;
        }
        textarea {
          width: 100%;
          height: 3rem;
          font-size: 0.28rem;
          border: 1px solid #eee;
          padding: 0.1rem 0.2rem 0.3rem;
          vertical-align: top;
          resize: none;
          color: #333;
          border-radius: 2px;
        }
        span {
          font-size: 0.28rem;
          color: #999;
        }
        span.err {
          font-size: 0.24rem;
          color: #f64744;
          vertical-align: middle;
        }
        span.number{
          position: absolute;
          right:0.2rem;
          bottom: 0.1rem;
        }
      }
    }
    
  }
  .bottombg{
    padding-top: 0.4rem;
    padding-bottom: 0.9rem;
    background: url('~assets/img/index/bk.jpg') center bottom no-repeat;
    .ask_btn {
      width: 6.9rem;
      margin: 0 auto;
      height: 1rem;
      background: #db1f1c;
      border-radius: 0.5rem;
      font-size: 0.3rem;
      line-height: 1rem;
      color: #fff;
      text-align: center;
    }
    .hight {
      opacity: 1;
    }
  }
  
</style>
