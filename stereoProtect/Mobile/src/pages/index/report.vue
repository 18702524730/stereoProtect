<template>
  <div class="home_pages" id="home_page">
	
		
	  <div class="toplog">
		  <img src="~assets/img/home/jubao.png" alt="">
	  </div>
	  <div class="ebgbox">
	  <div class="evidence">
		  <div class="evidencemsg">
			  <p></p>
			  <h3>线索信息</h3>
		  </div>
		  
		  <h3 class="requireItem">举报单位：</h3>
		  <div class="inputItem">
			  <input type="text" placeholder="请输入举报单位名称" v-model="dataObj.reportUnit" maxlength="40">
		  </div>
		  <h3 class="requireItem">线下地址/线上网址：</h3>
		  <div class="inputItem hasmore">
			  <span @click="tomap"><img src="~assets/img/home/location.png" alt=""></span>
			  <input type="text" placeholder="请输入举报单位的线下地址或线上网址" v-model="dataObj.address">
		  </div>
		  <h3 class="requireItem">商品/服务名称：</h3>
		  <div class="inputItem">
			  <input type="text" placeholder="请输入商品/服务名称" v-model="dataObj.productName" maxlength="40">
		  </div>
		  <h3 class="requireItem">举报类型：</h3>
		  <div class="inputItem hasmore" @click="toselect">
			  <span class="moreicon"><i></i></span>
			  <input type="text" placeholder="请选择" readonly v-model="type">
		  </div>
		  <h3>线索描述：</h3>
		  <div class="desc">
			  <div class="fontnum"><span style="color:#0455B1;">{{dataObj.clueDesc.length}}</span><span>/2000</span></div>
			  <textarea placeholder="请详细填写时间、地点、事情经过、基本诉求等" maxlength="2000" v-model="dataObj.clueDesc"></textarea>
		  </div>
		  <h3>证据材料、照片：</h3>
		  <div class="picbox">
			  <div class="selectpic" v-for="(item,key) in evidenceArr" :key="key" ><img :src="item" alt=""><i class="close" @click="remove(key)"></i></div>
			  <div class="selectpic hasselect" v-if="evidenceArr.length<5">
				  <uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby2'" :url="standby2" :fileName="standby2_name" :size="5" :extensions="'jpg,jpeg,bmp,png'" :canPreview="false"></uploader>
			  </div>
		  </div>
		  <p class="selectintr">支持格式jpg/jpeg/png，文件最大5MB，数量最多5个。</p>
	  </div>
	  <div class="evidence">
		  <div class="evidencemsg">
			  <p></p>
			  <h3>联系信息</h3>
		  </div>
		  
		  <h3 class="requireItem">姓名：</h3>
		  <div class="inputItem">
			  <input type="text" placeholder="请输入联系人姓名" v-model="dataObj.contactName" maxlength="20" @keyup="getname" id="nmblur" @blur="nmblur">
		  </div>
		  <h3 class="requireItem">联系电话：</h3>
		  <div class="inputItem">
			  <input type="text" placeholder="请输入联系人手机号码" v-model="dataObj.contactPhone" maxlength="11" @keyup="getpho" id="phblur" @blur="phblur">
		  </div>
	  </div>
	  <div class="submitbtn" @click="check">
		  立即提交
	  </div>
	</div>
	  <div class="evidencefooter">
		  <leagueNewFooter></leagueNewFooter>
	  </div>
	  <mt-actionsheet :actions = 'serviceTypeList' v-model = 'show'></mt-actionsheet>
	</div> 
</template>

