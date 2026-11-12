<script lang="ts">


export interface Position {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

export interface GlobeData {
  size: number | undefined;
  order: number;
  color: (t: number) => string;
  lat: number;
  lng: number;
}

export interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

export interface Props {
  globeConfig?: GlobeConfig;
  data?: Position[];
  class?: string;
}
</script>

<script lang="ts" setup>
import { cn } from '../../../utils';
// Download globe json file from https://geojson-maps.kyd.au/ and save in the same folder

import {
  AmbientLight,
  BufferGeometry,
  Color,
  DirectionalLight,
  Material,
  PerspectiveCamera,
  PointLight,
  Scene,
  Texture,
  WebGLRenderer,
} from "three";
import type ThreeGlobe from "three-globe";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { onBeforeUnmount, onMounted, ref } from "vue";
import contries from "./globe.json";
defineOptions({ name: 'IuGithubGlobe' })





const props = withDefaults(defineProps<Props>(), {
  globeConfig: () => {
    return {};
  },
  data: () => [],
});

const defaultGlobeConfig: GlobeConfig = {
  pointSize: 1,
  atmosphereColor: "#ffffff",
  showAtmosphere: true,
  atmosphereAltitude: 0.1,
  polygonColor: "rgba(255,255,255,0.7)",
  globeColor: "#1d072e",
  emissive: "#000000",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  ...props.globeConfig,
};

const githubGlobeRef = ref<HTMLCanvasElement>();
const isUnavailable = ref(false);

let renderer: WebGLRenderer | undefined;
let scene: Scene | undefined;
let camera: PerspectiveCamera | undefined;
let controls: OrbitControls | undefined;
let globe: ThreeGlobe | undefined;
let animationFrame: number | undefined;
let unmounted = false;

onMounted(async () => {
  const canvas = githubGlobeRef.value;
  if (!canvas) return;

  try {
    // three-globe reads window when its module is evaluated.
    const { default: Globe } = await import("three-globe");
    if (unmounted) return;

    createRenderer(canvas);
    if (!renderer) {
      isUnavailable.value = true;
      return;
    }

    setupScene(canvas);
    globe = new Globe({ waitForGlobeReady: true, animateIn: true });
    scene?.add(globe);
    initGlobe(globe);

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    window.addEventListener("resize", onWindowResize);
    onWindowResize();
    animate();
  } catch {
    if (unmounted) return;
    disposeGlobe(canvas);
    isUnavailable.value = true;
  }
});

onBeforeUnmount(() => {
  unmounted = true;
  disposeGlobe(githubGlobeRef.value);
});

function createRenderer(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("webgl2", { antialias: true, alpha: false });
  if (!context) return;
  try {
    renderer = new WebGLRenderer({ canvas, context, antialias: true });
  } catch (error) {
    context.getExtension("WEBGL_lose_context")?.loseContext();
    throw error;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.autoClear = false;
}

function setupScene(canvas: HTMLCanvasElement) {
  scene = new Scene();

  camera = new PerspectiveCamera();
  camera.position.setX(0);
  camera.position.setY(0);
  camera.position.setZ(400);

  const ambientLight = new AmbientLight(defaultGlobeConfig.ambientLight || "#ffffff", 0.6);
  scene.add(ambientLight);

  const dLight1 = new DirectionalLight(defaultGlobeConfig.directionalLeftLight || "#ffffff", 1);
  dLight1.position.set(-400, 100, 400);
  camera.add(dLight1);

  const dLight2 = new DirectionalLight(defaultGlobeConfig.directionalTopLight || "#ffffff", 1);
  dLight2.position.set(-200, 500, 200);
  camera.add(dLight2);

  const pLight = new PointLight(defaultGlobeConfig.pointLight || "#ffffff", 0.8);
  pLight.position.set(-200, 500, 200);
  camera.add(pLight);

  if (defaultGlobeConfig.initialPosition) {
    const { lat, lng } = defaultGlobeConfig.initialPosition;
    const pos = latLngToCartesian(lat, lng, 400);
    camera.position.set(pos.x, pos.y, pos.z);
    camera.lookAt(0, 0, 0);
  }

  camera.updateProjectionMatrix();
  scene.add(camera);

  controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.01;
  controls.minDistance = 200;
  controls.maxDistance = 500;
  controls.rotateSpeed = defaultGlobeConfig.autoRotateSpeed || 0.8;
  controls.zoomSpeed = 1;
  controls.autoRotate = false;
  controls.autoRotateSpeed = defaultGlobeConfig.autoRotateSpeed ?? 2.0;

  controls.minPolarAngle = Math.PI / 3.5;
  controls.maxPolarAngle = Math.PI - Math.PI / 3;
}

function latLngToCartesian(lat: number, lng: number, radius = 400) {
  const phi = (lat * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;

  const x = radius * Math.cos(phi) * Math.sin(theta);
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.cos(theta);

  return { x, y, z };
}

function initGlobe(globe: ThreeGlobe) {
  globe
    .hexPolygonsData(contries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(defaultGlobeConfig.showAtmosphere!)
    .atmosphereColor(defaultGlobeConfig.atmosphereColor!)
    .atmosphereAltitude(defaultGlobeConfig.atmosphereAltitude!)
    .hexPolygonColor((_e) => defaultGlobeConfig.polygonColor!);

  const globeMaterial = globe.globeMaterial() as unknown as {
    color: Color;
    emissive: Color;
    emissiveIntensity: number;
    shininess: number;
  };

  globeMaterial.color = new Color(defaultGlobeConfig.globeColor!);
  globeMaterial.emissive = new Color(defaultGlobeConfig.emissive!);
  globeMaterial.emissiveIntensity = defaultGlobeConfig.emissiveIntensity || 0.1;
  globeMaterial.shininess = defaultGlobeConfig.shininess || 0.9;

  globe
    .arcsData(props.data)
    .arcStartLat((d: any) => d.startLat * 1)
    .arcStartLng((d: any) => d.startLng * 1)
    .arcEndLat((d: any) => d.endLat * 1)
    .arcEndLng((d: any) => d.endLng * 1)
    .arcColor((e: any) => e.color)
    .arcAltitude((e: any) => e.arcAlt * 1)
    .arcStroke((_e: any) => [0.32, 0.28, 0.3][Math.round(Math.random() * 4)] || null)
    .arcDashLength(defaultGlobeConfig.arcLength!)
    .arcDashInitialGap((e: any) => e.order * 1)
    .arcDashGap(15)
    .arcDashAnimateTime(defaultGlobeConfig.arcTime!)

    .pointsData(props.data)
    .pointColor((e: any) => e.color)
    .pointsMerge(true)
    .pointAltitude(0.0)
    .pointRadius(2)

    .ringsData([])
    .ringColor((e: any) => (t: any) => e.color(t))
    .ringMaxRadius(defaultGlobeConfig.maxRings!)
    .ringPropagationSpeed(3)
    .ringRepeatPeriod(
      (defaultGlobeConfig.arcTime! * defaultGlobeConfig.arcLength!) / defaultGlobeConfig.rings!,
    );
}

function onWindowResize() {
  const canvas = githubGlobeRef.value;
  if (!canvas || !camera || !renderer || isUnavailable.value) return;

  const width = Math.max(1, canvas.clientWidth);
  const height = Math.max(1, canvas.clientHeight);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

function animate() {
  if (!renderer || !scene || !camera || isUnavailable.value) return;
  if (globe && defaultGlobeConfig.autoRotate) {
    globe.rotation.y += (defaultGlobeConfig.autoRotateSpeed ?? 2.0) * 0.001;
  }
  renderer.render(scene, camera);
  animationFrame = requestAnimationFrame(animate);
}

function stopAnimation() {
  if (animationFrame !== undefined) {
    cancelAnimationFrame(animationFrame);
    animationFrame = undefined;
  }
}

function onContextLost(event: Event) {
  event.preventDefault();
  isUnavailable.value = true;
  stopAnimation();
  globe?.pauseAnimation();
  // Release Three.js listeners and caches before the restored context allocates new GPU handles.
  renderer?.dispose();
  renderer = undefined;
}

function onContextRestored() {
  const canvas = githubGlobeRef.value;
  if (!isUnavailable.value || !canvas) return;
  try {
    createRenderer(canvas);
    if (!renderer) return;
    isUnavailable.value = false;
    globe?.resumeAnimation();
    onWindowResize();
    animate();
  } catch {
    disposeGlobe(canvas);
    isUnavailable.value = true;
  }
}

function disposeGlobe(canvas: HTMLCanvasElement | undefined) {
  stopAnimation();
  canvas?.removeEventListener("webglcontextlost", onContextLost);
  canvas?.removeEventListener("webglcontextrestored", onContextRestored);
  window.removeEventListener("resize", onWindowResize);
  controls?.dispose();
  globe?._destructor();

  // Dispose scene meshes as well as three-globe's own animation and layer state.
  const resources = new Set<{ dispose(): void }>();
  scene?.traverse((object) => {
    if ("geometry" in object && object.geometry instanceof BufferGeometry) {
      resources.add(object.geometry);
    }
    if (!("material" in object)) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      if (!(material instanceof Material)) continue;
      resources.add(material);
      for (const value of Object.values(material)) {
        if (value instanceof Texture) resources.add(value);
      }
    }
  });
  for (const resource of resources) resource.dispose();
  scene?.clear();
  renderer?.dispose();
  renderer?.forceContextLoss();

  controls = undefined;
  globe = undefined;
  scene = undefined;
  camera = undefined;
  renderer = undefined;
}
</script>

<template>
  <canvas
    ref="githubGlobeRef"
    :class="cn(`h-96 w-96`, props.class)"
    role="img"
    :aria-label="isUnavailable ? 'GitHub activity globe unavailable' : 'GitHub activity globe'"
    :title="isUnavailable ? '3D globe unavailable' : undefined"
    :style="isUnavailable ? { backgroundImage: `radial-gradient(circle closest-side, ${defaultGlobeConfig.globeColor} 70%, transparent 71%)` } : undefined"
  />
</template>
