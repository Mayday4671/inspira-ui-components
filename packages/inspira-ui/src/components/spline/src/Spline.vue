<script setup lang="ts">
import type { Application, SplineEventName } from "@splinetool/runtime";
import { useDebounceFn, useIntersectionObserver } from "@vueuse/core";
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
import ParentSize from "./ParentSize.vue";
defineOptions({ name: 'IuSpline' })

const props = defineProps({
  scene: {
    type: String,
    required: true,
  },
  onLoad: Function,
  renderOnDemand: {
    type: Boolean,
    default: true,
  },
  style: Object,
});

const emit = defineEmits([
  "error",
  "spline-mouse-down",
  "spline-mouse-up",
  "spline-mouse-hover",
  "spline-key-down",
  "spline-key-up",
  "spline-start",
  "spline-look-at",
  "spline-follow",
  "spline-scroll",
]);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isLoading = ref(false);
const loadFailed = ref(false);
const splineApp = shallowRef<Application | null>(null);
const isVisible = ref(true);

let request: AbortController | undefined;
let removeListeners: (() => void) | undefined;

const parentSizeStyles = computed(() => ({
  overflow: "hidden",
  position: "relative",
  ...props.style,
}));

const canvasStyle = computed(() => ({
  display: "block",
  width: "100%",
  height: "100%",
}));

// Use IntersectionObserver to detect when component is visible
const { stop: stopIntersectionObserver } = useIntersectionObserver(
  canvasRef,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting;
    if (isIntersecting && splineApp.value) {
      // When becoming visible again, force a resize
      nextTick(() => {
        if (canvasRef.value && splineApp.value) {
          splineApp.value.requestRender();
          splineApp.value.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight);
        }
      });
    }
  },
  { threshold: 0.1 },
);

function disposeApplication() {
  request?.abort();
  request = undefined;
  removeListeners?.();
  removeListeners = undefined;
  splineApp.value?.dispose();
  splineApp.value = null;
}

const splineEvents = {
  mouseDown: "spline-mouse-down",
  mouseUp: "spline-mouse-up",
  mouseHover: "spline-mouse-hover",
  keyDown: "spline-key-down",
  keyUp: "spline-key-up",
  start: "spline-start",
  lookAt: "spline-look-at",
  follow: "spline-follow",
  scroll: "spline-scroll",
} as const satisfies Partial<Record<SplineEventName, string>>;

async function initialize() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  disposeApplication();
  request = new AbortController();
  const { signal } = request;
  isLoading.value = true;
  loadFailed.value = false;

  try {
    // P1: 按需动态加载 runtime（Babylon 依赖树不进主包）
    const { Application } = await import("@splinetool/runtime");
    if (signal.aborted) return;

    const application = new Application(canvas, {
      renderOnDemand: props.renderOnDemand,
    });
    splineApp.value = application;
    await application.load(props.scene, undefined, { signal });
    if (signal.aborted) return;

    const listeners = Object.keys(splineEvents).map((key) => {
      const name = key as keyof typeof splineEvents;
      const listener = useDebounceFn((event) => {
        if (!signal.aborted) emit(splineEvents[name], event);
      }, 50, { maxWait: 100 });
      application.addEventListener(name, listener);
      return { name, listener };
    });
    removeListeners = () => {
      for (const { name, listener } of listeners) application.removeEventListener(name, listener);
    };

    isLoading.value = false;
    props.onLoad?.(application);
  } catch (err) {
    if (signal.aborted) return;
    disposeApplication();
    loadFailed.value = true;
    isLoading.value = false;
    emit("error", err);
  }
}

onMounted(initialize);

watch(isVisible, (visible) => {
  if (visible) void initialize();
});

onUnmounted(() => {
  stopIntersectionObserver();
  disposeApplication();
});
</script>

<template>
  <ParentSize
    :parent-size-styles="parentSizeStyles"
    :debounce-time="50"
    v-bind="$attrs"
  >
    <template #default>
      <canvas
        ref="canvasRef"
        :style="canvasStyle"
      />
      <span v-if="loadFailed" role="status" class="pointer-events-none absolute inset-0 grid place-items-center">
        3D scene unavailable
      </span>
      <slot v-if="isLoading" />
    </template>
  </ParentSize>
</template>
