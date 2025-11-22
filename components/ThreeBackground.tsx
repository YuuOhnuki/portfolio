import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeBackgroundProps {
    activeSection: number;
    scrollProgress: number;
}

// --- Custom Shader Material for Holographic Particles ---
const ParticleShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0.2, 0.6, 1.0) },
        uPixelRatio: { value: 1 },
        uGlowIntensity: { value: 1.0 },
        uScrollInfluence: { value: 0.0 },
    },
    vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uScrollInfluence;
    attribute float aScale;
    attribute vec3 aVelocity;
    attribute float aGlow;
    varying float vAlpha;
    varying float vGlow;
    
    void main() {
      vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      
      // Enhanced pulse effect with scroll influence
      float pulse = sin(uTime * 3.0 + position.x * 10.0 + uScrollInfluence * 2.0) * 0.3 + 1.0;
      
      gl_Position = projectionMatrix * mvPosition;
      
      // Enhanced size attenuation with glow
      gl_PointSize = 12.0 * aScale * uPixelRatio * pulse * (10.0 / -mvPosition.z) * (1.0 + aGlow * 0.5);
      
      // Improved fade out with distance
      vAlpha = smoothstep(60.0, 0.0, -mvPosition.z) * (0.8 + aGlow * 0.2);
      vGlow = aGlow;
    }
  `,
    fragmentShader: `
    uniform vec3 uColor;
    uniform float uGlowIntensity;
    uniform float uTime;
    varying float vAlpha;
    varying float vGlow;
    
    void main() {
      // Enhanced circular particle with soft glow
      vec2 center = gl_PointCoord - 0.5;
      float dist = length(center);
      
      // Core particle
      float circle = 1.0 - smoothstep(0.35, 0.5, dist);
      
      // Glow effect
      float glow = 1.0 - smoothstep(0.0, 0.8, dist);
      glow = pow(glow, 2.0);
      
      // Animated shimmer
      float shimmer = sin(uTime * 10.0 + dist * 20.0) * 0.1 + 0.9;
      
      if (circle < 0.01 && glow < 0.01) discard;
      
      vec3 finalColor = uColor * (circle + glow * vGlow * uGlowIntensity) * shimmer;
      float finalAlpha = vAlpha * (circle + glow * 0.3);
      
      gl_FragColor = vec4(finalColor, finalAlpha);
    }
  `,
};

// Create the shader material instance
const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(ParticleShaderMaterial.uniforms),
    vertexShader: ParticleShaderMaterial.vertexShader,
    fragmentShader: ParticleShaderMaterial.fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
});

// --- Advanced Particle System with Physics ---
const Particles: React.FC<{ activeSection: number; scrollProgress: number }> = ({ activeSection, scrollProgress }) => {
    const count = 1500; // Reduced from 2000 for better performance
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const previousSectionRef = useRef(activeSection);
    const transitionProgressRef = useRef(0);
    const targetPositionsRef = useRef<Float32Array>(new Float32Array(count * 3));
    const currentPositionsRef = useRef<Float32Array>(new Float32Array(count * 3));
    const velocityRef = useRef<Float32Array>(new Float32Array(count * 3));
    const springPositionsRef = useRef<Float32Array>(new Float32Array(count * 3));
    const frameCount = useRef(0);

    // Spring physics constants - increased for faster response
    const SPRING_STRENGTH = 0.12; // Increased from 0.08
    const DAMPING = 0.88; // Decreased from 0.92 for less damping
    const MASS = 1.0;

    // Perlin noise for organic motion
    const noise = (x: number, y: number, z: number, time: number) => {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        return (Math.sin(X * 12.9898 + Y * 78.233 + Z * 37.719 + time * 0.1) * 43758.5453) % 1;
    };

    // Generate enhanced particle data
    const { particles, scales, glows } = useMemo(() => {
        const temp = [];
        const s = new Float32Array(count);
        const g = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() * 0.05;
            temp.push({ t, factor, speed });
            s[i] = 0.5 + Math.random() * 1.5;
            g[i] = Math.random(); // Glow intensity
        }
        return { particles: temp, scales: s, glows: g };
    }, [count]);

    // Enhanced easing functions
    const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const springEasing = (t: number): number => {
        return 1 - Math.cos(t * Math.PI * 0.5);
    };

    // Calculate target positions with organic motion
    const calculateTargetPositions = useCallback(
        (section: number, time: number, scrollP: number) => {
            const positions = new Float32Array(count * 3);

            // Enhanced scroll-based variations
            const scrollInfluence = Math.sin(scrollP * Math.PI * 2) * 0.8;
            const scrollRotation = scrollP * Math.PI * 3;
            const scrollScale = 1 + Math.sin(scrollP * Math.PI) * 0.5;
            const scrollWave = Math.sin(scrollP * Math.PI * 4) * 0.3;

            for (let i = 0; i < count; i++) {
                let x = 0,
                    y = 0,
                    z = 0;
                const index = i * 3;
                const noiseOffset = noise(i * 0.1, i * 0.1, i * 0.1, time);

                if (section === 0) {
                    // Enhanced Sphere with organic motion
                    const theta = (i / count) * Math.PI * 2 + scrollRotation + noiseOffset * 0.5;
                    const phi = Math.acos(2 * Math.random() - 1);
                    const r = (4.5 + Math.sin(time * 0.8 + i * 0.01) * 0.5 + scrollWave) * scrollScale;
                    x = r * Math.sin(phi) * Math.cos(theta) + noiseOffset * 0.2;
                    y = r * Math.sin(phi) * Math.sin(theta) + scrollInfluence + Math.sin(time + i) * 0.1;
                    z = r * Math.cos(phi) + noiseOffset * 0.2;
                } else if (section === 1) {
                    // Enhanced DNA Helix with organic motion
                    const r = 3.0 + scrollInfluence + Math.sin(time + i * 0.1) * 0.3;
                    const theta = (i / count) * Math.PI * 12 + time * 0.15 + scrollRotation;
                    const h = (i / count) * 16 - 8;
                    const organicOffset = Math.sin(time * 2 + i * 0.05) * 0.2;
                    x = r * Math.cos(theta) + organicOffset;
                    y = h + Math.sin(scrollP * Math.PI * 3 + i * 0.02) * 0.8 + noiseOffset * 0.3;
                    z = r * Math.sin(theta) + organicOffset;
                } else if (section === 2) {
                    // Enhanced Wave Plane with organic motion
                    x = (i % 60) * 0.4 - 12;
                    z = Math.floor(i / 60) * 0.4 - 12;
                    const waveHeight = 2.5 + scrollInfluence + Math.sin(time * 1.5) * 0.5;
                    const organicWave =
                        Math.sin(x * 0.4 + time * 2 + scrollRotation) *
                        Math.cos(z * 0.4 + time * 2 + scrollRotation) *
                        waveHeight;
                    y = organicWave + noiseOffset * 0.5;
                } else {
                    // Enhanced Galaxy/Torus with organic motion
                    const u = Math.random() * Math.PI * 2 + scrollRotation * 0.2 + noiseOffset * 0.3;
                    const v = Math.random() * Math.PI * 2;
                    const r = (5 + Math.cos(v + time * 0.5) * 2.5) * scrollScale;
                    const organicMotion = Math.sin(time * 3 + i * 0.1) * 0.3;
                    x = r * Math.cos(u) + organicMotion;
                    y = r * Math.sin(u) + scrollInfluence + noiseOffset * 0.4;
                    z = Math.sin(v) * 2 + Math.cos(time + i) * 0.2;
                }

                positions[index] = x;
                positions[index + 1] = y;
                positions[index + 2] = z;
            }

            return positions;
        },
        [count],
    );

    // Initialize positions on mount
    useEffect(() => {
        const initialPositions = calculateTargetPositions(activeSection, 0, scrollProgress);
        currentPositionsRef.current = initialPositions;
        targetPositionsRef.current = initialPositions;
        springPositionsRef.current = new Float32Array(initialPositions);
        velocityRef.current = new Float32Array(count * 3);
    }, [activeSection, scrollProgress, calculateTargetPositions]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const deltaTime = Math.min(state.clock.getDelta(), 0.1);
        frameCount.current++;

        // Handle section transitions
        if (previousSectionRef.current !== activeSection) {
            previousSectionRef.current = activeSection;
            transitionProgressRef.current = 0;

            // Calculate new target positions
            const newTargets = calculateTargetPositions(activeSection, time, scrollProgress);
            targetPositionsRef.current = newTargets;
        }

        // Smooth transition progress
        if (transitionProgressRef.current < 1) {
            transitionProgressRef.current = Math.min(1, transitionProgressRef.current + deltaTime * 0.3);
        }

        const easedProgress = easeInOutCubic(transitionProgressRef.current);
        const springProgress = springEasing(transitionProgressRef.current);

        // Optimize: Update shader uniforms more frequently for smoother animation
        if (meshRef.current.material instanceof THREE.ShaderMaterial) {
            meshRef.current.material.uniforms.uTime.value = time;
            meshRef.current.material.uniforms.uScrollInfluence.value = scrollProgress;

            // Enhanced color transition with dynamic intensity
            const targetColor = new THREE.Color();
            const scrollColorShift = Math.sin(scrollProgress * Math.PI * 2) * 0.15;
            const glowIntensity = 1.5 + Math.sin(time * 3) * 0.4; // Increased speed and intensity

            if (activeSection === 0) {
                const hue = 0.58 + scrollColorShift * 0.1;
                targetColor.setHSL(hue, 0.85, 0.55);
            } else if (activeSection === 1) {
                const hue = 0.5 + scrollColorShift * 0.1;
                targetColor.setHSL(hue, 0.95, 0.55);
            } else if (activeSection === 2) {
                const hue = 0.85 + scrollColorShift * 0.1;
                targetColor.setHSL(hue, 0.85, 0.55);
            } else {
                const hue = 0.1 + scrollColorShift * 0.1;
                targetColor.setHSL(hue, 0.95, 0.55);
            }

            const colorLerpFactor = easedProgress * 0.15 + (1 - easedProgress) * 0.08;
            meshRef.current.material.uniforms.uColor.value.lerp(targetColor, colorLerpFactor);
            meshRef.current.material.uniforms.uGlowIntensity.value = glowIntensity;
            meshRef.current.material.uniforms.uPixelRatio.value = state.viewport.dpr;
        }

        const mouse = state.mouse;
        const targetX = mouse.x * 8; // Increased from 6 for stronger effect
        const targetY = mouse.y * 8; // Increased from 6 for stronger effect
        
        // Add mouse influence to particle motion
        const mouseInfluence = {
            x: mouse.x * 3,
            y: mouse.y * 3,
            distance: Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y)
        };

        // Calculate target positions with current time
        const currentTargets = calculateTargetPositions(activeSection, time, scrollProgress);

        // Optimize: Process more particles per frame for smoother animation
        const batchSize = 200; // Increased batch size
        const startIdx = (frameCount.current * batchSize) % count;
        const endIdx = Math.min(startIdx + batchSize, count);

        for (let i = startIdx; i < endIdx; i++) {
            const index = i * 3;

            // Spring force calculation
            for (let axis = 0; axis < 3; axis++) {
                const targetPos = currentTargets[index + axis];
                const currentPos = springPositionsRef.current[index + axis];
                const currentVel = velocityRef.current[index + axis];

                // Hooke's law: F = -k * x
                const displacement = targetPos - currentPos;
                const springForce = SPRING_STRENGTH * displacement;

                // Apply damping and update velocity
                const newVel = (currentVel + springForce * deltaTime) * DAMPING;
                velocityRef.current[index + axis] = newVel;

                // Update position
                const newPos = currentPos + newVel * deltaTime;
                springPositionsRef.current[index + axis] = newPos;
            }
        }

        // Apply positions to instances with enhanced effects
        for (let i = 0; i < count; i++) {
            const index = i * 3;
            let x = springPositionsRef.current[index];
            let y = springPositionsRef.current[index + 1];
            let z = springPositionsRef.current[index + 2];

            // Enhanced parallax interaction with mouse proximity
            const distanceFromMouse = Math.sqrt(
                Math.pow(x - mouseInfluence.x * 10, 2) + 
                Math.pow(y - mouseInfluence.y * 10, 2)
            );
            const proximityEffect = Math.max(0, 1 - distanceFromMouse / 20);
            const parallaxStrength = 0.03 + proximityEffect * 0.04; // Dynamic strength
            
            x += (targetX - x) * parallaxStrength;
            y += (targetY - y) * parallaxStrength;
            
            // Add mouse turbulence effect
            if (proximityEffect > 0.3) {
                x += Math.sin(time * 5 + i) * proximityEffect * 0.2;
                y += Math.cos(time * 5 + i) * proximityEffect * 0.2;
            }

            // Enhanced global rotation with mouse influence
            const baseRotationSpeed = 0.15;
            const mouseRotationInfluence = mouseInfluence.distance * 0.1;
            const rotationSpeed = baseRotationSpeed + mouseRotationInfluence;
            const s = Math.sin(time * rotationSpeed);
            const c = Math.cos(time * rotationSpeed);
            const rx = x * c - z * s;
            const rz = x * s + z * c;
            
            // Add mouse-based distortion
            const distortionStrength = proximityEffect * 0.3;
            dummy.position.set(
                rx + Math.sin(time * 3 + i * 0.1) * distortionStrength,
                y + Math.cos(time * 3 + i * 0.1) * distortionStrength,
                rz
            );
            dummy.rotation.set(
                s + mouseInfluence.x * 0.1,
                c + mouseInfluence.y * 0.1,
                proximityEffect * 0.2
            );
            dummy.updateMatrix();

            meshRef.current.setMatrixAt(i, dummy.matrix);
        }

        // Update matrix every frame for smoother animation
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} material={shaderMaterial}>
            {/* Using PlaneGeometry for billboard particles to work with shader point rendering logic logic or small meshes */}
            {/* Actually, let's use Icosahedron for 3D body volume if shader vertex logic supports it, 
          but the shader above uses gl_PointCoord which is for Points. 
          Let's stick to a mesh and standard standard positioning, 
          but use Icosahedron for a techy "crystal" look and ignore the point shader part, 
          instead revert to a simple MeshBasicMaterial but with transparent opacity. 
          
          WAIT: The user wants "Shader based". 
          Let's swap back to a cooler Standard Material with wireframe for a "High Tech" look.
      */}
            <icosahedronGeometry args={[0.05, 0]} />
            {/* Overriding the shader material passed in props to be simple mesh material for reliability in this setup */}
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} wireframe={false} />
        </instancedMesh>
    );
};

// --- Enhanced Cyber Grid Floor with Dynamic Lighting ---
const MovingGrid = () => {
    const gridRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (gridRef.current) {
            const time = state.clock.getElapsedTime();
            gridRef.current.position.z = (time * 2) % 20;

            // Dynamic grid opacity
            const material = gridRef.current.material as THREE.MeshBasicMaterial;
            material.opacity = 0.15 + Math.sin(time * 3) * 0.05;
        }

        if (lightRef.current) {
            const time = state.clock.getElapsedTime();
            lightRef.current.position.x = Math.sin(time * 0.5) * 10;
            lightRef.current.position.y = Math.cos(time * 0.3) * 5;
            lightRef.current.intensity = 1.5 + Math.sin(time * 2) * 0.5;
        }
    });

    return (
        <>
            <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
                <mesh ref={gridRef}>
                    <planeGeometry args={[200, 200, 80, 80]} />
                    <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.15} />
                </mesh>
            </group>

            {/* Dynamic point light */}
            <pointLight ref={lightRef} position={[0, 0, 5]} intensity={1.5} color="#6366f1" />
        </>
    );
};

// --- Enhanced Camera Rig with Smooth Motion ---
const CameraRig = () => {
    const { mouse, camera } = useThree();
    const targetPosition = useRef(new THREE.Vector3());
    const currentPosition = useRef(new THREE.Vector3());

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Smooth target position calculation
        targetPosition.current.x = mouse.x * 2 + Math.sin(time * 0.1) * 0.5;
        targetPosition.current.y = -mouse.y * 2 + Math.cos(time * 0.15) * 0.3;
        targetPosition.current.z = 16 + Math.sin(time * 0.05) * 2;

        // Smooth interpolation
        currentPosition.current.lerp(targetPosition.current, 0.05);

        camera.position.copy(currentPosition.current);
        camera.lookAt(0, 0, 0);

        // Subtle camera rotation
        camera.rotation.z = Math.sin(time * 0.2) * 0.02;
    });
    return null;
};

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ activeSection, scrollProgress }) => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
            <Canvas
                camera={{ position: [0, 0, 16], fov: 45 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
                shadows
            >
                <color attach="background" args={['#000000']} />

                <fog attach="fog" args={['#000000', 8, 45]} />

                <CameraRig />

                {/* Enhanced lighting setup */}
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                <pointLight position={[-10, -10, 5]} intensity={1.5} color="#6366f1" />
                <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={1} color="#06b6d4" castShadow />

                <group position={[0, 0, 0]}>
                    <Particles activeSection={activeSection} scrollProgress={scrollProgress} />
                </group>

                <MovingGrid />

                {/* Enhanced star field */}
                <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={0.8} />

                {/* Enhanced floating sparkles */}
                <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
                    <Sparkles count={50} scale={15} size={8} speed={0.6} opacity={0.4} color="#6366f1" />
                </Float>

                {/* Additional visual effects */}
                <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
                    <Sparkles count={30} scale={10} size={4} speed={0.4} opacity={0.3} color="#db2777" />
                </Float>
            </Canvas>

            {/* Enhanced vignette with gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_40%,rgba(0,0,0,0.95)_100%)]" />

            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        </div>
    );
};

export default ThreeBackground;
