// pages/index/index.js
var longitude ='113.324520';
var latitude = '23.099994';
var app = getApp();
var sysInfo = wx.getSystemInfoSync();
Page({
  data: {
    controls:[
      {
        id: 1,
        iconPath: '../../images/img1_07.png',
        position: {
          left: sysInfo.screenWidth/2-65,
          top: sysInfo.screenHeight-220, 
          width: 130,
          height: 130,
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: '../../images/img1_10.png',
        position: {
          left: 40,
          top: sysInfo.screenHeight - 150,
          width: 50,
          height: 50,
        },
        clickable: true
      },
      {
        id: 3,
        iconPath: '../../images/img1_13.png',
        position: {
          left: sysInfo.screenWidth-80,
          top: sysInfo.screenHeight - 150,
          width: 50,
          height: 50,
        },
        clickable: true
      },
      {
        id: 4,
        iconPath: '../../images/img3.png',
        position: {
          left: sysInfo.screenWidth / 2 -17.5,
          top: sysInfo.screenHeight / 2 -70,
          width: 35,
          height: 40,
        },
        clickable: false
      }
    ],
    userInfo:{},
    hasUserInfo: false,
    markers:[]
  },
  onLoad: function () {
    app.myShowLoading();
    var that = this;
    //获取用户信息；
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      })
    }
    //获取用户位置；
    this.mapCtx = wx.createMapContext('map');
    wx.getLocation({
      type:'gcj02',
      success: function(res) {
        latitude = res.latitude.toFixed(6);
        longitude = res.longitude.toFixed(6);
      },
      fail: function (res) {
        app.myShowModal('获取坐标失败！');
      }
    })
  },
  onReady: function () {
    //页面加载时 跳转到用户当前位置。
    this.mapCtx.moveToLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.hideToast();
  },
  controltap:function(e){
    if(e.controlId == 1){
      wx.navigateTo({
        url: '../goForBike/goForBike',
      })
    }
    if(e.controlId == 2){
      this.mapCtx.moveToLocation();
    }
    if (e.controlId == 3) {
      wx.navigateTo({
        url: '../myCenter/myCenter',
      })
    }
  },
  randomMark:function(){
    var that = this;
    var marks = [];
    for (var i = 0; i < 20; i++) {
      var ob = {};
      ob.id = i;
      var rlongitude = String(longitude).slice(0, -3);
      var rlatitude = String(latitude).slice(0, -3);
      var flag = 1;
      if(Math.random()>0.5){
        flag = 1;
      }else{
        flag =-1;
      }
      rlongitude += flag*((Math.random() * 1000).toFixed(0));
      rlatitude += flag*((Math.random() * 1000).toFixed(0));
      ob.latitude = rlatitude;
      ob.longitude = rlongitude;
      ob.iconPath = '../../images/img2.png';
      ob.width = 30;
      ob.height = 30;
      marks.push(ob);
    }
    //setTimeout(function(){
      that.setData({
        markers: marks,
      })
    //},1000)
    
  },
  regionchange:function(e){
    var that = this;
    if(e.type =='begin'){
      that.setData({
        markers: [],
      });
    }
    if(e.type == 'end'){
      this.mapCtx.getCenterLocation({
        success: function (res) {
          console.log(res)
          latitude = res.latitude.toFixed(6);
          longitude = res.longitude.toFixed(6);
          that.randomMark();
        }
      })
     
    }
    
  }
 
})