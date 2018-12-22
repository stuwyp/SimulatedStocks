//app.js
App({
  onLaunch: function () {
    let openid=wx.getStorageSync('openid')||''
    if(openid)
      console.log(openid)
    else{
      wx.login({ //获取code 
        success: function (res) {
          var code = res.code; //返回code 
          var appId = 'wx7e23c8202ced8e13';
          var secret = '0347a0e8cc20062ea2ff4e6c813e5d7a';
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: { 'content-type': 'json' },
            success: function (res) {
              console.log(res)
              var openid = res.data.openid //返回openid 
              console.log('openid为' + openid);
              wx.setStorageSync('openid', openid)
            }
          })
        }
      })  
    }
    
  },
  globalData: {
    userInfo: null
  }
})