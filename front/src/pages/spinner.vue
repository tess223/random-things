<template>
  <layout>
    <template #header>
      <h1>自定义标题</h1>
    </template>

    <div class="page">
      <div class="main">主页面</div>

      <h1 class="title">Give me a whack</h1>

      <div id="spinner">
        <!-- 指针 -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 10 20 60"
          id="clicker"
          aria-hidden="true"
        >
          <path d="M 3 20 Q 10 0 17 20 Q 10 100 3 20" fill="#ddd" />
        </svg>

        <!-- 转盘 -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          id="wheel"
          ref="wheelRef"
          role="button"
          aria-label="旋转转盘"
        >
          <mask id="splineMask">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <path d="M48.5 33 Q 50 35 51.5 33 Q 50 18 48.5 33" />
            <path transform="rotate(36, 50, 50)" d="M48.5 33 Q 50 35 51.5 33 Q 50 18 48.5 33" />
            <path transform="rotate(72, 50, 50)" d="M48.5 33 Q 50 35 51.5 33 Q 50 18 48.5 33" />
            <path transform="rotate(108, 50, 50)" d="M48.5 33 Q 50 35 51.5 33 Q 50 18 48.5 33" />
            <path transform="rotate(144, 50, 50)" d="M48.5 33 Q 50 35 51.5 33 Q 50 18 48.5 33" />
            <path transform="rotate(180, 50, 50)" d="M48.5 33 Q 50 35 51.5 33 Q 50 18 48.5 33" />
            <path transform="rotate(216, 50, 50)" d="M48.5 33 Q 50 35 51.5 33 Q 50 18 48.5 33" />
            <path transform="rotate(252, 50, 50)" d="M48.5 33 Q 50 35 51.5 33 Q 50 18 48.5 33" />
            <path transform="rotate(288, 50, 50)" d="M48.5 33 Q 50 35 51.5 33 Q 50 18 48.5 33" />
            <path transform="rotate(324, 50, 50)" d="M48.5 33 Q 50 35 51.5 33 Q 50 18 48.5 33" />
          </mask>

          <!-- 10 个扇区 -->
          <polygon points="50,50 71,-17 28,-16" style="fill: #FDD835" />
          <polygon points="50,50 28,-16 -7,9" style="fill: #FFC107" />
          <polygon points="50,50 -7,9 -20,51" style="fill: #FF9800" />
          <polygon points="50,50 -20,51 -6,92" style="fill: #FF5722" />
          <polygon points="50,50 -6,92 29,117" style="fill: #C2185B" />
          <polygon points="50,50 29,117 72,116" style="fill: #7B1FA2" />
          <polygon points="50,50 72,116 107,91" style="fill: #283593" />
          <polygon points="50,50 107,91 120,49" style="fill: #2196F3" />
          <polygon points="50,50 120,49 106,8" style="fill: #4CAF50" />
          <polygon points="50,50 106,8,71,-17" style="fill: #8BC34A" />

          <!-- 扇区文字 -->
          <text x="45" y="14">1</text>
          <text x="45" y="14" transform="rotate(36, 50, 50)">2</text>
          <text x="45" y="14" transform="rotate(72, 50, 50)">3</text>
          <text x="45" y="14" transform="rotate(108, 50, 50)">4</text>
          <text x="45" y="14" transform="rotate(144, 50, 50)">5</text>
          <text x="45" y="14" transform="rotate(180, 50, 50)">6</text>
          <text x="45" y="14" transform="rotate(216, 50, 50)">7</text>
          <text x="45" y="14" transform="rotate(252, 50, 50)">8</text>
          <text x="45" y="14" transform="rotate(288, 50, 50)">9</text>
          <text x="40" y="14" transform="rotate(324, 50, 50)">10</text>

          <circle id="middle" cx="50" cy="50" r="33" mask="url(#splineMask)" />
          <circle id="knob" cx="50" cy="50" r="12" />
        </svg>

        <div id="shadow"></div>
      </div>
    </div>

    <template #footer>
      <div>自定义底部</div>
    </template>
  </layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 引入布局/权限（保持与原来一致）
import layout from '@/components/layout.vue'
import { useAuthStore } from '@/utils/auth'

const authStore = useAuthStore()

const wheelRef = ref(null)
let wheelInstance = null

class Wheel {
  constructor(elm) {
    this.wheelElm = elm

    // 旋转状态
    this.currentAngle = 0 // 当前角度（度）
    this.velocity = 0     // 惯性速度（度/帧，约每 16.7ms）
    this.isDragging = false
    this.isSpinning = false
    this.prevPointerAngle = 0
    this.lastMoveTime = 0
    this.rafId = 0

    this.positionCallbacks = []
    this.stopCallbacks = []

    // 事件绑定（Pointer Events 统一鼠标/触屏）
    this.onPointerDown = (e) => {
      e.preventDefault()
      // 捕获后续移动/抬起，即使指针移出元素
      try {
        this.wheelElm.setPointerCapture?.(e.pointerId)
      } catch (_) {}
      if (this.isSpinning) {
        cancelAnimationFrame(this.rafId)
        this.isSpinning = false
      }
      this.isDragging = true
      this.prevPointerAngle = this._pointerAngle(e)
      this.lastMoveTime = performance.now()
      this.velocity = 0
    }

    this.onPointerMove = (e) => {
      if (!this.isDragging) return
      const now = performance.now()
      const angleNow = this._pointerAngle(e)

      // 处理越界（-180~180 的最小角差）
      let delta = angleNow - this.prevPointerAngle
      if (delta > 180) delta -= 360
      if (delta < -180) delta += 360

      this.currentAngle += delta

      // 估算速度（平滑）
      const dt = Math.max(1, now - this.lastMoveTime)
      const instVel = delta / (dt / 16.6667) // 规范化到“每帧”角速度
      this.velocity = 0.8 * this.velocity + 0.2 * instVel

      this.prevPointerAngle = angleNow
      this.lastMoveTime = now
      this._render()
    }

    this.onPointerUp = () => {
      if (!this.isDragging) return
      this.isDragging = false
      this._startInertia()
    }

    this.wheelElm.addEventListener('pointerdown', this.onPointerDown)
    this.wheelElm.addEventListener('pointermove', this.onPointerMove)
    this.wheelElm.addEventListener('pointerup', this.onPointerUp)
    this.wheelElm.addEventListener('pointercancel', this.onPointerUp)

    this._render()
  }

