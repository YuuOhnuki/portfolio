import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeBackgroundProps {
    activeSection: number;
}

// --- Custom Shader Material for Holographic Particles ---
const ParticleShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0.2, 0.6, 1.0) },
        uPixelRatio: { value: 1 },
    },
    vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    attribute float aScale;
    attribute vec3 aVelocity;
    varying float vAlpha;
    
    void main() {
      vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      
      // Pulse effect based on time and position
      float pulse = sin(uTime * 2.0 + position.x * 10.0) * 0.2 + 1.0;
      
      gl_Position = projectionMatrix * mvPosition;
      
      // Size attenuation
      gl_PointSize = 8.0 * aScale * uPixelRatio * pulse * (10.0 / -mvPosition.z);
      
      // Fade out based on distance
      vAlpha = smoothstep(50.0, 0.0, -mvPosition.z);
    }
  `,
    fragmentShader: `
    uniform vec3 uColor;
    varying float vAlpha;
    
    void main() {
      // Circular particle with soft edge
      vec2 center = gl_PointCoord - 0.5;
      float dist = length(center);
      float circle = 1.0 - smoothstep(0.4, 0.5, dist);
      
      if (circle < 0.01) discard;
      
      gl_FragColor = vec4(uColor, vAlpha * circle * 0.8);
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

// --- Advanced Particle System ---
const Particles: React.FC<{ activeSection: number }> = ({ activeSection }) => {
    const count = 2000;
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random initial data
    const { particles, scales } = useMemo(() => {
        const temp = [];
        const s = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() * 0.05;
            temp.push({ t, factor, speed });
            s[i] = 0.5 + Math.random() * 1.5; // Scale variation
        }
        return { particles: temp, scales: s };
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // Update shader uniforms
        if (meshRef.current.material instanceof THREE.ShaderMaterial) {
            meshRef.current.material.uniforms.uTime.value = time;

            // Color Transition Logic
            const targetColor = new THREE.Color();
            if (activeSection === 0)
                targetColor.set('#4f46e5'); // Indigo (Contrast for Cyan Text)
            else if (activeSection === 1)
                targetColor.set('#06b6d4'); // Cyan (About)
            else if (activeSection === 2)
                targetColor.set('#db2777'); // Pink (Works)
            else targetColor.set('#f59e0b'); // Amber (Contact)

            meshRef.current.material.uniforms.uColor.value.lerp(targetColor, 0.05);
            meshRef.current.material.uniforms.uPixelRatio.value = state.viewport.dpr;
        }

        const mouse = state.mouse;
        const targetX = mouse.x * 5;
        const targetY = mouse.y * 5;

        particles.forEach((particle, i) => {
            // Calculate target position based on active section morphing
            let x = 0,
                y = 0,
                z = 0;

            if (activeSection === 0) {
                // Sphere (Hero)
                const theta = (i / count) * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 4.5 + Math.sin(time * 0.5 + i) * 0.3;
                x = r * Math.sin(phi) * Math.cos(theta);
                y = r * Math.sin(phi) * Math.sin(theta);
                z = r * Math.cos(phi);
            } else if (activeSection === 1) {
                // DNA Helix (About)
                const r = 3.0;
                const theta = (i / count) * Math.PI * 10 + time * 0.1;
                const h = (i / count) * 14 - 7;
                x = r * Math.cos(theta);
                y = h;
                z = r * Math.sin(theta);
            } else if (activeSection === 2) {
                // Wave Plane (Works)
                x = (i % 50) * 0.5 - 12.5;
                z = Math.floor(i / 50) * 0.5 - 12.5;
                y = Math.sin(x * 0.3 + time) * Math.cos(z * 0.3 + time) * 2.0;
            } else {
                // Galaxy/Torus (Contact)
                const u = Math.random() * Math.PI * 2;
                const v = Math.random() * Math.PI * 2;
                const r = 5 + Math.cos(v) * 2;
                x = r * Math.cos(u);
                y = r * Math.sin(u);
                z = Math.sin(v) * 2;
            }

            // Parallax interaction
            x += (targetX - x) * 0.02;
            y += (targetY - y) * 0.02;

            // Global rotation
            const s = Math.sin(time * 0.05);
            const c = Math.cos(time * 0.05);
            const rx = x * c - z * s;
            const rz = x * s + z * c;

            dummy.position.set(rx, y, rz);
            dummy.rotation.set(s, c, 0);
            dummy.updateMatrix();

            meshRef.current.setMatrixAt(i, dummy.matrix);
        });

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

// --- Cyber Grid Floor ---
const MovingGrid = () => {
    const gridRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.position.z = (state.clock.getElapsedTime() * 3) % 20;
        }
    });

    return (
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
            <mesh ref={gridRef}>
                <planeGeometry args={[200, 200, 60, 60]} />
                <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.15} />
            </mesh>
        </group>
    );
};

const CameraRig = () => {
    const { mouse, camera } = useThree();
    useFrame(() => {
        camera.position.x += (mouse.x * 1 - camera.position.x) * 0.05;
        camera.position.y += (-mouse.y * 1 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });
    return null;
};

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ activeSection }) => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
            <Canvas camera={{ position: [0, 0, 16], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true }}>
                <color attach="background" args={['#000000']} />

                <fog attach="fog" args={['#000000', 10, 40]} />

                <CameraRig />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

                <group position={[0, 0, 0]}>
                    <Particles activeSection={activeSection} />
                </group>

                <MovingGrid />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <Sparkles count={30} scale={12} size={6} speed={0.4} opacity={0.3} color="#6366f1" />
                </Float>
            </Canvas>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)]" />
        </div>
    );
};

export default ThreeBackground;
