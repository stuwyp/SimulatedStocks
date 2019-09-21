// pages/match/practice/todayDeal/todayDeal.js
let app = getApp();
const baseUrl = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    entrust_data: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    function timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }

    /*获取特定时间特定类型委托信息并存入本地 */
    function getUserOrder(token, ordertype, startTime, endTime, orderStatus) {
      wx.request({
        url: baseUrl + '/getUserOrder',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"  //post
        },
        data: {
          token: token,
          order_type: ordertype,
          start: startTime,
          end: endTime,
          order_status: orderStatus
        },
        success(res) {
          console.log(res)
          if(res.data.value==1){
            if(res.data.orderInfo!=[]){
              for(let i in res.data.orderInfo){
                if (res.data.orderInfo[i].match_id==matchid){
                  let obj = {}
                  obj.stock_id = res.data.orderInfo[i].stock_id
                  obj.time = res.data.orderInfo[i].create_time
                  obj.time = timestampToTime(obj.time)
                  obj.time = obj.time.split(' ')
                  obj.time = obj.time[1]
                  obj.id = res.data.orderInfo[i].id
                  obj.entrust_number = res.data.orderInfo[i].order_num
                  obj.entrust_price = res.data.orderInfo[i].price
                  obj.mode = res.data.orderInfo[i].order_type
                  entrust_data.push(obj)
                }
              }
              if(entrust_data!=[]){
                for(let i in entrust_data){
                  wx.request({
                    url: baseUrl + '/getStockInfo',
                    method: 'POST',
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"  //post
                    },
                    data: {
                      token: token,
                      stockid:entrust_data[i].stock_id
                    },
                    success(res){
                      if(res.data.value==1){
                        entrust_data[i].name=res.data.stockInfo[0]
                        // console.log(entrust_data)
                        that.setData({
                          entrust_data
                        })
                      }
                    }
                  })
                }
              }
            }
          }
        },
        fail(res) {
          console.log(res)
          wx.showToast({
            title: '出现错误',
            icon: 'none'
          })
        }
      })
    }

    wx.showLoading({
      title: '加载中',
    })
    console.log("options: ",options)
    let that=this
    let entrust_data=[]
    let matchid=Number.parseInt(options.matchid)
    let token=wx.getStorageSync('token')
    let date=new Date()
    let year=date.getFullYear()
    let month=date.getMonth()+1
    let day=date.getDate()
    let hour=date.getHours()
    let minute=date.getMinutes()
    let today=year+'-'+month+'-'+day
    let now = year + '-' + month + '-' + day+' '+hour+':'+minute
    today=new Date(today)
    today=Date.parse(today)/1000
    now=new Date(now)
    now=Date.parse(now)/1000
    console.log(today)
    console.log(now)

    getUserOrder(token,'1',today,now,'2')
    getUserOrder(token,'2',today,now,'2')
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

})
