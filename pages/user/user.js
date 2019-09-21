import {wxRequest} from "../../lib/wxApi"

let app = getApp();
const baseUrl = app.globalData.url

Page({
    data: {},
    onLoad: function () {
        let that = this
        let userInfo = wx.getStorageSync('userInfo') || ''
        //console.log(userInfo)
        if (userInfo) {
            that.setData({
                userInfo: userInfo,
                isLogin: true
            })
        }
    },
    bindgetuserinfo: async function (e) {
        let that = this
        if (e.detail.userInfo) {
            // console.log(e)
            console.log('授权通过')
            let userInfo = e.detail.userInfo;
            wx.setStorageSync('userInfo', userInfo)
            console.log(String(userInfo.nickName))

            let openid = wx.getStorageSync('openid')
            try {
                let res = await wxRequest({
                    url: baseUrl + '/userlogin',
                    method: 'POST',
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"  //post
                    },
                    data: {
                        user: String(openid),
                        psw: String(openid)
                    }
                })
                console.log("login：",baseUrl + '/userlogin',res)
                if (res.data.value === 1) {
                    console.log('登录模拟炒股系统成功，token为：' + res.data.token)
                    wx.setStorageSync('token', res.data.token)
                }
                else {
                    //请求进行注册
                    let res2 = await wxRequest({
                        url: baseUrl + '/regist',
                        method: 'POST',
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"  //post
                        },
                        data: {
                            user: String(openid),
                            psw: String(openid),
                            heading: String(userInfo.avatarUrl),
                            nickname: String(userInfo.nickName)
                        }
                    })
                    console.log("regist：",baseUrl + '/regist',res2)
                    //如果注册成功即可登录
                    if (res2.data.value === 1) {
                        let res3 = await wxRequest({
                            url: baseUrl + '/userlogin',
                            method: 'POST',
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"  //post
                            },
                            data: {
                                user: String(openid),
                                psw: String(openid),
                            }
                        })
                        console.log(res3)
                        console.log('登录模拟炒股系统成功，token为：' + res3.data.token)
                        wx.setStorageSync('token', res3.data.token)
                    }
                }
            }
            catch (e){
                console.log(e)
            }
            //授权后开始进行注册
            // wx.request({
            //   url: baseUrl+'/regist',
            //   method:'POST',
            //   header: {
            //     "Content-Type": "application/x-www-form-urlencoded"  //post
            //   },
            //   data:{
            //     user:String(openid),
            //     psw:String(openid),
            //     heading:String(userInfo.avatarUrl),
            //     nickname:String(userInfo.nickName)
            //   },
            //   success(res){
            //     console.log(res)
            //     //如果注册成功或者提示重复注册即可登录
            //     if(res.data.value==1||res.data.value==-102){
            //       wx.request({
            //         url: baseUrl+'/login',
            //         method:'POST',
            //         header: {
            //           "Content-Type": "application/x-www-form-urlencoded"  //post
            //         },
            //         data:{
            //           user:String(openid),
            //           psw:String(openid),
            //         },
            //         success(res){
            //           console.log(res)
            //           console.log('登录模拟炒股系统成功，token为：'+res.data.token)
            //           wx.setStorageSync('token', res.data.token)
            //         }
            //       })
            //     }
            //   },
            //   fail(res){
            //     console.log(res)
            //   }
            // })

            that.setData({
                isLogin: true
            })
            wx.reLaunch({
                url: '/pages/user/user',
            })
        }
        else {
            console.log('拒绝授权')
        }
    }
    ,
    toFeedback: function () {
        wx.navigateTo({
            url: './feedback/feedback',
        })
    },
    toAbout: function () {
        wx.navigateTo({
            url: './about/about',
        })
    },
    toFavorite: function () {
        wx.navigateTo({
            url: './favorite/favorite',
        })
    }
})
