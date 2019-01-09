// pages/match/match.js

const baseUrl = "http://119.23.36.18:8080"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelected: [true, false, false],
    isOpen: true,
    api_data:[],
    match_data: [{
        "name": "5000万大资金模拟赛场",
        "last": "999",
        "emrollment": "306339",
        "state": "比赛中",
        "joinState": true,
      },
      // {
      //   "name": "2018股神挑战赛",
      //   "last": "335",
      //   "emrollment": "120252",
      //   "state": "比赛中"
      // },
      // {
      //   "name": "2018高校精英挑战赛",
      //   "last": "335",
      //   "emrollment": "120013",
      //   "state": "比赛中"
      // },
    ],
    some_match: [{
        "name": "5000万大资金模拟赛场",
        "last": "999",
        "emrollment": "306339",
        "state": "比赛中"
      },
      // {
      //   "name":"短线交友第一期",
      //   "state":"比赛中"
      // },
      // {
      //   "name": "短线交友第二期",
      //   "state": "比赛中"
      // },
      // {
      //   "name": "短线交友第三期",
      //   "state": "比赛中"
      // },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    function getUserInfo2(){
      wx.request({
        url: baseUrl+'/getUserInfo2',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"  //post
        },
        data:{
          token:token
        },
        success(res){
          wx.setStorageSync('joinCompititions', res.data.joinCompititions)
        }
      })

    }    

    /*将请求封装在这个函数中 */
    function requestDetail(id){
      //let id = matchList[i].id
      wx.request({
        url: baseUrl + '/getMatchInfo',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"  //post
        },
        data: {
          token: token,
          matchid: id
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
          api_data.push(obj)
          that.setData({
            api_data
          })


          // if (i == matchList.length - 1) {

          // }
        }
      })
    }

    function requestApi(){
      wx.request({
        url: baseUrl + '/getMatchList',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded" //post
        },
        data: {
          token: token
        },
        success(res) {
          console.log(res)
          //wx.hideLoading()
          let matchList = res.data.matchlist
          wx.setStorageSync('current_matchlist', matchList)
          //对于每一个比赛都请求获取其具体信息
          for (let i = 0; i < matchList.length; i++) {
            let id=matchList[i].id
            requestDetail(id)
          }
        }
      })
    }

    function getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }
    let that = this
    //获取存储在本地的token
    let token = wx.getStorageSync('token') || ''
    let api_data = []
    let flag=0
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
    } 
    else {
      wx.showLoading({
        title: '加载中',
      })
      requestApi()
      getUserInfo2()
      wx.hideLoading()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  change: function(e) {
    let that = this
    let isSelected = that.data.isSelected
    let id = Number.parseInt(e.currentTarget.dataset.id)
    if (isSelected[id])
      return
    else {
      for (let i = 0; i < isSelected.length; i++) {
        isSelected[i] = false
      }
      isSelected[id] = true
      let myMatchList=[]
      if(id==2){
        let current_matchlist = wx.getStorageSync('current_matchlist')||[]
        console.log(current_matchlist)
        let joinCompititions = wx.getStorageSync('joinCompititions') || []
        for(let i in current_matchlist){
          for(let j in joinCompititions){
            if(joinCompititions[j].match_id==current_matchlist[i].id)
              myMatchList.push(current_matchlist[i])
          }
        }
        console.log(myMatchList)
      }
      that.setData({
        isSelected,
        myMatchList
      })
    }
  },
  open: function() {
    let that = this
    that.setData({
      isOpen: !that.data.isOpen
    })
  },
  toPractice: function() {
    wx.navigateTo({
      url: 'practice/practice',
    })
  },
  toMatchInfo: function(e) {
    let matchid=e.currentTarget.dataset.matchid
    wx.navigateTo({
      url: 'match_information/match_information?matchid='+matchid,
    })
  },
  joinMatch: function(e) {
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