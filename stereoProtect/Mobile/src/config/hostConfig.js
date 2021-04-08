var rootConfig = {
  rootUrl: 'https://www.ipsebe.com',
  indexUrl: 'https://www.ipsebe.com',
  cartUrl: 'https://cart.ipsebe.com',
  adminUrl: 'https://admin.ipsebe.com',
  mpUrl: 'https://www.ipsebe.com',
  wxUrl: 'https://wechat.ipsebe.com/weixin',
};
if (location.host.indexOf('localhost') === 0 || /^\d{1,3}\.[^]*/.test(location.host)) {
  rootConfig = {
    rootUrl: 'http://' + location.host + '/www_proxy',
    indexUrl: 'http://' + location.host + '/www_proxy',
  	cartUrl: 'http://' + location.host + '/cart_proxy',
    adminUrl: 'http://' + location.host + '/admin_proxy',
    mpUrl: 'http://'+location.host+'/report',
    wxUrl: 'http://'+location.host+'/weixin',
  }
}
if (location.host.indexOf('test') === 0) {
  rootConfig = {
    rootUrl: 'https://testwww.ipsebe.com',
    indexUrl: 'https://testwww.ipsebe.com',
  	cartUrl: 'https://testcart.ipsebe.com',
    adminUrl: 'https://testadmin.ipsebe.com',
    mpUrl: 'https://testwww.ipsebe.com',
    wxUrl: 'https://testwechat.ipsebe.com/weixin',
  }
}

export default rootConfig
