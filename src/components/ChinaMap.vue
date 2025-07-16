<template>
  <div ref="ChinaMap"></div>
</template>
  
  <script>
import echarts from 'echarts';
import { getGeoJson, getMapChartData } from '../views/knowledge/insuranceProducts/untils/index';
import { getData, my_url, crm_url } from "../static/js/ajax.js";

export default {
  name: 'ChinaMap',
  data() {
    return {
      geoJson: {},
      parentInfo: [
        {
          cityName: '全国',
          code: 100000
        }
      ],
      adcode: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getMapJson();
    });
  },
  methods: {
    //获取geoJson 地图   已封装好直接传citycode就行
    getMapJson() {
      getGeoJson(this.parentInfo[this.parentInfo.length - 1].code).then(data => {
        this.geoJson = data;
        this.getMapData();
      });
    },
    //获取地图数据   模拟数据   数据格式：[{name:'武汉市',value:96},{name:'长沙市',value:75}]
    // 必须要写成这种,而且name名字要和地图的geoJson名字一样，不然渲染不出来
    getMapData() {
      getMapChartData(this.parentInfo[this.parentInfo.length - 1].code).then(res => {

        const data = res.data;
        this.initEchart(data);
      });
    },
    initEchart(data) {

      var that = this
      this.myChart = echarts.init(this.$refs.ChinaMap);
      //设置为 china 则显示南海诸岛 ，不需要可以去掉
      echarts.registerMap(this.parentInfo.length === 1 ? 'china' : 'map', this.geoJson); //注册

      const mapData = data.sort((a, b) => {
        return b.value - a.value;
      });
      let max = mapData[0].value;
      let min = mapData[mapData.length - 1].value;
      if (mapData.length === 1) {
        min = 0;
      }


      this.myChart.setOption(
        {
          // 鼠标放上去的弹窗
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              // 这里可以根据你的 mapData 结构自定义内容
              // 例如显示省份名和对应的数值
              return ` ${params.name} `;
              // return `${params.name}  <br/>可投理财产品： <p class='chanpin'>   ${params.data.value}   </p>`;
            }
          },
          visualMap: {
            min: min,
            max: max,
            left: '3%',
            bottom: '2%',
            calculable: true,
            inRange: {
              color: [
                '#FF0000', '#FF1900', '#FF3200', '#FF4B00', '#FF6400', '#FF7D00', '#FF9600', '#FFAF00',
                '#FFC800', '#FFE100', '#FFF900', '#F9FF00', '#E0FF00', '#C7FF00', '#AEFF00', '#95FF00',
                '#7CFF00', '#63FF00', '#4AFF00', '#31FF00', '#18FF00', '#00FF0E', '#00FF27', '#00FF40',
                '#00FF59', '#00FF72', '#00FF8B', '#00FFA4', '#00FFBD', '#00FFD6', '#00FFEF', '#00FFFF'
              ]
            },
            textStyle: {
              color: '#24CFF4'
            }
          },
          series: [
            {
              name: '可投保险产品',
              type: 'map',
              map: this.parentInfo.length === 1 ? 'china' : 'map',
              roam: true, //是否可缩放
              zoom: 1.22, //缩放比例
              // left: '',
              // top: '15%', //可移动地图的位置
              data: mapData,
              label: {
                normal: {
                  show: true,
                  color: 'rgb(249, 249, 249)', //省份标签字体颜色
                  // color: red, //省份标签字体颜色
                  fontWeight: 'bold',// 字体加粗
                  formatter: p => {
                    switch (p.name) {
                      case '内蒙古自治区':
                        p.name = '内蒙古';
                        break;
                      case '西藏自治区':
                        p.name = '西藏';
                        break;
                      case '新疆维吾尔自治区':
                        p.name = '新疆';
                        break;
                      case '宁夏回族自治区':
                        p.name = '宁夏';
                        break;
                      case '广西壮族自治区':
                        p.name = '广西';
                        break;
                      case '香港特别行政区':
                        p.name = '香港';
                        break;
                      case '澳门特别行政区':
                        p.name = '澳门';
                        break;
                      default:
                        break;
                    }
                    return p.name;
                  }
                },
                emphasis: {
                  show: true,
                  color: '#f75a00'
                }
              },
              itemStyle: {
                normal: {
                  // areaColor: 'Purple',//紫色
                  // areaColor: '#24CFF4',//浅蓝色
                  borderColor: '#53D9FF',
                  borderWidth: 1.3,
                  shadowBlur: 15,
                  shadowColor: 'rgb(58,115,192)',
                  shadowOffsetX: 7,
                  shadowOffsetY: 6
                },
                emphasis: {
                  areaColor: '#8dd7fc',
                  borderWidth: 1.6,
                  shadowBlur: 25
                }
              }
            }
          ]
        },
        true
      );




      this.myChart.getZr().off('click');
      this.myChart.getZr().on('click', params => {
        if (params.target) {
          //  点的是地图
          const index = params.target.dataIndex;
       
          if (index && data[index]) {
            // 如果是香港 澳门 台湾  禁止展示产品
            if (data[index].adcode == "810000" || data[index].adcode == "710000" || data[index].adcode == "820000") {
              var mapDataList = {
                name: data[index].name,
                productList: []
              }
              that.$emit("productList", mapDataList)
              return
            }
            // 大连  宁波  厦门  青岛   深圳
            var cityList = [210200, 330200, 350200, 370200, 440300]

            var params = {
              risktype: "05",
              title: '',
              pageNumber: 1,
              pageSize: 100,
              salesArea: '',
            }

            if (data[index].level == "province") {
              that.adcode = data[index].adcode
              params.salesArea = data[index].adcode
            } else if (data[index].level == "city" && cityList.includes(data[index].adcode)) {
              params.salesArea = data[index].adcode
            } else {
              params.salesArea = that.adcode
            }
      
            getData("get", my_url + "/crm/risk/getRiskList.do", (res) => {
              if (res.total > 0) {
                var mapData = {
                  name: data[index].name,
                  productList: res.rows
                }
                that.$emit("productList", mapData)
              }
            }, params)



            //如果当前是最后一级了，就直接return
            if (this.parentInfo[this.parentInfo.length - 1].code == data[index].adcode) {
              return;
            }
            //根据这个level判断是否下钻到县
            if (data[index].level == 'city') {
              return
            }
            this.parentInfo.push({
              cityName: data[index].name,
              code: data[index].adcode
            });
            this.getMapJson();
            this.$notify({
              title: '提示',
              message: '点击地图空白处即可返回上一级',
              type: 'success',
              duration: 4000
            });




          }
        } else {
          //点的空白部分
          if (this.parentInfo.length === 1) {
            return;
          }
          this.parentInfo.pop();
          this.getMapJson();
        }
      });
    }
  }
};
  </script>
  
  
  <style>
.chanpin {
  width: 150px;

  border: 1px solid #ccc;
  word-wrap: break-word; /* 长单词换行 */
  word-break: break-word; /* 兼容 */
  white-space: normal; /* 正常换行 */
}
</style>
  