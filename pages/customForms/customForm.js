// pages/customForms/customForm.js

const location_data = {
  areaList: [
    {
      label: '广东省',
      value: '110000',
      children: [
        {
          value: '110100',
          label: '广州市',
          children: [
            { value: '110101', label: '越秀区' },
            { value: '110102', label: '荔湾区' },
            { value: '110103', label: '海珠区' },
            { value: '110104', label: '天河区' },
            { value: '110105', label: '白云区' },
            { value: '110106', label: '黄埔区' },
            { value: '110107', label: '番禺区' },
            { value: '110108', label: '花都区' },
            { value: '110109', label: '南沙区' },
            { value: '110110', label: '增城区' },
            { value: '110111', label: '从化区' },
          ],
        },
      ],
    },
  ]
};

Component({
  data: {
    options: location_data.areaList,
    note: '请选择地址',
    visible: false,
    subTitles: ['请选择省份', '请选择城市', '请选择区/县'],
    
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

    // item list
    items: [{itemName: '', quantity: '', price: ''}],

    // additional note
    text_area_autosize: {
      maxHeight: 120,
      minHeight: 20,
    },
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
      }); 
    },

    // Carrier 
    onColumnChange(e) {
      console.log('picker pick:', e);
    },

    onPickerChange(e) {
      const { key } = e.currentTarget.dataset;
      const { value } = e.detail;

      console.log('picker change:', e.detail);
      this.setData({
        [`${key}Visible`]: false,
        [`${key}Value`]: value,
        [`${key}Text`]: value.join(' '),
      });
    },

    onPickerCancel(e) {
      const { key } = e.currentTarget.dataset;
      this.setData({
        [`${key}Visible`]: false,
      });
    },
    onPicker() {
      this.setData({ carrierVisible: true, carrierTitle: '选择快递公司' });
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
  },
});
