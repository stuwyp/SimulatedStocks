// pages/match/practice/practice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelected:[true,false,false,false,false],
    profit:0,
    warehouse_data:[
      {
        "name":"总资产",
        "data":"500000.00",
      },
      {
        "name": "浮动盈亏",
        "data": "0.00",
      },
      {
        "name": "当日参考盈亏",
        "data": "0.00",
      },
      {
        "name": "总市值",
        "data": "0.00",
      },
      {
        "name": "可用",
        "data": "375900.78",
      },
      {
        "name": "可取",
        "data": "0.00",
      },
    ],
    price_low:"5.23",
    price_high:"6.23",
    sale_data:[
      {
        "price":"8.99",
        "number":"320"
      },
      {
        "price": "8.98",
        "number": "265"
      },
      {
        "price": "8.97",
        "number": "123"
      },
      {
        "price": "8.96",
        "number": "9"
      },
      {
        "price": "8.95",
        "number": "80"
      },
    ],
    buy_data: [
      {
        "price": "8.94",
        "number": "38"
      },
      {
        "price": "8.93",
        "number": "26"
      },
      {
        "price": "8.92",
        "number": "155"
      },
      {
        "price": "8.91",
        "number": "449"
      },
      {
        "price": "8.90",
        "number": "80"
      },
    ],
    hold_stock:[
      {
        "name":"许继电气",
        "value":"123786.000",
        "profit":"1031.190",
        "profit_percent":"0.840%",
        "hold":"13800",
        "use":"0",
        "cost":"8.895",
        "price":"8.970"
      },
      {
        "name": "许继电气",
        "value": "123786.000",
        "profit": "1031.190",
        "profit_percent": "0.840%",
        "hold": "13800",
        "use": "0",
        "cost": "8.895",
        "price": "8.970"
      },
      {
        "name": "许继电气",
        "value": "123786.000",
        "profit": "-1031.190",
        "profit_percent": "-0.840%",
        "hold": "13800",
        "use": "0",
        "cost": "8.895",
        "price": "8.970"
      },
    ],
    entrust_data:[
      {
        "name":"TCL集团",
        "time":"19:07:29",
        "entrust_price":"2.560",
        "average_price":"0.000",
        "entrust_number":"73400",
        "deal_number":"0",
        "mode": "买入",
        "state":"未成交"
      },
      {
        "name": "许继电气",
        "time": "19:07:06",
        "entrust_price": "8.960",
        "average_price": "0.000",
        "entrust_number": "13800",
        "deal_number": "0",
        "mode": "卖出",
        "state": "未成交"
      }
    ],

    buy_price_data:[
      {
        "name":"TCL集团",
        "code":"000100",
        "limit_down":"2.20",
        "limit_up":"2.68",
        "current":"2.45",
      },
      {
        "name": "许继电气",
        "code": "000400",
        "limit_down": "8.62",
        "limit_up": "10.54",
        "current": "9.31",
      },
    ],
    buy_stock:"",
    buy_current:"",
    buy_limit_down:"--",
    buy_limit_up:"--",
    buy_stock_num:"",
    buy_stock_max: "0",
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
  change: function (e) {
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
      that.setData({
        isSelected
      })
    }
  },
  todayDeal: function () {
    wx.navigateTo({
      url: '/pages/match/practice/todayDeal/todayDeal',
    })
  },
  todayEntrust: function () {
    wx.navigateTo({
      url: '/pages/match/practice/todayEntrust/todayEntrust',
    })
  },
  historicalDeal: function () {
    wx.navigateTo({
      url: '/pages/match/practice/historicalDeal/historicalDeal',
    })
  },
  historicalEntrust: function () {
    wx.navigateTo({
      url: "/pages/match/practice/historicalEntrust/historicalEntrust",
    })
  },

  buyInput:function(e){
    let input=e.detail.value
    let that=this
    let buy_current=that.data.buy_current
    let buy_limit_down=that.data.buy_limit_down
    let buy_limit_up=that.data.buy_limit_up
    let buy_price_data=that.data.buy_price_data
    let buy_stock_max=that.data.buy_stock_max
    let current_money=that.data.warehouse_data[4].data


    for(let i in buy_price_data){
      if(input==buy_price_data[i].name||input==buy_price_data[i].code){
        console.log("okk")
        buy_current=buy_price_data[i].current
        buy_limit_down=buy_price_data[i].limit_down
        buy_limit_up=buy_price_data[i].limit_up
        
        current_money=Number.parseFloat(current_money)
        buy_current=Number.parseFloat(buy_current)
        buy_stock_max=Math.floor(current_money/buy_current/100)*100

        buy_current=String(buy_current)
        buy_stock_max=String(buy_stock_max)
        //console.log(buy_stock_max)

        break
      }
    }
    that.setData({
      buy_stock:input,
      buy_current,
      buy_limit_down,
      buy_limit_up,
      buy_stock_max,
    })
  },

  buy_current_input:function(e){
    let that=this
    let buy_current=that.data.buy_current
    let buy_stock_max=that.data.buy_stock_max
    let current_money = that.data.warehouse_data[4].data

    buy_current=e.detail.value
    current_money = Number.parseFloat(current_money)
    buy_current = Number.parseFloat(buy_current)
    if(typeof buy_current!=='number'){
      return
    }
    if(isNaN(buy_current))
      return

    buy_stock_max = Math.floor(current_money / buy_current / 100) * 100
    buy_current = String(buy_current)
    buy_stock_max = String(buy_stock_max)
    
    console.log(buy_current)
    that.setData({
      buy_current,
      buy_stock_max,
    })
  },
  //买入的价格减按钮
  buy_price_jian:function(){
    let that=this
    let buy_current=that.data.buy_current
    let buy_stock_max = that.data.buy_stock_max
    let current_money = that.data.warehouse_data[4].data

    if(buy_current!=""){
      buy_current = Number.parseFloat(buy_current)
      buy_current -= 0.01
      current_money = Number.parseFloat(current_money)
      buy_stock_max = Math.floor(current_money / buy_current / 100) * 100
      buy_stock_max = String(buy_stock_max)
      buy_current=buy_current.toFixed(2)
      buy_current = String(buy_current)
      that.setData({
        buy_current,
        buy_stock_max
      })
    }
    else
      return
  },
  //买入的价格加按钮
  buy_price_jia: function () {
    let that = this
    let buy_current = that.data.buy_current
    let buy_stock_max = that.data.buy_stock_max
    let current_money = that.data.warehouse_data[4].data

    if (buy_current != "") {
      buy_current = Number.parseFloat(buy_current)
      buy_current += 0.01
      current_money = Number.parseFloat(current_money)
      buy_stock_max = Math.floor(current_money / buy_current / 100) * 100
      buy_stock_max = String(buy_stock_max)
      buy_current = buy_current.toFixed(2)
      buy_current = String(buy_current)
      that.setData({
        buy_current,
        buy_stock_max
      })
    }
    else
      return
  },

  //买入数量输入
  buy_number_input:function(e){
    let that=this
    let buy_stock_num=e.detail.value
    that.setData({
      buy_stock_num
    })
  },

  //买入数量减
  buy_num_jian:function(){
    let that=this
    let buy_stock_num=Number.parseInt(that.data.buy_stock_num)
    if(buy_stock_num%100==0&&buy_stock_num>0){
      buy_stock_num-=100
      buy_stock_num=String(buy_stock_num)
      that.setData({
        buy_stock_num
      })
    }
  },

  //买入数量加
  buy_num_jia: function () {
    let that = this
    let buy_stock_num = Number.parseInt(that.data.buy_stock_num)
    if (buy_stock_num % 100 == 0) {
      buy_stock_num += 100
      buy_stock_num = String(buy_stock_num)
      that.setData({
        buy_stock_num
      })
    }
  },

  quickClick:function(e){
    let id=Number.parseInt(e.currentTarget.dataset.id)
    let that=this
    let buy_stock_max=Number.parseInt(that.data.buy_stock_max)
    if(buy_stock_max==0)
      return
    let buy_stock_num=0
    if(id==0)
      buy_stock_num=String(buy_stock_max)
    else if(id==1)
      buy_stock_num=String(Math.floor(buy_stock_max/200)*100)
    else if (id == 2)
      buy_stock_num = String(Math.floor(buy_stock_max / 300) * 100)
    else if (id == 3)
      buy_stock_num = String(Math.floor(buy_stock_max / 400) * 100)
    
    that.setData({
      buy_stock_num
    })
  },

  buy:function(){
    let that=this
    let buy_stock=that.data.buy_stock
    let buy_current=that.data.buy_current
    let buy_stock_num=that.data.buy_stock_num

    if(!buy_stock){
      wx.showToast({
        title: '您还没有输入股票名称或代号',
        icon:"none"
      })
      return
    }
    if (!buy_current) {
      wx.showToast({
        title: '您还没有输入购买价格',
        icon: "none"
      })
      return
    }
    if (!buy_stock_num) {
      wx.showToast({
        title: '您还没有输入购买数量',
        icon: "none"
      })
      return
    }
    let account="16eyhuang"
    let content="账户  "+account+"\r\n名称/代码  "+buy_stock+"\r\n数量  "+buy_stock_num+"\r\n价格  "+buy_current+"\r\n\r\n您是否确认以上委托?"
    wx.showModal({
      title: '委托买入确认',
      content: content,
      confirmText:"确认委托",
      confirmColor:"#ff0000"
    })
  },

})