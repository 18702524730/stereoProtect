<template>
  <div class="subjectForm" :class="[isIphoneX ? 'phoneXWrap' : '']">
    <div class="personalWrap">
      <div class="inputItem" @click="selectType">
        <div class="des"><span>*</span>专利类型：</div>
        <input type="text" v-model="form.typeName" disabled :maxlength="20" placeholder-class="placeholder" placeholder="请选择专利类型" />
        <i class="iconfont icon-jiantou"></i>
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>专利申请号：</div>
        <input type="text" v-model="form.patentApplySn" :maxlength="16" placeholder-class="placeholder" placeholder="请输入专利申请号" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>专利名称：</div>
        <input type="text" v-model="form.patentName" :maxlength="40" placeholder-class="placeholder" placeholder="请输入专利名称" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>联系人：</div>
        <input type="text" v-model="form.contactName" :maxlength="10" placeholder-class="placeholder" placeholder="例如王先生/王女士" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>联系电话：</div>
        <input type="text" v-model="form.contactPhone" :maxlength="11" placeholder-class="placeholder" placeholder="方便专员及时为您处理问题" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>侵权商品链接：</div>
        <input type="text" v-model="form.infringeGoodUrl" :maxlength="500" placeholder-class="placeholder" placeholder="请输入侵权商品链接" />
      </div>
      <div class="inputItem" style="border: none;margin-bottom: 0;">
        <div class="des"><span></span>侵权商品图片：</div>
        <div class="photoWrap">
          <div class="photo" v-if="imgArr.length < 5" @click="chooseImage('')">
            <img mode="aspectFill" v-if="false" src="~assets/img/order/timg1.jpg" alt="">
          </div>
          <div class="pic" v-for="(item, index) in imgArr" :key="index" @click="preview">
            <img class="img" :src="item.url" :data-index="index+1" mode="aspectFill" alt="">
            <p @click.stop="chooseImage(index+1)">重新上传</p>
            <img src="~assets/img/icon/close.png" @click.stop="delImg(index)" class="close" alt="">
          </div>
          <!-- <div class="updateBtn">重新上传</div> -->
        </div>
        <p class="phoneDes">请上传侵权商品图片，1-5张，jpg、jpep或png格式。</p>
      </div>
      <div class="btnWrap"></div>
      <div class="nextStepWrap">
        <button type="button" :class="['nextStepBtn', btnState ? '' : 'btnDisabled']" @click="submit">立即提交</button>
        <div class="iphoneX" v-if="isIphoneX"></div>
      </div>
      <!-- <button type="button" @click="saveForm" :class="['submitBtn', !form.name.length||!form.idNo.length ? 'btnDisabled' : '']">立即提交</button> -->
    </div>
    <u-message/>
  </div>
</template>

