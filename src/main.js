import * as THREE from 'three';
import { createScene } from './scene_setup.js';
import { createPlatform } from './platform.js';

// Initialize Scene
const container = document.getElementById('canvas-container');
const { scene, camera, renderer, controls } = createScene();

container.appendChild(renderer.domElement);

// Create and Add Platform
const platform = createPlatform();
scene.add(platform);

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Subtle rotation of the platform to show off lighting
    // platform.rotation.y += 0.05 * delta; 

    controls.update();
    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Start
animate();

