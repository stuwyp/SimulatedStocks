// pages/match/match.js
import {wxRequest} from '../../lib/wxApi'

let app = getApp();
const baseUrl = app.globalData.url

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSelected: [true, false, false],
        isOpen: true,
        api_data: [],
        match_data: [],
        some_match: []
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
            let myMatchList = []
            if (id === 2) {
                let current_matchlist = wx.getStorageSync('current_matchlist') || []
                console.log(current_matchlist)
                let joinCompititions = wx.getStorageSync('joinCompititions') || []
                for (let i in current_matchlist) {
                    for (let j in joinCompititions) {
                        if (joinCompititions[j].match_id === current_matchlist[i].id)
                            myMatchList.push(current_matchlist[i])
                    }
                }
                // console.log(myMatchList)
            }
            that.setData({
                isSelected,
                myMatchList
            })
        }
    },

    joinMatch: function (e) {
        let token = wx.getStorageSync('token') || ''
        if (token === '') {
            wx.showModal({
                title: '提示',
                content: '请先在我的页面进行登录',
                complete(res) {
                    wx.switchTab({
                        url: '../user/user',
                    })
                }
            })
        } else {
            console.log(e.currentTarget.dataset.id)
            wx.request({
                url: baseUrl + '/joinMatch',
                method: 'POST',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded" //post
                },
                data: {
                    token: token,
                    matchid: e.currentTarget.dataset.id
                },
                success(res) {
                    console.log(res.data.value)
                }
            })
        }
    },

    quitMatch: function (e) {
        let token = wx.getStorageSync('token') || ''
        if (token === '') {
            wx.showModal({
                title: '提示',
                content: '请先在我的页面进行登录',
                complete(res) {
                    wx.switchTab({
                        url: '../user/user',
                    })
                }
            })
        } else {
            console.log(e.currentTarget.dataset.id)
            wx.request({
                url: baseUrl + '/quitMatch',
                method: 'POST',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded" //post
                },
                data: {
                    token: token,
                    matchid: e.currentTarget.dataset.id
                },
                success(res) {
                    console.log(res.data.value)
                }
            })
        }
    },

    getUserInfo2: async function (token) {
        try {
            let res = await wxRequest({
                url: baseUrl + '/getUserInfo2',
                method: 'POST',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"  //post
                },
                data: {
                    token: token
                }
            })
            // console.log("res:",res)
            wx.setStorageSync('joinCompititions', res.data.joinCompititions)
        } catch (e) {
            console.log(e)
        }
    },

    requestDetail: async function (api_data, id, token) {
        //let id = matchList[i].id
        try {
            let res = await wxRequest({
                url: baseUrl + '/getMatchInfo',
                method: 'POST',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"  //post
                },
                data: {
                    token: token,
                    matchid: id
                },
            })
            // console.log(res)
            let obj = {}

            obj.end_time = res.data.end_time
            obj.id = res.data.id
            obj.init_money = res.data.init_money
            obj.match_detail = res.data.match_detail
            obj.match_name = res.data.match_name
            obj.match_rule = res.data.match_rule
            obj.start_time = res.data.start_time
            obj.sign_time = res.data.sign_time
            obj.real_start_time = this.getLocalTime(obj.start_time)
            obj.real_end_time = this.getLocalTime(obj.end_time)
            /*获取当前时间判断比赛状态 */
            let timestamp = Date.parse(new Date());
            timestamp = Number.parseInt(timestamp / 1000)
            obj.state = "比赛中"
            if (obj.start_time > timestamp)
                obj.state = "未开始"
            else if (obj.end_time < timestamp)
                obj.state = "已结束"
            api_data.push(obj)
            this.setData({
                api_data
            })

        } catch (e) {
            console.log(e)
        }
    },

    getMatchList: async function (token) {
        try {
            let res = await wxRequest({
                url: baseUrl + '/getMatchList',
                method: 'POST',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded" //post
                },
                data: {
                    token: token
                }
            })
            console.log("res", res)
            //wx.hideLoading()
            let matchList = res.data.matchlist
            let api_data = []
            wx.setStorageSync('current_matchlist', matchList)
            //对于每一个比赛都请求获取其具体信息
            for (let i = 0; i < matchList.length; i++) {
                this.requestDetail(api_data,matchList[i].id, token)
            }


        } catch (e) {
            console.log(e)
        }
    },

    fetchData: function () {
        //获取存储在本地的token
        let token = wx.getStorageSync('token') || '';
        console.log("token : ", token)

        if (token === '') {
            wx.showModal({
                title: '提示',
                content: '请先在我的页面进行登录',
                complete(res) {
                    wx.switchTab({
                        url: '../user/user',
                    })
                }
            })
        }
        else {
            wx.showLoading({
                title: '加载中',
            })
            this.getMatchList(token)
            this.getUserInfo2(token)
            wx.hideLoading()

        }
    },

    getLocalTime: function (nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },

    open: function () {
        let that = this
        that.setData({
            isOpen: !that.data.isOpen
        })
    },

    toPractice: function () {
        wx.navigateTo({
            url: 'practice/practice',
        })
    },

    toMatchInfo: function (e) {
        let matchid = e.currentTarget.dataset.matchid
        wx.navigateTo({
            url: 'match_information/match_information?matchid=' + matchid,
        })
    },

})
