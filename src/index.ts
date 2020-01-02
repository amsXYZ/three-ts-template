import anime from "animejs";
import {
  IcosahedronBufferGeometry,
  Mesh,
  MeshMatcapMaterial,
  PerspectiveCamera,
  Scene,
  Texture,
  TextureLoader,
  WebGLRenderer
} from "three";
// tslint:disable-next-line
const Stats = require("stats.js");

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;

const stats = new Stats();
canvas.parentElement.appendChild(stats.dom);

const scene = new Scene();
const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const geometry = new IcosahedronBufferGeometry();
const material = new MeshMatcapMaterial({
  matcap: Texture.DEFAULT_IMAGE
});
const mesh = new Mesh(geometry, material);
scene.add(mesh);

const textureLoader = new TextureLoader().load(
  "./resources/matcap.jpg",
  (texture: Texture) => {
    material.matcap = texture;
    material.needsUpdate = true;
  }
);

const animation = anime({
  targets: mesh.rotation,
  x: 2 * Math.PI,
  z: 2 * Math.PI,
  duration: 3000,
  easing: "easeOutBounce",
  loop: true,
  autoplay: true,
  complete: () => {
    mesh.rotation.set(0, 0, 0);
  }
});

window.addEventListener("resize", (event: UIEvent) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);
});

function render() {
  renderer.clearColor();
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  render();
  stats.end();
}
animate();
