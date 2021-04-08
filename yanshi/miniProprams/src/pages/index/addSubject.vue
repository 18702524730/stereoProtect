<template>
  <div class="subjectForm" :class="[isIphoneX ? 'phoneXWrap' : '']">
    <div class="personalWrap">
      <div class="inputItem">
        <div class="des"><span>*</span>姓名：</div>
        <input type="text" v-model="form.apply_name" :maxlength="10" placeholder-class="placeholder" placeholder="请填写申请人真实姓名" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>身份证号：</div>
        <input type="text" v-model="form.apply_number" :maxlength="18" placeholder-class="placeholder" placeholder="请填写申请人身份证号" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>银行卡卡号：</div>
        <input type="text" v-model="form.bankCard" :maxlength="19" placeholder-class="placeholder" placeholder="请填写申请人银行卡号" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>预留手机号：</div>
        <input type="text" v-model="form.bankPhone" :maxlength="11" placeholder-class="placeholder" placeholder="请填写银行卡预留手机号" />
      </div>
      <div class="nextStepWrap">
        <button type="button" :class="['nextStepBtn', form.apply_name && form.apply_number && form.bankCard && form.bankPhone ? '' : 'btnDisabled']" @click="submit">提交认证</button>
        <div class="iphoneX" v-if="isIphoneX"></div>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="modal-mask" catchtouchmove="preventTouchMove" v-if="showModal">
      <div class="maskBg"></div>
      <div class="mymodal-dialog">
        <div class="mymodal-dialog-in">
          <div class="modal-title">
            <p class="tit">请填写验证码</p>
          </div>
          <div class="modal-content">
            <div class="inputWrap">
              <input type="text" v-model="form.bankPhone" disabled>
            </div>
            <div class="inputWrap">
              <input type="text" :maxlength="6" v-model="msgCode" placeholder="请输入验证码"><div :class="['msgCode', codeText == '重发验证码' ? 'prenentMsg' : '']" @click="getCode">{{codeText}}</div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn_item btn-confirm line" @click="confirm" data-status="confirm" >确定</div>
          </div>
          <img class="closeImg" @click="closeDia" src="~assets/img/icon/close1.png" alt="">
        </div>
      </div>
    </div>
    <u-message/>
  </div>
</template>

