//index.js

const shenzhengUrl="http://hq.sinajs.cn/list=sz399001"
const shangzhengUrl = "http://hq.sinajs.cn/list=sh000001"
const chuangyeUrl = "http://hq.sinajs.cn/list=sz399006"
const baseUrl = "http://hq.sinajs.cn/list="

Page({
  data: {
    //上证、深证、创业板数据
    stock_data:[
      {
        "name":"上证指数",
        "index":2679.11,
        "change":10.94,
        "change_percent":0.41
      },
      {
        "name": "深证成指",
        "index": 8062.29,
        "change": 60.19,
        "change_percent": 0.75
      },
      {
        "name": "创业板指",
        "index": 1403.28,
        "change": -1.97,
        "change_percent": 0.14
      }
    ],

    //热门板块数据
    heat_block:[
      {
        "name":"证券",
        "percent":3.27,
        "heat_stock":"国盛金控",
        "stock_price":12.45,
        "stock_percent":9.98
      },
      {
        "name": "房地产",
        "percent": 1.64,
        "heat_stock": "城投控股",
        "stock_price": 7.12,
        "stock_percent": 10.05
      },
      {
        "name": "银行",
        "percent": 1.63,
        "heat_stock": "张家银行",
        "stock_price": 6.70,
        "stock_percent": 6.01
      },
      {
        "name": "租购同权",
        "percent": 1.92,
        "heat_stock": "新华传媒",
        "stock_price": 5.47,
        "stock_percent": 10.06
      },
      {
        "name": "奢侈品",
        "percent": 1.37,
        "heat_stock": "五粮液",
        "stock_price": 51.68,
        "stock_percent": 1.95
      },
      {
        "name": "债转股",
        "percent": 1.41,
        "heat_stock": "泰达股份",
        "stock_price": 3.72,
        "stock_percent": 10.06
      },
    ],
    some_stock:[
      {
        "name":"佳隆股份",
        "price":4.02,
        "percent":10.14,
        "from":"SZ",
        "code":"002495"
      },
      {
        "name": "益民集团",
        "price": 4.24,
        "percent": 10.13,
        "from": "SH",
        "code": "600824"
      },
      {
        "name": "华远地产",
        "price": 2.83,
        "percent": 10.12,
        "from": "SH",
        "code": "600743"
      },
      {
        "name": "中钢国际",
        "price": 5.01,
        "percent": 10.11,
        "from": "SZ",
        "code": "000928"
      },
      {
        "name": "佐力药业",
        "price": 5.78,
        "percent": 10.11,
        "from": "SZ",
        "code": "300181"
      },
      {
        "name": "东方能源",
        "price": 3.71,
        "percent": 10.09,
        "from": "SZ",
        "code": "000958"
      },
      {
        "name": "桂东电力",
        "price": 4.26,
        "percent": 10.08,
        "from": "SH",
        "code": "600310"
      },
      {
        "name": "天风证券",
        "price": 7.76,
        "percent": 10.07,
        "from": "SH",
        "code": "601162"
      },
      {
        "name": "瑞泰科技",
        "price": 8.53,
        "percent": 10.06,
        "from": "SZ",
        "code": "002066"
      },
      {
        "name": "山东威达",
        "price": 7.01,
        "percent": 10.06,
        "from": "SZ",
        "code": "002026"
      },
    ],
    isShow:[true,true,true,true,true,false]
  },
  onLoad: function () {
    /*沪A涨幅榜 */
    function hu_up(){
      let str = 'stock_sh_up_d_10'
      let url = baseUrl +str
      //console.log(url)
      let start=str.length
      start=start+13
      wx.request({
        url: url,
        success(res){
          //console.log(res)
          let str=String(res.data)
          let end=str.length-3
          str=str.slice(start,end)
          //console.log(str)
          let arr=JSON.parse(str)
          //console.log(arr)
          let hu_up=[]
          for(let i=0;i<arr.length;i++){
            let obj = {}
            obj.real_code=arr[i][0]
            obj.name=arr[i][1]
            obj.code=arr[i][0].slice(2)
            obj.price=arr[i][3]
            obj.percent=arr[i][2]
            obj['from']="SH"
            hu_up.push(obj)
          }
          //console.log(hu_up)
          that.setData({
            hu_up
          })
        }
      })
    }
    /*沪A跌幅榜 */
    function hu_down() {
      let str = 'stock_sh_down_d_10'
      let url = baseUrl + str
      //console.log(url)
      let start = str.length
      start = start + 13
      wx.request({
        url: url,
        success(res) {
          //console.log(res)
          let str = String(res.data)
          let end = str.length - 3
          str = str.slice(start, end)
          //console.log(str)
          let arr = JSON.parse(str)
          //console.log(arr)
          let hu_down = []
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj.real_code = arr[i][0]
            obj.name = arr[i][1]
            obj.code = arr[i][0].slice(2)
            obj.price = arr[i][3]
            obj.percent = arr[i][2]
            obj['from'] = "SH"
            hu_down.push(obj)
          }
          //console.log(hu_down)
          that.setData({
            hu_down
          })
        }
      })
    }
    /*深A涨幅榜 */
    function shen_up() {
      let str = 'stock_sz_up_d_10'
      let url = baseUrl + str
      //console.log(url)
      let start = str.length
      start = start + 13
      wx.request({
        url: url,
        success(res) {
          //console.log(res)
          let str = String(res.data)
          let end = str.length - 3
          str = str.slice(start, end)
          //console.log(str)
          let arr = JSON.parse(str)
          //console.log(arr)
          let shen_up = []
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj.real_code = arr[i][0]
            obj.name = arr[i][1]
            obj.code = arr[i][0].slice(2)
            obj.price = arr[i][3]
            obj.percent = arr[i][2]
            obj['from'] = "SZ"
            shen_up.push(obj)
          }
          //console.log(shen_up)
          that.setData({
            shen_up
          })
        }
      })
    }
    /*深A跌幅榜 */
    function shen_down() {
      let str = 'stock_sz_down_d_10'
      let url = baseUrl + str
      //console.log(url)
      let start = str.length
      start = start + 13
      wx.request({
        url: url,
        success(res) {
          //console.log(res)
          let str = String(res.data)
          let end = str.length - 3
          str = str.slice(start, end)
          //console.log(str)
          let arr = JSON.parse(str)
          //console.log(arr)
          let shen_down = []
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj.real_code = arr[i][0]
            obj.name = arr[i][1]
            obj.code = arr[i][0].slice(2)
            obj.price = arr[i][3]
            obj.percent = arr[i][2]
            obj['from'] = "SH"
            shen_down.push(obj)
          }
          //console.log(shen_down)
          that.setData({
            shen_down
          })
        }
      })
    }

    hu_up()
    hu_down()
    shen_up()
    shen_down()
    function getHeatBlock(){
      wx.request({
        url: 'http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=C._BKHY&sty=FCCS&st=c&sr=-1&page=1&pageSize=10&js=var QDtMyMEH={rank:[(x)],pages:(pc),total:(tot)}&token=7bc05d0d4c3c22ef9fca8c2a912d779c&jsName=quote_123',
        success(res){
          let str=res.data
          //console.log(str)
          str=str.slice(19,-18)
          //console.log(str)
          let arr=JSON.parse(str)
          //console.log(arr)
          for(let i=0;i<arr.length;i++){
            arr[i]=arr[i].split(',')
          }
          for(let i=0;i<heat_block.length;i++){
            heat_block[i].name=arr[i][2]
            heat_block[i].percent=arr[i][3]
            heat_block[i].heat_stock=arr[i][8]
            heat_block[i].stock_percent=arr[i][9]
            /*没有stock_price这个数据。。。 */
          }
          that.setData({
            stock_data,
            heat_block
          })
          wx.hideLoading()
        }
      })
    }
    let that=this
    let stock_data=that.data.stock_data
    let heat_block=that.data.heat_block
    wx.showLoading({
      title: '加载中',
    })
    /*请求上证指数*/
    wx.request({
      url: shangzhengUrl,
      success(res){
        //console.log(res)
        let str=res.data
        let arr=str.split(',')
        console.log(arr)
        /*
          yesterday为昨日报收
          now为现在数据
          change为变化
          percent为变化率
         */
        let yesterday=Number.parseFloat(arr[2]).toFixed(2)
        let now=Number.parseFloat(arr[3]).toFixed(2)
        let change=(now-yesterday).toFixed(2)
        let percent=(Math.abs(change)*100/yesterday).toFixed(2)
        stock_data[0].index=String(now)
        stock_data[0].change=String(change)
        stock_data[0].change_percent=String(percent)

        /*请求深证成指*/
        wx.request({
          url: shenzhengUrl,
          success(res) {
            //console.log(res)
            let str = res.data
            let arr = str.split(',')
            /*
              yesterday为昨日报收
              now为现在数据
              change为变化
              percent为变化率
             */
            let yesterday = Number.parseFloat(arr[2]).toFixed(2)
            let now = Number.parseFloat(arr[3]).toFixed(2)
            let change = (now - yesterday).toFixed(2)
            let percent = (Math.abs(change) * 100 / yesterday).toFixed(2)
            stock_data[1].index = String(now)
            stock_data[1].change = String(change)
            stock_data[1].change_percent = String(percent)

            /*请求创业板指*/
            wx.request({
              url: chuangyeUrl,
              success(res) {
                //console.log(res)
                let str = res.data
                let arr = str.split(',')
                /*
                  yesterday为昨日报收
                  now为现在数据
                  change为变化
                  percent为变化率
                 */
                let yesterday = Number.parseFloat(arr[2]).toFixed(2)
                let now = Number.parseFloat(arr[3]).toFixed(2)
                let change = (now - yesterday).toFixed(2)
                let percent = (Math.abs(change) * 100 / yesterday).toFixed(2)
                stock_data[2].index = String(now)
                stock_data[2].change = String(change)
                stock_data[2].change_percent = String(percent)
                /*请求热门板块 */
                getHeatBlock()
              }
            })
          }
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.reLaunch({
      url: 'index',
    })
  },

  onShow: function () {
    //每隔5分钟请求一次
    // setInterval(function(){
    //   console.log('a')
    // },1000*60*5)
    // let that = this
    // wx.request({
    //   url: 'https://easy-mock.com/mock/5a69dacd09247d03931a4dee/example/stock_data', //仅为示例，并非真实的接口地址
    //   data: {
    //   },
    //   method: "GET",
    //   header: {
    //     // "Content-Type": "application/x-www-form-urlencoded"  //post
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       stock_data: res.data.data.stock_data,
    //       heat_block: res.data.data.heat_block,
    //       some_stock: res.data.data.some_stock,
    //     })
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })
  },

  show:function(e){
    let that=this
    let id=Number.parseInt(e.currentTarget.dataset.id)
    let isShow=that.data.isShow
    isShow[id]=!isShow[id]
    that.setData({
      isShow
    })
  },
  showDetail:function(e){
    console.log('a')
  },
  topa:function(){
    wx.navigateTo({
      url: '/pages/match/practice/practice',
    })
  },
  toStock: function () {
    wx.navigateTo({
      url: '/pages/match/stock/stock',
    })
  },
  
  toModuleStock: function () {
    wx.navigateTo({
      url: '/pages/stock/module_stock/module_stock',
    })
  },

  toIndexDetail: function(e) {
    let name=e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/stock/index_detail/index_detail?name='+name,
    })
  },
  toStockDetail: function (e) {
    let code=e.currentTarget.dataset.code
    let name=e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/stock/stock_detail/stock_detail?code='+code+'&name='+name,
    })
  },
})
