var gameScreen = document.querySelector("canvas")
  gameScreen.width = window.innerWidth
  gameScreen.height = window.innerHeight

var b = gameScreen.getContext("2d")

var radius = 10
var x = Math.floor(Math.random() * gameScreen.width)
var y = Math.floor(Math.random() * gameScreen.height)

if (x < radius || y < radius || x > gameScreen.width - radius || y > gameScreen.height - radius) {
  var x = Math.floor(Math.random() * gameScreen.width)
  var y = Math.floor(Math.random() * gameScreen.height)
}

var vx = Math.floor(Math.random()*5)
var vy = Math.floor(Math.random()*5)

if (vx === 0 && vy === 0) {
  var vx = Math.floor(Math.random()*5)
  var vy = Math.floor(Math.random()*5)
}

angle = Math.atan(vy/vx)* 180/Math.PI
console.log("góc di chuyển ban đầu :" + angle)

var animation

speed = () => {

  b.clearRect(0,0,gameScreen.width,gameScreen.height)

  main()

  animation = requestAnimationFrame(speed)

}

main = () => {

  b.beginPath()
  b.strokeStyle = "black"
  b.arc(x,y,radius, 0, Math.PI*2)
  b.stroke()
  b.fillStyle = "red"
  b.fill()
  
  if (radius + x > gameScreen.width) {
    vx = 0 - vx
  }
  if (x - radius < 0) {
    vx = 0 - vx
  }
  if (radius + y > gameScreen.height) {
    vy = 0 - vy
  }
  if ( y - radius < 0 ) {
    vy = 0 - vy
  }
  x = x - vx
  y = y - vy

}

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

function start() {
  animation = requestAnimationFrame(speed);
}
function stop() {
  if (animation) {
    cancelAnimationFrame(animation);
  }
}

start()