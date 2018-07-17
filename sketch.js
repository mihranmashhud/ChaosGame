let polygon = []
let size = 4000
let radius = size / 2

let sides = Math.floor(_.random(3, 11))
let check = Math.floor(_.random(0, sides - 3))

const timer = {
  interval: null,
  seconds: 10,

  start: function() {
    var self = this

    console.log(this.seconds) // Output initial value
    console.log(`Sides: ${sides} Check: ${check}`)

    this.interval = setInterval(function() {
      self.seconds--

      if (self.seconds == 0) window.location.reload()

      console.clear()
      console.log(self.seconds)
      console.log(`Sides: ${sides} Check: ${check}`)
    }, 1000)
  },

  stop: function() {
    window.clearInterval(this.interval)
  }
}

timer.start()

const rotation = -Math.PI / 2

for (let i = 0; i < sides; i++) {
  polygon.push({
    x: Math.cos((1 / sides) * i * 2 * Math.PI + rotation) * radius,
    y: Math.sin((1 / sides) * i * 2 * Math.PI + rotation) * radius
  })
}

let thePoint = {
  x: Math.cos(_.random(2 * Math.PI)) * Math.cos(Math.PI / sides) * radius,
  y: Math.sin(_.random(2 * Math.PI)) * Math.cos(Math.PI / sides) * radius
}

let nextPoint = {}

const drawPoint = p => point(p.x, p.y)

const midpoint = (p1, p2) => ({
  x: p1.x + (p2.x - p1.x) / 2,
  y: p1.y + (p2.y - p1.y) / 2
})

function setup() {
  createCanvas(size, size)
  translate(size / 2, size / 2)
  background(0, 0, 0)
  strokeWeight(5)
  stroke(255, 255, 255, 50)
  fill(0, 0, 0)
  beginShape()
  for (p of polygon) {
    vertex(p.x, p.y)
  }
  vertex(polygon[0].x, polygon[0].y)
  endShape()
  strokeWeight(0.001)
  stroke(255)
}

let lastIndex = []
for (let i = 0; i < check; i++) {
  lastIndex.push(sides)
}

let index

let speed = 1

const checkIndex = () => {
  for (i of lastIndex) {
    if (i == index) {
      return true
    }
  }
  lastIndex.push(index)
  lastIndex.shift()
  return false
}

function draw() {
  translate(size / 2, size / 2)
  for (let i = 0; i < speed; i++) {
    // map(Math.cos(i*(2*Math.PI)/speed),-1,1,0,255),map(Math.cos(i*(2*Math.PI)/speed+2*Math.PI/3),-1,1,0,255),map(Math.cos(i*(2*Math.PI)/speed+4*Math.PI/3),-1,1,0,255)
    stroke(
      map(Math.cos((i * (2 * Math.PI)) / speed), -1, 1, 0, 255),
      map(
        Math.cos((i * (2 * Math.PI)) / speed + (2 * Math.PI) / 3),
        -1,
        1,
        0,
        255
      ),
      map(
        Math.cos((i * (2 * Math.PI)) / speed + (4 * Math.PI) / 3),
        -1,
        1,
        0,
        255
      )
    )
    do {
      index = Math.floor(_.random(sides - 1))
    } while (checkIndex())
    // index = Math.floor(_.random(sides - 1));
    nextPoint = midpoint(polygon[index], thePoint)
    drawPoint(nextPoint)
    thePoint = nextPoint
  }
  if (speed <= 15000) {
    speed++
  }
}

// const reset = (s, c) => {
//   clear();
//   lastIndex = [];
//   for (let i = 0; i < check; i++) {
//     lastIndex.push(sides);
//   }
//   polygon = [];
//   sides = s;
//   check = c;
//   for (let i = 0; i < sides; i++) {
//     polygon.push({
//       x: Math.cos((1 / sides) * i * 2 * Math.PI + rotation) * radius,
//       y: Math.sin((1 / sides) * i * 2 * Math.PI + rotation) * radius
//     });
//   }
//   translate(size / 2, size / 2);
//   background(0, 0, 0);
//   strokeWeight(1);
//   stroke(0, 255, 0);
//   for (p of polygon) {
//     drawPoint(p);
//   }
//   strokeWeight(0.001);
//   stroke(255);
// };
