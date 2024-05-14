const util = require('util.js');

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
      var url = e.currentTarget.dataset.jump;
      if (url == 'packagePredictTrans' || url == 'index' || url == 'member'){
            wx.switchTab({
              url: '../' + url + "/" + url,
            })
      }
      else{
        wx.navigateTo({
          url: '../' + url + "/" + url,
          complete: function () {
            console.log('success')
          }
        })
      }
    }
  }
})