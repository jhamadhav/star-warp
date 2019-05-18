var canvas, ctx, w, h;
var speed, stars, num;

//event listeners
window.addEventListener("resize", init);
window.addEventListener("load", init);

//to control speed
window.addEventListener("mousemove", function(e) {
  speed = (e.clientX / w) * 0.33;
});
window.addEventListener("touchmove", function(e) {
  for (let i = 0; i < e.touches.length; i++) {
    speed = (e.touches[i].pageX / w) * 0.36;
  }
});

//initial funtion
function init() {
  //setting things up
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.translate(w / 2, h / 2);
  ctx.strokeStyle = "white";

  //emptying stuff and setting new
  stars = [];
  speed = 0.05;
  num = w > 700 ? 600 : 300;

  //generating stars
  for (let i = 0; i < num; i++) {
    stars.push(new Star());
  }
  //console.log(stars);
  //drawing or animating the stars
  animate();
}

function animate() {
  //clearing canvas
  ctx.fillStyle = "rgba(10, 19, 38,0.45)";
  ctx.fillRect(-w / 2, -h / 2, w, h);

  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].connect();
  }

  requestAnimationFrame(animate);
}

class Star {
  constructor() {
    this.x = Math.random() * w - w / 2;
    this.y = Math.random() * h - h / 2;
    this.z = Math.random() * 4;
    this.px;
    this.py;
  }
  update() {
    this.px = this.x;
    this.py = this.y;
    this.z += speed;
    this.x += this.x * (speed * 0.02) * this.z;
    this.y += this.y * (speed * 0.02) * this.z;
    if (
      this.x > w / 2 + 50 ||
      this.x < -w / 2 - 50 ||
      this.y > h / 2 + 50 ||
      this.y < -h / 2 - 50
    ) {
      this.x = Math.random() * w - w / 2;
      this.y = Math.random() * h - h / 2;
      this.px = this.x;
      this.py = this.y;
      this.z = 0;
    }
  }
  connect() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.lineWidth = this.z / 2;
    ctx.beginPath();
    ctx.arc(this.px, this.py, this.z / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.px, this.py);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.z / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
