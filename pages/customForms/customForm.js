// pages/customForms/customForm.js

const {showToast} = require('../../miniprogram_npm/tdesign-miniprogram/toast/index');

const location_data = {
  areaList: [
    {
      label: '广东省',
      value: '广东省',
      children: [
        {
          value: '广州市',
          label: '广州市',
          children: [
            { value: '越秀区', label: '越秀区' },
            { value: '荔湾区', label: '荔湾区' },
            { value: '海珠区', label: '海珠区' },
            { value: '天河区', label: '天河区' },
            { value: '白云区', label: '白云区' },
            { value: '黄埔区', label: '黄埔区' },
            { value: '番禺区', label: '番禺区' },
            { value: '花都区', label: '花都区' },
            { value: '南沙区', label: '南沙区' },
            { value: '增城区', label: '增城区' },
            { value: '从化区', label: '从化区' },
          ],
        },
      ],
    },
  ]
};

Component({
  data: {
    // Warehouse
    options: location_data.areaList,
    note: '请选择地址',
    visible: false,
    subTitles: ['请选择省份', '请选择城市', '请选择区/县'],
    warehouse_province: '',
    warehouse_city: '',
    warehouse_district: '',
    warehouse_selected: false,

    // Carrier
    carrierText: '请选择快递公司',
    carrierValue: '',
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

    // Tracking number
    tracking_filled: false,

    // item list
    items: [{itemName: '', quantity: '', price: ''}],

    // additional note
    text_area_autosize: {
      maxHeight: 120,
      minHeight: 20,
    },

    // Toast
    requestStatus: ''
  },
  methods: {
    // Warehose address
    showCascader() {
      this.setData({ visible: true });
    },
    onChange(e) {
      const { selectedOptions } = e.detail;
      
      this.setData({
        note: selectedOptions.map((item) => item.label).join('/'),
        warehouse_province : selectedOptions[0].value,
        warehouse_city : selectedOptions[1].value,
        warehouse_district : selectedOptions[2].value,
        warehouse_selected: true
      }); 
    },

    // Carrier 
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

    // Tracking number
    onInput(e) {
      if (e.detail.value !== "") {
        this.setData({
          tracking_filled: true
        })
      }
    },

    // item list
    onItemNameInput(e) {
      const index = e.currentTarget.dataset.index; 
      const value = e.detail.value; 
      this.setData({
        [`items[${index}].itemName`]: value
      });
    },

    onQuantityInput(e) {
      const index = e.currentTarget.dataset.index; 
      const value = e.detail.value; 
      this.setData({
        [`items[${index}].quantity`]: value
      });
    },

    onPriceInput(e) {
      const index = e.currentTarget.dataset.index;
      const value = e.detail.value; 
      this.setData({
        [`items[${index}].price`]: value
      });
    },

    addItemRow() {
      const newItem = { itemName: '', quantity: '', price: '' }; 
      this.setData({
        items: this.data.items.concat(newItem)
      });
    },

    // handle form submittion
    submitForm(e){
      const formData = e.detail.value
      formData.warehouse_province = this.data.warehouse_province
      formData.warehouse_city = this.data.warehouse_city
      formData.warehouse_district = this.data.warehouse_district
      formData.carrier = this.data.carrierValue[0] !== undefined? this.data.carrierValue[0]: ""
      console.log(formData)

      if (this.data.warehouse_selected && this.data.carrier_selected && this.data.tracking_filled) {
        wx.request({
          url: 'https://bxf56wjctg.execute-api.us-west-2.amazonaws.com/default/sea_express_store_custom_form',
          method: 'POST',
          header: {
            'content-type': 'application/json' 
          },
          data: {
            formData
          },
          success: (response) => {
            console.log(response.data);
            if (response.data.message === 'Data added to database') {
              this.setData({
                requestStatus: 'success'
              })

              showToast({
                context: this,
                selector: '#t-toast',
                message: '成功提交',
                theme: 'success',
                direction: 'column',    
                duration: 2000        
              });  
            }
            else {
              this.setData({
                requestStatus: 'error'
              })

              showToast({
                context: this,
                selector: '#t-toast',
                message: '已存在相关预报记录',
                theme: 'error',
                direction: 'column',    
                duration: 2300        
              });  
            }
          }
        });  
      } 
      else {
        // under construction
      }
    }
  },
});
