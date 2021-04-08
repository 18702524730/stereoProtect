<template>
  <div class="formWrap">
    <div class="add_lists" :class="{'higher':  typeTab==1}">
      <div class="lists_tit"><span class="require">*</span>您的称呼：</div>
      <div class="lists_input mb40 mt20">
        <input placeholder-class="placeholder" v-model="input.contactName" id="applyName" confirm-type="next" placeholder="例如王先生/王女士" maxlength="10" />
      </div>
      <div class="lists_tit"><span class="require">*</span>联系电话：</div>
      <div class="lists_input mb40 mt20">
        <input type="number" placeholder-class="placeholder" confirm-type="next" v-model="input.contactPhone" id="applyPhone" placeholder="方便专员及时为您处理问题" maxlength="11" cursor-spacing="60"/>
      </div>
      <div class="lists_tit">{{type == 9 ? '投诉事由简述：' : '申诉事由简述：'}}<div class="txt_num">{{ input.content ? input.content.length : 0 }}/500</div></div>
      <div class="lists_input mt20">
        <textarea auto-height="true" placeholder-class="placeholder" confirm-type="next" v-model="input.content" 
          :placeholder="type == 9 ? '请简单描述您要投诉的知识产权问题' : '请简单描述您要申诉的知识产权问题'" maxlength="500" :class="[isIphone ? 'isIphone' : '']" cursor-spacing="120" />
      </div>
    </div>
    <button type="button" :class="['submitBtn', input.contactName && input.contactPhone ? '' : 'disabled']" @click="submit">{{type == 9 ? '立即投诉' : '立即申诉'}}</button>
    <u-message/>
  </div>
</template>

<script>
import { Validator, strategys } from 'utils/valid';
const input = { contactName: '', contactPhone: '', content: '' }
export default {
  data () {
    return {
      input: Object.assign({}, input),
      type: 9,
      isIphone: false
    }
  },
  components: {

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
  onLoad () {
    this.input = Object.assign({}, input);
    this.init();
    wx.getSystemInfo({
      success: res => {
        if (res.model.indexOf('iPhone') != -1) {
          this.isIphone = true;
        }
        console.log('11111111111111111111111111111111', res.model)
      }
    });
  },
  methods: {
    validaFunc () {
      var validator = new Validator();
      // 添加验证规则
      validator.addArr(this.input.contactName, [
        { strategy: 'isNotEmpty', errorMsg: '请输入联系人' }
      ]);
      validator.addArr(this.input.contactPhone, [
        { strategy: 'isNotEmpty', errorMsg: '请输入联系电话' },
        { strategy: 'mobileFormat', errorMsg: '手机号格式不正确' }
      ]);
      var errorMsg = validator.start();
      return errorMsg;
    },
    init () {
      this.type = this.$route.query.type ? this.$route.query.type : 9;
      wx.setNavigationBarTitle({
        title: `我要${this.type == 9 ? '投诉' : '申诉'}`
      })
      console.log(this.type)
    },
    async submit () {
      // 规则验证
      var errorMsg = this.validaFunc();
      if(errorMsg){
          this.tips(errorMsg);
          return false;
      }
      this.input.consultationType = this.type;
      this.input.source = 1;
      await this.API.consultation.submitMemberConsultation(this.input);
      let content = this.type == 9 ? '您的投诉我们已经收到，专家会在30分钟内进行回访，请注意接听电话！' : '您的申诉我们已经收到，专家会在30分钟内进行回访，请注意接听电话！';
      wx.showModal({
        title: '提交成功',
        content,
        confirmText: '知道了',
        showCancel: false,
        confirmColor: '#0096FF',
        success: (res) => {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
page{background: #fff;}
.add_lists{padding:40px; box-sizing:border-box;min-height: 566px; transition: min-height 0.3s;
  .lists_tit{
    color: #333;font-size: 28px;line-height: 40px;position: relative;
    .txt_num{text-align: right;color: #bbb;font-size:28px; position: absolute;right:0;top: 0;}
    .switch {position: absolute;right:0;top: -10rpx; height:50px; zoom: .8; }
    .tips {color: #bbb;}
    .require{color: #f64744;}
  }
  .lists_input{border-bottom:1px solid #eee;padding-bottom: 20px;line-height:40px;font-size:28px;
    .placeholder{color: #bbb;text-align: left; font-size: 28px;}
    textarea{color:#333;text-align: left;padding:0;width:100%;overflow-y:visible;line-height: 50px;max-height: 500px;margin: 0;display: block;
      &.isIphone{transform: translateX(-8px);}
    }
    input{color:#333;}
  }
}
.formWrap{
  .submitBtn{width: 670px;line-height: 90px;border-radius: 45px;margin: 0;padding: 0;border: none;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(36,125,255,1) 100%);font-size: 30px;color: #fff;position: fixed;bottom: 88px;left: 40px;}
  .disabled{opacity: 0.5;}
}
</style>
