import http from '@/plugins/flyio/request'
const { cartUrl } = CONFIG;

export default {
  // 投诉/申诉信息提交接口
  async ask (data) {
    const url = `${cartUrl}/consultation/submitMemberConsultation.htm`;
    return await http.post(url, data);
  },
  // 访问页面统计
  async statis () {
    const url = `${cartUrl}/consultation/visitPageStatis.htm`;
    return await http.get(url);
  }
}
