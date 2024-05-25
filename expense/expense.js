// expense.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
    {"method":"DHL","day":"3-15个工作日","fprice":"60.00","aprice":"60.00","weightlimit":"30"}
    ],
    region: ['--请', '选', '择--']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
   bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit:function(e){
    var info={}
    info.destination=e.detail.value.destination;
    info.weight=e.detail.value.weight;
    // 处理
    console.log(info)
    this.setData({

    })
  }
})