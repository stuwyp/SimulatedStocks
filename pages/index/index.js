//index.js
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
    isShow:[true,false,false,false,false,false]
  },
  onLoad: function () {
    
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
      url: '/pages/match/module_stock/module_stock',
    })
  }
})
