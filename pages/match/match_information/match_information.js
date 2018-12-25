const baseUrl = "http://119.23.36.18:8080"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    match_state:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  joinMatch: function (e) {
    let token = wx.getStorageSync('token') || ''
    if (token == '') {
      wx.showModal({
        title: '提示',
        content: '请先在我的页面进行登录',
        complete(res) {
          wx.switchTab({
            url: '../user/user',
          })
        }
      })
    } else {
      console.log(e.currentTarget.dataset.id)
      wx.request({
        url: baseUrl + '/joinMatch',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded" //post
        },
        data: {
          token: token,
          matchid: e.currentTarget.dataset.id
        },
        success(res) {
          console.log(res.data.value)
        }
      })
    }
  },
  quitMatch: function (e) {
    let token = wx.getStorageSync('token') || ''
    if (token == '') {
      wx.showModal({
        title: '提示',
        content: '请先在我的页面进行登录',
        complete(res) {
          wx.switchTab({
            url: '../user/user',
          })
        }
      })
    } else {
      console.log(e.currentTarget.dataset.id)
      wx.request({
        url: baseUrl + '/quitMatch',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded" //post
        },
        data: {
          token: token,
          matchid: e.currentTarget.dataset.id
        },
        success(res) {
          console.log(res.data.value)
        }
      })
    }
  },
})