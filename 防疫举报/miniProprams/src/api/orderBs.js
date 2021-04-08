import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl } = CONFIG;

export default {

  // 创建订单
  async UploadOrderBsFile(params) {
    const url = `${rootUrl}/orderBs/UploadOrderBsFile?${qs.stringify(params)}`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },
  // 创建订单
  async createOrderBs(params) {
    const url = `${rootUrl}/orderBs/createOrderBs`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },
  async selectOrderBs (params) {
    const url = `${rootUrl}/orderBs/selectOrderBs?${qs.stringify(params)}`;
    let data = await http.get(url, null, {}, {
      isLoading: false
    });
    return data;
  }
}
