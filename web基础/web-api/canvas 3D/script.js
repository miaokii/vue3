// import * as THREE from 'three';

// 创建新场景
let sence = new THREE.Scene();
// 创建摄影机
// 观察区域，镜头大小，角度表示
// 屏幕宽高比
// 近裁地面
// 远裁地面
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// z
camera.position.z = 5;

// 渲染器
let renderer = new THREE.WebGLRenderer();
// 渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight);
// 添加到主窗口
document.body.appendChild(renderer.domElement);

// 魔方材质
let cube;
// 加载纹理
let loader = new THREE.TextureLoader();

// 加载纹理
loader.load('metal003.png', function(texture) {
    // 
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    /// 每个面渲染2*2的图片
    texture.repeat.set(2, 2);

    // 几何形状
    let geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    // 材质
    let material = new THREE.MeshLambertMaterial({
        map: texture,
        shading: THREE.FlatShading
    });
    cube = new THREE.Mesh(geometry, material);
    // 添加到场景中
    sence.add(cube);

    draw();
});

// 柔光
let light = new THREE.AmbientLight('rgb(255,255,255)');
sence.add(light);

// 硬光，聚光灯
let spotLight = new THREE.SpotLight('rgb(255,255,255)');
spotLight.position.set(100, 1000, 1000);
spotLight.castShadow = true;
sence.add(spotLight);

function draw() {
    // 每一帧绕x转动
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // 渲染场景
    renderer.render(sence, camera);

    requestAnimationFrame(draw);
}