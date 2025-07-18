// utils/wechat.js
import wx from 'weixin-js-sdk'

export const initWechat = () => {
  // 企业微信SDK初始化
  wx.agentConfig({
    beta: true,
    debug: false,
    appId: 'your_corp_id',
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: ['selectEnterpriseContact', 'openEnterpriseChat'],
    success: function(res) {
      console.log('企业微信初始化成功')
    },
    fail: function(res) {
      console.log('企业微信初始化失败')
    }
  })
}

// 选择企业联系人
export const selectContact = () => {
  return new Promise((resolve, reject) => {
    wx.selectEnterpriseContact({
      fromDepartmentId: -1,
      mode: 'single',
      type: ['user'],
      success: function(res) {
        resolve(res)
      },
      fail: function(res) {
        reject(res)
      }
    })
  })
}

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      success: (res) => {
        // 使用 res 参数
        resolve(res)
      },
      fail: (err) => {
        // 使用 err 参数
        reject(err)
      }
    })
  })
}