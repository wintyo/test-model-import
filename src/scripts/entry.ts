import '../css/base.scss';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';

// models
import modelStar from '~models/star.glb';

// constants
const WIDTH = 960;
const HEIGHT = 540;

// ヘルパーの用意
const axesHelper = new THREE.AxesHelper(10);
const gridHelper = new THREE.GridHelper(10, 5);

// dat.guiの設定
const GUI_PARAMS = {
  isGuide: false,
};
const gui = new dat.GUI();
gui.add(GUI_PARAMS, 'isGuide').onChange((value) => {
  if (value) {
    scene.add(axesHelper);
    scene.add(gridHelper);
  } else {
    scene.remove(axesHelper);
    scene.remove(gridHelper);
  }
});

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
camera.position.set(0, 0, 5);

// ライトの設定
const light = new THREE.DirectionalLight(0xffffff);
light.intensity = 3;
light.position.set(0.5, 0, 1);
scene.add(light);
const light2 = new THREE.DirectionalLight(0xffffff);
light2.intensity = 3;
light2.position.set(0.5, 0, -1);
scene.add(light2);

// コントローラーの設定
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;

// モデルの読み込み
const loader = new GLTFLoader();
loader.load(
  modelStar,
  (gltf) => {
    gltf.scene.rotateX(Math.PI / 2);
    gltf.scene.rotateY(Math.PI);

    // マテリアルの設定
    // gltf.scene.traverse((obj) => {
    //   console.log(obj);
    //   // @ts-ignore
    //   if (obj.isMesh) {
    //     // @ts-ignore
    //     obj.material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    //   }
    // });
    scene.add(gltf.scene);
  },
  (xhrEvent) => {
    console.log(xhrEvent);
  },
  (error) => {
    console.error(error);
  }
);

// ループ処理
function tick() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
