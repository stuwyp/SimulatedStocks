// pages/match/match.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelected:[true,false,false],
    isOpen:true,
    match_data:[
      {
        "name": "5000万大资金模拟赛场",
        "last": "999",
        "emrollment": "306339",
        "state": "比赛中"
      },
      {
        "name": "2018股神挑战赛",
        "last": "335",
        "emrollment": "120252",
        "state": "比赛中"
      },
      {
        "name": "2018高校精英挑战赛",
        "last": "335",
        "emrollment": "120013",
        "state": "比赛中"
      },
    ],
    some_match:[
      {
        "name":"短线交友第一期",
        "state":"比赛中"
      },
      {
        "name": "短线交友第二期",
        "state": "比赛中"
      },
      {
        "name": "短线交友第三期",
        "state": "比赛中"
      },
    ]
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
  change:function(e){
    let that=this
    let isSelected=that.data.isSelected
    let id=Number.parseInt(e.currentTarget.dataset.id)
    if(isSelected[id])
      return
    else{
      for(let i=0;i<isSelected.length;i++){
        isSelected[i]=false
      }
      isSelected[id]=true
      that.setData({
        isSelected
      })
    }
  },
  open:function(){
    let that=this
    that.setData({
      isOpen:!that.data.isOpen
    })
  },
  toPractice:function(){
    wx.navigateTo({
      url: 'practice/practice',
    })
  },
  toMatchInfo: function () {
    wx.navigateTo({
      url: 'match_information/match_information',
    })
  }
})