<script>
const form = { patentType: '', patentApplySn: '',typeName: '', patentName: '', contactName: '', contactPhone: '', infringeGoodUrl: '', infringeImgUrl: '', infringeImgArr: [] };
import { Validator, strategys } from 'utils/valid';
import mixins from 'mixins/';
import interfaces from '@/api//interfaces';
const { mpUrl } = CONFIG;
const typeList = ['外观设计专利', '发明专利', '实用新型专利'];
export default {
  mixins: [mixins],
  data () {
    return {
      form: Object.assign({}, form),
      isIphoneX: false,
      imgArr: [],
      loading: false,
      i: 0,
      // btnState: false
    }
  },
  components: {
    
  },
  computed: {
    btnState(){
      return Object.values(this.form).slice(0, -2).every(item => item);
    }
  },
  mounted () {
    this.isIphoneX = this.judgeIsPhoneX()
  },
  onLoad () {
    this.form = Object.assign({}, form);
    // this.init()
  },
  onUnload () {
    console.log(form)
    this.form = Object.assign({}, form);
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
    selectType () {
      let self = this;
      wx.showActionSheet({
        itemList: typeList,
        success:(res) => {
          this.form.patentType = res.tapIndex + 1;
          this.form.typeName = typeList[res.tapIndex];
          console.log(this.form, res)
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    },
    async searchCompany () {
      console.log('this.form', this.form)
      if (this.form.name.length > 2 && this.form.type === 2) {
        let data = await this.API.subject.companyDetail({content: this.form.name});
        this.form.idNo = data.creditcode ? data.creditcode : '';
        this.form.faren = data.frname ? data.frname : '';
      }
    },
    validaFunc () {
      var validator = new Validator();
      // 添加验证规则
      validator.addArr(this.form.patentType, [
        { strategy: 'isNotEmpty', errorMsg: '请选择专利类型' }
      ]);
      validator.addArr(this.form.patentApplySn, [
        { strategy: 'isNotEmpty', errorMsg: '请输入您的专利申请号' },
        { strategy: 'patentSnFormat', errorMsg: '专利申请号格式不正确' }
      ]);
      validator.addArr(this.form.patentName, [
        { strategy: 'isNotEmpty', errorMsg: '请输入专利名称' }
      ]);
      validator.addArr(this.form.contactName, [
        { strategy: 'isNotEmpty', errorMsg: '请输入联系人' }
      ]);
      validator.addArr(this.form.contactPhone, [
        { strategy: 'isNotEmpty', errorMsg: '请输入联系电话' },
        { strategy: 'mobileFormat', errorMsg: '手机号格式不正确' }
      ]);
      validator.addArr(this.form.infringeGoodUrl, [
        { strategy: 'isNotEmpty', errorMsg: '请输入侵权商品链接' },
        { strategy: 'websiteFormat', errorMsg: '链接格式不正确' }
      ]);
      var errorMsg = validator.start();
      return errorMsg;
    },
    // 删除图片
    delImg (index) {
      console.log(index)
      this.imgArr.splice(index, 1);
    },
    // 图片预览
    preview (e) {
      if (e.target) {
        let index = e.target.dataset.index;
        let urls = this.imgArr.map(item => item.url);
        if (index) {
          wx.previewImage({
            current: urls[index-1], // 当前显示图片的http链接
            urls // 需要预览的图片http链接列表
          })
        }
        console.log(e)
      } else {
        wx.previewImage({
          current: e, // 当前显示图片的http链接
          urls: [e] // 需要预览的图片http链接列表
        })
      }
    },
    // 上传 index 为重新上传的图片索引, index > 1000则为fileType
    chooseImage (index) {
      if (this.loading) {
      wx.showToast({
        title: '图片上传中，请稍后再试',
        icon: 'none',
        duration: 1000
      })
        return;
      }
      let count = index ? 1 : 5 - this.imgArr.length;
      wx.chooseImage({
        count,
        sourceType: ['camera', 'album'],
        success: (res) => {
          console.log(res)
          let tempFilePaths = res.tempFilePaths;
          this.i = 0;
          this.upload(tempFilePaths, index)
        }
      })
    },
    // 上传
    upload (tempFilePaths, index) {
      let len = tempFilePaths.length;
      console.log('tempFilePaths', tempFilePaths, tempFilePaths[this.i], this.i)
      this.loading = true;
      wx.uploadFile({
        header: interfaces.createAuthHeader(),
        url: `${mpUrl}/iprp_middleground/api/file/upload`, //仅为示例，非真实的接口地址
        filePath: tempFilePaths[this.i],
        name: 'fileData',
        formData:{
          'user': 'test'
        },
        success: (res) => {
          console.log('res', res);
          if (res.statusCode == 200) {
            if (index) {
              this.loading = false;
              this.$set(this.imgArr, index-1, JSON.parse(res.data))
            } else { // 批量上传商标证
              let respData = JSON.parse(res.data);
              respData.url = respData.url.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
              console.log('respData', respData)
              this.imgArr.push(respData);
              this.i++;
              if (this.i < len) {
                this.upload(tempFilePaths);
              } else {
                this.loading = false;
                // this.imgArr = [...new Set(this.imgArr)];
              }
            }
          }
          console.log(this.imgArr)
        },
        fail: res => {
          this.loading = false;
          console.log('reserr', res)
        }
      })
    },
    async submit () {
      // 规则验证
      var errorMsg = this.validaFunc();
      if(errorMsg){
          this.tips(errorMsg);
          return false;
      }
      this.form.infringeImgArr = [];
      this.imgArr.forEach(item => {
        this.form.infringeImgArr.push(item.url);
      })
      this.form.infringeImgUrl = this.form.infringeImgArr.join(';');
      await this.API.stereoProtect.submitPatentJudgeOrder(this.form);
      wx.showModal({
        title: '提交成功',
        content: '知产专家正在火速赶来，请注意接听电话！',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#0096FF',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my'
            })
          }
        }
      })
    },
    init () {
      if(this.$route.query.type){
        this.form.type = Number(this.$route.query.type);
      }
      console.log(this.form.type)
    }
  }
}
</script>

<style lang="scss">
.subjectForm{background: #fff;padding: 40px 40px 208px;

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
