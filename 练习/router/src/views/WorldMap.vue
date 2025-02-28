<template>
    <div ref="mapView" class="map-body"></div>
</template>

<script setup lang="ts" name="name">

import { nextTick, ref } from "vue";
import worldJson from '@/common/worldGeo.json'
import * as L from 'leaflet';

const mapView = ref()

// geojson
// https://geojson-maps.kyd.au/
// https://github.com/Surbowl/world-geo-json-zh

// 着重显示的国家
const havySovereignts = ['United States of America', 'Algeria', 'Netherlands', 'Guatemala', 'Canada', 'Mexico', 'Panama', 'The Bahamas', 'France',
    'Grenada', 'China', 'Australia', 'New Zealand', 'Samoa', 'Philippines', 'Malaysia', 'Singapore', 'Indonesia', 'Maldives', 'India', 'Kyrgyzstan', 'Iraq', 'Afghanistan', 'Egypt', 'Uganda', 'Zambia', 'Colombia', 'Brazil', 'Argentina', 'Russia', 'Iceland']
// 页面渲染完成
nextTick(() => {

    let mapOptions: L.MapOptions = {
        // 不显示缩放控件
        zoomControl: false,
        // 不显示版权信息
        attributionControl: false,
        // 缩放倍数
        zoomSnap: 0.2,
        // 不允许拖动
        dragging: false,
        // 不允许双击放大
        doubleClickZoom: false,
        // 不允许滚轮放大
        scrollWheelZoom: false,
        // 不允许键盘操作
        keyboard: false,
    }

    // 设置地图元素，中心点和缩放级别
    const map = L.map(mapView.value, mapOptions).setView([45, 0], 2);

    // 瓦片
    // const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // 	maxZoom: 19,
    // 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map);

    let geoObj = worldJson as GeoJSON.GeoJsonObject
    // geojson图层
    const geoJsonLayer = L.geoJson(geoObj, { style, onEachFeature}).addTo(map);

    // const info = L.control();
    // info.onAdd = function (map: L.Map) {
    //     this._div = L.DomUtil.create('div', 'info');
    //     this.update();
    //     return this._div;
    // };

    // info.update = function (props) {
    //     const contents = props ? `<b>${props.name}</b><br />${props.density} people / mi<sup>2</sup>` : 'Hover over a state';
    //     this._div.innerHTML = `<h4>US Population Density</h4>${contents}`;
    // };

    // info.addTo(map);

    // 鼠标悬停时的高亮事件
    function highlightFeature(e: L.LeafletMouseEvent) {
        // 悬停的图层
        let layer = e.target as L.Path
        // 图层样式
        layer.setStyle({
            fillColor: '#f3f4fe',
            fillOpacity: 0.7
        });
    }

    // 鼠标离开时的重置事件
    function resetHighlight(e: L.LeafletMouseEvent) {
        // 重设图层样式到默认状态
        geoJsonLayer.resetStyle(e.target);
    }

    function clickFeature(e: L.LeafletMouseEvent) {
        let layer = e.target
        let name_zh = layer.feature.properties.name_zh ?? ''
        map.openPopup(name_zh, e.latlng)
    }

    // 每个图层设置
    function onEachFeature(feature: GeoJSON.Feature, layer: L.Layer) {
        layer.on({
            // 高亮
            mouseover: highlightFeature,
            // 重置
            mouseout: resetHighlight,
            // 点击了图层
            click: clickFeature
        })
    }
})

// 填充颜色为黑色的区域
function style(feature: GeoJSON.Feature | undefined) {
    // 国家
    let sovereignt = feature?.properties?.sovereignt as string || ''
    let contained = havySovereignts.includes(sovereignt)
    return {
        // 填充颜色
        fillColor: contained ? '#5c5b61' : '#d4dade',
        // 边框线线宽
        weight: 1.5,
        // 边框透明度
        opacity: 1,
        // 边框颜色
        color: '#c4c4c4',
        // 虚线样式
        // dashArray: '3',
        // 填充透明度
        fillOpacity: 0.7
    };
}

</script>

<style scoped>
.map-body {
    /* cursor: url('/mifeng.png'), auto; */
    width: 100%;
    height: 100%;
    background: #fff;
}
</style>