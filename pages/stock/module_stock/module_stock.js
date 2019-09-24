// pages/stock/module_stock/module_stock.js
import {wxRequest} from '../../../lib/wxApi'

let page = 1
let BASE_URL = `http://push2.eastmoney.com/api/qt/clist/get?pn=${page}&pz=10&po=1&np=1&fltt=2&invt=2&fid=f3&fields=f2,f3,f12,f13,f14&fs=b:`
Page({

    /**
     * 页面的初始数据
     */
    data: {
        some_stock: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let block_code = options.code
        this.setData({block_code})
        this.fetchData()

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
        // 每隔5分钟请求一次
        setInterval(this.fetchData, 1000 * 60 * 5)
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
    fetchData: async function () {
        try {
            let url = BASE_URL +this.data.block_code
            let res = await wxRequest({url})
            console.log(url,res)
            let data = res.data.data.diff
            let some_stock = []
            for (let i of data) {
                let obj = {}
                obj['price'] = i.f2
                obj['percent'] = i.f3
                obj['code'] = i.f12
                if (i.f13 === 1){
                    obj['from'] = 'SH'
                    obj['real_code'] ='sh'+obj['code']
                }
                else{
                    obj['from'] = 'SZ'
                    obj['real_code'] ='sz'+obj['code']
                }
                obj['name'] = i.f14

                some_stock.push(obj)
            }
            this.setData({some_stock})
        }
        catch (e) {
            console.log(e)
        }
    },
    toStockDetail: function (e) {
        let code = e.currentTarget.dataset.code
        let name = e.currentTarget.dataset.name
        wx.navigateTo({
            url: '/pages/stock/stock_detail/stock_detail?code=' + code + '&name=' + name,
        })
    },
})
