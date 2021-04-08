import http from '@/plugins/flyio/request'
const { cartUrl, wxUrl, userUrl, indexUrl, rootUrl } = CONFIG;
const miniAppType = 10; //1公众号 2 微商城小程序 3 推单助手小程序 4商标管家 5合伙人B  8.链科

const interfaces = {

  miniAppType,

	/**
   * 创建ajax头部信息
   */
	createAuthHeader() {
    const token = wx.getStorageSync('key');
    const sessionId = wx.getStorageSync('sessionId');
    const header = {};
    if (token) {
      header['Authorization'] = token;
    }
    if (sessionId) {
      header['MiniAppSessionId'] = sessionId;
    }
    header['MiniAppType'] = miniAppType;
    return header;
  },

  /**
   * 获取session
   */
  async getSession(code) {
    const url = `${wxUrl}/weixin/miniApp/getMiniAppSessionId.do`;
    const data = await http.post(url, {code, miniAppType});
    return data;
  },

  /**
   * 解密用户数据，获取openid
   */
  async decodeUserInfo(miniAppSessionId, encryptedData, iv) {
    const url = `${wxUrl}/weixin/miniApp/decodeUserInfo.do`;
    const data = await http.post(url, {
      miniAppType,
      miniAppSessionId,
      encryptedData,
      iv
    });
    return data;
  },

  /**
   * 设置有效的sessionId
   */
  async setValidSession() {
    const res = await WXP.login();
    const sessionRes = await this.getSession(res.code);
    return sessionRes;
  },

  /**
   * 获取accesstoken
   */
  async getWxAccessToken(miniAppType, miniAppSessionId) {
    const url = `${wxUrl}/weixin/miniApp2/getWxAccessToken.do`;
    const data = await http.post(url, {miniAppType, miniAppSessionId});
    if (data.code === 0) {
    	wx.setStorageSync('accessToken', data.accesstoken);
    }else{
    	wx.setStorageSync('accessToken', '');
    }
    return data;
  },

  /**
   * 解密用户手机号
   */
  async decodePhoneNumber(miniAppSessionId, encryptedData, iv) {
    const url = `${wxUrl}/weixin/miniApp/decodePhoneNumber.do`;
    const data = await http.post(url, {miniAppType: this.miniAppType, miniAppSessionId, encryptedData, iv});
    return data;
  },

  /**
   * 获取用户手机号
   */
  async getPhoneNumber(e) {
    const sessionId = wx.getStorageSync('sessionId');
    let phoneData = await this.decodePhoneNumber(sessionId, e.mp.detail.encryptedData, e.mp.detail.iv);
    return phoneData.phoneNumber;
  },

  /**
  * 用户主动点击的授权
  */
  async getUserInfoByUser(data) {
    // 解密
    let userInfo = await this.decodeUserInfo(wx.getStorageSync('sessionId'), data.encryptedData, data.iv);
    // 解密成功后，这儿存储用户信息
    this.syncStore(userInfo);
    return userInfo;
  },

  // 判断用户各项授权
  async getAuthSetting(authName) {
    let res = await WXP.getSetting();
    console.log(res);
    return !!res.authSetting['scope.' + authName];
  },

  async reLogin() {
  	try {
  		wx.removeStorageSync('auth');
      wx.removeStorageSync('key');
      wx.removeStorageSync('sessionId');
      wx.removeStorageSync('nickname');
      wx.removeStorageSync('headerUrl');
		} catch(e) {
		}
    let sessionRes = await this.setValidSession(); // 登录获取code,再取得sessionId,并存储
    if (sessionRes.miniAppSessionId) {
      // 已登录（已授权已绑定），这儿存储用户信息
      this.syncStore(sessionRes);
      sessionRes.isLogin = true;
    }else{
      // 未登录（未授权 或 已授权但未绑定）
      sessionRes.isLogin = false;
    }
    return sessionRes;
  },

  async checkLogin() {
    let sessionRes = {}
  	if (!wx.getStorageSync('sessionId')) {
      console.log('sessionId不存在，重新登录')
      sessionRes = await this.reLogin()
  		return sessionRes;
  	}
    try {
      console.log('sessionId存在，检查用户微信登录状态')
      // 检查用户微信登录状态
      let data = await WXP.checkSession();
      console.log('checkSession:ok 表示登录有效', data)
      sessionRes.isLogin = !!wx.getStorageSync('key');
    } catch (e) {
      console.log('sessionId存在，但微信登录状态失效，重新登录')
    	sessionRes = await this.reLogin()
    }
    return sessionRes;
  },

  // 缓存用户数据和token
  syncStore(data){
    if (!data) {
      console.error('登录信息错误')
      return;
    }
    let sessionId = data.miniAppSessionId;
    let key = data.key;
    let wxAccountDTO = data.wxAccountDTO;
    if (sessionId) {
      wx.setStorageSync('sessionId', sessionId);
    }
    if (key) {
      wx.setStorageSync('key', key);
      console.log('登录成功，key:', key)
    }
    if (wxAccountDTO) {
      wx.setStorageSync('auth', wxAccountDTO);
      wx.setStorageSync('nickname', wxAccountDTO.nickname);
      wx.setStorageSync('headerUrl', wxAccountDTO.headimgurl);
    }
  },

  // 短信验证码
  async sms (phone, tipConfig) {
    const url = `${rootUrl}/sendCode`;
    const data = await http.get(url, {phone: phone}, {}, tipConfig);
    return data;
  },

  //登录
  async login(phone, phoneCode, memberId) {
    let miniAppSessionId = wx.getStorageSync('sessionId');
    const url = `${wxUrl}/weixin/miniApp/bindPhoneAndLogin.do`;
    const data = await http.post(url, {miniAppType: this.miniAppType, miniAppSessionId, phone, phoneCode, memberId });
    return data;
  },

  // 开通店铺
  async openShop() {
    const url = `${indexUrl}/partner/openStore.htm`;
    const data = await http.post(url);
    return data;
  },

  // 实名认证短信验证码
  async authCode (phone) {
    const url = `${indexUrl}/partner/b/authCode.htm`;
    const data = await http.get(url, {phone});
    return data;
  },

  // 实名认证
  async realNameAuth(param, tipConfig) {
    const url = `${indexUrl}/partner/b/auth.htm`;
    const data = await http.post(url, param, {}, tipConfig);
    return data;
  },
}

export default interfaces