  // 从指针位置计算相对“上方为 0°、顺时针为正”的角度
  _pointerAngle(e) {
    const rect = this.wheelElm.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = e.clientX - cx
    const y = e.clientY - cy
    // 标准 atan2 返回：右方 0°，逆时针为正
    // 转为上方 0°、顺时针为正：angleTopCW = angle + 90，并归一化到 [0,360)
    let angle = Math.atan2(y, x) * (180 / Math.PI)
    angle = (angle + 90 + 360) % 360
    return angle
  }

  _startInertia() {
    const minStart = 0.1 // 启动惯性阈值（度/帧）
    if (Math.abs(this.velocity) < minStart) {
      // 速度很小就直接停止
      this._render()
      this._emitStop()
      return
    }

    this.isSpinning = true
    const friction = 0.985 // 摩擦（每帧衰减）

    const step = () => {
      this.currentAngle += this.velocity
      this.velocity *= friction
      this._render()

      if (Math.abs(this.velocity) < 0.05) {
        this.isSpinning = false
        this._render()
        this._emitStop()
        return
      }
      this.rafId = requestAnimationFrame(step)
    }

    this.rafId = requestAnimationFrame(step)
  }

  _render() {
    this.wheelElm.style.transform = `rotate(${this.currentAngle}deg)`
    const normDeg = ((this.currentAngle % 360) + 360) % 360
    for (const cb of this.positionCallbacks) {
      cb(normDeg)
    }
  }

  // 当前在指针下的是第几个扇区（1~10）
  currentSector() {
    const normDeg = ((this.currentAngle % 360) + 360) % 360
    // 每扇区 36°，0° 位置是数字 “1”
    const idx0 = Math.round(normDeg / 36) % 10 // 0~9
    return idx0 + 1
  }

  _emitStop() {
    const deg = ((this.currentAngle % 360) + 360) % 360
    const sector = this.currentSector()
    for (const cb of this.stopCallbacks) {
      cb(deg, sector)
    }
  }

  onPositionChange(cb) {
    this.positionCallbacks.push(cb)
  }

  onStop(cb) {
    this.stopCallbacks.push(cb)
  }

  destroy() {
    cancelAnimationFrame(this.rafId)
    this.wheelElm.removeEventListener('pointerdown', this.onPointerDown)
    this.wheelElm.removeEventListener('pointermove', this.onPointerMove)
    this.wheelElm.removeEventListener('pointerup', this.onPointerUp)
    this.wheelElm.removeEventListener('pointercancel', this.onPointerUp)
  }
}

onMounted(() => {
  if (wheelRef.value) {
    wheelInstance = new Wheel(wheelRef.value)

    // 示例：监听停止事件（在控制台输出结果）
    wheelInstance.onStop((deg, sector) => {
      // 这里可以替换为 emit 或 store 分发等业务逻辑
      console.log(`停止角度: ${deg.toFixed(1)}°，落在扇区: ${sector}`)
    })
  }
})

onBeforeUnmount(() => {
  wheelInstance?.destroy()
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.title {
  color: #fff;
  margin: 8px 0;
}

#spinner {
  width: min(80vw, 80vh, 420px);
  height: min(80vw, 80vh, 420px);
  min-width: 240px;
  min-height: 240px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}

#clicker {
  position: absolute;
  top: 0px;
  left: 50%;
  width: 15px;
  height: 60px;
  transform: translateX(-50%);
  z-index: 2;
  transform-origin: 50% 20px;
  pointer-events: none;
}

#wheel {
  position: absolute;
  top: 30px;
  left: 30px;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  box-sizing: border-box;
  border-radius: 50%;
  cursor: grab;
  border: solid #fff 10px;
  will-change: transform;
  z-index: 1;
  touch-action: none; /* 防止滑动时页面滚动 */
}

#wheel:active {
  cursor: grabbing;
}

#shadow {
  position: absolute;
  top: 30px;
  left: 30px;
  right: 30px;
  bottom: 30px;
  border-radius: 50%;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
}

/* mask 中的样条填充为黑色以挖空 */
#splineMask > path {
  fill: black;
}

#wheel > #middle {
  fill: white;
}

#wheel > #knob {
  fill: #ddd;
}

#wheel > text {
  fill: white;
  font-weight: bold;
  user-select: none;
}

@media (max-height: 500px) {
  .title {
    display: none;
  }
}
</style>