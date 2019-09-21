let app = getApp();
const baseUrl = app.globalData.url
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
    wx.setNavigationBarTitle({
      title: '比赛信息',
    })
    let matchid=Number.parseInt(options.matchid)
    let token=wx.getStorageSync('token')
    let that=this
    let match_state = that.data.match_state
    function isSignup(){
      let joinCompititions=wx.getStorageSync('joinCompititions')
      for(let i in joinCompititions){
        if(joinCompititions[i].match_id==matchid){
          match_state = true
          break
        }
      }
      that.setData({
        match_state
      })
    }
    function getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }
    function requestApi(){
      wx.request({
        url: baseUrl + '/getMatchInfo',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"  //post
        },
        data: {
          token: token,
          matchid: matchid
        },
        success(res2) {
          console.log(res2)
          let obj = {}
          obj.end_time = res2.data.end_time
          obj.id = res2.data.id
          obj.init_money = res2.data.init_money
          obj.match_detail = res2.data.match_detail
          obj.match_name = res2.data.match_name
          obj.match_rule = res2.data.match_rule
          obj.start_time = res2.data.start_time
          obj.sign_time = res2.data.sign_time
          obj.real_start_time = getLocalTime(obj.start_time)
          obj.real_end_time = getLocalTime(obj.end_time)
          /*获取当前时间判断比赛状态 */
          let timestamp = Date.parse(new Date());
          timestamp = Number.parseInt(timestamp / 1000)
          obj.state = "比赛中"
          if (obj.start_time > timestamp)
            obj.state = "未开始"
          else if (obj.end_time < timestamp)
            obj.state = "已结束"
          console.log(obj)
          that.setData({
            match_data:obj
          })
        }
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    requestApi()
    isSignup()
    wx.hideLoading()
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
    console.log(e.currentTarget.dataset.id)
    let matchid=Number.parseInt(e.currentTarget.dataset.id)
    let that=this
    wx.showModal({
      title: '提示',
      content: '您确定要报名当前比赛吗？',
      success(res){
        if(res.confirm){
          wx.showLoading({
            title: '报名中',
          })
          wx.request({
            url: baseUrl + '/joinMatch',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded" //post
            },
            data: {
              token: token,
              matchid: matchid
            },
            success(res) {
              console.log(res)
              if(res.data.value==1){
                /*处理本地中存储的数组 */
                let joinCompititions = wx.getStorageSync('joinCompititions')||[]
                let obj={}
                obj["match_id"]=matchid
                joinCompititions.push(obj)
                wx.setStorageSync('joinCompititions', joinCompititions)
                wx.hideLoading()
                wx.showToast({
                  title: '报名成功',
                  icon: 'success'
                })
                that.setData({
                  match_state:true
                })
              }
              else if(res.data.value==-3){
                wx.hideLoading()
                wx.showToast({
                  title: '您已报名过该比赛',
                  icon: 'none'
                })
              }
              else{
                wx.hideLoading()
                wx.showToast({
                  title: '出现错误',
                  icon: 'none'
                })
              }
            },
            fail(res){
              console.log(res)
              wx.hideLoading()
              wx.showToast({
                title: '出现错误',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  quitMatch: function (e) {
    let token = wx.getStorageSync('token') || ''
    console.log(e.currentTarget.dataset.id)
    let matchid = Number.parseInt(e.currentTarget.dataset.id)
    let that=this
    wx.showModal({
      title: '提示',
      content: '您确定要取消报名吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: baseUrl + '/quitMatch',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded" //post
            },
            data: {
              token: token,
              matchid: matchid
            },
            success(res) {
              console.log(res)
              if (res.data.value == 1) {
                /*处理本地中存储的数组 */
                let oldjoinCompititions = wx.getStorageSync('joinCompititions')||[]
                let joinCompititions=[]
                for(let i in oldjoinCompititions){
                  if(oldjoinCompititions[i].match_id!=matchid)
                    joinCompititions.push(oldjoinCompititions[i])
                }
                wx.setStorageSync('joinCompititions', joinCompititions)
                wx.hideLoading()
                wx.showToast({
                  title: '取消成功',
                  icon: 'success'
                })
                that.setData({
                  match_state:false
                })
              }
              else {
                wx.hideLoading()
                wx.showToast({
                  title: '出现错误',
                  icon: 'none'
                })
              }
            },
            fail(res) {
              console.log(res)
              wx.hideLoading()
              wx.showToast({
                title: '出现错误',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  toGame:function(e){
    let that=this
    let match_data=that.data.match_data
    match_data=JSON.stringify(match_data)
    console.log(e.currentTarget.dataset.id)
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../practice/practice?matchid='+id+'&match_data='+match_data,
    })
  },
  toMatchRank:function(){
    let that=this
    let match_data=that.data.match_data
    match_data=JSON.stringify(match_data)
    wx.navigateTo({
      url: '../match_rank/match_rank?match_data=' + match_data,
    })
  }
})