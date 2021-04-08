import http from '@/plugins/flyio/request'
const { rootUrl } = CONFIG;

export default {
	// 知识产权概况 street: 0-8
  async ccIpCount (street = 0) {
    const url = `${rootUrl}/street/ccIpCount`;
    return await http.get(url, {street});
  },
  // 知识产权概况分布接口
  async ccDeffIpCount (street = 0, type = 1) {
    const url = `${rootUrl}/street/ccDeffIpCount`;
    return await http.get(url, {street, type});
  },
  // 国高企业
  async ccGgCount (street) {
    const url = `${rootUrl}/street/ccGgCount`;
    return await http.get(url, {street});
  },
  // 市高企业
  async ccSgCount (street) {
    const url = `${rootUrl}/street/ccSgCount`;
    return await http.get(url, {street});
  },
  // 省科企业
  async ccSkCount (street) {
    const url = `${rootUrl}/street/ccSkCount`;
    return await http.get(url, {street});
  },
  // 竞争性企业
  async ccJzCount (street) {
    const url = `${rootUrl}/street/ccJzCount`;
    return await http.get(url, {street});
  },
  // 列表接口
  async storeList (params) {
    const url = `${rootUrl}/street/storeList`;
    return await http.get(url, params);
  },
  // 详情接口
  async storeDetail (id) {
    const url = `${rootUrl}/street/storeDetail`;
    return await http.get(url, {id});
  },
}
