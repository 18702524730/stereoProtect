import http from '@/plugins/flyio/request'
const { rootUrl } = CONFIG;

export default {
  /**
   * 登录 
   */
  async loginFn (data) {
    const url = `${rootUrl}/login`;
    return await http.post(url, data);
  },
  /**
   * 退出登录 
   */
  async logOut (data) {
    const url = `${rootUrl}/street/logOut`;
    return await http.get(url, data);
  },
}
