// pages/news/news.js
import {wxRequest} from '../../lib/wxApi'
import {friendlyTime} from '../../utils/util'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        news_list: [
            // {
            //     "id": 1,
            //     "title:": "",
            //     "time": "",
            //     "content": "",
            //     "source": "",
            //     "type": ""
            // }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.fetchData();
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


    async fetchData() {
        let url = 'http://localhost:8080/getNews'
        try {
            let res = await wxRequest({url})
            // console.log(res)
            let news = res.data.news
            news.forEach(i => {
                i.friendlyTime = friendlyTime(i.time)
            })
            this.setData({news_list: news})
            console.log(this.data)
        }
        catch {

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
