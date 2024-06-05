// pages/myPackages/myPackage.js

Component({
  /**
   * Component initial data
   */
  data: {
    // checkbox list 
    checkboxSelected:[],
    checkboxShow: false,
    emptyShow: false,
    
    // Carrier picker
    carrierText: '请选择快递公司',
    carrierValue: [],
    carrierTitle: '',
    carriers: [
      { label: 'EMS', value: 'EMS' },
      { label: 'FedEx', value: 'FedEx' },
      { label: 'UPS', value: 'UPS' },
      { label: 'DHL', value: 'DHL' },
      { label: '百事汇通', value: '百事汇通' },
      { label: '京东商城', value: '京东商城' },
      { label: '快捷快递', value: '快捷快递' },
      { label: '顺丰快递', value: '顺丰快递' },
      { label: '申通E物流', value: '申通E物流' },
      { label: '圆通快递', value: '圆通快递' },
      { label: '天天快递', value: '天天快递' },
      { label: '国通快递', value: '国通快递' },
      { label: '一店通', value: '一店通' },
      { label: '急宅送', value: '急宅送' },
      { label: '全峰速运', value: '全峰速运' },
      { label: '中国邮政', value: '中国邮政' },
    ],
    carrier_selected: false,
  },

  /**
   * Component methods
   */
  methods: {
    onLoad: function(){
      wx.request({
        url: 'https://bxf56wjctg.execute-api.us-west-2.amazonaws.com/default/sea_express_my_package',
        method: 'GET',
        success: (response) => {
          const fetchData = response.data.data;
          const packageList = fetchData.map(item => {
            return {label: item.tracking_number, value: item.tracking_number, content: item.status};
          })
          this.setData({
            packageList: packageList
          })
          if (packageList.length === 0) {
            this.setData({
              emptyShow: true
            })
          }
        }
      });  
    },

    onCheckboxChange: function(e) {
      this.setData({ 
        checkboxSelected: e.detail.value
      });
    },

    navigateCustomForm: function(){
      wx.switchTab({
        url: '/pages/customForms/customForm',
      })
    },

    optionChange: function(e) {
      this.setData({
        checkboxShow: e.detail.value
      })
    },

    // Carrier picker
    onPickerChange(e) {
      this.setData({
        carrierVisible: false,
        carrierValue: e.detail.value,
        carrierText: e.detail.label,
        carrier_selected: true
      });
    },
    
    onPickerCancel() {
      this.setData({
        carrierVisible: false,
      });
    },
    onPicker() {
      this.setData({ carrierVisible: true, carrierTitle: '选择快递公司' });
    },
  }
})