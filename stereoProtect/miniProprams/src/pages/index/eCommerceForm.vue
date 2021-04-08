<template>
  <div class="subjectForm" v-if="showPage" :class="[isIphoneX ? 'phoneXWrap' : '']">
    <div class="personalWrap">
      <div class="inputItem" v-if="type != 4">
        <div class="des"><span>*</span>{{type == 1 ? '投诉' : type == 2 ? '申诉' : '抽检'}}平台：</div>
        <input type="text" v-model="form.platform" :maxlength="15" placeholder-class="placeholder" placeholder="电商平台如淘宝、京东、苏宁易购" />
      </div>
      <div class="inputItem" v-if="type == 2 || type == 4" @click="selectType">
        <div class="des"><span>*</span>{{type == 2 ? '被投诉侵犯知识产权类型：' : '知识产权类型：'}}</div>
        <input type="text" v-model="form.intellectualPropertyTypeName" disabled :maxlength="20" placeholder-class="placeholder" placeholder="请选择" />
        <i class="iconfont icon-jiantou"></i>
      </div>
      <div class="inputItem" v-if="type == 4" @click="selectServiceType">
        <div class="des"><span>*</span>服务类型：</div>
        <input type="text" v-model="form.ciqServiceTypeName" disabled :maxlength="20" placeholder-class="placeholder" placeholder="请选择" />
        <i class="iconfont icon-jiantou"></i>
      </div>
      <div class="inputItem" v-if="type == 1 || type == 3">
        <div class="des"><span>*</span>{{type == 1 ? '投诉' : '商品'}}网址：</div>
        <input type="text" v-model="form.website" placeholder-class="placeholder" placeholder="店铺或商品网址" />
      </div>
      <div class="inputItem" v-if="type == 1" @click="minsVisible = true">
        <div class="des"><span>*</span>{{type == 1 ? '投诉' : '申诉'}}内容：</div>
        <div class="contentDiv" :style="{'color': form.contentShow ? '#333' : '#999'}">{{form.contentShow ? form.contentShow : '请选择'}}</div>
        <i class="iconfont icon-jiantou"></i>
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>联系人：</div>
        <input type="text" v-model="form.contactName" :maxlength="10" placeholder-class="placeholder" placeholder="请输入您的姓名" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>联系电话：</div>
        <input type="text" v-model="form.contactPhone" :maxlength="11" placeholder-class="placeholder" placeholder="请输入您的手机号码，方便维权专家快速联系您" />
      </div>
      <div class="inputItem" v-if="type == 3" style="position:relative;">
        <div class="des">抽检理由描述：</div>
        <textarea auto-height="true" placeholder-class="placeholder" confirm-type="next" v-model="form.content" 
          placeholder="请输入抽检理由" maxlength="500" :class="[isIphone ? 'isIphone' : '']" cursor-spacing="120" />
        <span class="input_num">{{form.content.length}}/500</span>
      </div>
      <div class="inputItem" v-if="type == 4" style="position:relative;">
        <div class="des">线索说明：</div>
        <textarea auto-height="true" class="hgrextarea" placeholder-class="placeholder" confirm-type="next" v-model="form.content" 
          placeholder="请说明掌握的线索信息，例如货物类型、出关时间等，方便快速处理。" maxlength="500" :class="[isIphone ? 'isIphone' : '']" cursor-spacing="120" />
        <span class="input_num">{{form.content.length}}/500</span>
      </div>
      <div class="inputItem" v-if="type != 4" style="border: none;margin-bottom: 0;">
        <div class="des"><span></span>上传凭证：</div>
        <div class="photoWrap">
          <div class="photo" v-if="imgArr.length < 5" @click="chooseImage('')">
            <img mode="aspectFill" v-if="false" src="~assets/img/order/timg1.jpg" alt="">
          </div>
          <div class="pic" v-for="(item, index) in imgArr" :key="index" @click="preview">
            <img class="img" :src="item.url" :data-index="index+1" mode="aspectFill" alt="">
            <p @click.stop="chooseImage(index+1)">重新上传</p>
            <img src="~assets/img/icon/close1.png" @click.stop="delImg(index)" class="close" alt="">
          </div>
        </div>
        <p class="phoneDes">提示:上传凭证可为{{type == 2 ? '对方投诉理由' : '订单截图、实物照片'}}、商品网页截图等，1-5张，jpg、jpeg、或png格式。</p>
      </div>
      <div class="btnWrap"></div>
      <div class="nextStepWrap">
        <button type="button" :class="['nextStepBtn', btnState ? '' : 'btnDisabled']" @click="submit">立即提交</button>
        <div class="iphoneX" v-if="isIphoneX"></div>
      </div>
    </div>
    <u-message/>
    <!-- 主体列表弹框列表 -->
    <div class="transition_up" :class="['transition_up', minsVisible ? 'show_animation' : 'hide_animation']">
      <div class="mask_bg"  @click="minsVisible = false"></div>
      <div class="transition_wrap" >
        <div class="popup_wrap">
          <div class="chooseMin">
            <div class="top_header">
              请选择{{type == 1 ? '投诉' : '申诉'}}内容(可多选)
              <label @click="minsVisible = false">取消</label>
            </div>
          </div>
          <div class="mid_content" :class="['mid_content', isIphoneX ? 'mid_content_X' : '']">
            <scroll-view class="categoryItemMinWrap" scroll-y="true" @scroll="handleScroll">
              <div class="contentItem" v-for="(item, index) in contentArr" :key="index" @click="selectContent(index)">
                <p :style="{'color': item.checked ? '#0096FF' : '#333333'}">{{item.text}}</p>
                <img v-if="item.checked" src="../../assets/img/icon/check1.png" alt="">
                <img v-if="!item.checked" src="../../assets/img/icon/check2.png" alt="">
              </div>
            </scroll-view>
          </div>
          <div class="bt_footer" :class="['bt_footer', isIphoneX ? 'bt_footer_X' : '']">
            <div class="btn_wrap">
              <button type="button" class="confirm_btn" @click="confirmContent">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-mask" v-if="showModal">
      <div class="mymodal-dialog">
        <div class="mymodal-dialog-in">
          <div class="modal-title">
            <p class="tit">提交成功</p>
          </div>
          <div class="modal-content">
            <p>知产专家正火速赶来，请注意接听电话！</p>
            <p class="red">立即对侵权网址进行公证存证<br/>保留证据！（限时免费）</p>
          </div>
          <div class="modal-footer">
            <div class="btn_item btn-cancel" @click="diaCancel" data-status="cancel">暂不存证</div>
            <div class="btn_item btn-confirm line" @click="diaConfirm" data-status="confirm" :style="{color: '#F64744'}">马上存证</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const type1Form = { platform: '', website: '', contentShow: '', contactName: '', contactPhone: '', stereoProtectType: 1, content: '',  voucherUrls: '' };
