<template>
  <canvas
    ref="canvasRef"
    class="wireframe-canvas"
    :class="{ 'is-dragging': isDragging }"
    aria-hidden="true"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="onPointerUp"
    @pointercancel="onPointerUp"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const isDragging = ref(false)

let renderer, scene, camera, mesh, animFrameId

// Auto-rotation speed (radians/frame)
const AUTO_ROT_Y = 0.003
const AUTO_ROT_X = 0.0015

// Mouse-hover tilt (desktop, no drag)
let hoverX = 0
let hoverY = 0
let targetHoverX = 0
let targetHoverY = 0

// Drag rotation
let dragLastX = 0
let dragLastY = 0
let dragVelX = 0
let dragVelY = 0
let pointerCaptured = false

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

async function init() {
  const THREE = await import('three')
  const canvas = canvasRef.value
  const parent = canvas.parentElement
  const w = parent.clientWidth
  const h = parent.clientHeight

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)
  renderer.setClearColor(0x000000, 0)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
  camera.position.z = 4

  const geometry = new THREE.IcosahedronGeometry(1.35, 1)
  const edges = new THREE.EdgesGeometry(geometry)
  const material = new THREE.LineBasicMaterial({
    color: 0xb089ff,
    transparent: true,
    opacity: 0.85,
  })
  mesh = new THREE.LineSegments(edges, material)
  scene.add(mesh)
}

function animate() {
  animFrameId = requestAnimationFrame(animate)
  if (!mesh) return

  if (!isDragging.value) {
    // Decelerate drag inertia
    dragVelX *= 0.93
    dragVelY *= 0.93
    mesh.rotation.x += dragVelX
    mesh.rotation.y += dragVelY

    // Auto rotate
    mesh.rotation.y += AUTO_ROT_Y
    mesh.rotation.x += AUTO_ROT_X

    // Hover tilt (desktop only)
    if (!isTouchDevice) {
      targetHoverX += (hoverY * 0.35 - targetHoverX) * 0.05
      targetHoverY += (hoverX * 0.35 - targetHoverY) * 0.05
      mesh.rotation.x += targetHoverX * 0.012
      mesh.rotation.y += targetHoverY * 0.012
    }
  }

  renderer.render(scene, camera)
}

// ── Pointer events (drag) ──────────────────────────────────────────
function onPointerDown(e) {
  isDragging.value = true
  dragLastX = e.clientX
  dragLastY = e.clientY
  dragVelX = 0
  dragVelY = 0
  canvasRef.value.setPointerCapture(e.pointerId)
  pointerCaptured = true
}

function onPointerMove(e) {
  if (!isDragging.value) return
  const dx = e.clientX - dragLastX
  const dy = e.clientY - dragLastY
  dragLastX = e.clientX
  dragLastY = e.clientY

  const speed = 0.008
  dragVelX = dy * speed
  dragVelY = dx * speed
  mesh.rotation.x += dragVelX
  mesh.rotation.y += dragVelY
}

function onPointerUp(e) {
  if (!isDragging.value) return
  isDragging.value = false
  if (pointerCaptured) {
    canvasRef.value.releasePointerCapture(e.pointerId)
    pointerCaptured = false
  }
}

// ── Mouse hover tilt (desktop) ────────────────────────────────────
function onMouseMove(e) {
  if (isTouchDevice) return
  const { innerWidth, innerHeight } = window
  hoverX = (e.clientX / innerWidth - 0.5) * 2
  hoverY = (e.clientY / innerHeight - 0.5) * 2
}

function onResize() {
  const parent = canvasRef.value?.parentElement
  if (!parent || !renderer || !camera) return
  const w = parent.clientWidth
  const h = parent.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

onMounted(async () => {
  await init()
  animate()
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(animFrameId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
  renderer?.dispose()
  mesh?.geometry?.dispose()
  mesh?.material?.dispose()
})
</script>

<style scoped>
.wireframe-canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
  touch-action: none;
}

.wireframe-canvas.is-dragging {
  cursor: grabbing;
}
</style>
