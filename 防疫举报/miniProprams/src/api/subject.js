import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl, userUrl, czUrl } = CONFIG;
export default {
  // 申请人主体列表
  async subject (params, noShowLoading) {
    const url = `${userUrl}/api/subject`;
    const data = await http.get(url, params, {}, { isLoading: false });
    return data;
  },
  // 企业/个人实名认证保存
  async subject4MiniApp (params, noShowLoading) {
    const url = `${userUrl}/api/subject4MiniApp`;
    const data = await http.post(url, params, noShowLoading);
    return data;
  },
  // 个人预留手机号验证码获取 验证 https://testcz.ipsebe.com/EvidenceController/subject/authentication.do
  async authentication (params) {
    console.log('authenticationparams', params)
    const url = `${czUrl}/EvidenceController/subject/authentication.do?`+qs.stringify(params);
    const data = await http.post(url);
    return data;
  },
  // 个人实名认证 银行预留手机号短信验证验证接口
  async verifyMobCode (params, noShowLoading) {
    const url = `${czUrl}/EvidenceController/subject/verifyMobCode.do?${qs.stringify(params)}`;
    const data = await http.post(url, params, noShowLoading);
    return data;
  },
  // 添加主体
  async createSubject(params) {
    const url = `${rootUrl}/subject/createSubject`;
    let data = await http.post(url, params, {}, {
      isLoading: false
    });
    return data;
  },
  // 主体列表 subjectList
  async subjectList(params) {
    const url = `${rootUrl}/subject/subjectList`;
    let data = await http.get(url, params, {}, {
      isLoading: false
    });
    return data;
  },
  // 根据企业名称获取企业信息
  async companyDetail(params) {
    const url = `${rootUrl}/subject/companyDetail`;
    let data = await http.get(url, params, {}, {
      isLoading: true
    });
    return data;
  },
  // 更具注册号查询商标信息
  async getTradeMarkInfo(params) {
    const url = `${rootUrl}/subject/getTradeMarkInfo?regNo=${params.regNo}`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },
}