<template>
  <div class="home_page" id="home_page">
  	<div class="home_page_in">
			<h3 class="title">知识产权快速维权平台</h3>
			<!-- 内容 -->
			<div class="content_wrap">
				<div class="content_bg"></div>
				<a-form :form="form" class="form_box">
			    <a-form-item
			      v-bind="formItemLayout"
			      label="服务类型："
			    	>
			    	<a-radio-group 
			    		v-decorator="[
			          'serviceType',
			          {
			            rules: [{
			              required: true, message: '请选择服务类型!',
			            }]
			          }
			        ]">
				      <a-radio v-for="(item, index) in serviceTypeList" :value="item.value" :key="index">{{item.name}}</a-radio>
				    </a-radio-group>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="涉案平台："
			    	>
			    	<a-select placeholder="请选择涉案的电商平台" allowClear v-decorator="[
			          'involvePlatform',
			          {
			            rules: [{
			              required: true, message: '请选择涉案的电商平台!',
			            }]
			          }
			        ]">
			        <a-select-option v-for="(item, index) in involvePlatformList" :value="item.value" :key="index">
			          {{item.name}}
			        </a-select-option>
			      </a-select>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="案件类型："
			    	>
		        <a-select placeholder="请选择案件类型" allowClear @change="caseTypeChange" v-decorator="[
			          'caseType',
			          {
			            rules: [{
			              required: true, message: '请选择案件类型!',
			            }]
			          }
			        ]">
			        <a-select-option v-for="(item, index) in caseTypeList" :value="item.value" :key="index">
			          {{item.name}}
			        </a-select-option>
			      </a-select>
			    </a-form-item>
			    <template v-if="modalIndex==2">
			    	<a-form-item
				      v-bind="formItemLayout"
				      label="专利类型："
				    	>
			        <a-select placeholder="请选择专利类型" allowClear v-decorator="[
				          'patentType',
				          {
				            rules: [{
				              required: true, message: '请选择专利类型!',
				            }]
				          }
				        ]">
				        <a-select-option v-for="(item, index) in patentTypeList" :value="item.value" :key="index">
				          {{item.name}}
				        </a-select-option>
				      </a-select>
				    </a-form-item>
				    <a-form-item
				      v-bind="formItemLayout"
				      label="专利申请号"
				    	>
				      <a-input placeholder="请输入专利申请号" maxlength="16" 
					      v-decorator="[
				          'patentSn',
				          {
				            rules: [{
				              required: true, message: '请输入专利申请号!',
				            },
				            {
				              pattern: /[^\u4E00-\u9FA5]{13,16}/, message: '请输入为字母+数字+字符，不允许输入汉字，长度限制13-16字之间',
				            }]
				          }
				        ]"
			        />
				    </a-form-item>
				    <a-form-item
				      v-bind="formItemLayout"
				      label="专利名称"
				    	>
				      <a-input placeholder="请输入专利名称" maxlength="40" 
					      v-decorator="[
				          'patentName',
				          {
				            rules: [{
				              required: true, message: '请输入专利名称!',
				            }]
				          }
				        ]"
			        />
				    </a-form-item>
			    </template>
			    
			    <a-form-item
			    	v-if="modalIndex != 4"
			      v-bind="formItemLayout"
			      label="商品链接："
			    	>
			      <a-input placeholder="请输入案件涉及的店铺或商品链接" 
				      v-decorator="[
			          'productUrl',
			          {
			            rules: [{
			              type:'string', required: true, message: '请输入案件涉及的店铺或商品链接!',
			            },
			            {
			              pattern: /^https?/, message: '商品链接必须是以http、https开头',
			            }],
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			    	v-if="modalIndex == 4"
			      v-bind="formItemLayout"
			      label="治理行业："
			    	>
			      <a-input placeholder="请输入治理行业名称" maxlength="40" 
				      v-decorator="[
			          'manageIndustry',
			          {
			            rules: [{
			              type:'string', required: true, message: '请输入治理行业名称!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="案件描述："
			      class="caseDesc_form_item"
			    	>
			      <a-textarea :autosize="{ minRows: 4, maxRows: 55 }" maxlength="2000" placeholder="请输入案件详细描述" 
				      v-decorator="[
			          'caseDesc',
			          {
			            rules: [{
			              type:'string', required: true, message: '请输入案件详细描述!',
			            }]
			          }
			        ]"
		        />
		        <span class="text_tip">{{form && form.getFieldValue && form.getFieldValue('caseDesc') ?  form.getFieldValue('caseDesc').length : 0}}/2000字</span>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="案件材料："
			      class="upload_form_item"
			    	>
			    	<a-upload class="upload_wrap" name="Filedata" @change="uploadChange" :remove="uploadRemove" :disabled="uploadDisabled" :fileList="fileList" :action="adminUrl + '/iprp_operator/api/file/upload'"
			    		v-decorator="[
			          'caseMaterialUrl',
			          {
			            rules: [{
			              required: true, message: '请上传案件材料!',
			            }]
			          }
			        ]">
					    <a-button>
					      <a-icon type="upload" />上传文件
					    </a-button>
					  </a-upload>
					  <p class="upload_tip">注：1、请把批量投诉链接、图片、案情描述等案件材料放置文件夹中以压缩包形式上传。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、外观设计专利和实用新型专利案件材料中必须包含评价报告。</p>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="委托方："
			    	>
		        <a-input placeholder="请输入委托方公司名称" maxlength="40"
				      v-decorator="[
			          'entruster',
			          {
			            rules: [{
			              type:'string', required: true, message: '请输入委托方公司名称!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="联系人："
			    	>
		        <a-input placeholder="请输入您的姓名" maxlength="10" 
				      v-decorator="[
			          'contactName',
			          {
			            rules: [{
			              type:'string', required: true, message: '请输入您的姓名!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="联系电话："
			    	>
		        <a-input placeholder="请输入手机号码" maxlength="11"
				      v-decorator="[
			          'contactPhone',
			          {
			            rules: [{
			              type:'string', required: true, message: '请输入手机号码!',
			            },
			            {
			              pattern: /^1\d{10}$/, message: '请输入正确的手机号码',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      class="sub_btn"
			      label=" "
			    	>
			      <a-button type="primary" @click.prevent="showConfirm">提交</a-button>
			    </a-form-item>
			  </a-form>
			</div>
			<pubFooterNew></pubFooterNew>
			<!-- 弹窗 -->
			<div class="mask" v-if="visible"></div>
			<div class="confirm_box" v-if="visible">
				<span class="close" @click="visible=false"><i class="ant-modal-close-icon anticon anticon-close"><svg viewBox="64 64 896 896" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></i></span>
				<p>提交成功，专员正在赶来，请注意接听电话！</p>
				<div class="btn_wrap"><span class="btn yes" @click="visible=false">知道了</span></div>
			</div>
		</div>
	</div>
</template>

<script>
	import Filters from 'utils/filters'
	import pubFooterNew from 'components/public/footerNew.vue'
	const { adminUrl, indexUrl } = CONFIG;
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
				serviceTypeList:[{value:1, name:'投诉'},{value:2, name:'申诉'}],
				involvePlatformList:[{value:1, name:'淘宝'},{value:2, name:'天猫'},{value:3, name:'京东'}],
				caseTypeList:[{value:1, name:'商标侵权'},{value:2, name:'专利侵权'},{value:3, name:'版权侵权'},{value:4, name:'行业低价治理'},{value:5, name:'其它'}],
				patentTypeList:[{value:1, name:'外观设计专利'},{value:2, name:'发明专利'},{value:3, name:'实用新型专利'}],
				adminUrl,
				uploadDisabled: false,
				formItemLayout: {
	        labelCol: {
	          xs: { span: 24 },
	          sm: { span: 4 },
	        },
	        wrapperCol: {
	          xs: { span: 24 },
	          sm: { span: 20 },
	        },
	      },
	      modalIndex: 1,
	      educationList:[],
	      fileList:[]
			}
		},
		components: {
			pubFooterNew
		},
		beforeCreate () {
	    this.form = this.$form.createForm(this);
	  },
		mounted () {
			//this.API.homePage.statis();
			this.form.setFieldsValue({serviceType: 1});
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
			showConfirm() {
				this.form.validateFieldsAndScroll((err, values) => {
	        if (!err) {
	          console.log('Received values of form: ', values);
	          let file = this.fileList[0];
	          if (file.status !== 'done') {
	          	this.$message.error('文件上传失败，请删除后重新上传');
	          	return;
	          }
	          let data = {...values};
	          data.caseMaterialUrl = file.response.url;
	          data.caseMaterialName = file.response.fileName;
	          let self = this;
			      this.$confirm({
			        title: '请仔细核对案件信息，确认提交？',
			        centered: true,
			        onOk() {
			          self.handleOk(data);
			        },
			        onCancel() {
			          console.log('Cancel');
			        },
			        class: 'test',
			      });
			    }
			  });
	    },
			async handleOk(data) {
        console.log('post data: ', data);
        if (this.submitted) {
					return
				}
				this.submitted = true;
				try {
					let resp = await this.API.homePage.submitSafeguardCompanyCase(data);
					this.visible = true;
					this.submitted = false;
					this.fileList = [];
					this.form.resetFields();
					this.form.setFieldsValue({serviceType: 1});
				}
				catch (e) {
					this.submitted = false;
					this.$message.error(e && e.response.data && e.response.data.msg);
				}
	    },
	    caseTypeChange (value) {
	    	console.log(value)
	    	this.modalIndex = value;
	    },
	    uploadChange({file, fileList}) {
		    if (fileList.length === 1) {
		    	this.uploadDisabled = true;
	        console.log(file, fileList);
	        this.fileList = [...fileList]
	      }
		  },
		  uploadRemove(d) {
	      console.log(d);
	      let idx = -1;
	      this.fileList.some((item, index) => {
	      	if (item.uid === d.uid) {
	      		idx = index;
	      		return true;
	      	}
	      });
	      if (idx !== -1) {
	      	this.fileList.splice(idx, 1);
	      	this.form.setFieldsValue({caseMaterialUrl: ''});
	      }
		  },
		  custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView({
          behavior: 'smooth',
          block:'start'
        }); }
      },
		},
		watch: {
			fileList() {
				if (this.fileList.length === 0) {
					this.uploadDisabled = false;
				} else {
					this.uploadDisabled = true;
				}
			},
			visible() {
				if (!this.visible) {
					this.custormAnchor('home_page')
				}
			}
		}
	}
</script>


<style lang="scss">
	.home_page {
		width: 100%; min-height: 100%; background: #fff;background:linear-gradient(180deg,rgba(44,127,242,1) 0%,rgba(50,57,192,1) 100%);
		.home_page_in{
			width: 100%; height: 100%;background: transparent url(~assets/img/home/bg_01.png) center 440px no-repeat;
			
			>h3{padding-top: 60px;padding-bottom: 50px;color: #fff;line-height: 59px;font-size:44px;font-weight: bold;text-align: center;}
		
			.content_wrap {
				width: 1200px;padding: 90px 0 90px;position: relative;margin: 0 auto;margin-bottom: 75px;box-shadow:0px 20px 20px 0px rgba(15,29,113,0.09);background: #fff;
				.content_bg{
					position: absolute;left: 30px;top: -15px;right: 30px;bottom: -15px;background-color: #fff;opacity: 0.4;
				}
				.form_box{
					width: 720px;margin: 0 auto;
					.ant-form-item-label{
						label{font-size: 16px;margin-right: 5px;}
					}
					.ant-form-item{padding-bottom: 30px;margin-bottom: 0;}
					.form_item {
						position: relative;width: 605px;display: inline-block;min-height: 46px;padding-bottom: 30px;
					}
					.has-error .ant-form-explain, .has-error .ant-form-split{position: absolute;left: 0;bottom: -21px;}
					.sub_btn{
						padding-bottom: 0;
						label:after{display: none;}
						.ant-btn-primary{
							width:112px;height:40px;background:#0096FF;border-radius:4px;font-size:16px;line-height: 38px;border-color:#0096FF!important;
							&:hover{border-color:#0096FF;}
						}
					}
					textarea.ant-input{margin-bottom: 0;}
					.upload_wrap{
						.ant-btn-default {border-color: #D9D9D9;color: #999;width:106px;height:32px;border-radius:4px;}
					}
					.upload_tip{height:50px;line-height: 20px;color:#999;font-size:14px;width: 700px;padding-top: 10px;}
					.upload_form_item{
						.ant-form-explain{bottom: -20px}
					}
					.caseDesc_form_item{
						position: relative;
					}
					.text_tip{float: right;height:24px;line-height: 24px;color:#999;font-size:16px;width: 700px;margin-right: 10px;margin-top: -30px;display: inline;text-align: right;width: auto;z-index: 20;position: relative;}
				}
				.ask_btn{width:300px;margin: 10px auto 0;height:60px;background:#DB1F1C;border-radius:30px;opacity:0.5;font-size:20px;line-height: 60px;color: #fff;text-align: center;cursor: pointer;}
				.hight{opacity: 1}
			}
			.mask{position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 2000;background-color: rgba(0, 0, 0, 0.6);}
			.confirm_box{
				position: fixed;left: 50%;top: 50%;width: 416px;height: 140px;margin-top: -70px;margin-left: -208px;background-color: #fff;z-index: 2001;box-shadow:0px 1px 4px 0px rgba(0,0,0,0.08);border-radius:4px;padding: 40px 30px 30px;
				p{font-size:16px;line-height:20px;color: #333;text-align: center;}
				.btn_wrap{
					text-align: center;padding-top: 25px;
					span{display: inline-block;width:68px;height:32px;line-height: 30px;border-radius:4px;border:1px solid #E6E6E6;font-size:14px;color: #666;text-align: center;cursor: pointer;}
					.yes{background-color: #0096FF;border-color: #0096FF;color: #fff;margin-left: 10px;}
				}
				.close{float: right; margin-right: -25px; margin-top: -30px;color: #ddd;width: 30px;height: 30px;text-align: center;cursor: pointer;}
			}
		}
	}
	.ant-modal-confirm-btns{
		.ant-btn-default{border-color: #0096FF;height: 32px;color: #0096FF;}
		.ant-btn-primary{background-color: #0096FF;border-color: #0096FF;height: 32px;color: #fff;}
	}
	.ant-modal-confirm-body{
		.anticon-question-circle{display: none;}
	}
</style>
