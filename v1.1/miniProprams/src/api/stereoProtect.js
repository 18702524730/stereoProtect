import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl, spUrl, userUrl } = CONFIG;

export default {

  // 提交侵权报告
  async submitPatentJudgeOrder(params) {
    const url = `${rootUrl}/stereoProtect/submitPatentJudgeOrder.htm`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },
  // 电商侵权投诉
  async submitStereoProtectOrder(params) {
    const url = `${rootUrl}/stereoProtect/submitStereoProtectOrder.htm`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },
  // 专利侵权判定 查询列表
  async findPatentJudgeOrderList(params) {
    const url = `${rootUrl}/stereoProtect/findPatentJudgeOrderList.htm`;
    let data = await http.get(url, params, {}, {
      isLoading: false
    });
    return data;
  },
  // 专利侵权判定 详情
  async findPatentJudgeOrderDetail (params) {
    const url = `${rootUrl}/stereoProtect/findPatentJudgeOrderDetail/${params.orderSn}.htm`;
    let data = await http.get(url, null, {}, {
      isLoading: false
    });
    return data;
  },
  // pdf转为jpg
  async preview(params) {//拒绝退款
    const url = `${spUrl}/iprp_servicer/api/preview?pdf_url=${params.pdf_url}`;
    return await http.get(url)
  },

  // 投诉、申诉、质量、海关-查询列表
  async findStereoProtectOrderList(params) {
    const url = `${rootUrl}/stereoProtect/findStereoProtectOrderList.htm`;
    let d = await http.get(url, params, {}, {
      isLoading: false
    })
    return d;
  },
  // 投诉、申诉、质量、海关-查询详情
  async findStereoProtectDetail(orderSn) {
    const url = `${rootUrl}/stereoProtect/findStereoProtectDetail/${orderSn}.htm`;
    let d = await http.get(url, {}, {}, {
      isLoading: false,
    });
    return d
  },

  // 网页存证-查询列表
  async findNotarizationByNotarizationType(params) {
    const url = `${userUrl}/api/findNotarizationByNotarizationType`;
    let d = await http.get(url, {...params, sourceType:1}, {}, {
      isLoading: false
    })
    return d;
  },
  // 网页存证-查询详情
  async findNotarizationDetails(params) {
    const url = `${userUrl}/api/findNotarizationDetails`;
    let d = await http.get(url, params, {}, {
      isLoading: false,
    });
    return d
  },
}
