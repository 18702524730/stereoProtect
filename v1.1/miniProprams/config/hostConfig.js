var rootConfig = {}
if (process.env.METHOD === 'production') {
  rootConfig = {
  	rootUrl: 'https://www.ipsebe.com',
    indexUrl: 'https://www.ipsebe.com',
    cartUrl: 'https://cart.ipsebe.com',
    czUrl:'https://cz.ipsebe.com',
    userUrl: 'https://user.ipsebe.com',
    payUrl: 'https://sbgz.ipsebe.com',
    wxUrl: 'https://wechat.ipsebe.com',
    mpUrl: 'https://mp.ipsebe.com',
    spUrl: 'https://testsp.ipsebe.com',
    toolsUrl: 'https://tools.ipsebe.com',
    itechUrl: ' https://technology.ipsebe.com/mytech', //代理到https://www.itech4u.cn
    webfileUrl: 'https://www.ipsebe.com/cms/webfile/',  //首頁CMS圖片
  };
}else{
	rootConfig = {
    rootUrl: 'https://testwww.ipsebe.com',
    // rootUrl: 'http://192.168.1.12:8085',
    indexUrl: 'https://testwww.ipsebe.com',
    cartUrl: 'https://testcart.ipsebe.com',
    czUrl:'https://testcz.ipsebe.com',
    userUrl: 'https://testuser.ipsebe.com',
    payUrl: 'https://testsbgz.ipsebe.com',
    wxUrl: 'https://testwechat.ipsebe.com',
    mpUrl: 'https://testmp.ipsebe.com',
    spUrl: 'https://sp.ipsebe.com',
    toolsUrl: 'https://testtools.ipsebe.com',
    itechUrl: 'https://testtechnology.ipsebe.com/mytech', //代理到https://www.itech4u.cn
    webfileUrl: 'https://testwww.ipsebe.com/cms/webfile/',  //首頁CMS圖片
	};
}

export default rootConfig
