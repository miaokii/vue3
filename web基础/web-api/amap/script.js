import AMaploader from '@amap/amap-jsapi-loader';

var map;
AMaploader.load({
    'key': 'bfeb1e1064e552aa71ac6ee9d0cb170e',
    'version': '2.0',
    'plugins': [],
}).then((AMap) => {
    map = new AMap.Map('container', {
        center: [104.066301, 30.572961],
        zoom: 14
    });
}).catch(e => {
    console.log(e);
})

var trafficLayer = new AMap.TileLayer.Traffic({
    zIndex: 10
})

map.add(trafficLayer);