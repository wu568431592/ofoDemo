// pages/shuruMain/shuruMain.js
Page({
  data:{
    active:false,
    disabled:false,
    carNubmer:''
  },
  change:function(e){
    if (e.detail.value.length>=4 ){
      this.setData({
        active:true,
        disabled:true,
      })
    }else{
      this.setData({
        active: false,
        disabled:false,
      })
    }
  },
  beginFun:function(){
    if (this.data.disabled == false){
      return
    }
    wx.showToast({
      title: '步行更省钱~~',
      icon:'none'
    })
    this.setData({
      carNubmer: '',
    })
  }
})