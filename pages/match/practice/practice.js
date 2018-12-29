// pages/match/practice/practice.js

const baseUrl ="http://119.23.36.18:8080"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelected: [true, false, false, false, false],
    profit: 0,
    warehouse_data: [
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
    price_low: 0,
    price_high: 0,
    stock_number: 0,
    sale_data: [
        {
          "price":"--",
          "number":"--"
        },
        {
          "price": "--",
          "number": "--"
        },
        {
          "price": "--",
          "number": "--"
        },
        {
          "price": "--",
          "number": "--"
        },
        {
          "price": "--",
          "number": "--"
        },
    ],
    buy_data: [
        {
          "price": "--",
          "number": "--"
        },
        {
          "price": "--",
          "number": "--"
        },
        {
          "price": "--",
          "number": "--"
        },
        {
          "price": "--",
          "number": "--"
        },
        {
          "price": "--",
          "number": "--"
        },
    ],
    hold_stock: [
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
    ],
    entrust_data: [
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
    buy_stock_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
          if (res.data.value == 1) {
            /*买入中的 */
            if (ordertype == '1' && orderStatus == '1') {
              let buy_unfinished_list = res.data.orderInfo
              wx.setStorageSync('buy_unfinished_list', buy_unfinished_list)
            }
            /*卖出中的 */
            if (ordertype == '2' && orderStatus == '1') {
              let sale_unfinished_list = res.data.orderInfo
              wx.setStorageSync('sale_unfinished_list', sale_unfinished_list)
            }
            /*已买入的 */
            if (ordertype == '1' && orderStatus == '2') {
              let buy_finished_list = res.data.orderInfo
              wx.setStorageSync('buy_finished_list', buy_finished_list)
            }
            /*已卖出的 */
            if (ordertype == '2' && orderStatus == '2') {
              let sale_finished_list = res.data.orderInfo
              wx.setStorageSync('sale_finished_list', sale_finished_list)
            }
          }
          else {
            wx.showToast({
              title: '出现错误',
              icon: 'none'
            })
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

    function getWarehouse(token,matchid){
      wx.request({
        url: baseUrl+'/getUserInfo3',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"  //post
        },
        data:{
          token:token,
          matchid:matchid
        },
        success(res){
          console.log(res)
          if(res.data.value==1){
            let hold_stock=[]
            if(res.data.stockInfo!=[]){
              for (let i in res.data.stockInfo) {
                let obj = {}
                obj.code = res.data.stockInfo[i].stock_id
                obj.hold = res.data.stockInfo[i].own_num
                obj.price = res.data.stockInfo[i].ave_price
                hold_stock.push(obj)
              }
              let token = wx.getStorageSync('token')
              /*获取股票名称 */
              for (let i in hold_stock) {
                wx.request({
                  url: 'http://119.23.36.18:8080/getStockInfo',
                  method: 'POST',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"  //post
                  },
                  data: {
                    token: token,
                    stockid: hold_stock[i].code
                  },
                  success(res) {
                    if (res.data.value == 1) {
                      hold_stock[i].name = res.data.stockInfo[0]
                      wx.setStorageSync('hold_stock', hold_stock)
                      that.setData({
                        hold_stock
                      })
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
            }
          }
          wx.hideLoading()
        },
        fail(res){
          console.log(res)
          wx.showToast({
            title: '请求用户持仓信息出现错误',
          })
          wx.hideLoading()
        }
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    let that=this
    let token=wx.getStorageSync('token')
    let matchid = Number.parseInt(options.matchid)
    let warehouse_data=that.data.warehouse_data
    let match_data=JSON.parse(options.match_data)
    wx.setNavigationBarTitle({
      title: match_data.match_name,
    })
    warehouse_data[0].data=String(match_data.init_money)
    warehouse_data[4].data = String(match_data.init_money)
    console.log(match_data)
    /*以下为获取比赛时间期间的各类型订单 */
    getUserOrder(token,'1',String(match_data.start_time),String(match_data.end_time),'1')
    getUserOrder(token, '1', String(match_data.start_time), String(match_data.end_time),'2')    
    getUserOrder(token, '2', String(match_data.start_time), String(match_data.end_time),'1')
    getUserOrder(token, '2', String(match_data.start_time), String(match_data.end_time),'2')

    getWarehouse(token,matchid)
    that.setData({
      matchid:Number.parseInt(options.matchid),
      match_data,
      warehouse_data
    })
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
    // let that = this
    // wx.request({
    //   url: 'https://easy-mock.com/mock/5a69dacd09247d03931a4dee/example/position', //仅为示例，并非真实的接口地址
    //   data: {},
    //   method: "POST",
    //   header: {
    //     // "Content-Type": "application/x-www-form-urlencoded"  //post
    //   },
    //   success: function(res) {
    //     console.log(res.data)
    //     that.setData({
    //       profit : res.data.data.profit,
    //       warehouse_data: res.data.data.warehouse_data,
    //       price_low : res.data.data.price_low,
    //       price_high: res.data.data.price_high,
    //       stock_number : res.data.data.stock_number,
    //       sale_data: res.data.data.sale_data,
    //       buy_data: res.data.data.buy_data,
    //       hold_stock: res.data.data.hold_stock,
    //       entrust_data : res.data.data.entrust_data,

    //     })
    //   },
    //   fail: function(err) {
    //     console.log(err)
    //   }
    // })
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
    function getUserOrder(token,ordertype,startTime,endTime,orderStatus){
      wx.request({
        url: baseUrl+'/getUserOrder',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"  //post
        },
        data:{
          token:token,
          order_type:ordertype,
          start:startTime,
          end:endTime,
          order_status:orderStatus
        },
        success(res){
          console.log(res)
          if(res.data.value==1){
            /*买入中的 */
            if(ordertype=='1'&&orderStatus=='1'){
              let buy_unfinished_list=res.data.orderInfo
              wx.setStorageSync('buy_unfinished_list', buy_unfinished_list)
            }
            /*卖出中的 */
            if (ordertype == '2' && orderStatus == '1') {
              let sale_unfinished_list = res.data.orderInfo
              wx.setStorageSync('sale_unfinished_list', sale_unfinished_list)
            }
            /*已买入的 */
            if (ordertype == '1' && orderStatus == '2') {
              let buy_finished_list = res.data.orderInfo
              wx.setStorageSync('buy_finished_list', buy_finished_list)
            }
            /*已卖出的 */
            if (ordertype == '2' && orderStatus == '2') {
              let buy_finished_list = res.data.orderInfo
              wx.setStorageSync('buy_finished_list', buy_finished_list)
            }
          }
          else{
            wx.showToast({
              title: '出现错误',
              icon:'none'
            })  
          }
        },
        fail(res){
          console.log(res)
          wx.showToast({
            title: '出现错误',
            icon:'none'
          })
        }
      })
    }
    /*时间戳转日期，测试用 */
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
      /*撤单选项 */
      if(id==3){
        // let date=new Date()
        // let year=date.getFullYear()
        // let month=date.getMonth()+1
        // let day=date.getDate()
        // let hour=date.getHours()
        // let minute=date.getMinutes()
        // let startTime=year+'-'+month+'-'+day
        // let endTime=year+'-'+month+'-'+day+' '+hour+':'+minute
        // startTime=Number.parseInt(new Date(startTime).getTime()/1000)
        // endTime=Number.parseInt(new Date(endTime).getTime()/1000)
        // console.log(startTime)
        // console.log(endTime)
        // let token=wx.getStorageSync('token')
        // let ordertype='1'
        // let orderStatus='1'
        /*委托数组 */
        let entrust_data=[]        
        let matchid=that.data.matchid
        let buy_unfinished_list = wx.getStorageSync('buy_unfinished_list')||[]
        if (buy_unfinished_list){
          for (let i in buy_unfinished_list){
            if(matchid==buy_unfinished_list[i].match_id){
              let obj = {}
              obj.id = buy_unfinished_list[i].id
              obj.time = timestampToTime(buy_unfinished_list[i].create_time).split(' ')
              obj.time=obj.time[1]
              obj.stock_id = buy_unfinished_list[i].stock_id
              obj.entrust_price = buy_unfinished_list[i].price
              obj.entrust_number = buy_unfinished_list[i].order_num
              obj.mode = buy_unfinished_list[i].order_type
              obj.state = buy_unfinished_list[i].order_status
              obj.average_price='0.00'
              obj.deal_number='0'
              entrust_data.push(obj)
            }
          }
        }
        let sale_unfinished_list = wx.getStorageSync('sale_unfinished_list')||[]
        if (sale_unfinished_list) {
          for (let i in sale_unfinished_list) {
            if (matchid == sale_unfinished_list[i].match_id) {
              let obj = {}
              obj.id = sale_unfinished_list[i].id
              obj.time = timestampToTime(sale_unfinished_list[i].create_time).split(' ')
              obj.time=obj.time[1]
              obj.stock_id = sale_unfinished_list[i].stock_id
              obj.entrust_price = sale_unfinished_list[i].price
              obj.entrust_number = sale_unfinished_list[i].order_num
              obj.mode = sale_unfinished_list[i].order_type
              obj.state = sale_unfinished_list[i].order_status
              obj.average_price = '0.00'
              obj.deal_number = '0'
              entrust_data.push(obj)
            }
          }
        }
        console.log(entrust_data)
        let token=wx.getStorageSync('token')
        /*获取股票名称 */
        wx.showLoading({
          title: '加载中',
        })
        if(entrust_data==[]){
          wx.hideLoading()
          that.setData({
            entrust_data
          })
        }
        else{
          for (let i in entrust_data) {
            wx.request({
              url: 'http://119.23.36.18:8080/getStockInfo',
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"  //post
              },
              data: {
                token: token,
                stockid: entrust_data[i].stock_id
              },
              success(res) {
                if (res.data.value == 1) {
                  entrust_data[i].name = res.data.stockInfo[0]
                  that.setData({
                    entrust_data
                  })
                }
                if (i == entrust_data.length - 1)
                  wx.hideLoading()
              },
              fail(res) {
                console.log(res)
                wx.showToast({
                  title: '出现错误',
                  icon: 'none'
                })
                if (i == entrust_data.length - 1)
                  wx.hideLoading()
              }
            })
          }
        }
      }
        
      that.setData({
        isSelected
      })
    }
  },
  todayDeal: function() {
    let that=this
    let matchid=that.data.matchid
    wx.navigateTo({
      url: '/pages/match/practice/todayDeal/todayDeal?matchid='+matchid,
    })
  },
  todayEntrust: function() {
    let that=this
    let matchid=that.data.matchid
    wx.navigateTo({
      url: '/pages/match/practice/todayEntrust/todayEntrust?matchid=' + matchid,
    })
  },
  historicalDeal: function() {
    let that=this
    let match_data=that.data.match_data
    match_data=JSON.stringify(match_data)
    let matchid=that.data.matchid
    wx.navigateTo({
      url: '/pages/match/practice/historicalDeal/historicalDeal?matchid='+matchid+'&match_data='+match_data,
    })
  },
  historicalEntrust: function() {
    let that = this
    let match_data = that.data.match_data
    match_data = JSON.stringify(match_data)
    let matchid = that.data.matchid
    wx.navigateTo({
      url: '/pages/match/practice/historicalEntrust/historicalEntrust?matchid='+matchid+'&match_data='+match_data,
    })
  },

  buyInput:function(e){
    let input=e.detail.value
    let that=this
    //获取本次存储中的token
    let token=wx.getStorageSync('token')||''
    //买入和卖出数据，即右边框中的数据
    let sale_data=that.data.sale_data
    let buy_data=that.data.buy_data
    /* 
      buy_current:当前的买入价格 
      buy_limit_down:跌停价 
      buy_limit_up:涨停价 
      buy_stock_max:最大买入数量 
      current_monry:当前可用钱数 
     */
    let buy_current = that.data.buy_current
    let buy_limit_down = that.data.buy_limit_down
    let buy_limit_up = that.data.buy_limit_up
    let buy_stock_max = that.data.buy_stock_max
    let current_money = that.data.warehouse_data[4].data 
    if(token==''){
      wx.showToast({
        title: '请先登录',
        icon:'none',
      })
      return
    }

    //输入串的长度等于6时则自动请求
    if(input.length==6){
      wx.showLoading({
        title: '查询中',
      })
      wx.request({
        url: baseUrl+'/getStockInfo',
        method:'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"  //post
        },
        data:{
          token:token,
          stockid:input
        },
        success(res){
          console.log(res)
          if(res.data.stockInfo==null){
            wx.hideLoading()
            wx.showToast({
              title: '没有该股票的信息',
              icon:'none'
            })
            return
          }
          else{
            let stockInfo = res.data.stockInfo
            let stock_name = stockInfo[0]
            /*提示框提示用户 */
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '为您查找到' + stock_name + '的股票信息',
            })
            /* 当前价格*/
            buy_current = stockInfo[3]

            /*买1到买5 */
            buy_data[0].price = stockInfo[6]
            buy_data[0].number = String(Number.parseInt(Number.parseInt(stockInfo[10]) / 100))
            buy_data[1].price = stockInfo[13]
            buy_data[1].number = String(Number.parseInt(Number.parseInt(stockInfo[12]) / 100))
            buy_data[2].price = stockInfo[15]
            buy_data[2].number = String(Number.parseInt(Number.parseInt(stockInfo[14]) / 100))
            buy_data[3].price = stockInfo[17]
            buy_data[3].number = String(Number.parseInt(Number.parseInt(stockInfo[16]) / 100))
            buy_data[4].price = stockInfo[19]
            buy_data[4].number = String(Number.parseInt(Number.parseInt(stockInfo[18]) / 100))
            /*卖1到卖5 */
            sale_data[4].price = stockInfo[21]
            sale_data[4].number = String(Number.parseInt(Number.parseInt(stockInfo[20]) / 100))
            sale_data[3].price = stockInfo[23]
            sale_data[3].number = String(Number.parseInt(Number.parseInt(stockInfo[22]) / 100))
            sale_data[2].price = stockInfo[25]
            sale_data[2].number = String(Number.parseInt(Number.parseInt(stockInfo[24]) / 100))
            sale_data[1].price = stockInfo[27]
            sale_data[1].number = String(Number.parseInt(Number.parseInt(stockInfo[26]) / 100))
            sale_data[0].price = stockInfo[29]
            sale_data[0].number = String(Number.parseInt(Number.parseInt(stockInfo[28]) / 100))
            /*最低价 */
            buy_limit_down = stockInfo[5]
            /*最高价 */
            buy_limit_up = stockInfo[4]

            current_money = Number.parseFloat(current_money)
            buy_current = Number.parseFloat(buy_current)
            buy_stock_max = Math.floor(current_money / buy_current / 100) * 100
            buy_current = String(buy_current)
            buy_stock_max = String(buy_stock_max)

            that.setData({
              buy_stock_id: input,
              buy_stock: stock_name,
              buy_current,
              buy_limit_down,
              buy_limit_up,
              buy_stock_max,
              buy_data,
              sale_data,
            })
          }
        },
        fail(res){
          console.log(res)
        }
      })
    }
    // let buy_current=that.data.buy_current
    // let buy_limit_down=that.data.buy_limit_down
    // let buy_limit_up=that.data.buy_limit_up
    // let buy_price_data=that.data.buy_price_data
    // let buy_stock_max=that.data.buy_stock_max
    // let current_money=that.data.warehouse_data[4].data


    // for(let i in buy_price_data){
    //   if(input==buy_price_data[i].name||input==buy_price_data[i].code){
    //     console.log("okk")
    //     buy_current=buy_price_data[i].current
    //     buy_limit_down=buy_price_data[i].limit_down
    //     buy_limit_up=buy_price_data[i].limit_up
        
    //     current_money=Number.parseFloat(current_money)
    //     buy_current=Number.parseFloat(buy_current)
    //     buy_stock_max=Math.floor(current_money/buy_current/100)*100

    //     buy_current=String(buy_current)
    //     buy_stock_max=String(buy_stock_max)
    //     //console.log(buy_stock_max)

    //     break
    //   }
    // }
    // that.setData({
    //   buy_stock:input,
    //   buy_current,
    //   buy_limit_down,
    //   buy_limit_up,
    //   buy_stock_max,
    // })
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
          if (res.data.value == 1) {
            /*买入中的 */
            if (ordertype == '1' && orderStatus == '1') {
              let buy_unfinished_list = res.data.orderInfo
              wx.setStorageSync('buy_unfinished_list', buy_unfinished_list)
            }
            /*卖出中的 */
            if (ordertype == '2' && orderStatus == '1') {
              let sale_unfinished_list = res.data.orderInfo
              wx.setStorageSync('sale_unfinished_list', sale_unfinished_list)
            }
            /*已买入的 */
            if (ordertype == '1' && orderStatus == '2') {
              let buy_finished_list = res.data.orderInfo
              wx.setStorageSync('buy_finished_list', buy_finished_list)
            }
            /*已卖出的 */
            if (ordertype == '2' && orderStatus == '2') {
              let sale_finished_list = res.data.orderInfo
              wx.setStorageSync('sale_finished_list', sale_finished_list)
            }
          }
          else {
            wx.showToast({
              title: '出现错误',
              icon: 'none'
            })
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
    else if(Number.parseInt(buy_stock_num)%100!=0){
      wx.showToast({
        title: '购买数量需为100的整数倍',
        icon: "none"
      })
      return
    }
    let userInfo=wx.getStorageSync('userInfo')
    let nickName=userInfo.nickName
    let content="用户："+nickName+"\r\n名称："+buy_stock+"\r\n数量："+buy_stock_num+"\r\n价格："+buy_current+"\r\n\r\n您是否确认以上委托?"
    wx.showModal({
      title: '委托买入确认',
      content: content,
      confirmText:"确认委托",
      confirmColor:"#ff0000",
      success(res){
        if(res.confirm){
          let matchid=that.data.matchid
          let token=wx.getStorageSync('token')
          let stockid=that.data.buy_stock_id
          let stocknum=Number.parseInt(buy_stock_num)
          let price=buy_current*1
          /*请求购买接口 */
          wx.showLoading({
            title: '购买中',
          })
          wx.request({
            url: baseUrl+'/buy',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"  //post
            },
            data:{
              token:token,
              matchid:matchid,
              stockid:stockid,
              stocknum:stocknum,
              price:price
            },
            success(res){
              console.log(res)
              if(res.data.value==1){
                let warehouse_data=that.data.warehouse_data
                warehouse_data[4].data = Number.parseFloat(warehouse_data[4].data)
                warehouse_data[4].data -=price*stocknum
                warehouse_data[4].data = String(warehouse_data[4].data)
                /*以下为获取比赛时间期间的各类型订单 */
                let match_data=that.data.match_data
                getUserOrder(token, '1', String(match_data.start_time), String(match_data.end_time), '1')
                getUserOrder(token, '1', String(match_data.start_time), String(match_data.end_time), '2')
                getUserOrder(token, '2', String(match_data.start_time), String(match_data.end_time), '1')
                getUserOrder(token, '2', String(match_data.start_time), String(match_data.end_time), '2')
                wx.hideLoading()
                wx.showToast({
                  title: '购买成功',
                })
                that.setData({
                  warehouse_data
                })
              }
              else if(res.data.value==-2){
                wx.hideLoading()
                wx.showModal({
                  title: '提示',
                  content: '您的可用资金不足',
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
                icon:'none'
              })
            }
          })
        }
      }
    })
  },
  clickEntrustData:function(e){
    let that=this
    let token=wx.getStorageSync('token')
    let oldentrust_data=that.data.entrust_data||[]
    console.log(e.currentTarget.dataset.code)
    console.log(e.currentTarget.dataset.name)
    console.log(e.currentTarget.dataset.orderid)
    let code = e.currentTarget.dataset.code
    let name = e.currentTarget.dataset.name
    let orderid = Number.parseInt(e.currentTarget.dataset.orderid)
    if(code[0]=='6')
      code='sh'.concat(code)
    else
      code='sz'.concat(code)
    console.log(code)
    wx.showActionSheet({
      itemList: ['撤销该订单','查看股票信息'],
      success(res){
        /*点击查看股票信息 */
        if(res.tapIndex==1){
          wx.navigateTo({
            url: '../../stock/stock_detail/stock_detail?code='+code+'&name='+name,
          })
        }
        if(res.tapIndex==0){
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: baseUrl +'/rollBackOrder',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"  //post
            },
            data:{
              token:token,
              orderid:orderid
            },
            success(res){
              console.log(res)
              if(res.data.value==1){
                let entrust_data=[]
                for(let i in oldentrust_data){
                  if(oldentrust_data[i].id!=orderid){
                    entrust_data.push(oldentrust_data[i])
                  }
                }
                that.setData({
                  entrust_data
                })
                wx.hideLoading()
                wx.showToast({
                  title: '撤销成功',
                })
              }
              else{
                wx.hideLoading()
                wx.showToast({
                  title: '出现错误',
                  icon:'none'
                })
              }
            },
            fail(res){
              wx.hideLoading()
              console.log(res)
              wx.showToast({
                title: '出现错误',
                icon:'none'
              })
            }
          })
        }
      }
    })
  },
  toDetail:function(e){
    let code = e.currentTarget.dataset.code
    let name = e.currentTarget.dataset.name
    if (code[0] == '6')
      code = 'sh'.concat(code)
    else
      code = 'sz'.concat(code)
    console.log(code)
    console.log(name)
    wx.navigateTo({
      url: '../../stock/stock_detail/stock_detail?code=' + code + '&name=' + name,
    })
  },
})