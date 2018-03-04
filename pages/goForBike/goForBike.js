// pages/goForBike/goForBike.js
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  saomaFun:function(){
    wx.scanCode({
      onlyFromCamera:true,
      scanType: ['qrCode'],
      success:function(res){
        wx.showToast({
          title: '扫码成功',
        })
      },
      fail:function(){
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        })
      }
    })
  },
  shuruFun:function(){
    wx.navigateTo({
      url: '../shuruMain/shuruMain',
    })
  }
})