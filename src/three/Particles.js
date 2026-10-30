import * as THREE from 'three';

// Procedurally generate a soft radial glow particle texture
function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(242, 229, 188, 0.85)');
  gradient.addColorStop(0.5, 'rgba(65, 105, 225, 0.4)');
  gradient.addColorStop(1, 'rgba(9, 21, 46, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 30, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createParticles(scene, count = 1200) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const originalY = new Float32Array(count);

  const goldColor = new THREE.Color(0xD4AF37);
  const royalColor = new THREE.Color(0x4169E1);
  const electricColor = new THREE.Color(0x287BFF);
  const whiteColor = new THREE.Color(0xFFFFFF);

  const radius = 18;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Spherical random dispersion with depth
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.cbrt(Math.random()) * radius + 2.5;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi) - 2;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
    originalY[i] = y;

    // Palette distribution: 35% Gold, 45% Royal/Electric Blue, 20% White
    const rand = Math.random();
    let c;
    if (rand < 0.35) {
      c = goldColor;
    } else if (rand < 0.80) {
      c = Math.random() > 0.5 ? royalColor : electricColor;
    } else {
      c = whiteColor;
    }

    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const texture = createParticleTexture();

  const material = new THREE.PointsMaterial({
    size: 0.18,
    map: texture,
    transparent: true,
    opacity: 0.75,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  return {
    mesh: particleSystem,
    update(time, mousePos) {
      const posAttr = geometry.attributes.position;
      const array = posAttr.array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Subtle drift with harmonic waves
        array[i3 + 1] = originalY[i] + Math.sin(time * 0.8 + array[i3] * 0.4) * 0.3;
      }
      posAttr.needsUpdate = true;

      // Gentle global rotation responding to mouse
      particleSystem.rotation.y = time * 0.03 + mousePos.x * 0.15;
      particleSystem.rotation.x = mousePos.y * 0.1;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      texture.dispose();
      scene.remove(particleSystem);
    }
  };
}

