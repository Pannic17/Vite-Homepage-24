import * as THREE from 'three';

export function setupThree(container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
  camera.position.z = 5;
  scene.fog = new THREE.Fog(0x0b5394, 5, 180);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  try {
    container.appendChild(renderer.domElement);
    return { scene, camera, renderer };
  } catch (error) {
    renderer.dispose();
    renderer.forceContextLoss();
    throw error;
  }
}
