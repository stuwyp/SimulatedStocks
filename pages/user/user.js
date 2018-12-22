const baseUrl ='http://119.23.36.18:8080'

Page({
  data: {
    
  },
  onLoad: function () {
    let that=this
    let userInfo=wx.getStorageSync('userInfo')||''
    //console.log(userInfo)
    if(userInfo){
      that.setData({
        userInfo:userInfo,
        isLogin:true
      })
    }
  },
  bindgetuserinfo:function(e){
    if (e.detail.userInfo) {
      console.log(e)
      console.log('授权通过')
      let userInfo = e.detail.userInfo;
      wx.setStorageSync('userInfo', userInfo)
      
      let openid=wx.getStorageSync('openid')
      //授权后开始进行注册
      wx.request({
        url: baseUrl+'/regist',
        method:'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"  //post
        },
        data:{
          user:String(openid),
          psw:String(openid),
          heading:String(userInfo.avatarUrl),
          nickname:String(userInfo.nickName)
        },
        success(res){
          //console.log(res)
          //如果注册成功或者提示重复注册即可登录
          if(res.data.value==1||res.data.value==-102){
            wx.request({
              url: baseUrl+'/login',
              method:'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"  //post
              },
              data:{
                user:String(openid),
                psw:String(openid),
              },
              success(res){
                console.log('登录模拟炒股系统成功，token为：'+res.data.token)
                wx.setStorageSync('token', res.data.token)
              }
            })
          }
        }
      })

      this.setData({
        isLogin:true
      })
      wx.reLaunch({
        url: '/pages/user/user',
      })
    } else {
      console.log('拒绝授权')
    }
  },
  toFeedback:function(){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }
})
