// pages/news/news.js
import {wxRequest} from '../../lib/wxApi'
import {friendlyTime} from '../../utils/util'

const app = getApp();
const URL = app.globalData.url
Page({

    /**
     * 页面的初始数据
     */
    data: {
        news_list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let page = options.page_num || 1
        this.fetchData(page);
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.reLaunch({
            url: 'news',
        })
    },


    async fetchData(page) {
        let token = wx.getStorageSync('token') || ''
        let url = URL + '/getNews'
        try {
            let res = await wxRequest({
                url,
                method: 'POST',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"  //post
                },
                data: {
                    token, page
                }
            })
            console.log("news:", res)
            let news
            if(res.data.value == -4){
                let news = []
            }
            else{
                news = res.data.news
                news.forEach(i => {
                    i.friendlyTime = friendlyTime(i.time)
                })
            }

            this.setData({news_list: news})
            console.log(this.data)
        }
        catch {
            let news = []
            this.setData({news_list: news})
            console.log(this.data)
        }
    },

    toNewsDetail(e) {
        // console.log(e.currentTarget.dataset.item)
        let data = JSON.stringify(e.currentTarget.dataset.item);
        wx.navigateTo({
            url: './newsDetail/newsDetail?data=' + data,
        })
    }
})
