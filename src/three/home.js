import * as THREE from "three";
import {GUI} from "three/examples/jsm/libs/lil-gui.module.min";

import {setupThree} from "./setup.js";
import {Lights} from "./lights.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShiftEffect} from "./effect/p/ShiftEffect.js";
import {WaveEffect} from "./effect/c/WaveEffect.js";
import {SobelEffect} from "./effect/c/SobelEffect.js";
import {LineEffect} from "./effect/c/LineEffect.js";
import {HalftoneEffect} from "./effect/p/HalftoneEffect.js";
import {PostEffect} from "./effect/p/PostEffect.js";
import {PixelEffect} from "./effect/p/PixelEffect.js";
import {AfterEffect} from "./effect/p/AfterEffect.js";
import {GlitchEffect} from "./effect/c/GlitchEffect.js";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {RGBShiftShader} from "three/examples/jsm/shaders/RGBShiftShader";

let far = 1000;
let scene, camera, renderer, gui;
let composer, clock, light;
let model;
let active = [];
let times;
let effects = [];
let animationId;

export function initEffect (effect) {
    effect.end();
    effect.add();
    active.push(effect);
    console.log(effect)
}

export function initialize() {

    let background = document.getElementById('background');
    console.log(background)

    setupThree();
    let init = setupThree(far);

    scene = init.scene;
    camera = init.camera;
    renderer = init.renderer;
    gui = new GUI();

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // const effectDot = new DotEffect(composer, 50);
    const effectShift = new ShiftEffect(composer, 200,0.025, 30);
    // const effectNormal = new NormalEffect(composer, 50, renderer, scene, camera);
    // const effectSlice = new SliceEffect(composer, 50, 15);
    const effectWave = new WaveEffect(composer, 300);
    // const effectSpiral = new SpiralEffect(composer, 100, innerWidth, innerHeight);
    const effectSobel = new SobelEffect(composer, 200, innerWidth, innerHeight, 30);
    const effectLine = new LineEffect(composer, 200, innerWidth, innerHeight)
    const effectHalftone = new HalftoneEffect(composer, 200, innerWidth, innerHeight, Math.random()*6+6)
    const effectPost = new PostEffect(composer, 100, 20);
    const effectPixel = new PixelEffect(composer, 120, scene, camera, 50)
    const effectAfter = new AfterEffect(composer, 200);
    const effectGlitch = new GlitchEffect(composer, 100);

    effects = [effectShift, effectSobel, effectLine, effectHalftone, effectPost, effectPixel, effectAfter, effectGlitch]

    let _gui = {
        "Log": logCamera
    }
    gui.add(_gui, "Log");
    gui.domElement.style.display = 'none'

    function logCamera() {
        console.log(camera);
    }

    clock = new THREE.Clock();
    light = new Lights(scene, gui);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    let sphere = new THREE.Mesh (new THREE.IcosahedronGeometry (0.5, 8), new THREE.MeshBasicMaterial({color: 'cyan'}));
    sphere.position.set (1.2, 0, 1)

    document.ondblclick = function (e) {
        // console.log(effectA)
        initEffect(effectShift);
        initEffect(effectSobel)
    }
    // scene.add(sphere)


    const loader = new GLTFLoader();
    loader.load(
        './cat.gltf',
        function (gltf) {
            // let eevee = gltf.scene.children[2];
            // eevee.position.y = -1;
            model = gltf.scene;
            model.position.y = 0;
            console.log(model);
            scene.add(model);
            animate();
        },
        function (xhr) {console.log((xhr.loaded / xhr.total * 100) + '% loaded')},
        function (error) {console.log('An error happened')}
    )
    // const light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(1, 1, 1);
    // scene.add(light);

    // composer = new EffectComposer(renderer);
    // composer.addPass(new RenderPass(scene, camera));

    // const effect1 = new ShaderPass(DotScreenShader);
    // effect1.uniforms.scale.value = 10;
    // composer.addPass(effect1);

    const effect2 = new ShaderPass(RGBShiftShader);
    effect2.uniforms.amount.value = 0.0015;
    effect2.renderToScreen = true;
    composer.addPass(effect2);
}

function animate () {
    const time = Date.now();
    model.position.y = Math.cos(time / 100) * 0.02 ;
    model.rotation.y += 0.005;

    if (!times) {
        times = time
    } else {
        const interval = Math.random() * (10000 - 5000) + 10000;
        if ((time - times) > interval) {
            let toAdd = effects[Math.floor(Math.random() * effects.length)]
            // console.log(effectA)
            initEffect(toAdd);
            times = time
            console.log("ADD")
        }
    }

    for (let i = 0; i < active.length; i++) {
        active[i].animate(function () {
            active = active.filter(function (item) {
                // noinspection EqualityComparisonWithCoercionJS
                return item != active[i];
            })
        });
    }
    // console.log(active)

    composer.render();
    animationId = requestAnimationFrame(animate);
}

export function clearAnimation() {
    // 停止动画循环
    cancelAnimationFrame(animationId);
}