const app = getApp()

Page({
  data: {
    
  },
  onLoad: function () {
    let that=this
    if(global.userInfo){
      that.setData({
        userInfo:global.userInfo,
        isLogin:true
      })
    }
  },
  bindgetuserinfo:function(e){
    let that=this;
    if(e.detail.errMsg!="getUserInfo:ok"){
      wx.showToast({
        title: '登录失败,请检查网络连接',
        icon:"none"
      })
      return
    }
    else{
      let userInfo=e.detail.userInfo
      global.userInfo=userInfo
      that.setData({
        userInfo,
        isLogin:true
      })
    }
  }
})
