import { Component, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ profiles
   Each silhouette is a 2D outline (radius, height) revolved around the Y axis —
   the same way a garment falls from the shoulder to the hem. */

const PROFILES = {
  anarkali: [
    [0.14, 1.00], [0.40, 0.90], [0.34, 0.68], [0.26, 0.38],
    [0.34, 0.06], [0.48, -0.34], [0.64, -0.72], [0.70, -0.86],
  ],
  kurta: [
    [0.15, 1.00], [0.41, 0.92], [0.37, 0.70], [0.33, 0.40],
    [0.35, 0.04], [0.39, -0.34], [0.42, -0.60], [0.43, -0.66],
  ],
  top: [
    [0.15, 1.00], [0.40, 0.92], [0.36, 0.70], [0.33, 0.46],
    [0.37, 0.26], [0.39, 0.16], [0.39, 0.12],
  ],
};

const shapeFor = (category) => {
  if (category === "unstitched") return "fabric";
  if (category === "tops") return "top";
  if (category === "cord-set") return "cord";
  if (category === "kurta") return "kurta";
  return "anarkali";
};

const profileKey = (shape) =>
  shape === "cord" || shape === "top" ? "top" : shape === "kurta" ? "kurta" : "anarkali";

function latheGeometry(shape) {
  const raw = PROFILES[profileKey(shape)].map(([x, y]) => new THREE.Vector2(x, y));
  const smooth = new THREE.SplineCurve(raw).getPoints(90);
  smooth.push(new THREE.Vector2(0.002, smooth[smooth.length - 1].y));
  const g = new THREE.LatheGeometry(smooth, 160);

  /* Push the radius in and out around the circumference so the skirt reads as
     gathered pleats rather than a smooth cone — strongest at the hem. */
  const pos = g.attributes.position;
  const top = smooth[0].y;
  const bottom = smooth[smooth.length - 1].y;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const r = Math.hypot(x, z);
    if (r < 0.02) continue;
    const a = Math.atan2(z, x);
    const drop = Math.min(1, Math.max(0, (top - y) / (top - bottom)));
    const amp = 0.03 * drop * drop;
    const nr = r + Math.sin(a * 20) * amp;
    pos.setX(i, Math.cos(a) * nr);
    pos.setZ(i, Math.sin(a) * nr);
  }
  pos.needsUpdate = true;
  g.computeVertexNormals();
  return g;
}

/* --------------------------------------------------------- woven fabric map
   Drawn on a 2D canvas rather than loaded from a photo: it stays crisp at any
   zoom, needs no network, and lets the colour swatches actually tint the cloth. */

function makeWeave() {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // warp and weft threads
  ctx.lineWidth = 1;
  for (let i = 0; i < size; i += 3) {
    ctx.strokeStyle = i % 6 === 0 ? "rgba(0,0,0,0.055)" : "rgba(255,255,255,0.5)";
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  // scattered butis — the small woven motifs on chanderi and banarasi
  ctx.fillStyle = "rgba(0,0,0,0.10)";
  for (let gx = 0; gx < 4; gx += 1) {
    for (let gy = 0; gy < 4; gy += 1) {
      const x = gx * 128 + (gy % 2 ? 64 : 0) + 34;
      const y = gy * 128 + 34;
      ctx.beginPath();
      for (let p = 0; p < 6; p += 1) {
        const a = (p / 6) * Math.PI * 2;
        ctx.ellipse(x + Math.cos(a) * 9, y + Math.sin(a) * 9, 5, 3, a, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 3.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ------------------------------------------------------------------ garment */

function Garment({ shape, tint, sway }) {
  const group = useRef();

  const weave = useMemo(() => makeWeave(), []);
  const bodyMap = useMemo(() => {
    const m = weave.clone();
    m.needsUpdate = true;
    m.repeat.set(7, 5);
    return m;
  }, [weave]);
  const trimMap = useMemo(() => {
    const m = weave.clone();
    m.needsUpdate = true;
    m.repeat.set(9, 1.4);
    return m;
  }, [weave]);

  const geometry = useMemo(() => (shape === "fabric" ? null : latheGeometry(shape)), [shape]);

  useFrame((state) => {
    if (!group.current || !sway) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.016;
    group.current.position.y = Math.sin(t * 0.7) * 0.012;
  });

  const cloth = (extra = {}) => (
    <meshStandardMaterial
      map={bodyMap}
      color={tint}
      roughness={0.78}
      metalness={0.04}
      side={THREE.DoubleSide}
      {...extra}
    />
  );

  if (shape === "fabric") {
    return (
      <group ref={group}>
        <DrapedCloth map={bodyMap} tint={tint} />
      </group>
    );
  }

  const hem = PROFILES[profileKey(shape)][PROFILES[profileKey(shape)].length - 1];

  return (
    <group ref={group}>
      {/* body */}
      <mesh geometry={geometry} castShadow receiveShadow>{cloth()}</mesh>

      {/* sleeves */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.33, 0.56, 0]} rotation={[0, 0, s * 0.5]} castShadow>
          <capsuleGeometry args={[0.082, 0.56, 8, 28]} />
          {cloth()}
        </mesh>
      ))}

      {/* trousers for a co-ord set */}
      {shape === "cord" &&
        [-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.155, -0.36, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.18, 1.0, 36, 1, true]} />
            {cloth()}
          </mesh>
        ))}

      {/* neckline and hem borders, the way a zari edging catches light */}
      <mesh position={[0, 0.99, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.152, 0.014, 12, 64]} />
        <meshStandardMaterial color="#C79A4E" roughness={0.32} metalness={0.75} />
      </mesh>
      <mesh position={[0, hem[1] + 0.045, 0]}>
        <cylinderGeometry args={[hem[0] + 0.004, hem[0] + 0.007, 0.09, 128, 1, true]} />
        <meshStandardMaterial
          map={trimMap}
          color="#C79A4E"
          roughness={0.34}
          metalness={0.72}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* dupatta wrapping the body */}
      <mesh position={[0, 0.34, 0]} rotation={[0, -0.7, 0.04]} castShadow>
        <cylinderGeometry args={[0.42, 0.5, 1.22, 64, 1, true, 0, 1.15]} />
        {cloth({ roughness: 0.6 })}
      </mesh>
      <mesh position={[0, -0.26, 0]} rotation={[0, -0.7, 0.04]}>
        <cylinderGeometry args={[0.495, 0.505, 0.06, 64, 1, true, 0, 1.15]} />
        <meshStandardMaterial map={trimMap} color="#C79A4E" roughness={0.34} metalness={0.72} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* Soft flowing cloth — a plane whose vertices ripple like fabric on a stand. */
