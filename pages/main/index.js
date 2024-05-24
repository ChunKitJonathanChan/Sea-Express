const swiperList = [
  "/images/index/logo.png",
  "/images/index/logo.png"
];

Component({
  data: {
    // swiper
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    swiperList
  },
  methods: {
    hubing:function(e){
      var height = util.ImageUtil(e);
      this.setData({
        height:height.height,
        swiperHeight: height.swiperHeight
      })
    },

    jump: function (e) {
      const navigateTo = e.currentTarget.dataset.jump;
      if (navigateTo == 'packagePredictTrans'){
        wx.switchTab({
          url: '/pages/logins/login',
        })
      }
      else if (navigateTo == 'arrivedPackageTrans'){
        wx.switchTab({
          url: '/pages/logins/login',
        })
      }
      else if (navigateTo == 'volumeStart'){
        wx.switchTab({
          url: '/pages/logins/login',
        })
      }
      else if (navigateTo == 'mywaybillTrans'){
        wx.switchTab({
          url: '/pages/logins/login',
        })
      }
    }
  }
})