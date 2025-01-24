import { showNotify } from "vant";

export default () => {
  const getLocal = () => {
    return new Promise((resolve, reject) => {
      window.AMap.plugin("AMap.Geolocation", function () {
        const geolocation = new window.AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 2000,
          noIpLocate: 0,
          noGeoLocation: 0,
          GeoLocationFirst: true,
          extensions: "all",
        });
        geolocation.getCurrentPosition(function (status: any, result: any) {
          if (status == "complete") {
            onComplete(result);
          } else {
            onError(result);
          }
        });

        function onComplete(data: any) {
          const { lat, lng } = data.position;
          const lnglats = new window.AMap.LngLat(lng, lat);
          window.AMap.plugin("AMap.Geocoder", function () {
            const geocoder = new window.AMap.Geocoder({
              city: "全国", // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            });
            geocoder.getAddress(lnglats, function (status: any, result: any) {
              console.log(status, result, data.position.pos);
              if (status === "complete" && result.info === "OK") {
                resolve(result);
                // result为对应的地理位置详细信息
              }
            });
          });
        }
        function onError(data: any) {
          reject(data);
          // 定位出错
        }
      });
    });
  };
  return { getLocal };
};