<script>
	import Filters from 'utils/filters'
	import leagueNewFooter from 'components/public/leagueNewFooter.vue'
	import uploader from 'components/uploader/uploader.vue'
	const { adminUrl, indexUrl } = CONFIG;
	import { Actionsheet } from 'mint-ui';
	import Vue from 'vue'
	Vue.component(Actionsheet.name, Actionsheet);
	const Data = {
		contactName: '',
		contactPhone:'',
        clueDesc: '',
        reportUnit:'',
        address:'',
		productName:'',
		reportType:'',//1,侵犯知识产权;2,伪劣商品
	}
	export default {
		data() {
			return {
				dataObj: {...Data},
				isexist: false,
				standby2:'',
				standby2_name:'',
				evidenceArr:[],
				type:'',
				isIos:false,
				show:false,
				submitted: false,
                serviceTypeList:[{name:'侵犯知识产权', method:this.typeone},{name:'伪劣商品', method:this.typetwo}],
            }
		},
		components: {
			leagueNewFooter,
			uploader
		},
		mounted () {
			let fills = this.$store.state.progress.fills;
			let arr = this.$store.state.progress.pics;
			if(fills){
				this.dataObj = {...fills};
				if(fills.reportType==1){
					this.type = '侵犯知识产权'
				}else if(fills.reportType ==2){
					this.type = '伪劣商品'
				}else{
					this.type =''
				}
			}
			if(arr){
				this.evidenceArr = [...arr]
			}
			let local = this.$store.state.progress.location;
			this.dataObj.address = local;
			let user = navigator.userAgent.toLowerCase();
			if(user.indexOf('iphone')>-1){
				this.isIos = true;
				$('.mint-actionsheet-button').css('height','75px')
			}
			console.log(this.isIos)
		},
		methods: {
			// uppic(){
			// 	this.chooseImage(function(data){
			// 		alert(1)
			// 		alert(JSON.stringify(data))
			// 	});
			// },
			toselect(){
				this.show = true;
			},
			typeone(){
				this.dataObj.reportType = 1;
				this.type = '侵犯知识产权';
			},
			typetwo(){
				this.dataObj.reportType = 2;
				this.type = '伪劣商品';
			},
			resetUploader(valueName){
			this[valueName] = '';
			this[valueName+'_name'] = '';
			},
			tomap(){
				this.$store.dispatch('set_fills',this.dataObj);
				if(this.evidenceArr.length>0){
					this.$store.dispatch('set_pics',this.evidenceArr)
				}
				this.$router.push('/map')
			},
			//上传成功后设置数据
			setUploadedData(data){
				var dat = data.data;
				let d = Object.assign({},dat)
				let isrepeat= false;
				let md= this.evidenceArr;
				for(let i=0;i<md.length;i++){
				if(d.url == md[i]){
					isrepeat = true;
					break;
				}
				}
				if(!isrepeat){
					md.push(d.url)
				}
				if (d.url) {

					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					// this.trademarkData.contract_url = d.url;
				}else{
					this.uploaderErrCallback(d);
				}
				console.log(data)	
			},
			remove(i){
				this.evidenceArr.splice(i,1)
			},
			getname(){
				let exp = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[~!@#$%^&*(),./\\=<>'";:{}\|`\[\]]|[0-9]/g;
				this.dataObj.contactName = this.dataObj.contactName.replace(exp,'')
			},
			getpho(){
				let exp = /[^0-9]/g;
				this.dataObj.contactPhone = this.dataObj.contactPhone.replace(exp,'')
			},
			checkValid() {
				if (!this.dataObj.reportUnit) {
					this.$toast('举报单位不能为空');
					return false;
				}
				if (!this.dataObj.address) {
					this.$toast('线下地址/线上网址不能为空');
					return false;
				}
				if (!this.dataObj.productName) {
					this.$toast('商品/服务名称不能为空');
					return false;
				}
				if (!this.dataObj.reportType) {
					this.$toast('请选择举报类型');
					return false;
				}
				if (!this.dataObj.contactName) {
					this.$toast('姓名不能为空');
					return false;
				}
				if (!this.dataObj.contactPhone) {
					this.$toast('联系电话不能为空');
					return false;
				}

				if (!/^1\d{10}$/.test(this.dataObj.contactPhone)) {
					this.$toast('手机号码格式不正确');
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
			check(){
				let res = this.checkValid();
				if(res){
					this.handleOk()
				}
			},
			getsource(){
				let url = window.location.href;
				let source = ''
				if(url.indexOf('source')!=-1){
					source = url.split('source=')[1];
				}
				return source
			},
			async handleOk() {
				
				let res = this.checkValid()
				if(!res){
					return
				}
				let data = {...this.dataObj};
				if(this.evidenceArr.length>0){
					data.evidenceArr = this.evidenceArr;
				}
				
				data.source = this.getsource()
				
                    if (this.submitted) {
                        return
                    }
                    this.submitted = true;
                    try {
						let resp = await this.API.homePage.submitClueInfo(data);
						this.$toast('提交成功');
						this.submitted = false;
						this.dataObj = {...Data};
						this.evidenceArr = [];
						this.type = '';
						this.$store.dispatch('clear_fill','')
						window.scrollTo(0,0);
                    }
                    catch (e) {
						this.submitted = false;
						this.$toast(e && e.response.data && e.response.data.msg);
                    }
			},
			nmblur(){
				if(this.isIos){
					let height = $('#nmblur').offset().top
					window.scrollTo(0,height)
					console.log(height)
				}
			
			},
			phblur(){
				if(this.isIos){
					let height = $('#phblur').offset().top
					window.scrollTo(0,height);
					console.log(height)
				}
			
    		}
		},
	}
</script>


<style lang="scss">
	.home_pages {
		width: 100%; 
		.ebgbox{
			background-image:  url(~assets/img/home/bg.jpg);
			background-position: center bottom;
			background-size: 100%;
			padding-bottom: 0.9rem;
		}
		.toplog{
			height: 2.55rem;
			text-align: center;
			padding-top: 0.9rem;
			background-image:  url(~assets/img/home/top.jpg);
			background-position: center top;
			background-size: 100%;
			background-color: #05092A;
			img{
				width:2.8rem;
				height: 0.66rem;
			}
		}
		.evidence{
			width: 7.1rem;
			margin: 0 auto;
			background-color: #fff;
			padding: 0.3rem 0.3rem;
			border-radius: 4px;
			margin-bottom: 0.2rem;
			>h3{
				height: 0.4rem;
				line-height: 0.4rem;
				font-size: 0.28rem;
				color:#333333;
				margin-bottom: 0.2rem;
			}
			.desc{
				position: relative;
				padding: 0.2rem 0.3rem;
				line-height: 20px;
				border: 1px solid #E6E6E6;
				border-radius: 2px;
				margin-bottom: 0.2rem;
				.fontnum{
					position: absolute;
					right:0;
					font-size: 12px;
					height: 0.4rem;
					line-height: 0.4rem;
					color: #999;
					top: -0.6rem;
				}
				textarea{
					padding:0;
					margin:0;
					width:100%;
					min-height: 2rem;
					font-size: 0.28rem;
					line-height: 0.36rem;
					word-break: break-all;
					color:#333;
				}
			}
		}
		.evidencemsg{
			position: relative;
			height: 0.45rem;
			margin-bottom: 0.3rem;
			&:before,&:after{
				position: absolute;
				top: 0.2rem;
				// transform: translateY(-50%);
				content: '';
				width: 1px;
				height: 3px;
				overflow: hidden;
				background-color: #0455B1;
			}
			&:before{
				left: 0;
			}
			&:after{
				right: 0;
			}
			>p{
				position: relative;
				top: 0.22rem;
				border-bottom: 1px dashed #0455B1;
			}
			>h3{
				position: absolute;
				left: 50%;
				top:0;
				transform: translateX(-50%);
				height: 0.45rem;
				font-size: 0.32rem;
				color: #0455B1;
				width: 1.9rem;
				text-align: center;
				background-color: #fff;
				z-index: 999;
				font-family:'PingFangSC-Semibold','PingFangSC';
				font-weight: bold;
			}
		}
		.requireItem{
			
			&:before{
				display: inline-block;
				content:'*';
				color: #DB1F1C;
				font-size: 0.28rem;
				vertical-align: middle;
			}
		}
		.inputItem{
			padding:0.2rem 0.3rem;
			height: 0.8rem;
			border: 1px solid #E6E6E6;
			border-radius: 2px;
			line-height: 0.4rem;
			font-size: 0.28rem;
			margin-bottom: 0.2rem;
			input{
				width:100%;
				line-height: 0.4rem;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color:#333;
			}
		}
		.hasmore{
			position: relative;
			padding-right: 0.8rem;
			span{
				position: absolute;
				right:0;
				top: 0;
				width: 0.8rem;
				height: 0.8rem;
				padding: 0.2rem 0.25rem;
				line-height: 0.35rem;
				text-align: center;
				font-size: 0.32rem;
				color:#999;
				img{
					width:100%;
					height: 100%;
				}
				i{
					display: inline-block;
					width: 9px;
					height: 9px;
					border-top: 1px solid #999;
					border-right: 1px solid #999;
					-ms-transform:rotate(45deg);
					-moz-transform:rotate(45deg); 
					-webkit-transform:rotate(45deg); 
					-o-transform:rotate(45deg); 
					transform: rotate(45deg);
				}
			}
			// .moreicon{
			// 	background-image: url(~assets/img/home/more.png);
			// 	background-size: 90% 90%;
			// 	background-position: center center;
			// }
		}
		.picbox{
			margin-bottom: 0.2rem;
			overflow: hidden;
			.selectpic{
				position: relative;
				width: 2rem;
				height: 2rem;
				float: left;
				margin-right: 0.25rem;
				margin-bottom: 0.25rem;
				&:nth-child(3n){
					margin-right: 0;
				}
				img{
					vertical-align: top;
					width:100%;
					height: 100%;
				}
				.close{
					position: absolute;
					top:0.1rem;
					right: 0.1rem;
					width: 0.34rem;
					height: 0.34rem;
					// background-color: #000;
					// opacity: 0.3;
					background-image: url(~assets/img/home/close.png);
					background-position: center center;
					background-size: 100% 100%;
					text-align: center;
					line-height: 0.34rem;
					font-size: 0.34rem;
					color:#fff;
					// background-color: #000;
					border-radius: 50%;
					// opacity: 0.3;
				}
			}
			.hasselect{
				background-color: #ECEEF2;
				// background-image: url(~assets/img/home/phono.png);
				// background-position: center center;
				// background-size: 30% 25%;
				// background-repeat: no-repeat;
			}
		}
		.selectintr{
			font-size: 0.24rem;
			line-height: 0.33rem;
			color:#999;
		}
		.submitbtn{
			width:7.1rem;
			height: 1rem;
			border-radius: 0.5rem;
			background-color: #DB1F1C;
			color: #fff;
			line-height: 1rem;
			text-align: center;
			font-size: 0.3rem;
			font-weight: bold;
			margin-top: 0.4rem;
			margin-left: auto;
			margin-right: auto;
		}
		.evidencefooter{
			padding: 0.4rem 0.3rem;
			background-color: #0255B1;
			opacity: 0.95;
		}
	}
</style>


