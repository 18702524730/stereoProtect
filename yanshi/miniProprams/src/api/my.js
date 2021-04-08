import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl, czUrl } = CONFIG;

export default {
  // 存证数量统计接口
  async findStaticCount() {
    const url = `${czUrl}/EvidenceController/findStaticCount.do`;
    let d = await http.get(url, {sourceType: 1}, {}, {
      isLoading: false
    });
    return d;
  },
}
