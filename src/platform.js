import * as THREE from 'three';

export function createPlatform() {
    const textureLoader = new THREE.TextureLoader();
    
    // Load the read-only asset
    const glassTexture = textureLoader.load('/image.png');
    glassTexture.colorSpace = THREE.SRGBColorSpace;
    
    // Ensure the texture fits the circular cap properly
    glassTexture.center.set(0.5, 0.5);
    // Removed rotation to align feet with positive Z axis (camera view)
    glassTexture.repeat.set(1, 1);
    
    // Geometry: RadiusTop, RadiusBottom, Height, RadialSegments
    // Large, flat cylinder
    const radius = 11;
    const height = 0.2;
    const segments = 64; 
    const geometry = new THREE.CylinderGeometry(radius, radius, height, segments);

    // Materials
    // CylinderGeometry accepts an array of materials: [side, top, bottom]
    
    // 1. Side Material (Dark, metallic structure)
    const sideMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.3,
        metalness: 0.9
    });

    // 2. Glass Material (Used for Top and Bottom)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        map: glassTexture,
        color: 0xffffff,
        
        // Emissive properties to make it the light source
        emissive: 0xffffff,
        emissiveMap: glassTexture,
        emissiveIntensity: 2.0, // High intensity for "glowing" effect
        
        // Glass properties
        roughness: 0.1,   // Smooth glass
        metalness: 0.0,
        transmission: 0.6, // Allows seeing through (if there was background)
        thickness: 0.5,    // Refraction volume
        ior: 1.5,          // Index of refraction for glass
        
        transparent: true,
        side: THREE.DoubleSide // Visible from inside/underneath
    });

    // Apply material: Side gets metal, Top/Bottom get Glass
    const materialArray = [sideMaterial, glassMaterial, glassMaterial];

    const platform = new THREE.Mesh(geometry, materialArray);
    platform.receiveShadow = true;
    
    // Rotation removed to allow texture rotation to handle alignment
    // platform.rotation.y = -Math.PI / 2; 

    return platform;
}

