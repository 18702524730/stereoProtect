import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl, cartUrl } = CONFIG;

export default {

  // 投诉、申诉
  async submitMemberConsultation(params) {
    const url = `${cartUrl}/consultation/submitMemberConsultation.htm`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },
}
