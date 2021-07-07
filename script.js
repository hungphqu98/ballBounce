// Lấy kích thước browser 
var gameScreen = document.querySelector("canvas")
  gameScreen.width = window.innerWidth
  gameScreen.height = window.innerHeight

// Vẽ quả bóng 
var b = gameScreen.getContext("2d")

var radius = 10
var x = Math.floor(Math.random() * gameScreen.width)
var y = Math.floor(Math.random() * gameScreen.height)

// Nếu vị trí bóng chèn vào viền browser thì lấy lại  
if (x < radius || y < radius || x > gameScreen.width - radius || y > gameScreen.height - radius) {
  var x = Math.floor(Math.random() * gameScreen.width)
  var y = Math.floor(Math.random() * gameScreen.height)
}

// Lấy vận tốc của bóng
var vx = Math.floor(Math.random()*5)
var vy = Math.floor(Math.random()*5)

// Nếu bóng đứng yên thì lấy lại vận tốc  
if (vx === 0 && vy === 0) {
  var vx = Math.floor(Math.random()*5)
  var vy = Math.floor(Math.random()*5)
}

// Góc di chuyển ban đầu của quả bóng 
angle = Math.atan(vy/vx)* 180/Math.PI
console.log("góc di chuyển ban đầu :" + angle)

// Tạo id cho animation
var animation

// Hàm chuyển động
move = () => {

  // Xóa vị trí cũ của bóng
  b.clearRect(0,0,gameScreen.width,gameScreen.height)

  main()

  animation = requestAnimationFrame(move)

}

// Hàm xác định vị trí tiếp theo của bóng
main = () => {

  b.beginPath()
  b.strokeStyle = "black"
  b.arc(x,y,radius, 0, Math.PI*2)
  b.stroke()
  b.fillStyle = "red"
  b.fill()
  
  // Nếu bóng chạm vào tường thì bật ngược lại  
  if (radius + x > gameScreen.width || x - radius < 0 ) {
    vx = 0 - vx
  }
  if (radius + y > gameScreen.height ||  y - radius < 0 ) {
    vy = 0 - vy
  }

  // Bóng di chuyển đến vị trí tiếp theo
  x = x - vx
  y = y - vy

}

// Hàm bắt đầu chuyển động
start = () => {
  animation = requestAnimationFrame(move);
}

// Hàm dừng chuyển động
stop = () => {
  if (animation) {
    cancelAnimationFrame(animation);
  }
}

// Gọi hàm bắt đầu chuyển động
start()

// Gán nút mũi tên để điều khiển chuyển động  
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

