// pages/user/favorite/favorite.js

const baseUrl = "http://hq.sinajs.cn/list="
import {wxRequest} from '../../../lib/wxApi'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        favorList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        this.fetchData()
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
        wx.showLoading({
            title: '加载中',
        })

        let codeList = wx.getStorageSync('favor') || []
        console.log(codeList)
        if (codeList.length > 0) {
            let url = baseUrl + codeList
            console.log("url :", url)
            let res = await wxRequest({url})

            let str = res.data.slice(0, -2)

            let stockArr = str.split(';')
            let favorList = []
            for (let item of stockArr) {
                let arr = item.split(',')
                // /*
                //   yesterday为昨日报收
                //   now为现在数据
                //   change为变化
                //   percent为变化率
                //  */
                let from = 'SZ'
                let yesterday = Number.parseFloat(arr[2]).toFixed(2)
                let arr0  = arr[0].split('=')
                let name = arr0[1].slice(1)
                let now = Number.parseFloat(arr[3]).toFixed(2)
                let change = (now - yesterday).toFixed(2)
                let percent = (Math.abs(change) * 100 / yesterday).toFixed(2)

                if (change >= 0)
                    percent = "+" + percent
                else
                    percent = "-" + percent

                let real_code = arr0[0].slice(-8)
                if(real_code.slice(0,2) === 'sh')
                    from = 'SH'
                let code = real_code.slice(2)
                favorList.push({
                    name,from,percent,price:now,code,real_code
                })
            }
            this.setData({favorList})

            wx.hideLoading()
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
