window.onload = function() {
  canv = document.getElementById("canv")
  ctx = canv.getContext("2d")
  document.addEventListener("keydown", this.keyPressed)
  setInterval(game, 100)
}

// Setting up some global variables
vecX = vecY = 0
gridSize = 20
playerX = playerY = 10
appleX = Math.floor(Math.random() * gridSize)
appleY = Math.floor(Math.random() * gridSize)
tail = []
tailLength = 3
height = canv.height
width = canv.width

// Arrow keys controll
function keyPressed(evt) {
  switch(evt.keyCode) {
    // key: arrow left
    case 37:
      vecX = -1
      vecY = 0
      break
    // key: arrow up
    case 38:
      vecX = 0
      vecY = -1
      break
    // key: arrow right
    case 39:
      vecX = 1
      vecY = 0
      break
    // key: arrow dwon
    case 40:
      vecX = 0
      vecY = 1
      break
  }
}

// Resets game
function reset() {
  this.tailLength = 3
  this.tail = []
  this.playerX = 10
  this.playerY = 10
}

// Actuall game
function game() {
  console.log(playerX, playerY, vecX, vecY, gridSize,tail)
  this.playerX += vecX
  this.playerY += vecY
  if(playerX >= gridSize || playerX < 0 || playerY >= gridSize || playerY < 0) {
    reset()
  }
  if(playerX == appleX && playerY == appleY) {
    tailLength++
    appleX = Math.floor(Math.random() * gridSize)
    appleY = Math.floor(Math.random() * gridSize)
  }

  // Clearing whole thing
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canv.width, canv.height)

  // Drawing apple
  ctx.fillStyle = "red"
  ctx.fillRect(appleX * gridSize + 1, appleY * gridSize + 1, width / gridSize - 1, height / gridSize - 1)

  // Drawing tail and reset if colision occures
  ctx.fillStyle = "green"
  for(box in tail) {
    ctx.fillRect(tail[box].x * gridSize + 1, tail[box].y * gridSize + 1, width / gridSize - 1, height / gridSize - 1)
    if(playerX == tail[box].x && playerY == tail[box].y) {
      reset()
    }
  }

  // Creating tail
  tail.push({x: playerX, y: playerY})
  if(tailLength < tail.length) {
    tail.shift()
  }
}
