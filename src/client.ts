import * as B from 'babylonjs'
import * as Materials from 'babylonjs-materials'
import { Texture } from 'babylonjs';

var canvas = document.createElement("canvas")
document.body.appendChild(canvas)

var engine = new B.Engine(canvas, true)

var scene = new B.Scene(engine);
scene.gravity = new B.Vector3(0, -9.81, 0);

var camera = new B.UniversalCamera("UniversalCamera", new B.Vector3(0, 2, -5), scene)
camera.setTarget(new B.Vector3(0, 2, 5));
camera.attachControl(canvas, true);
camera.ellipsoid = new B.Vector3(1, 2, 1)
camera.applyGravity = true

// WASD
camera.keysUp.push(87)
camera.keysDown.push(83)
camera.keysLeft.push(65)
camera.keysRight.push(68)
camera.maxZ = 2000

var light1 = new B.HemisphericLight("light1", new B.Vector3(1, 1, 0), scene);
var light2 = new B.PointLight("light2", new B.Vector3(-5, 10, 5), scene);

// Ground
var ground = B.Mesh.CreateGround('ground', 1024, 1024, 2, scene)
ground.position.set(0.25, 0, 0.25)
ground.checkCollisions = true

let texture = new B.Texture('/ground.png', scene)
texture.uScale = 2048
texture.vScale = 2048

let material = new B.PBRMaterial('ground-texture', scene)
material.roughness = 1
material.metallic = 0.2
material.ambientColor.set(1, 1, 1)
material.albedoTexture = texture

ground.material = material

// Sky
var skyMaterial = new Materials.SkyMaterial("sky-material", scene)
skyMaterial.backFaceCulling = false
skyMaterial.luminance = 0.9
skyMaterial.turbidity = 3
skyMaterial.rayleigh = 0.8
skyMaterial.useSunPosition = true
skyMaterial.sunPosition = new B.Vector3(-0.8, 1, 0.5).multiplyByFloats(100, 100, 100)

var skybox = B.Mesh.CreateBox('sky-box', 1000.0, scene)
skybox.material = skyMaterial

// Origin box
var box = B.Mesh.CreateBox('box', 0.5, scene)
box.position.set(0, 0.25, 0)

var boxMat = new B.PBRMaterial('box-material', scene)
boxMat.albedoTexture = new B.Texture('/box.png', scene)
boxMat.ambientColor.set(1, 1, 1)
boxMat.roughness = 1
boxMat.metallic = 0.2
box.material = boxMat

// Enable Collisions
scene.collisionsEnabled = true;
camera.checkCollisions = true;
camera.speed = 0.25;

// Pointer lock
scene.onPointerDown = function (evt) {
  if (document.pointerLockElement !== canvas) {
    canvas.requestPointerLock()
  }
}

engine.runRenderLoop(() => { 
  scene.render()
})

window.addEventListener("resize", () => { 
  engine.resize()
})
