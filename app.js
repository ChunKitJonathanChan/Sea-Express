// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  onLogin: function(phoneNumber, password) {
    wx.login({
      success: res => {

        console.log("code: ", res.code);

        if (res.code) {
          wx.request({
            url: 'https://vmgzuhs2ta.execute-api.us-west-2.amazonaws.com/default/sea_express_login',
            method: 'POST',
            data: {
              code: res.code,
              phoneNumber: phoneNumber,
              password: password
            },
            success: (response) => {
              const { token } = response.data;
              this.globalData.token = token;
            },
            fail: (error) => {
              console.error('Login failed:', error);
            }
          });
        } else {
          console.error('No code received.');
        }
      },
      fail: error => {
        console.error('wx.login failed', error);
      }
    });
  },

  globalData: {
    token: null,
    userInfo: null
  }
})
