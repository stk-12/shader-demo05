import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

import fragmentSource from "./shader/fragmentShader.glsl";
import vertexSource from "./shader/vertexShader.glsl";

let renderer, scene, camera;

const canvas = document.querySelector("#canvas");

//GUI
const gui = new dat.GUI({ width: 250 });

//window size
let size = {
  width: window.innerWidth,
  height: window.innerHeight
};

init();

function init() {
  //renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(size.width, size.height);
  renderer.shadowMap.enable = true;

  //scene
  scene = new THREE.Scene();

  //camera
  camera = new THREE.PerspectiveCamera(45, size.width / size.height, 1, 100);
  camera.position.set(0, 5, 5);
  scene.add(camera);
  // camera.lookAt(new THREE.Vector3(0, 0, 0));

  //controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  //light
  // const light = new THREE.DirectionalLight(0xffffff, 1.5);
  // light.position.set(3, 5, 3);
  // scene.add(light);

  //group
  // const group = new THREE.Group();
  // scene.add(group);

  //Geometry
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  const geometry = new THREE.PlaneGeometry(3, 3, 30, 30);

  //Texture
  // const loader = new THREE.TextureLoader();
  // const texture = loader.load("https://picsum.photos/id/1074/1024/1024");

  //Color
  const colorObject = {
    depthColor: "#6f7376",
    surfaceColor: "#e3e3e3"
  };

  //uniforms
  let uniforms = {
    uTime: {
      value: 0.0
    },
    uWave: {
      value: 0.4
    },
    uWaveSpeed: {
      value: 1.5
    },
    uFrequency: {
      //周波数
      value: new THREE.Vector2(3.0, 2.5)
    },
    uDepthColor: {
      value: new THREE.Color(colorObject.depthColor)
    },
    uSurfaceColor: {
      value: new THREE.Color(colorObject.surfaceColor)
    }
  };

  //Material
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexSource,
    fragmentShader: fragmentSource,
    side: THREE.DoubleSide
  });

  //GUI
  gui.add(material.uniforms.uWave, "value").min(0).max(1).name("wave");
  gui
    .add(material.uniforms.uFrequency.value, "x")
    .min(0)
    .max(5)
    .name("frequencyX");
  gui
    .add(material.uniforms.uFrequency.value, "y")
    .min(0)
    .max(5)
    .name("frequencyY");
  gui.add(material.uniforms.uWaveSpeed, "value").min(0).max(5).name("speed");
  gui.addColor(colorObject, "depthColor").onChange(() => {
    material.uniforms.uDepthColor.value.set(colorObject.depthColor);
  });
  gui.addColor(colorObject, "surfaceColor").onChange(() => {
    material.uniforms.uSurfaceColor.value.set(colorObject.surfaceColor);
  });

  //Mesh
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = radian(-45);
  // mesh.rotation.y = radian(45);
  scene.add(mesh);

  animate();
  function animate() {
    // mesh.rotation.y += 0.005;

    const sec = performance.now() / 1000;
    uniforms.uTime.value = sec;

    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
  }
}

// ラジアンに変換
function radian(val) {
  return (val * Math.PI) / 180;
}
// ランダムな数
// function random(min, max) {
//     return Math.random() * (max - min) + min;
// }

//resize
function onWindowResize() {
  // レンダラーのサイズを修正
  renderer.setSize(window.innerWidth, window.innerHeight);

  // カメラのアスペクト比を修正
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", onWindowResize);
