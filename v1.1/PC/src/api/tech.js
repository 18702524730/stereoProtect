import http from '@/plugins/flyio/request'
const { rootUrl } = CONFIG;

export default {
	// 陈局_国高_参与调研企业
  async ggResearchStatistics () {
    const url = `${rootUrl}/admin/ggResearchStatistics`;
    return await http.get(url);
  },
  // 陈局_国高_需复评企业
  async ggReviewStatistics () {
    const url = `${rootUrl}/admin/ggReviewStatistics`;
    return await http.get(url);
  },
  // 陈局_国高_国高预估数量
  async ggYuguStatisticsAdmin () {
    const url = `${rootUrl}/admin/ggYuguStatistics`;
    return await http.get(url);
  },
  // 陈局_省科_参与调研企业
  async skResearchStatistics () {
    const url = `${rootUrl}/admin/skResearchStatistics`;
    return await http.get(url);
  },
  // 陈局_省科_已有称号企业
  async skExistStatistics () {
    const url = `${rootUrl}/admin/skExistStatistics`;
    return await http.get(url);
  },
  // 陈局_省科_省科预估数量
  async skYuguStatistics () {
    const url = `${rootUrl}/admin/skYuguStatistics`;
    return await http.get(url);
  },
  // 陈局_通用
  async cp (type) {
    const url = `${rootUrl}/admin/cp`;
    return await http.get(url, {type});
  },

  // 通用企业列表
  async cultivationList (data) {
    const url = `${rootUrl}/street/cultivationList`;
    return await http.get(url, data);
  },
  // 国高高新技术企业列表
  async getGgList (data) {
    const url = `${rootUrl}/street/ggList`;
    return await http.get(url, data);
  },
  // 省科技型企业列表
  async getSkList (data) {
    const url = `${rootUrl}/street/skList`;
    return await http.get(url, data);
  },
  // 查看企业详情
  async queryCompanyDetail (id) {
    const url = `${rootUrl}/street/queryCompanyDetail`;
    return await http.get(url, {id});
  },


  // 街道_国高_ 参与调研企业
  async stggResearchStatistics () {
    const url = `${rootUrl}/street/ggResearchStatistics`;
    return await http.get(url);
  },
  // 街道_国高_需复评企业
  async stggReviewStatistics () {
    const url = `${rootUrl}/street/ggReviewStatistics`;
    return await http.get(url);
  },
  // 街道_国高_国高预估数量
  async stggYuguStatistics () {
    const url = `${rootUrl}/street/ggYuguStatistics`;
    return await http.get(url);
  },
  // 街道_省科_参与调研企业
  async stskResearchStatistics () {
    const url = `${rootUrl}/street/skResearchStatistics`;
    return await http.get(url);
  },
  // 街道_省科_已有称号企业
  async stskExistStatistics () {
    const url = `${rootUrl}/street/skExistStatistics`;
    return await http.get(url);
  },
  // 街道_省科_省科预估数量
  async stskYuguStatistics () {
    const url = `${rootUrl}/street/skYuguStatistics`;
    return await http.get(url);
  },
  // 陈局_通用
  async jp (type) {
    const url = `${rootUrl}/street/jp`;
    return await http.get(url, {type});
  },



}
