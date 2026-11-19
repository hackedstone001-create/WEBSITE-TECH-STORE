'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Detect WebGL capability safely
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Initialize Three.js Scene
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.3, 5.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Main Group with parallax response
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Floating composition group
    const compositionGroup = new THREE.Group();
    rootGroup.add(compositionGroup);

    // --- 3. BRAND STUDIO LIGHTING RIG (TECH STORE PURPLE PALETTE) ---
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Key Light - Primary Purple Accent (#8138F5)
    const keyLight = new THREE.DirectionalLight(0x8138f5, 4.0);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Rim Light - Bright Purple (#A855F7)
    const rimLight = new THREE.DirectionalLight(0xa855f7, 3.0);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Fill Light - Soft Light Purple (#C4A2FF)
    const fillLight = new THREE.PointLight(0xc4a2ff, 1.8, 12);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    // Core Violet Ambient Point
    const corePoint = new THREE.PointLight(0x8138f5, 3.5, 9);
    corePoint.position.set(0, 0.2, 0.5);
    scene.add(corePoint);

    // Helper textures generator
    const createBoxTexture = (title: string, sub: string, tag: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, '#19151F');
      grad.addColorStop(0.5, '#111116');
      grad.addColorStop(1, '#08080B');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Glowing Purple Border
      ctx.strokeStyle = '#8138F5';
      ctx.lineWidth = 12;
      ctx.strokeRect(12, 12, 488, 488);

      // Inner subtle border
      ctx.strokeStyle = 'rgba(196, 162, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.strokeRect(26, 26, 460, 460);

      // Top Tag Badge
      ctx.fillStyle = '#8138F5';
      ctx.fillRect(40, 40, 160, 36);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px "Inter", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(tag.toUpperCase(), 55, 65);

      // Tech Store Branding mark
      ctx.fillStyle = '#A855F7';
      ctx.font = 'bold 16px "Inter", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('TECH STORE', 470, 65);

      // Title & Subtitle
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 42px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, 256, 240);

      ctx.fillStyle = '#C4A2FF';
      ctx.font = '600 22px "Inter", sans-serif';
      ctx.fillText(sub, 256, 280);

      // Circuit lines decoration
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(100, 360);
      ctx.lineTo(220, 360);
      ctx.lineTo(256, 396);
      ctx.lineTo(412, 396);
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '500 16px "Inter", sans-serif';
      ctx.fillText('GENUINE DIGITAL LICENSE', 256, 440);

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;
      return texture;
    };

    // --- 4. 3D OBJECTS COMPOSITION ---

    // Object A: Futuristic Shopping Cart inspired by Tech Store Logo
    const cartGroup = new THREE.Group();

    // Cart Metallic Wire Basket
    const cartCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.9, 0.5, 0),
      new THREE.Vector3(-0.8, -0.4, 0),
      new THREE.Vector3(0.7, -0.4, 0),
      new THREE.Vector3(0.9, 0.5, 0),
    ]);
    const cartTubeGeo = new THREE.TubeGeometry(cartCurve, 32, 0.045, 12, false);
    const purpleChromeMat = new THREE.MeshStandardMaterial({
      color: 0x8138f5,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x5b21b6,
      emissiveIntensity: 0.35,
    });
    const cartFrame = new THREE.Mesh(cartTubeGeo, purpleChromeMat);
    cartGroup.add(cartFrame);

    // Cart Handle
    const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 16);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
    });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(-1.0, 0.5, 0);
    cartGroup.add(handle);

    // Illuminated Cart Wheels
    const wheelGeo = new THREE.TorusGeometry(0.13, 0.04, 16, 32);
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x8138f5,
      emissive: 0xa855f7,
      emissiveIntensity: 0.7,
      metalness: 0.7,
      roughness: 0.2,
    });
    const leftWheel = new THREE.Mesh(wheelGeo, wheelMat);
    leftWheel.position.set(-0.45, -0.65, 0);
    cartGroup.add(leftWheel);

    const rightWheel = new THREE.Mesh(wheelGeo, wheelMat);
    rightWheel.position.set(0.45, -0.65, 0);
    cartGroup.add(rightWheel);

    // Glowing TS Holographic Core inside the Cart
    const tsCoreGeo = new THREE.OctahedronGeometry(0.35, 0);
    const tsCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      emissive: 0x8138f5,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      thickness: 0.5,
      wireframe: true,
    });
    const tsCore = new THREE.Mesh(tsCoreGeo, tsCoreMat);
    tsCore.position.set(0, 0.05, 0);
    cartGroup.add(tsCore);

    cartGroup.position.set(0.1, 0, 0);
    cartGroup.scale.set(0.9, 0.9, 0.9);
    compositionGroup.add(cartGroup);

    // Object B: Floating Digital Software Boxes
    // Box 1: Windows 11 Pro Box
    const boxGeo = new THREE.BoxGeometry(0.85, 1.15, 0.28);
    const winTexture = createBoxTexture('WINDOWS 11 PRO', 'Retail Activation', 'OS LICENSE');
    const boxMatSides = new THREE.MeshStandardMaterial({
      color: 0x111116,
      metalness: 0.8,
      roughness: 0.2,
    });
    const boxMatFront = new THREE.MeshStandardMaterial({
      map: winTexture,
      metalness: 0.4,
      roughness: 0.2,
      emissive: 0x2e1065,
      emissiveIntensity: 0.2,
    });
    const winBox = new THREE.Mesh(boxGeo, [
      boxMatSides, boxMatSides, boxMatSides, boxMatSides, boxMatFront, boxMatSides
    ]);
    winBox.position.set(-1.6, 0.6, 0.4);
    winBox.rotation.set(0.15, 0.45, -0.08);
    compositionGroup.add(winBox);

    // Box 2: ChatGPT Plus / AI Subscription Box
    const aiTexture = createBoxTexture('AI INTELLIGENCE', 'GPT-4o & Canvas', 'AI TOOLS');
    const aiBoxMatFront = new THREE.MeshStandardMaterial({
      map: aiTexture,
      metalness: 0.5,
      roughness: 0.2,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.3,
    });
    const aiBox = new THREE.Mesh(boxGeo, [
      boxMatSides, boxMatSides, boxMatSides, boxMatSides, aiBoxMatFront, boxMatSides
    ]);
    aiBox.position.set(1.7, -0.3, 0.3);
    aiBox.rotation.set(-0.1, -0.4, 0.05);
    compositionGroup.add(aiBox);

    // Object C: Purple Holographic Floating Cubes
    const holoCubeGroup = new THREE.Group();
    const holoCubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const holoCubeMat = new THREE.MeshPhysicalMaterial({
      color: 0xc4a2ff,
      emissive: 0x8138f5,
      emissiveIntensity: 0.5,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85,
    });
    const holoCube = new THREE.Mesh(holoCubeGeo, holoCubeMat);
    holoCubeGroup.add(holoCube);

    const wireGeo = new THREE.BoxGeometry(0.52, 0.52, 0.52);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
    });
    const wireCube = new THREE.Mesh(wireGeo, wireMat);
    holoCubeGroup.add(wireCube);

    holoCubeGroup.position.set(1.5, 1.1, -0.2);
    compositionGroup.add(holoCubeGroup);

    // Second smaller holo cube
    const smallHolo = holoCubeGroup.clone();
    smallHolo.scale.set(0.6, 0.6, 0.6);
    smallHolo.position.set(-1.4, -0.9, 0.1);
    compositionGroup.add(smallHolo);

    // Object D: Floating Software License Cards
    const cardGeo = new THREE.BoxGeometry(0.9, 0.55, 0.02);
    const cardCanvas = document.createElement('canvas');
    cardCanvas.width = 512;
    cardCanvas.height = 310;
    const cardCtx = cardCanvas.getContext('2d')!;
    cardCtx.fillStyle = '#111116';
    cardCtx.fillRect(0, 0, 512, 310);
    // Silver Chip
    cardCtx.fillStyle = '#D8B4FE';
    cardCtx.fillRect(40, 40, 70, 55);
    // Card Title
    cardCtx.fillStyle = '#FFFFFF';
    cardCtx.font = 'bold 24px "Inter", sans-serif';
    cardCtx.fillText('SOFTWARE KEY CARD', 130, 75);
    // Holographic Strip
    const hGrad = cardCtx.createLinearGradient(0, 140, 512, 140);
    hGrad.addColorStop(0, '#8138F5');
    hGrad.addColorStop(0.5, '#C4A2FF');
    hGrad.addColorStop(1, '#A855F7');
    cardCtx.fillStyle = hGrad;
    cardCtx.fillRect(0, 120, 512, 40);
    // License Key Code
    cardCtx.fillStyle = '#FFFFFF';
    cardCtx.font = 'bold 22px "JetBrains Mono", monospace';
    cardCtx.fillText('TS7K-981F-A84Z-2026', 40, 220);
    cardCtx.fillStyle = '#77717E';
    cardCtx.font = '14px "Inter", sans-serif';
    cardCtx.fillText('INSTANT DIGITAL ACTIVATION', 40, 260);

    const cardTex = new THREE.CanvasTexture(cardCanvas);
    const cardMat = new THREE.MeshStandardMaterial({
      map: cardTex,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0x8138f5,
      emissiveIntensity: 0.15,
    });
    const licenseCard = new THREE.Mesh(cardGeo, cardMat);
    licenseCard.position.set(-0.8, 1.2, 0.6);
    licenseCard.rotation.set(0.3, 0.2, -0.15);
    compositionGroup.add(licenseCard);

    // Object E: Abstract AI Neural Network Objects
    const neuralGroup = new THREE.Group();
    const neuralCenter = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.18, 1),
      new THREE.MeshStandardMaterial({
        color: 0x8138f5,
        emissive: 0xa855f7,
        emissiveIntensity: 0.9,
        wireframe: true,
      })
    );
    neuralGroup.add(neuralCenter);

    // Orbiting nodes
    const nodeCount = 6;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      node.position.set(Math.cos(angle) * 0.45, Math.sin(angle) * 0.3, Math.sin(angle * 2) * 0.2);
      neuralGroup.add(node);

      // Connecting line
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        node.position,
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x8138f5,
        transparent: true,
        opacity: 0.6,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      neuralGroup.add(line);
    }
    neuralGroup.position.set(0.9, -0.95, 0.5);
    compositionGroup.add(neuralGroup);

    // Object F: Glowing Purple Particles Field
    const particleCount = 240;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      particleScales[i] = Math.random() * 0.05 + 0.02;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle Canvas Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, '#FFFFFF');
    pGrad.addColorStop(0.3, '#A855F7');
    pGrad.addColorStop(0.7, '#8138F5');
    pGrad.addColorStop(1, 'rgba(8, 8, 11, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const pTex = new THREE.CanvasTexture(pCanvas);
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: pTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 5. INTERACTIVE MOUSE PARALLAX & ANIMATION LOOP ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.45;
      targetMouseY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped lerp for mouse parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      rootGroup.rotation.y = currentMouseX;
      rootGroup.rotation.x = -currentMouseY;

      if (!prefersReducedMotion) {
        // Floating Cart Animation
        cartGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.08;
        cartGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.12;
        tsCore.rotation.x = elapsedTime * 1.2;
        tsCore.rotation.y = elapsedTime * 1.5;

        // Floating Boxes Animation
        winBox.position.y = 0.6 + Math.sin(elapsedTime * 1.2 + 1) * 0.07;
        winBox.rotation.y = 0.45 + Math.sin(elapsedTime * 0.9) * 0.08;

        aiBox.position.y = -0.3 + Math.sin(elapsedTime * 1.3 + 2) * 0.08;
        aiBox.rotation.y = -0.4 + Math.sin(elapsedTime * 0.8) * 0.07;

        // Holographic Cubes Float & Spin
        holoCubeGroup.rotation.x = elapsedTime * 0.5;
        holoCubeGroup.rotation.y = elapsedTime * 0.7;
        holoCubeGroup.position.y = 1.1 + Math.sin(elapsedTime * 1.5) * 0.06;

        smallHolo.rotation.x = -elapsedTime * 0.6;
        smallHolo.rotation.y = elapsedTime * 0.8;
        smallHolo.position.y = -0.9 + Math.cos(elapsedTime * 1.4) * 0.05;

        // License Card subtle drift
        licenseCard.position.y = 1.2 + Math.sin(elapsedTime * 1.6 + 3) * 0.05;
        licenseCard.rotation.z = -0.15 + Math.sin(elapsedTime * 1.1) * 0.05;

        // Neural Node Spin
        neuralGroup.rotation.y = elapsedTime * 0.9;
        neuralGroup.rotation.z = Math.sin(elapsedTime * 0.7) * 0.2;

        // Particle Drift
        particles.rotation.y = elapsedTime * 0.04;
        particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      cartTubeGeo.dispose();
      purpleChromeMat.dispose();
      boxGeo.dispose();
      holoCubeGeo.dispose();
      cardGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 bg-[#111116] rounded-3xl border border-purple-500/20 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <span className="font-extrabold text-2xl">TS</span>
          </div>
          <h3 className="text-lg font-bold text-white">Tech Store 3D Experience</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Genuine Windows licenses, software keys, and AI subscriptions with instant automated dispatch.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[520px] lg:h-[620px] relative pointer-events-auto cursor-grab active:cursor-grabbing select-none"
      title="Tech Store Interactive 3D Showcase"
    />
  );
};
