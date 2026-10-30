import * as THREE from 'three';

export function createLighting(scene) {
  const lightGroup = new THREE.Group();

  // 1. Ambient Light - Deep Atmospheric Blue Fill
  const ambientLight = new THREE.AmbientLight(0x09152E, 1.8);
  lightGroup.add(ambientLight);

  // 2. Primary Key Light - Warm Champagne Gold (Cartier Luxury)
  const keyLight = new THREE.DirectionalLight(0xF2E5BC, 2.8);
  keyLight.position.set(5, 7, 4);
  lightGroup.add(keyLight);

  // 3. Rim / Counter Light - Royal Electric Blue (High Contrast Speculars)
  const rimLight = new THREE.DirectionalLight(0x287BFF, 2.4);
  rimLight.position.set(-6, -4, -3);
  lightGroup.add(rimLight);

  // 4. Dynamic Interactive Point Light - Luminous Gold Cursor Follower
  const cursorLight = new THREE.PointLight(0xD4AF37, 3.2, 14, 1.2);
  cursorLight.position.set(0, 0, 3);
  lightGroup.add(cursorLight);

  // 5. Subtle Inner Core Light - Glowing Core Radiance
  const coreLight = new THREE.PointLight(0x4169E1, 2.5, 6, 2);
  coreLight.position.set(0, 0, 0);
  lightGroup.add(coreLight);

  scene.add(lightGroup);

  return {
    group: lightGroup,
    cursorLight,
    coreLight,
    update(mousePos, time) {
      // Smoothly track mouse in 3D coordinates
      cursorLight.position.x += (mousePos.x * 4 - cursorLight.position.x) * 0.06;
      cursorLight.position.y += (mousePos.y * 3 - cursorLight.position.y) * 0.06;
      
      // Gentle breathing pulsation on core light
      coreLight.intensity = 2.2 + Math.sin(time * 2.5) * 0.6;
    },
    dispose() {
      scene.remove(lightGroup);
    }
  };
}

