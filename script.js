// Get browser size 
var gameScreen = document.querySelector("canvas")
  gameScreen.width = window.innerWidth
  gameScreen.height = window.innerHeight

// Get ball starting position 
var b = gameScreen.getContext("2d")

var radius = 10
var x = Math.floor(Math.random() * gameScreen.width)
var y = Math.floor(Math.random() * gameScreen.height)

// If ball overlaps with browser edge then get another starting position
if (x < radius || y < radius || x > gameScreen.width - radius || y > gameScreen.height - radius) {
  var x = Math.floor(Math.random() * gameScreen.width)
  var y = Math.floor(Math.random() * gameScreen.height)
}

// Randomize ball speed
var vx = Math.floor(Math.random()*5)
var vy = Math.floor(Math.random()*5)

// Randomize speed again if ball stands still 
if (vx === 0 && vy === 0) {
  var vx = Math.floor(Math.random()*5)
  var vy = Math.floor(Math.random()*5)
}

// Initial angle of ball movement
angle = Math.atan(vy/vx)* 180/Math.PI
console.log("góc di chuyển ban đầu :" + angle)

// Create id for animation
var animation

// Ball move function
move = () => {

  // Erase former position of the ball
  b.clearRect(0,0,gameScreen.width,gameScreen.height)

  main()

  animation = requestAnimationFrame(move)

}

// Determine the next position of the ball
main = () => {

  b.beginPath()
  b.strokeStyle = "black"
  b.arc(x,y,radius, 0, Math.PI*2)
  b.stroke()
  b.fillStyle = "red"
  b.fill()
  
  // Ball bounces when touches wall 
  if (radius + x > gameScreen.width || x - radius < 0 ) {
    vx = 0 - vx
  }
  if (radius + y > gameScreen.height ||  y - radius < 0 ) {
    vy = 0 - vy
  }

  // Ball moves to the next position
  x = x - vx
  y = y - vy

}

// Start animation function
start = () => {
  animation = requestAnimationFrame(move);
}

// Stop animation function
stop = () => {
  if (animation) {
    cancelAnimationFrame(animation);
  }
}

// Start the animation
start()

// Use arrow keys to modify speed  
window.addEventListener('keydown', e => {
  switch (e.key) {
      case 'ArrowUp' :
        start()
          break
      case 'ArrowDown' :
        stop()
          break
  }
})

