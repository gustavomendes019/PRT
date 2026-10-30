import * as THREE from 'three';

export function createMainObject(scene) {
  const masterGroup = new THREE.Group();

  // --------------------------------------------------------------------------
  // LUXURY MATERIALS (Metallic Gold, Royal Blue Chrome & Deep Crystal)
  // --------------------------------------------------------------------------
  const goldBrushedMaterial = new THREE.MeshStandardMaterial({
    color: 0xD4AF37,
    metalness: 0.95,
    roughness: 0.24,
    wireframe: false
  });

  const champagneGoldMaterial = new THREE.MeshStandardMaterial({
    color: 0xF2E5BC,
    metalness: 0.98,
    roughness: 0.18
  });

  const royalBlueChromeMaterial = new THREE.MeshStandardMaterial({
    color: 0x4169E1,
    metalness: 0.9,
    roughness: 0.2
  });

  const darkNavyGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x09152E,
    metalness: 0.3,
    roughness: 0.15,
    transmission: 0.6,
    thickness: 1.2,
    transparent: true,
    opacity: 0.85,
    reflectivity: 0.9
  });

  const wireframeGoldMaterial = new THREE.MeshBasicMaterial({
    color: 0xF2E5BC,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });

  // --------------------------------------------------------------------------
  // 1. CENTRAL MULTI-FACETED CORE
  // --------------------------------------------------------------------------
  const coreGroup = new THREE.Group();

  // Solid Inner Gem
  const gemGeometry = new THREE.IcosahedronGeometry(0.85, 0);
  const gemMesh = new THREE.Mesh(gemGeometry, darkNavyGlassMaterial);
  coreGroup.add(gemMesh);

  // Outer Wireframe Cage around Core
  const gemWireGeometry = new THREE.IcosahedronGeometry(1.05, 1);
  const gemWireMesh = new THREE.Mesh(gemWireGeometry, wireframeGoldMaterial);
  coreGroup.add(gemWireMesh);

  // Micro Gold Nucleus
  const nucleusGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const nucleusMesh = new THREE.Mesh(nucleusGeometry, champagneGoldMaterial);
  coreGroup.add(nucleusMesh);

  masterGroup.add(coreGroup);

  // --------------------------------------------------------------------------
  // 2. CONCENTRIC LUXURY GIMBAL RINGS
  // --------------------------------------------------------------------------
  // Ring 1: Primary Brushed Gold Ring (Outer)
  const ring1Geometry = new THREE.TorusGeometry(2.35, 0.045, 24, 100);
  const ring1Mesh = new THREE.Mesh(ring1Geometry, goldBrushedMaterial);
  masterGroup.add(ring1Mesh);

  // Ring 2: Royal Blue Chrome Ring (Mid, Inclined)
  const ring2Geometry = new THREE.TorusGeometry(1.95, 0.04, 24, 100);
  const ring2Mesh = new THREE.Mesh(ring2Geometry, royalBlueChromeMaterial);
  ring2Mesh.rotation.x = Math.PI * 0.25;
  ring2Mesh.rotation.y = Math.PI * 0.15;
  masterGroup.add(ring2Mesh);

  // Ring 3: Champagne Gold Polar Ring (Inner)
  const ring3Geometry = new THREE.TorusGeometry(1.55, 0.035, 24, 100);
  const ring3Mesh = new THREE.Mesh(ring3Geometry, champagneGoldMaterial);
  ring3Mesh.rotation.x = Math.PI * 0.55;
  ring3Mesh.rotation.z = Math.PI * 0.35;
  masterGroup.add(ring3Mesh);

  // Ring 4: Fine Astrolabe Coordinate Ring (Thin)
  const ring4Geometry = new THREE.TorusGeometry(2.7, 0.015, 16, 120);
  const ring4Mesh = new THREE.Mesh(ring4Geometry, wireframeGoldMaterial);
  masterGroup.add(ring4Mesh);

  // --------------------------------------------------------------------------
  // 3. FLOATING GEOMETRIC ORBITAL SHARDS
  // --------------------------------------------------------------------------
  const shardsCount = 14;
  const shardsGroup = new THREE.Group();
  const shardNodes = [];

  const shardGeometries = [
    new THREE.OctahedronGeometry(0.18, 0),
    new THREE.TetrahedronGeometry(0.2, 0),
    new THREE.DodecahedronGeometry(0.16, 0)
  ];

  for (let i = 0; i < shardsCount; i++) {
    const geom = shardGeometries[i % shardGeometries.length];
    const mat = i % 2 === 0 ? champagneGoldMaterial : royalBlueChromeMaterial;
    const mesh = new THREE.Mesh(geom, mat);

    const orbitRadius = 2.9 + (i % 3) * 0.45;
    const angle = (i / shardsCount) * Math.PI * 2;
    const speed = 0.4 + (i % 4) * 0.2;
    const inclination = ((i % 5) - 2) * 0.3;

    shardNodes.push({
      mesh,
      orbitRadius,
      angle,
      speed,
      inclination,
      rotSpeedX: 0.01 * (i + 1),
      rotSpeedY: 0.015 * (i + 1)
    });

    shardsGroup.add(mesh);
  }
  masterGroup.add(shardsGroup);

  // --------------------------------------------------------------------------
  // 4. CONSTELLATION LINE SEGMENTS
  // --------------------------------------------------------------------------
  const lineCount = 12;
  const linePositions = new Float32Array(lineCount * 2 * 3);
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x4169E1,
    transparent: true,
    opacity: 0.35
  });

  const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
  masterGroup.add(lineSystem);

  // Position master group comfortably in the 3D space
  masterGroup.position.set(2.2, 0, 0);
  // Initial scale starts at 0 for cinematic entrance
  masterGroup.scale.set(0.001, 0.001, 0.001);

  scene.add(masterGroup);

  // Target mouse interpolation values
  let targetRotX = 0;
  let targetRotY = 0;
  let scrollProgress = 0;

  return {
    group: masterGroup,
    coreGroup,
    ring1Mesh,
    ring2Mesh,
    ring3Mesh,
    ring4Mesh,
    setScrollProgress(val) {
      scrollProgress = val;
    },
    update(time, mousePos) {
      // 1. Mouse inertia smoothing
      targetRotX = mousePos.y * 0.4;
      targetRotY = mousePos.x * 0.55;

      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;

      // 2. Continuous elegant ambient rotations
      coreGroup.rotation.y = time * 0.25;
      coreGroup.rotation.x = Math.sin(time * 0.2) * 0.2;

      gemWireMesh.rotation.y = -time * 0.4;
      gemWireMesh.rotation.z = time * 0.3;

      ring1Mesh.rotation.z = time * 0.12;
      ring1Mesh.rotation.x = Math.sin(time * 0.15) * 0.3;

      ring2Mesh.rotation.y = -time * 0.18;
      ring2Mesh.rotation.z = Math.cos(time * 0.12) * 0.4;

      ring3Mesh.rotation.x = time * 0.15;
      ring3Mesh.rotation.y = time * 0.2;

      ring4Mesh.rotation.z = -time * 0.06;

      // 3. Update Orbital Shards and Constellation Lines
      const lineArray = lineGeometry.attributes.position.array;
      let lineIdx = 0;

      for (let i = 0; i < shardNodes.length; i++) {
        const shard = shardNodes[i];
        const currentAngle = shard.angle + time * shard.speed * 0.3;

        const x = Math.cos(currentAngle) * shard.orbitRadius;
        const z = Math.sin(currentAngle) * shard.orbitRadius;
        const y = Math.sin(currentAngle * 2 + shard.inclination) * 0.8;

        shard.mesh.position.set(x, y, z);
        shard.mesh.rotation.x += shard.rotSpeedX;
        shard.mesh.rotation.y += shard.rotSpeedY;

        // Connect select shards with lines
        if (i < lineCount && i + 1 < shardNodes.length) {
          const nextShard = shardNodes[i + 1];
          const nx = Math.cos(nextShard.angle + time * nextShard.speed * 0.3) * nextShard.orbitRadius;
          const nz = Math.sin(nextShard.angle + time * nextShard.speed * 0.3) * nextShard.orbitRadius;
          const ny = Math.sin((nextShard.angle + time * nextShard.speed * 0.3) * 2 + nextShard.inclination) * 0.8;

          lineArray[lineIdx++] = x;
          lineArray[lineIdx++] = y;
          lineArray[lineIdx++] = z;
          lineArray[lineIdx++] = nx;
          lineArray[lineIdx++] = ny;
          lineArray[lineIdx++] = nz;
        }
      }
      lineGeometry.attributes.position.needsUpdate = true;

      // 4. Scroll Choreography Adjustment
      // As user scrolls, object subtly travels across screen, rotates, and shifts focus
      const targetPosX = 2.2 - scrollProgress * 3.8;
      const targetPosY = -scrollProgress * 1.2;
      const targetPosZ = -scrollProgress * 2.0;

      masterGroup.position.x += (targetPosX - masterGroup.position.x) * 0.08;
      masterGroup.position.y += (targetPosY - masterGroup.position.y) * 0.08;
      masterGroup.position.z += (targetPosZ - masterGroup.position.z) * 0.08;
    },
    dispose() {
      // Clean disposal of geometries and materials
      [
        gemGeometry,
        gemWireGeometry,
        nucleusGeometry,
        ring1Geometry,
        ring2Geometry,
        ring3Geometry,
        ring4Geometry,
        lineGeometry,
        ...shardGeometries
      ].forEach(g => g.dispose());

      [
        goldBrushedMaterial,
        champagneGoldMaterial,
        royalBlueChromeMaterial,
        darkNavyGlassMaterial,
        wireframeGoldMaterial,
        lineMaterial
      ].forEach(m => m.dispose());

      scene.remove(masterGroup);
    }
  };
}

