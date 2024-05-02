// pages/logins/login.js
Page({
  data: {
    phoneNumber: '', 
    password: '' 
  },

  bindPhoneNumberInput: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    });
  },

  bindPasswordInput: function(e) {
    this.setData({
      password: e.detail.value
    });
  },

  login: function() {
    const app = getApp();
    app.onLogin(this.data.phoneNumber, this.data.password);
  }
});