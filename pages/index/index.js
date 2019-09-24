//index.js
const app = getApp();
const URL = app.globalData.url

const shenzhengUrl = "http://hq.sinajs.cn/list=sz399001"
const shangzhengUrl = "http://hq.sinajs.cn/list=sh000001"
const chuangyeUrl = "http://hq.sinajs.cn/list=sz399006"
const heatStockUrl = 'http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=C._BKHY&sty=FCCS&st=c&sr=-1&page=1&pageSize=10&js=var QDtMyMEH={rank:[(x)],pages:(pc),total:(tot)}&token=7bc05d0d4c3c22ef9fca8c2a912d779c&jsName=quote_123'
// const baseUrl = "http://hq.sinajs.cn/list="
import {wxRequest} from '../../lib/wxApi'

Page({
    data: {
        //上证、深证、创业板数据
        stock_data: [
            {
                "name": "上证指数",
                "index": 0,
                "change": 0,
                "change_percent": 0
            },
            {
                "name": "深证成指",
                "index": 0,
                "change": 0,
                "change_percent": 0
            },
            {
                "name": "创业板指",
                "index": 0,
                "change": 0,
                "change_percent": 0
            }
        ],
        //热门板块数据
        heat_block: [
            {
                "name": "证券",
                "heat_stock": "国盛金控",
                "percent": 0,
                "stock_price": 0,
                "stock_percent": 0
            },
            {
                "name": "房地产",
                "heat_stock": "城投控股",
                "percent": 0,
                "stock_price": 0,
                "stock_percent": 0
            },
            {
                "name": "银行",
                "heat_stock": "张家银行",
                "percent": 0,
                "stock_price": 0,
                "stock_percent": 0
            },
            {
                "name": "租购同权",
                "heat_stock": "新华传媒",
                "percent": 0,
                "stock_price": 0,
                "stock_percent": 0
            },
            {
                "name": "奢侈品",
                "heat_stock": "五粮液",
                "percent": 0,
                "stock_price": 0,
                "stock_percent": 0
            },
            {
                "name": "债转股",
                "heat_stock": "泰达股份",
                "percent": 0,
                "stock_price": 0,
                "stock_percent": 0
            },
        ],
        isShow: [true, false, false, false, false, false]
    },
    onLoad: function () {
        this.fetchData()
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
        // 每隔5分钟请求一次
        setInterval(this.fetchData, 1000 * 60 * 5)

    },


    show: function (e) {
        let that = this
        let id = Number.parseInt(e.currentTarget.dataset.id)
        let isShow = that.data.isShow
        isShow[id] = !isShow[id]
        that.setData({
            isShow
        })
    },

    showDetail: function (e) {
        console.log('a')
    },

    toPartice: function () {
        wx.navigateTo({
            url: '/pages/match/practice/practice',
        })
    },

    toStock: function () {
        wx.navigateTo({
            url: '/pages/match/stock/stock',
        })
    },

    toModuleStock: function (e) {
        let code = e.currentTarget.dataset.code
        wx.navigateTo({
            url: '/pages/stock/module_stock/module_stock?code='+code,
        })
    },

    toIndexDetail: function (e) {
        let name = e.currentTarget.dataset.name
        wx.navigateTo({
            url: '/pages/stock/index_detail/index_detail?name=' + name,
        })
    },

    toStockDetail: function (e) {
        let code = e.currentTarget.dataset.code
        let name = e.currentTarget.dataset.name
        wx.navigateTo({
            url: '/pages/stock/stock_detail/stock_detail?code=' + code + '&name=' + name,
        })
    },

    fetchData: async function () {
        let that = this
        let stock_data = that.data.stock_data
        let heat_block = that.data.heat_block
        let hu_up = []
        let hu_down = []
        let shen_up = []
        let shen_down = []

        wx.showLoading({
            title: '加载中',
        })


        /*请求上证指数*/
        try {
            let res = await wxRequest({url: shangzhengUrl})
            //console.log(res)
            let str = res.data
            let arr = str.split(',')
            // console.log(arr)
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
            stock_data[0].index = String(now)
            stock_data[0].change = String(change)
            stock_data[0].change_percent = String(percent)
        }
        catch {
        }

        /*请求深证成指*/
        try {

            let res = await wxRequest({url: shenzhengUrl})
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
        }
        catch {
        }

        /*请求创业板指*/
        try {
            let res = await wxRequest({url: chuangyeUrl})
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
        }
        catch {
        }

        /*请求热门板块 */
        try {
            let res = await wxRequest({url: heatStockUrl})
            let str = res.data
            // console.log(str)
            str = str.slice(19, -18)
            //console.log(str)
            let arr = JSON.parse(str)
            //console.log(arr)
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split(',')
            }
            for (let i = 0; i < heat_block.length; i++) {
                heat_block[i].code = arr[i][1]
                heat_block[i].name = arr[i][2]

                if (arr[i][3].startsWith('-')){
                    heat_block[i].percent = arr[i][3]
                    heat_block[i].up = 0
                }
                else{
                    heat_block[i].percent = '+' + arr[i][3]
                    heat_block[i].up  = 1
                }

                heat_block[i].heat_stock = arr[i][8]

                if (arr[i][9].startsWith('-'))
                    heat_block[i].stock_percent = arr[i][9]
                else
                    heat_block[i].stock_percent = '+' + arr[i][9]
            }
        }
        catch {
        }

        /*请求 沪A涨幅榜、沪A跌幅榜、深A涨幅榜、深A跌幅榜*/
        try {
            let res = await wxRequest({url: URL + '/top'})
            let arr = res.data.split('\n')
            let str1 = arr[0].slice(17)
            let str2 = arr[1].slice(19)
            let str3 = arr[2].slice(17)
            let str4 = arr[3].slice(19)
            let hu_up_array = JSON.parse(str1)
            let hu_down_array = JSON.parse(str2)
            let shen_up_array = JSON.parse(str3)
            let shen_down_array = JSON.parse(str4)

            for (let i = 0; i < hu_up_array.length; i++) {
                let obj = {}
                obj.real_code = hu_up_array[i][0]
                obj.name = hu_up_array[i][1]
                obj.code = hu_up_array[i][0].slice(2)
                obj.price = hu_up_array[i][3]
                obj.percent = hu_up_array[i][2]
                obj['from'] = "SH"
                hu_up.push(obj)
            }
            for (let i = 0; i < hu_down_array.length; i++) {
                let obj = {}
                obj.real_code = hu_down_array[i][0]
                obj.name = hu_down_array[i][1]
                obj.code = hu_down_array[i][0].slice(2)
                obj.price = hu_down_array[i][3]
                obj.percent = hu_down_array[i][2]
                obj['from'] = "SH"
                hu_down.push(obj)
            }
            for (let i = 0; i < shen_up_array.length; i++) {
                let obj = {}
                obj.real_code = shen_up_array[i][0]
                obj.name = shen_up_array[i][1]
                obj.code = shen_up_array[i][0].slice(2)
                obj.price = shen_up_array[i][3]
                obj.percent = shen_up_array[i][2]
                obj['from'] = "SZ"
                shen_up.push(obj)
            }
            for (let i = 0; i < shen_down_array.length; i++) {
                let obj = {}
                obj.real_code = shen_down_array[i][0]
                obj.name = shen_down_array[i][1]
                obj.code = shen_down_array[i][0].slice(2)
                obj.price = shen_down_array[i][3]
                obj.percent = shen_down_array[i][2]
                obj['from'] = "SZ"
                shen_down.push(obj)
            }
        }
        catch {
        }
        that.setData({
            stock_data,
            heat_block,
            hu_up,
            hu_down,
            shen_up,
            shen_down
        })
        wx.hideLoading()
    },

})
