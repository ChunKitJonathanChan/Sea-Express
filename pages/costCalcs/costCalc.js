// pages/costCalcs/costCalc.js

const areaList = {
  provinces: {
    110000: '北京市',
    440000: '广东省',
  },
  cities: {
    110100: '北京市',
    440100: '广州市',
    440200: '韶关市',
    440300: '深圳市',
    440400: '珠海市',
    440500: '汕头市',
    440600: '佛山市',
  },
  counties: {
    110101: '东城区',
    110102: '西城区',
    110105: '朝阳区',
    110106: '丰台区',
    110107: '石景山区',
    110108: '海淀区',
    110109: '门头沟区',
    110111: '房山区',
    110112: '通州区',
    110113: '顺义区',
    110114: '昌平区',
    110115: '大兴区',
    110116: '怀柔区',
    110117: '平谷区',
    110118: '密云区',
    110119: '延庆区',
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
   /**
   * Component initial data
   */
  data: {
    // Destination
    options: locationOptions,
    note: '请选择地址',
    visible: false,
    subTitles: ['请选择省份', '请选择城市', '请选择区/县'],
    province: '',
    city: '',
    district: '',
    selected: false,

    // Shipping method
    pickerText: '请选择运输方式',
    pickerValue: [],
    pickerTitle: '',
    methods: [
      { label: 'DHL纯普货', value: 'DHL纯普货' },
      { label: 'DHL普货', value: 'DHL普货' },
      { label: '海运', value: '海运' },
    ],
    picker_selected: false,

    calculationShow: false,

    // weight input
    weight_value: 0,

    // calculation
    ground_result: 0,
    express_result: 0,
    sea_result: 0,
    ground_expected_day: '3',
    express_expected_day: '3-5',
    sea_expected_day: '30',
    ground_price_kg: 60,
    express_price_kg: 70,
    sea_price_kg: 16.5
  },


  /**
   * Component methods
   */
  methods: {
    // Destination
    showCascader() {
      this.setData({ visible: true });
    },
    
    onChange(e) {
      const { selectedOptions } = e.detail;
      
      this.setData({
        note: selectedOptions.map((item) => item.label).join('/'),
        province : selectedOptions[0].value,
        city : selectedOptions[1].value,
        district : selectedOptions[2].value,
        selected: true
      }); 
    },

    // Shipping method
    onPickerChange(e) {
      this.setData({
        pickerVisible: false,
        pickerValue: e.detail.value,
        pickerText: e.detail.label,
        picker_selected: true
      });
    },

    onPickerCancel() {
      this.setData({
        pickerVisible: false,
      });
    },
    onPicker() {
      this.setData({ pickerVisible: true, pickerTitle: '选择运输方式' });
    },

    onInput(e){
      this.setData({
        weight_value: e.detail.value
      })
    },

    // calculation
    calculateExpense() {
      const ground_expense = this.data.ground_price_kg* this.data.weight_value;
      const express_expense = this.data.express_price_kg * this.data.weight_value;
      const sea_expense = this.data.sea_price_kg * this.data.weight_value;

      this.setData({
        calculationShow: true,
        ground_result: ground_expense,
        express_result: express_expense,
        sea_result: sea_expense
      })
    },
  }
})