function DrapedCloth({ map, tint, scarf = false }) {
  const mesh = useRef();
  const base = useRef(null);

  useFrame((state) => {
    const g = mesh.current?.geometry;
    if (!g) return;
    if (!base.current) base.current = Float32Array.from(g.attributes.position.array);
    const t = state.clock.elapsedTime;
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i += 1) {
      const x = base.current[i * 3];
      const y = base.current[i * 3 + 1];
      pos.setZ(i, Math.sin(y * 3.1 + t * 1.1) * 0.06 + Math.cos(x * 4.2 + t * 0.8) * 0.04);
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
  });

  return (
    <mesh
      ref={mesh}
      position={scarf ? [0.44, 0.28, 0.22] : [0, 0.06, 0]}
      rotation={scarf ? [0, -0.5, 0.14] : [0, 0, 0]}
      castShadow
    >
      <planeGeometry args={scarf ? [0.42, 1.65, 24, 60] : [1.35, 2.0, 40, 60]} />
      <meshStandardMaterial
        map={map}
        color={tint}
        roughness={0.7}
        metalness={0.04}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------- stage */

function Stage({ product, tint, sway }) {
  const shape = shapeFor(product.category);
  const { camera, size } = useThree();

  /* Frame the garment for whatever shape the canvas happens to be. */
  useEffect(() => {
    const wantH = 3.05;
    const wantW = 2.7;
    const vFov = (camera.fov * Math.PI) / 180;
    const distV = wantH / 2 / Math.tan(vFov / 2);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * (camera.aspect || 1));
    const distH = wantW / 2 / Math.tan(hFov / 2);
    const d = Math.max(distV, distH) * 1.06;
    camera.position.set(d * 0.16, 0.42, d);
    camera.lookAt(0, 0.04, 0);
    camera.updateProjectionMatrix();
  }, [camera, shape, size.width, size.height]);

  return (
    <>
      <hemisphereLight args={["#FFFFFF", "#C9B79C", 1.15]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3.5, 5, 4]} intensity={2.1} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2.5, -1.5]} intensity={1.0} color="#E7CFA0" />
      <directionalLight position={[0, -1.5, 3.5]} intensity={0.55} color="#FFF6E9" />

      <Garment shape={shape} tint={tint} sway={sway} />

      <ContactShadows position={[0, -0.98, 0]} opacity={0.35} scale={5} blur={2.8} far={2.4} color="#191410" />

      <OrbitControls
        makeDefault
        target={[0, 0.04, 0]}
        enablePan={false}
        autoRotate={sway}
        autoRotateSpeed={1.1}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={2.6}
        maxDistance={12}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}

/* --------------------------------------------------------- error boundary */

class Boundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

/* ------------------------------------------------------------------ export */

export default function Product3D({ product, tint = "#8A3A4C", sway = true }) {
  return (
    <Boundary
      fallback={
        <div className="grid h-full w-full place-items-center bg-cream px-6 text-center text-sm text-mute">
          3D preview is not supported on this device.
        </div>
      }
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        camera={{ fov: 30, position: [0.6, 0.5, 4.5] }}
      >
        <color attach="background" args={["#F1E8DB"]} />
        <Stage product={product} tint={tint} sway={sway} />
      </Canvas>
    </Boundary>
  );
}
