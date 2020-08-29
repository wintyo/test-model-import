import '../css/base.scss';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const WIDTH = 960;
const HEIGHT = 540;

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);
const elApp = document.getElementById('app');
elApp?.appendChild(renderer.domElement);

// シーンの作成
const scene = new THREE.Scene();

// カメラの作成
const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
camera.position.set(0, 0, 1000);

// メッシュの作成
const box = new THREE.Mesh(
  new THREE.BoxGeometry(500, 500, 500),
  new THREE.MeshStandardMaterial({
    color: 0x0000ff,
  })
);
scene.add(box);

// ライトの設定
const light = new THREE.DirectionalLight(0xffffff);
light.intensity = 2;
light.position.set(1, 1, 1);
scene.add(light);

// コントローラーの設定
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;

function tick() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
