import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { HERO_BUBBLES } from '../lib/content'

const UP = new THREE.Color('#22C55E')
const DOWN = new THREE.Color('#EF4444')

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

// Dark glassy core, coloured fresnel rim, one soft key highlight — mirrors the product's bubbles.
const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float ndv = max(dot(n, v), 0.0);
    float rim = pow(1.0 - ndv, 2.2);
    float edge = pow(1.0 - ndv, 7.0);
    vec3 core = vec3(0.012, 0.022, 0.075) + uColor * 0.07;
    vec3 col = core + uColor * rim * (0.9 + uIntensity) + uColor * edge * 1.4;
    vec3 l = normalize(vec3(-0.55, 0.75, 0.6));
    float spec = pow(max(dot(reflect(-l, n), v), 0.0), 48.0);
    float sheen = pow(max(dot(reflect(-l, n), v), 0.0), 6.0);
    col += vec3(1.0) * spec * 0.85 + vec3(0.55, 0.65, 1.0) * sheen * 0.08;
    gl_FragColor = vec4(col, 0.96);
  }
`

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function labelTexture(symbol: string, change: number) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  const fs = symbol.length > 5 ? 44 : symbol.length > 4 ? 52 : 64
  ctx.font = `700 ${fs}px "Space Grotesk", system-ui, sans-serif`
  ctx.fillText(symbol, size / 2, size / 2 - 22)
  ctx.fillStyle = change >= 0 ? '#4ade80' : '#f87171'
  ctx.font = `500 36px "JetBrains Mono", ui-monospace, monospace`
  ctx.fillText(`${change >= 0 ? '+' : ''}${change.toFixed(2)}%`, size / 2, size / 2 + 34)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

function glowTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,0.55)')
  g.addColorStop(0.45, 'rgba(255,255,255,0.16)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

type Body = {
  mesh: THREE.Mesh
  label: THREE.Sprite
  halo: THREE.Sprite
  home: THREE.Vector3
  offset: THREE.Vector3
  vel: THREE.Vector3
  r: number
  phase: number
  speed: number
}

export default function BubbleScene({ progress }: { progress: { get: () => number } }) {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(0, 0, 14)
    const group = new THREE.Group()
    scene.add(group)

    const geo = new THREE.SphereGeometry(1, 48, 48)
    const glow = glowTexture()
    const bodies: Body[] = []
    const disposables: { dispose: () => void }[] = [geo, glow]
    const seed = mulberry32(3)

    for (const b of HERO_BUBBLES) {
      const color = (b.c >= 0 ? UP : DOWN).clone()
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        uniforms: { uColor: { value: color }, uIntensity: { value: Math.min(Math.abs(b.c) / 5, 1) } },
      })
      const mesh = new THREE.Mesh(geo, mat)

      const tex = labelTexture(b.s, b.c)
      const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }))
      label.scale.setScalar(1.25)
      mesh.add(label)

      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: glow, color, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }),
      )
      halo.scale.setScalar(3.4)
      halo.renderOrder = -1
      mesh.add(halo)

      group.add(mesh)
      disposables.push(mat, tex, label.material, halo.material)
      bodies.push({ mesh, label, halo, home: new THREE.Vector3(), offset: new THREE.Vector3(), vel: new THREE.Vector3(), r: b.r, phase: seed() * Math.PI * 2, speed: 0.25 + seed() * 0.35 })
    }

    const CAM_Z = 14
    const VIEW_H = 2 * CAM_Z * Math.tan(THREE.MathUtils.degToRad(25)) // world units visible at z=0

    /**
     * Lay bubbles out around the hero copy as it is actually rendered on this screen.
     * Everything is tested in projected (screen-plane) space, because far bubbles converge on the centre.
     */
    const layout = (w: number, h: number) => {
      const rand = mulberry32(7)
      const u = VIEW_H / h // world units per css pixel at z=0
      const halfW = (w * u) / 2
      const halfH = VIEW_H / 2
      const tall = w / h < 1
      const size = tall ? 0.62 : 1

      // Exclusion zone = the measured copy block (falls back to a centred box).
      const host = el.getBoundingClientRect()
      const copy = el.closest('section')?.querySelector('[data-hero-copy]')?.getBoundingClientRect()
      const zone = copy
        ? { x0: (copy.left - host.left) * u - halfW, x1: (copy.right - host.left) * u - halfW, y1: halfH - (copy.top - host.top) * u, y0: halfH - (copy.bottom - host.top) * u }
        : { x0: -halfW * 0.6, x1: halfW * 0.6, y0: -3.4, y1: 3.1 }
      if (tall) {
        zone.x0 = -halfW - 9
        zone.x1 = halfW + 9
      }

      const taken: { x: number; y: number; r: number }[] = []
      for (const b of bodies) {
        const r = b.r * size
        let ok = false
        let pos = b.home
        for (let tries = 0; tries < 700 && !ok; tries++) {
          const slack = tries < 450 ? 1.06 : 0.85
          let z = -4 + rand() * 4
          const x = (rand() * 2 - 1) * (halfW + 1.2) * 1.18
          const y = (rand() * 2 - 1) * (halfH + 0.4)
          let k = CAM_Z / (CAM_Z - z)
          const pad = r * k + 0.25
          const inZone = x * k > zone.x0 - pad && x * k < zone.x1 + pad && y * k > zone.y0 - pad && y * k < zone.y1 + pad
          if (inZone) {
            // On phones the copy spans the full width: let a few small bubbles drift far behind it as soft bokeh.
            if (!tall || b.r > 0.8) continue
            z = -6 - rand() * 4
            k = CAM_Z / (CAM_Z - z)
          }
          const px = x * k
          const py = y * k
          const pr = r * k
          if (taken.some((o) => Math.hypot(o.x - px, o.y - py) < (o.r + pr) * slack)) continue
          taken.push({ x: px, y: py, r: pr })
          pos = new THREE.Vector3(x, y, z)
          ok = true
        }
        b.mesh.visible = ok
        b.mesh.scale.setScalar(r)
        if (ok) b.home.copy(pos)
      }
    }

    let still: (() => void) | null = null // reduced-motion: redraw one static frame
    let laidOutFor = 0
    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      // Re-layout only when the width changes — mobile address-bar show/hide must not shuffle the field.
      if (w !== laidOutFor) {
        laidOutFor = w
        layout(w, h)
      }
      still?.()
    }
    resize()
    // Web fonts change the copy block's size; lay out once more when they land.
    document.fonts?.ready.then(() => {
      laidOutFor = 0
      resize()
    })
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    // Pointer → world position on the z=0 plane; bubbles shy away from it.
    const pointer = new THREE.Vector2(0, 0)
    const pointerWorld = new THREE.Vector3(999, 999, 0)
    const ray = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
      ray.setFromCamera(pointer, camera)
      ray.ray.intersectPlane(plane, pointerWorld)
    }
    // A lifted finger should not keep pushing bubbles away.
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') pointerWorld.set(999, 999, 0)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('pointercancel', onUp, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(el)

    const clock = new THREE.Clock()
    const push = new THREE.Vector3()
    const toCam = new THREE.Vector3()
    let raf = 0
    const draw = (t: number, p: number) => {
      for (const b of bodies) {
        push.copy(b.mesh.position).sub(pointerWorld)
        push.z = 0
        const d = push.length()
        const reach = b.r + 2.4
        if (d < reach && d > 0.001) b.vel.addScaledVector(push.normalize(), (1 - d / reach) * 0.05)
        b.vel.addScaledVector(b.offset, -0.035)
        b.vel.multiplyScalar(0.9)
        b.offset.add(b.vel)
        b.mesh.position.set(
          b.home.x + b.offset.x + Math.sin(t * b.speed + b.phase) * 0.28,
          b.home.y + b.offset.y + Math.cos(t * b.speed * 0.8 + b.phase) * 0.36,
          b.home.z + Math.sin(t * b.speed * 0.6 + b.phase * 2) * 0.5,
        )
      }

      // Pin each label to the point of its sphere nearest the camera, so it reads centred under perspective.
      for (const b of bodies) {
        toCam.copy(camera.position)
        group.worldToLocal(toCam).sub(b.mesh.position).normalize()
        // The sprite lies parallel to the image plane, so off-axis it must sit further out to clear the sphere.
        b.label.position.copy(toCam).multiplyScalar(1.04 / Math.max(toCam.z, 0.6))
        b.halo.position.copy(toCam).multiplyScalar(-0.6)
      }

      group.rotation.y += (pointer.x * 0.16 - group.rotation.y) * 0.04
      group.rotation.x += (-pointer.y * 0.1 - group.rotation.x) * 0.04
      // Scroll flies the camera through the field.
      camera.position.z = 14 - p * 9
      group.position.y = p * 2.5
      renderer.render(scene, camera)
    }
    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (visible) draw(clock.getElapsedTime(), progress.get())
    }

    if (reduced) {
      still = () => draw(0, 0)
      still()
    } else frame()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [progress])

  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />
}
