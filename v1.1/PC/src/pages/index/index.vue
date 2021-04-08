<template>
  <div class="index_page">
		<pubHeader ></pubHeader>
		<!-- 内容 -->
		<div class="content_wrap">
			<div class="con_container">
				<h3 class="title">知识产权快速维权-30分钟获取维权方案</h3>
				<div class="form_box">
					<div class="form_item">
            <label><i>*</i>您的称呼：</label><input type="text" v-model="dataObj.contactName" maxlength="10" name="" placeholder="请输入您的称呼，例如王先生、张女士">
            <span class="err">{{err1}}</span>
          </div>
          <div class="form_item">
            <label><i>*</i>联系电话：</label><input type="text" v-model="dataObj.contactPhone" maxlength="11" name="" placeholder="请输入您的手机号码，方便维权专家快速联系您">
            <span class="err">{{err2}}</span>
          </div>
          <div class="form_item">
            <label style="padding-left: 10px;">维权说明：</label><textarea name="" v-model="dataObj.content" maxlength="500" placeholder="请简单描述您遇到的知识产权侵权问题"></textarea><span>{{(dataObj.content && dataObj.content.length) || 0}}/500</span>
            <span class="err">{{err3}}</span>
          </div>
          <div class="ask_btn" :class="{'hight': dataObj.contactName && dataObj.contactPhone}" @click="ask">立即获取</div>
				</div>
			</div>
		</div>
		<pubFooter ></pubFooter>
		<!-- 弹窗 -->
		<div class="mask" v-if="visible"></div>
		<div class="confirm_box" v-if="visible">
			<span class="close" @click="visible=false"><i class="ant-modal-close-icon anticon anticon-close"><svg viewBox="64 64 896 896" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></i></span>
			<p>您的投诉我们已经收到，专家会在30分钟内进行回访，请注意接听电话！</p>
			<div class="btn_wrap"><span class="btn no" @click="visible=false">关闭</span><span class="btn yes" @click="visible=false">确定</span></div>
		</div>
	</div>
</template>

<script>
	import Filters from 'utils/filters'
	import pubHeader from 'components/public/header.vue'
	import pubFooter from 'components/public/footer.vue'
	const Data = {
		contactName: '',
		contactPhone:'',
		content: '',
		source: 2, //来源:1,小程序;2,联盟
		consultationType: 9, //咨询类型:9,投诉;10,申诉,联盟端默认为9
	}
	export default {
		data() {
			return {
				dataObj: {...Data},
				err1: '',
				err2: '',
				err3: '',
				submitted: false,
				visible: false,
			}
		},
		components: {
			pubHeader, pubFooter
		},
		mounted () {
			this.API.homePage.statis();
		},
		methods: {
			checkValid() {
				this.err1 = '';
				this.err2 = ''
				this.err3 = ''
				let { contactName, contactPhone, content } = this.dataObj;
				if (!contactName) {
					this.err1 = '称呼不能为空';
					return false;
				}
				if (!contactPhone) {
					this.err2 = '联系电话不能为空';
					return false;
				}
				if (!/^1\d{10}$/.test(contactPhone)) {
					this.err2 = '手机号码格式不正确';
					return false;
				}
				if (this.dataObj.content && this.dataObj.content.length > 500) {
					this.err3 = '维权说明不能超过500个字符';
					return false;
				}
				return true;
			},
			async ask () {
				if (this.checkValid()) {
					if (this.submitted) {
						return
					}
					this.submitted = true;
					try {
						let resp = await this.API.homePage.ask(this.dataObj);
						this.visible = true;
						this.submitted = false;
					}
					catch (e) {
						this.submitted = false;
						this.$message.error(e && e.response.data && e.response.data.msg);
					}
				}
			},
		},
		watch: {
			visible() {
				if (this.visible === false) {
					this.dataObj = {...Data}
				}
			}
		}
	}
</script>


<style lang="scss">
	.index_page {
		width: 100%; min-height: 100%; background: #fff;
		.content_wrap {
			width: 100%;min-height:600px;padding: 50px 0 40px;background:linear-gradient(180deg,rgba(17,61,147,1) 0%,rgba(14,127,196,1) 100%);
			.con_container{
				width: 1200px; margin: 0 auto; height: 647px;background-color: #fff;border-radius:4px;
				h3{padding-top: 80px;padding-bottom: 40px;color: #0F4598;line-height: 35px;font-size:26px;font-weight: bold;text-align: center;}
			}
			.form_box{
				width: 605px;margin: 0 auto;
				.form_item {
					position: relative;width: 605px;display: inline-block;min-height: 46px;padding-bottom: 30px;
					label{
						display: inline-block;width: 98px;font-size:16px;color: #333;font-weight: normal;
						i{color: #F64744;display: inline-block;width: 10px;}
					}
					input{width: 500px;height: 46px; font-size: 14px;line-height:44px;border: 1px solid #ddd;padding-left: 15px;color: #333;}
					textarea{width:500px;height:160px;font-size: 14px;border: 1px solid #ddd;padding:10px 15px;vertical-align: top;resize: none;color: #333;}
					span{position: absolute;bottom: 40px;right: 25px;font-size:14px;color: #999;}
					>span.err{position: absolute;bottom: 8px;left: 98px;font-size: 14px; color: #F64744;}
				}
			}
			.ask_btn{width:300px;margin: 10px auto 0;height:60px;background:#DB1F1C;border-radius:30px;opacity:0.5;font-size:20px;line-height: 60px;color: #fff;text-align: center;cursor: pointer;}
			.hight{opacity: 1}
		}
		.mask{position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 2000;background-color: rgba(0, 0, 0, 0.6);}
		.confirm_box{
			position: fixed;left: 50%;top: 50%;width: 360px;height: 155px;margin-top: -78px;margin-left: -180px;background-color: #fff;z-index: 2001;box-shadow:0px 1px 4px 0px rgba(0,0,0,0.08);border-radius:2px;padding: 40px 30px 30px;
			p{font-size:14px;line-height:20px;color: #333;}
			.btn_wrap{
				text-align: right;padding-top: 15px;
				span{display: inline-block;width:68px;height:30px;line-height: 28px;border-radius:2px;border:1px solid #E6E6E6;font-size:14px;color: #666;text-align: center;cursor: pointer;}
				.yes{background-color: #0E63B0;border-color: #0E63B0;color: #fff;margin-left: 10px;}
			}
			.close{float: right; margin-right: -25px; margin-top: -30px;color: #ddd;width: 30px;height: 30px;text-align: center;cursor: pointer;}
		}
	}
</style>
