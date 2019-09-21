import {URL} from './config.js'
import {AppID, Secret} from "./secret"
import {wxLogin, wxRequest} from './lib/wxApi'
//app.js
App({
    onLaunch: async function () {
        let openid = wx.getStorageSync('openid') || ''
        if (openid)
            console.log(openid)
        else {
            try {
                let res = await wxLogin()
                let code = res.code; //返回code
                res = await wxRequest({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + AppID + '&secret=' + Secret + '&js_code=' + code + '&grant_type=authorization_code',
                    data: {},
                    header: {'content-type': 'json'}
                })

                console.log(res)
                let openid = res.data.openid //返回openid
                console.log('openid为' + openid);
                wx.setStorageSync('openid', openid)
            }
            catch {

            }
        }
    },
    globalData:
        {
            userInfo: null,
            url: URL
        }
})
