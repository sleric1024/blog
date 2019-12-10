let ipUrl = 'http://127.0.0.1:7001/default/';

let servicePath = {
  getArticleList: ipUrl + 'getArticleList',
  getArticleById: ipUrl + 'getArticleById/',
  getTypeInfo: ipUrl + 'getTypeInfo',
  getListById: ipUrl + 'getListById/',
  checkLogin: ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
}

export default servicePath;