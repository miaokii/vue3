<template>
  <div class="game-container">
    <div class="header">
      <h1>2048</h1>
      <div class="score-container">
        <div class="score">Score: {{ score }}</div>
        <button @click="resetGame" class="reset-button">New Game</button>
      </div>
    </div>
    <div class="grid-container">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="grid-row">
        <div v-for="(cell, colIndex) in row" 
             :key="colIndex" 
             class="grid-cell"
             :class="`tile-${cell}`">
          {{ cell !== 0 ? cell : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const GRID_SIZE = 4
const grid = ref<number[][]>([])
const score = ref(0)

// 初始化游戏
const initGame = () => {
  grid.value = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0))
  addRandomTile()
  addRandomTile()
}

// 添加随机数字
const addRandomTile = () => {
  const emptyCells: [number, number][] = []
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid.value[i][j] === 0) {
        emptyCells.push([i, j])
      }
    }
  }
  if (emptyCells.length > 0) {
    const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    grid.value[i][j] = Math.random() < 0.9 ? 2 : 4
  }
}

// 移动处理
const move = (direction: 'up' | 'down' | 'left' | 'right') => {
  let moved = false
  const newGrid = JSON.parse(JSON.stringify(grid.value))

  const rotateGrid = (grid: number[][]) => {
    return grid[0].map((_, i) => grid.map(row => row[i]).reverse())
  }

  const moveRow = (row: number[]) => {
    const newRow = row.filter(x => x !== 0)
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2
        score.value += newRow[i]
        newRow.splice(i + 1, 1)
        moved = true
      }
    }
    while (newRow.length < GRID_SIZE) {
      newRow.push(0)
    }
    return newRow
  }

  // 根据方向旋转网格
  let rotatedGrid = newGrid
  if (direction === 'right') {
    rotatedGrid = rotatedGrid.map(row => row.reverse())
  } else if (direction === 'down') {
    rotatedGrid = rotateGrid(rotatedGrid)
  } else if (direction === 'up') {
    rotatedGrid = rotateGrid(rotatedGrid).map(row => row.reverse())
  }

  // 移动每一行
  for (let i = 0; i < GRID_SIZE; i++) {
    const originalRow = JSON.parse(JSON.stringify(rotatedGrid[i]))
    const newRow = moveRow(rotatedGrid[i])
    if (JSON.stringify(originalRow) !== JSON.stringify(newRow)) {
      moved = true
    }
    rotatedGrid[i] = newRow
  }

  // 恢复原始方向
  if (direction === 'right') {
    rotatedGrid = rotatedGrid.map(row => row.reverse())
  } else if (direction === 'down') {
    rotatedGrid = rotateGrid(rotateGrid(rotateGrid(rotatedGrid)))
  } else if (direction === 'up') {
    rotatedGrid = rotateGrid(rotateGrid(rotateGrid(rotatedGrid.map(row => row.reverse()))))
  }

  if (moved) {
    grid.value = rotatedGrid
    addRandomTile()
    checkGameOver()
  }
}

// 检查游戏是否结束
const checkGameOver = () => {
  // 检查是否有空格
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid.value[i][j] === 0) return false
    }
  }

  // 检查是否有相邻的相同数字
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const current = grid.value[i][j]
      if (
        (i < GRID_SIZE - 1 && current === grid.value[i + 1][j]) ||
        (j < GRID_SIZE - 1 && current === grid.value[i][j + 1])
      ) {
        return false
      }
    }
  }

  alert('Game Over!')
  return true
}

// 重置游戏
const resetGame = () => {
  score.value = 0
  initGame()
}

// 键盘事件处理
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowUp':
      move('up')
      break
    case 'ArrowDown':
      move('down')
      break
    case 'ArrowLeft':
      move('left')
      break
    case 'ArrowRight':
      move('right')
      break
  }
}

onMounted(() => {
  initGame()
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.game-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.score-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.score {
  font-size: 20px;
  font-weight: bold;
}

.reset-button {
  padding: 8px 16px;
  background-color: #8f7a66;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.reset-button:hover {
  background-color: #7f6a56;
}

.grid-container {
  background-color: #bbada0;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.grid-cell {
  aspect-ratio: 1 / 1;
  background-color: rgba(238, 228, 218, 0.35);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(16px, 5vw, 40px);
  font-weight: bold;
  color: #776e65;
}

.tile-2 { background-color: #eee4da; }
.tile-4 { background-color: #ede0c8; }
.tile-8 { background-color: #f2b179; color: white; }
.tile-16 { background-color: #f59563; color: white; }
.tile-32 { background-color: #f67c5f; color: white; }
.tile-64 { background-color: #f65e3b; color: white; }
.tile-128 { background-color: #edcf72; color: white; font-size: 35px; }
.tile-256 { background-color: #edcc61; color: white; font-size: 35px; }
.tile-512 { background-color: #edc850; color: white; font-size: 35px; }
.tile-1024 { background-color: #edc53f; color: white; font-size: 30px; }
.tile-2048 { background-color: #edc22e; color: white; font-size: 30px; }
</style>