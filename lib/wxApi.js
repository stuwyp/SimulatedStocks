/**
* 微信接口Promise化
* @param {Function} fn
*/
const wxPromisify = function (fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
         // 成功
         resolve(res, obj)
      }
      obj.fail = function (res) {
         // 失败
         reject(res)
      }
      fn(obj)
    })
  }
}

const wxLogin = wxPromisify(wx.login)
const wxGetUserInfo = wxPromisify(wx.getUserInfo)
const wxRequest = wxPromisify(wx.request)
const wxShowModal = wxPromisify(wx.showModal)

export { wxPromisify, wxLogin, wxGetUserInfo, wxRequest, wxShowModal }
