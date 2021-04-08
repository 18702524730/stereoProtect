import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl } = CONFIG;

export default {

  // 取消订单
  async cancleOrder(orderSn) {
    const url = `${rootUrl}/order/cancleOrder`;
    let data = await http.get(url, {orderSn}, {}, {
      isLoading: false
    });
    return data;
  },

  // 退款
  async wxRefund(params) {
    const url = `${rootUrl}/order/wxRefund`;
    let data = await http.post(url, qs.stringify(params), {}, {
      isLoading: false
    });
    return data;
  },
}