<script>
const form = { apply_name: '', apply_number: '', bankCard: '', bankPhone: '', apply_type: 5, is_default: '1' };
import { mapState, mapActions } from 'vuex';
import { Validator, strategys } from 'utils/valid';
import mixins from 'mixins/';
import { _debounce } from 'utils/public';
export default {
  mixins: [mixins],
  data () {
    return {
      form: Object.assign({}, form),
      isIphoneX: false,
      codeText: '60s后重发',
      preventCode: true,
      msgCode: '',
      applyId: '',
      oldPhone: '',
      showModal: false,
      timer: '',
    }
  },
  components: {
    
  },
  computed: {
    btnState(){
      return Object.values(this.form).every(item => item);
    },
    ...mapState('auth', ['authInfo'])
  },
  mounted () {
    this.isIphoneX = this.judgeIsPhoneX();
    if (this.$route.query.type) {
      this.form = this.authInfo;
      this.form.bankCard = '';
    }
  },
  onLoad () {

  },
  onShareAppMessage() {
    let obj = {};
    obj = {
      title: '多维快速知识产权保护平台',
      path: "/pages/index/index",
      imageUrl: '/static/icon/test.jpg'
    }
    return obj;
  },
  methods: {
    ...mapActions('auth', [
      'initInfo'
    ]),
    validaFunc () {
      var validator = new Validator();
      // 添加验证规则
      validator.addArr(this.form.apply_name, [
        { strategy: 'isNotEmpty', errorMsg: '请填写申请人真实姓名' }
      ]);
      validator.addArr(this.form.apply_number, [
        { strategy: 'isNotEmpty', errorMsg: '请填写申请人身份证号' },
        { strategy: 'idCardFormat', errorMsg: '身份证号格式不正确' }
      ]);
      validator.addArr(this.form.bankCard, [
        { strategy: 'isNotEmpty', errorMsg: '请填写申请人银行卡号' },
        { strategy: 'bankCarkFormat', errorMsg: '银行卡号格式不正确' }
      ]);
      validator.addArr(this.form.bankPhone, [
        { strategy: 'isNotEmpty', errorMsg: '请填写银行卡预留手机号' },
        { strategy: 'mobileFormat', errorMsg: '手机号格式不正确' }
      ]);
      var errorMsg = validator.start();
      return errorMsg;
    },
    submit: _debounce(async function () {
      // 规则验证
      var errorMsg = this.validaFunc();
      if(errorMsg){
        this.tips(errorMsg);
        return false;
      }
      this.form.apply_phone = this.form.bankPhone
      if (this.codeText != '重发验证码' && this.codeText != '60s后重发' && this.oldPhone == this.form.bankPhone) {
        this.showModal = true;
        return false;
      } else {
        clearInterval(this.timer);
        this.codeText = "重发验证码";
        this.preventCode = true;
      }
      console.log('this.form', this.form)
      let data = await this.API.subject.subject4MiniApp(this.form);
      this.oldPhone = data.bankPhone;
      this.$store.dispatch('auth/initInfo', {info: data});
      if (data.apply_id) {
        this.form.apply_id = data.apply_id;
      }
      // 发送验证码
      let aData = await this.API.subject.authentication({
        apply_subject_id: data.apply_id,
        bank_card: this.form.bankCard,
        bank_phone: this.form.bankPhone
      });
      if (aData.code == 200) {
        this.showModal = true;
        this.applyId = data.apply_id;
        this.timeout();
      } else {
        this.tips(aData.desc);
      }
    }, 1000, true),
    // 重获验证码
    getCode () {
      console.log('prevent', this.preventCode)
      if (this.preventCode) {
        this.preventCode = false;
        this.getCapcha();
      }
    },
    // 个人认证银行预留手机号获取 apply_subject_id 提交认证后可获取到
    async getCapcha () {
      let data = await this.API.subject.authentication({
        apply_subject_id: this.applyId, 
        bank_card: this.form.bankCard, 
        bank_phone: this.form.bankPhone
      });
      if (data.code != 200) {
        this.preventCode = true;
      } else {
        this.timeout();
      }
    },
    closeDia(){
      this.showModal = false
      // clearInterval(this.timer);
      // this.codeText = "重发验证码";
      // this.preventCode = true;
    },
    async confirm () {
      if (!this.msgCode || this.msgCode.length < 6) {
        this.tips('请填写6位数字验证码')
        return false;
      }
      let data = await this.API.subject.verifyMobCode({
        apply_subject_id: this.applyId,
        mobile_code: this.msgCode
      })
      if (data.code == 200) {
        let query = this.$root.$mp.query;
        // this.$message({content: '认证成功', type: 'success'});
        wx.showToast({
          title: '认证成功',
          icon: 'none',
          duration: 2000
        })
        this.$store.dispatch('auth/initInfo', {info: Object.assign({}, this.authInfo, { is_checked: 1 })});
        this.showModal = false;
        setTimeout(() => {
          this.$router.replace({path: '/pages/index/webpageEvidence'});
        }, 1000)
      } else {
        this.tips(data.desc)
      }
    },
    //定时器 发送验证码的定时器
    timeout () {
      var self = this;
      var second = 59;
      this.timer = setInterval(function(){
        if(second<=0){
          clearInterval(self.timer);
          second = 59;
          self.codeText = "重发验证码";
          self.preventCode = true;
        }else{
          self.codeText = second + "s后重发";
          self.preventCode = false;
          second--;
        }
      }, 1000);
    },
  }
}
</script>

<style lang="scss">
page{background: #fff;}
.subjectForm{background: #fff;padding: 40px 40px 208px;
  .maskBg{width: 100%;height: 100%;position: absolute;left: 0;top:0;background: rgba(0,0,0,.1);}
  .mymodal-dialog{width: 560px;margin-left: -280px;transform: translateY(-60%);
    .modal-title{text-align: center;font-size: 34px;line-height: 36px;color:#333;padding-top: 30px;padding-bottom: 10px;
      .tit{font-size: 34px;line-height: 50px;font-weight: 600;}
    }
    .mymodal-dialog-in .modal-content{margin-bottom: 0;padding: 0 40px;
      .inputWrap{display: flex;border-bottom: 1px solid #eee;}
      input{line-height: 48px;border-radius: 4px;width: 100%;text-align: left;margin: 36px 0 20px;
        font-size: 34px;color: #333;
      }
      .msgCode{line-height: 40px;text-align: right;font-size: 28px;color: #999;min-width: 140px;padding-top: 50px;}
      .prenentMsg{color:#0096FF;}
    }
    .modal-footer{border: none;
      .btn_item{height: 90px;line-height: 90px;color: #fff;font-size: 30px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(36,125,255,1) 100%);
      border-radius: 45px;margin: 60px 40px 50px;}
    }
  }
  .closeImg{width: 90px;height: 90px;position: absolute;left: 50%;transform: translateX(-50%);bottom: -140px;}
}
.nextStepWrap{background:rgba(255,255,255,1);padding: 20px;text-align: center;
  position: fixed;bottom: 0;left: 0;width: 100%;z-index: 10;
    .nextStepBtn{display: block;padding: 0;border: none;line-height: 90px;color: #fff;font-size: 30px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(36,125,255,1) 100%);border-radius: 45px;}
    .btnDisabled{opacity: 0.5;}
    .iphoneX{height: 68px;background: #fff;}
  }
.phoneXWrap{
  padding-bottom: 276px;
}


</style>
