var rootConfig = {
  rootUrl: 'https://technology.ipsebe.com',
  indexUrl: 'https://technology.ipsebe.com',
  cartUrl: 'https://cart.ipsebe.com'
};
if (location.host.indexOf('localhost') === 0 || /^\d{1,3}\.[^]*/.test(location.host)) {
  rootConfig = {
    rootUrl: 'http://' + location.host + '/admin_fe',
    indexUrl: 'http://' + location.host,
  	cartUrl: 'http://' + location.host + '/cart',
  }
}
if (location.host.indexOf('test') === 0) {
  rootConfig = {
    rootUrl: 'https://testtechnology.ipsebe.com',
    indexUrl: 'https://testtechnology.ipsebe.com',
  	cartUrl: 'https://testcart.ipsebe.com'
  }
}
if (location.host.indexOf('pre') === 0) {
  rootConfig = {
    rootUrl: 'https://pretechnology.ipsebe.com',
    indexUrl: 'https://pretechnology.ipsebe.com',
  	cartUrl: 'https://precart.ipsebe.com'
  }
}

export default rootConfig
