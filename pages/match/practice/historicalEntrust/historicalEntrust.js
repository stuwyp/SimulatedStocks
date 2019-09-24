// pages/match/practice/historicalDeal/historicalDeal.js
import {timestampToTime} from '../../../../utils/util'

let todayDate = new Date();
let beforeDate = new Date(todayDate.getTime() - (7 * 24 * 60 * 60 * 1000));
let app = getApp();
const baseUrl = app.globalData.url

Page({

    /**
     * 页面的初始数据
     */
    data: {
        endDate: todayDate.toLocaleDateString().replace(/\//g, '-'),
        beforeDate: beforeDate.toLocaleDateString().replace(/\//g, '-'),
        entrust_data: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let start = beforeDate.setHours(0, 0, 0, 0)
        start /= 1000
        start = Number.parseInt(start)
        let end = todayDate.getTime()
        end /= 1000
        end = Number.parseInt(end)
        console.log("start - end", start, end)



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
                    if (res.data.value === 1) {
                        if (res.data.orderInfo.length > 0) {
                            for (let i in res.data.orderInfo) {
                                if (res.data.orderInfo[i].match_id === matchid) {
                                    let obj = {}
                                    obj.stock_id = res.data.orderInfo[i].stock_id
                                    obj.time = res.data.orderInfo[i].create_time
                                    obj.time = timestampToTime(obj.time)
                                    // obj.time = obj.time.split(' ')
                                    // obj.time = obj.time[1]
                                    obj.id = res.data.orderInfo[i].id
                                    obj.entrust_number = res.data.orderInfo[i].order_num
                                    obj.entrust_price = res.data.orderInfo[i].price
                                    obj.mode = res.data.orderInfo[i].order_type
                                    entrust_data.push(obj)
                                }
                            }
                            if (entrust_data.length > 0) {
                                for (let i in entrust_data) {
                                    wx.request({
                                        url: baseUrl + '/getStockInfo',
                                        method: 'POST',
                                        header: {
                                            "Content-Type": "application/x-www-form-urlencoded"  //post
                                        },
                                        data: {
                                            token: token,
                                            stockid: entrust_data[i].stock_id
                                        },
                                        success(res) {
                                            if (res.data.value === 1) {
                                                entrust_data[i].name = res.data.stockInfo[0]
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
        console.log(options)
        let that = this
        let entrust_data = []
        let matchid = Number.parseInt(options.matchid)
        let token = wx.getStorageSync('token')

        getUserOrder(token, '1', start, end, '1')
        getUserOrder(token, '2', start, end, '1')
        wx.hideLoading()
        that.setData({
            matchid
        })
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
    bindDateChange: function (e) {
        console.log(e.target.dataset.id ,e.detail.value)
        if (e.target.dataset.id === '1') {
            this.setData({
                beforeDate: e.detail.value
            })
        }
        else {
            this.setData({
                endDate: e.detail.value
            })
        }
    },
    search: function () {


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
                    if (res.data.value === 1) {
                        if (res.data.orderInfo.length > 0) {
                            for (let i in res.data.orderInfo) {
                                if (res.data.orderInfo[i].match_id === matchid) {
                                    let obj = {}
                                    obj.stock_id = res.data.orderInfo[i].stock_id
                                    obj.time = res.data.orderInfo[i].create_time
                                    obj.time = timestampToTime(obj.time)
                                    // obj.time = obj.time.split(' ')
                                    // obj.time = obj.time[1]
                                    obj.id = res.data.orderInfo[i].id
                                    obj.entrust_number = res.data.orderInfo[i].order_num
                                    obj.entrust_price = res.data.orderInfo[i].price
                                    obj.mode = res.data.orderInfo[i].order_type
                                    entrust_data.push(obj)
                                }
                            }
                            if (entrust_data.length > 0) {
                                for (let i in entrust_data) {
                                    wx.request({
                                        url: baseUrl + '/getStockInfo',
                                        method: 'POST',
                                        header: {
                                            "Content-Type": "application/x-www-form-urlencoded"  //post
                                        },
                                        data: {
                                            token: token,
                                            stockid: entrust_data[i].stock_id
                                        },
                                        success(res) {
                                            if (res.data.value === 1) {
                                                entrust_data[i].name = res.data.stockInfo[0]
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

        let that = this
        let date1 = that.data.beforeDate
        date1 = new Date(date1)
        date1 = date1.getTime()
        date1 = date1 / 1000
        date1 = Number.parseInt(date1)
        let date2 = that.data.endDate
        console.log(date2)
        date2 = new Date(date2)
        date2 = date2.getTime()
        date2 = date2 / 1000 + 24 * 60 * 60 - 1
        date2 = Number.parseInt(date2)
        console.log("date", date1, date2)
        wx.showLoading({
            title: '加载中',
        })
        let entrust_data = []
        let token = wx.getStorageSync('token')
        let matchid = that.data.matchid
        getUserOrder(token, '1', date1, date2, '1')
        getUserOrder(token, '2', date1, date2, '1')
        wx.hideLoading()
        that.setData({
            entrust_data
        })
    }
})
