// custom-tab-bar/index.js
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3d44ff",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/tabbar_home.png",
      selectedIconPath: "/images/tabbar_home_HL.png",
      text: "home"
    }, {
      pagePath: "/pages/logins/login",
      iconPath: "/images/tabbar_login.png",
      selectedIconPath: "/images/tabbar_login_HL.png",
      text: "login"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})