const type2Form = { platform: '',intellectualPropertyTypeName: '',intellectualPropertyType: '', contactName: '', contactPhone: '', stereoProtectType: 2, voucherUrls: '' };
const type4Form = { intellectualPropertyTypeName: '', intellectualPropertyType: '', ciqServiceType: '', ciqServiceTypeName: '', contactName: '',stereoProtectType: 4, contactPhone: '', content: '' };
import { Validator, strategys } from 'utils/valid';
import mixins from 'mixins/';
import interfaces from '@/api/interfaces';
import { _debounce } from 'utils/public';
const { mpUrl } = CONFIG;
const contentArr = [
  {text: '滥用商标关键词', checked: false},
  {text: '在图片上不当展示商标标识', checked: false},
  {text: '侵犯外观设计专利权', checked: false},
  {text: '侵犯发明专利权', checked: false},
  {text: '侵犯实用新型专利权', checked: false},
  {text: '盗用图片', checked: false},
  {text: '美术作品、文字侵权', checked: false},
  {text: '其他', checked: false},
]
const typeList = ['外观设计专利', '发明专利', '实用新型专利', '其他'];
const typeList2 = ['商标', '版权', '外观设计专利', '发明专利', '实用新型专利', '其他'];
const serviceType = ['海关知识产权备案', '海关查处', '专项行动'];
export default {
  mixins: [mixins],
  data () {
    return {
      form: Object.assign({}, type1Form),
      isIphoneX: false,
      imgArr: [],
      contentArr: JSON.parse(JSON.stringify(contentArr)),
      loading: false,
      showPage: false,
      i: 0,
      type: 1, // 1：电商维权投诉 2：电商维权申诉
      minsVisible: false,
      showModal: false,
      btnState: false
    }
  },
  components: {
    
  },
  computed: {
    // btnState(){
    //   return Object.values(this.form).slice(0, -1).every(item => item);
    // }
  },
  mounted () {
    this.isIphoneX = this.judgeIsPhoneX()
  },
  onLoad () {
    this.init()
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
  watch: {
    form: {
      deep: true,
      handler: function (newForm, oldForm) {
        if (this.type != 1) {
          delete newForm.contentShow;
        }
        if (this.type == 3) {
          this.btnState = Object.values(newForm).slice(0, -2).every(item => item);
        } else {
          this.btnState = Object.values(newForm).slice(0, -1).every(item => item);
        }
        
      }
    }
  },
  methods: {
    diaCancel () {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    diaConfirm () {
      this.$storage.set('website', this.form.website);
      this.$router.replace('/pages/index/subjectList');
    },
    selectType () {
      let self = this;
      let itemList;
      if (this.type == 4) {
        itemList = typeList2;
      } else {
        itemList = typeList;
      }
      wx.showActionSheet({
        itemList,
        success:(res) => {
          if (this.type == 4) {
            this.form.intellectualPropertyType = res.tapIndex + 1;
          } else {
            this.form.intellectualPropertyType = res.tapIndex + 3;
          }
          this.form.intellectualPropertyTypeName = itemList[res.tapIndex];
          console.log(this.form, res)
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    },
    selectServiceType () {
      let self = this;
      wx.showActionSheet({
        itemList: serviceType,
        success:(res) => {
          this.form.ciqServiceType = res.tapIndex + 1;
          this.form.ciqServiceTypeName = serviceType[res.tapIndex];
          console.log(this.form, res)
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    },
    init () {
      this.type = this.$route.query.type ? this.$route.query.type : 1;
      this.showPage = true;
      let title = '电商侵权投诉';
      if (this.type == 2) {
        this.$set(this, 'form', Object.assign({}, type2Form))
        console.log(this.form)
        title = '电商维权申诉';
      }
      if(this.type == 3){
        title = '快速质量抽检鉴定';
      }
      if (this.type == 4) {
        title = '海关知识产权保护';
        this.$set(this, 'form', Object.assign({}, type4Form));
      }
      wx.setNavigationBarTitle({
        title
      })
      console.log(this.type, `电商${this.type == 1 ? '侵权投诉' : '维权申诉'}`)
    },
    // 选择投诉内容
    selectContent (ind) {
      this.contentArr.forEach((item, index) => {
        if (index === ind) {
          item.checked = !item.checked;
          return;
        }
      })
    },
    // 确定投诉内容
    confirmContent () {
      this.minsVisible = false;
      let selectArr = this.contentArr.filter(item => item.checked).map(it => it.text);
      this.form.contentShow = selectArr.join('、');
      this.form.content = selectArr.join('/');
    },
    validaFunc () {
      var validator = new Validator();
      // 添加验证规则
      if (this.type != 4) {
        validator.addArr(this.form.platform, [
          { strategy: 'isNotEmpty', errorMsg: '请输入投诉平台' }
        ]);
      }
      if (this.type == 1 || this.type == 3) {
        validator.addArr(this.form.website, [
          { strategy: 'isNotEmpty', errorMsg: '请输入网址' },
          { strategy: 'websiteFormat', errorMsg: '网址格式不正确' }
        ]);
      }
      if (this.type == 1) {
        validator.addArr(this.form.content, [
          { strategy: 'isNotEmpty', errorMsg: this.type == 1 ? '请选择投诉内容' : '请输入抽检理由' }
        ]);
      }
      if (this.type == 2 || this.type == 4) {
        validator.addArr(this.form.intellectualPropertyType, [
          { strategy: 'isNotEmpty', errorMsg: '请选择知产类型' }
        ]);
      }
      if (this.type == 4) {
        validator.addArr(this.form.ciqServiceType, [
          { strategy: 'isNotEmpty', errorMsg: '请选择服务类型' }
        ]);
      }
      validator.addArr(this.form.contactName, [
        { strategy: 'isNotEmpty', errorMsg: '请输入联系人' }
      ]);
      validator.addArr(this.form.contactPhone, [
        { strategy: 'isNotEmpty', errorMsg: '请输入联系电话' },
        { strategy: 'mobileFormat', errorMsg: '手机号格式不正确' }
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
      if (tempFilePaths[this.i].indexOf('.jpg') == -1 && tempFilePaths[this.i].indexOf('.jpeg') == -1 && tempFilePaths[this.i].indexOf('.png') == -1){
        this.tips('上传文件格式为jpg、jpeg、png格式');
        return;
      }
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
    submit: _debounce(async function () {
      // 规则验证
      var errorMsg = this.validaFunc();
      if(errorMsg){
        this.tips(errorMsg);
        return false;
      }
      let voucherUrlsArr = []
      this.imgArr.forEach(item => {
        voucherUrlsArr.push(item.url);
      })
      this.form.voucherUrls = voucherUrlsArr.join(';');
      this.form.stereoProtectType = Number(this.type);
      console.log('this.form', this.form)
      await this.API.stereoProtect.submitStereoProtectOrder(this.form);
      if (this.type == 1) {
        this.showModal = true;
        return false;
      }
      wx.showModal({
        title: '提交成功',
        content: '知产专家正在火速赶来，请注意接听电话！',
        confirmText: '知道了',
        showCancel: false,
        confirmColor: '#0096FF',
        success: (res) => {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    }, 1000, true),
  }
}
</script>

<style lang="scss">
page{background: #fff;}
.subjectForm{background: #fff;padding: 40px 40px 208px;
    textarea{color:#333;text-align: left;padding:0;width:100%;overflow-y:visible;line-height: 50px;max-height: 500px;margin: 0;display: block;
      margin: 20px 0;
      &.isIphone{transform: translateX(-8px);}
    }
    .hgrextarea{min-height: 80px;}
    .input_num{position:absolute;right: 0;top: 0;line-height: 40px;color: #999;font-size: 28px;}
    .mymodal-dialog{
      .mymodal-dialog-in{padding-top: 50px;
        .modal-title{
          .tit{text-align: center;font-size: 36px;font-weight: 400;line-height: 50px;}
        }
        .modal-content{font-size: 28px;
          p{color: #888;line-height: 40px;}
          .red{color: #F64744;padding-top: 10px;}
        }
        .modal-footer{
          .btn_item{flex: 1}
        }
      }
    }
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
.contentDiv{min-height: 40px;margin: 20px 0;line-height: 40px;padding-right: 30px;}
.transition_up {
  position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: -1;
  .mask_bg {position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 9000;display: none;}
  .transition_wrap {
    position:fixed; left:0; bottom: 0; z-index:9001; width: 100%; height: auto; background: #fff; box-shadow:0px -10px 30px 0px rgba(47,128,246,0.09); border-radius:10px 10px 0px 0px; overflow: hidden;
  }
}
.show_animation {z-index: 8999;animation: moveUp 0.3s ease-out; bottom: 0;
  .mask_bg {animation: fadeIn 0.3s ease-out; display:block;}
  .transition_wrap {animation: moveUp 0.3s ease-out; bottom: 0;}
}
.hide_animation {animation: moveDown 0.3s ease-out; bottom: -100%;
  .mask_bg {display:none;}
  .transition_wrap {animation: moveDown 0.3s ease-out; bottom: -100%;}
}
.popup_wrap{
  position: relative;width: 100%;
  .chooseMin{
    height: 95px;line-height: 45px;padding: 30px 30px 20px;text-align: left;
    .top_header{text-align: left;font-size: 32px;position: relative;color: #333;}
    label{color: #999;font-size: 30px;position: absolute;right: 0;top:0;}
  }
  .mid_content{
    padding-bottom: 98px;
    .categoryItemMinWrap{
      padding-bottom: 30px;
      .nodata{background: #fff;background-size: 100%;border-bottom: 0;margin: 0;padding: 0 30px;}
      .subjectDes{font-size:24px;color:rgba(153,153,153,1);line-height:33px;padding: 20px 0;text-align: center;}
      .contentItem{display: flex;margin: 0 30px 0 40px;line-height: 87px;border-bottom: 1px solid #f6f6f6;
        >img{width: 40px;height: 40px;align-self: center;margin-right: 15px;}
        p{flex: 1;font-size: 28px;color: #333;}
        &:last-child{border-bottom: none;}
      }
    }
  }
  .mid_content_X{padding-bottom: 166px;}
  .bt_footer{position: absolute;bottom:0; text-align: center;z-index: 10000; width: 100%;line-height: 96px;font-size: 32px;background: #fff;
    .btn_wrap{height: 130px;padding-top: 20px;
      button{display: block; border: none;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(36,125,255,1) 100%);line-height: 90px;padding: 0;margin: 0 40px;color: #fff;border-radius: 45px;font-size: 30px;}
    }
  }
  .bt_footer_X{padding-bottom: 68px;}
}
@keyframes moveUp {
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 0;
  }
}
@keyframes moveDown {
  0% {
    bottom: 0;
    z-index: 8999;
  }
  100% {
    bottom: -100%;
    z-index: -1;
  }
}
</style>
