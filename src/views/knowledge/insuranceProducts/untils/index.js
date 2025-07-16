// import remoteLoad from './remoteLoad';
const { AMapCDN, AMapUiCDN } = require('@/plugins/cdn');

/**
 * 用于将地址后面的参数转换成对象返回
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  );
}

/**
 * 函数防抖
 * @param {Function} func
 * @param {number} delay
 * @param {boolean} immediate
 * @return {*}
 */

export function debounce(func, delay, immediate = false) {
  let timer,
    context = this;
  return (...args) => {
    if (immediate) {
      func.apply(context, args);
      immediate = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/**
 * 获取geoJson数据  通过高德获取    递归获取区县geoJson
 * @param  {string} adcode  行政区code
 * @param  {string} childAdcode 区县级行政区code
 * @return {Array}
 */
export function getGeoJson(adcode, childAdcode = '') {
  return new Promise((resolve, reject) => {
    if (window.AMap && window.AMapUI) {
      insideFun(adcode, childAdcode);
    } else {
      remoteLoad(AMapCDN).then(() => {
        if (window.AMap) {
          remoteLoad(AMapUiCDN).then(() => {
            if (window.AMapUI) {
              insideFun(adcode, childAdcode);
            } else {
              console.error('AMapUI获取失败');
            }
          });
        } else {
          console.error('AMap获取失败');
        }
      });
    }
    function insideFun(adcode, childAdcode) {
      // eslint-disable-next-line
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        var districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          let Json = areaNode.getSubFeatures();
          if (Json.length === 0) {
            let parent = areaNode._data.geoData.parent.properties.acroutes;
            insideFun(parent[parent.length - 1], adcode);
            return;
          }

          if (childAdcode) {
            Json = Json.filter(item => {
              return item.properties.adcode == childAdcode;
            });
          }
          let mapJson = {
            features: Json
          };
          resolve(mapJson);
        });
      });
    }
  });
}

/**
 * 转换JSON  导出
 * @param  {Array}
 * @return {Array}
 */

export function formatJson(arr, filterVal) {
  return arr.map(v => filterVal.map(j => v[j].toString()));
}






//获取地图数据
export function getMapChartData(adcode) {
  return new Promise((resolve, reject) => {
    getGeoJson(adcode)
      .then((res) => {
        const data = res.features;
        const mapData = data.map((item) => {
          return {
            name: item.properties.name,
            // value: "中国人保大护甲6号意外险（旗舰版）,太平洋小蜜蜂5号综合意外险 ,中国人保大护甲6号意外险（旗舰版）,太平洋小蜜蜂5号综合意外险",
            // value: parseFloat((Math.random() * 3000).toFixed(2)),
            value: Math.floor(Math.random() * 256),
            adcode: item.properties.adcode,
            level: item.properties.level,
          };
        });
        resolve({
          code: 200,
          data: mapData,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}



function remoteLoad(url) {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(url);
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = url;
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      script.onload = function() {
        setTimeout(() => {
          this.onerror = this.onload = null;
          resolve();
        }, 500);
      };
      script.onerror = function() {
        this.onerror = this.onload = null;
        reject('加载失败 ' + url);
      };
    } else {
      setTimeout(() => {
        resolve();
      }, 500);
    }
  });
}
