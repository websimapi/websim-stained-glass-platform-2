import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createScene() {
    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black void
    scene.fog = new THREE.FogExp2(0x000000, 0.002); // Soft fade into distance

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Position high up and slightly back for a top-down angled view
    // Moved to positive Z to view "from the feet"
    camera.position.set(0, 40, 25); 
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize performance on high-dpi mobile
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Enable better tone mapping to handle the high dynamic range of the glowing glass
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // 4. Lighting
    // Ambient light - very dark, just enough to see non-emissive parts
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // The stained glass platform IS the light source.
    // We add a PointLight near the surface to simulate the glass illuminating its surroundings (the void/rim)
    const glowLight = new THREE.PointLight(0xffffff, 100, 50);
    glowLight.position.set(0, 1, 0); // Just above the glass
    glowLight.castShadow = true;
    glowLight.shadow.bias = -0.001;
    scene.add(glowLight);

    // Add a light underneath to represent transmission casting light below
    const transmissionLight = new THREE.PointLight(0xffaa00, 50, 50);
    transmissionLight.position.set(0, -5, 0);
    scene.add(transmissionLight);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.1; // Prevent going below the platform
    controls.minDistance = 10;
    controls.maxDistance = 100;

    return { scene, camera, renderer, controls };
}

