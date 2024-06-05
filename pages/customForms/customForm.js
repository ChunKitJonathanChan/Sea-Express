// pages/customForms/customForm.js

const {showToast} = require('../../miniprogram_npm/tdesign-miniprogram/toast/index');

const areaList = {
  provinces: {
    440000: '广东省',
  },
  cities: {
    440100: '广州市',
    440200: '韶关市',
    440300: '深圳市',
    440400: '珠海市',
    440500: '汕头市',
    440600: '佛山市',
  },
  counties: {
    440103: '荔湾区',
    440104: '越秀区',
    440105: '海珠区',
    440106: '天河区',
    440111: '白云区',
    440112: '黄埔区',
    440113: '番禺区',
    440114: '花都区',
    440115: '南沙区',
    440117: '从化区',
    440118: '增城区',
    440203: '武江区',
    440204: '浈江区',
    440205: '曲江区',
    440222: '始兴县',
    440224: '仁化县',
    440229: '翁源县',
    440232: '乳源瑶族自治县',
    440233: '新丰县',
    440281: '乐昌市',
    440282: '南雄市',
    440303: '罗湖区',
    440304: '福田区',
    440305: '南山区',
    440306: '宝安区',
    440307: '龙岗区',
    440308: '盐田区',
    440309: '龙华区',
    440310: '坪山区',
    440311: '光明区',
    440402: '香洲区',
    440403: '斗门区',
    440404: '金湾区',
    440507: '龙湖区',
    440511: '金平区',
    440512: '濠江区',
    440513: '潮阳区',
    440514: '潮南区',
    440515: '澄海区',
    440523: '南澳县',
    440604: '禅城区',
    440605: '南海区',
    440606: '顺德区',
    440607: '三水区',
    440608: '高明区',
  },
};

function locationMapping(areaList) {
  const provinces = Object.keys(areaList.provinces).map(provinceKey => {
    const cities = Object.keys(areaList.cities).filter(cityKey => cityKey.startsWith(provinceKey.slice(0, 2))).map(cityKey => {
      const counties = Object.keys(areaList.counties).filter(countyKey => countyKey.startsWith(cityKey.slice(0, 4))).map(countyKey => ({
        value: countyKey,
        label: areaList.counties[countyKey],
      }));
      return {
        value: cityKey,
        label: areaList.cities[cityKey],
        children: counties,
      };
    });
    return {
      value: provinceKey,
      label: areaList.provinces[provinceKey],
      children: cities,
    };
  });
  return provinces;
}

const locationOptions = locationMapping(areaList);

Component({
  data: {
    // Warehouse
    options: locationOptions,
    note: '请选择地址',
    visible: false,
    subTitles: ['请选择省份', '请选择城市', '请选择区/县'],
    warehouse_province: '',
    warehouse_city: '',
    warehouse_district: '',
    warehouse_selected: false,

    // Carrier
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

    // Tracking number
    tracking_filled: false,
    tracking_number_tips: '',

    // item list
    items: [{name: '', quantity: '', price: ''}],

    // item list - remove-button
    remove_button_visible: false,

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
    onTrackingInput(e) {
      if (e.detail.value !== "") {
        this.setData({
          tracking_number_tips: '',
          tracking_filled: true
        })
      } else {
        this.setData({
          tracking_filled: false
        })
      }
    },

    // item list
    onItemNameInput(e) {
      const index = e.currentTarget.dataset.index; 
      const value = e.detail.value; 
      this.setData({
        [`items[${index}].name`]: value
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
        [`items[${index}].price`]: value,
      });
    },

    addItemRow() {
      const newItem = { name: '', quantity: '', price: '' }; 
      this.setData({
        items: this.data.items.concat(newItem),
        remove_button_visible: true
      });
    },

    removeItemRow(e) {
      const index = e.currentTarget.dataset.index
      const updatedItems = this.data.items.toSpliced(index, 1); 
      this.setData({
        items: updatedItems,
      });
    },

    // handle form submittion
    submitForm(e){
      const formData = e.detail.value
      formData.warehouse_province = this.data.warehouse_province
      formData.warehouse_city = this.data.warehouse_city
      formData.warehouse_district = this.data.warehouse_district
      formData.carrier = this.data.carrierValue[0] !== undefined? this.data.carrierValue[0]: ""
      formData.items = this.data.items
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
        if (!this.data.tracking_filled) {
          this.setData({
            tracking_number_tips: '错误: 必须填写快递单号'
          })
        }
      }
    }
  },
});
