const canvas = document.createElement("canvas");
canvas.width = 700; canvas.height = 400;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let paddleH = 100, paddleW = 16;
let p1y = canvas.height/2-paddleH/2, p2y = p1y;
let p1score = 0, p2score = 0;
let ball = { x: canvas.width/2, y: canvas.height/2, vx: 5, vy: 3, r: 12 };

function drawRect(x,y,w,h,col) {
  ctx.fillStyle = col; ctx.fillRect(x,y,w,h);
}
function drawBall(b) {
  ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 2*Math.PI);
  ctx.fillStyle = "#fff"; ctx.fill();
}
function resetBall() {
  ball.x = canvas.width/2; ball.y = canvas.height/2;
  ball.vx = 5 * (Math.random()>0.5?1:-1);
  ball.vy = (Math.random()*6-3);
}
function drawText(txt, x, y, size=32) {
  ctx.fillStyle = "#fff"; ctx.font = size+"px Arial"; ctx.fillText(txt,x,y);
}

document.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  p1y = e.clientY - rect.top - paddleH/2;
});
setInterval(() => {
  ctx.fillStyle = "#111"; ctx.fillRect(0,0,canvas.width,canvas.height);
  // Draw paddles
  drawRect(10,p1y,paddleW,paddleH,"#0f0");
  drawRect(canvas.width-26,p2y,paddleW,paddleH,"#f00");
  // Move AI
  p2y += (ball.y - (p2y+paddleH/2)) * 0.06;
  // Draw ball
  drawBall(ball);
  // Ball update
  ball.x += ball.vx; ball.y += ball.vy;
  if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) ball.vy *= -1;
  // Paddle collisions
  if (ball.x-ball.r < 26 && ball.y > p1y && ball.y < p1y+paddleH) ball.vx *= -1;
  if (ball.x+ball.r > canvas.width-26 && ball.y > p2y && ball.y < p2y+paddleH) ball.vx *= -1;
  // Score
  if (ball.x < 0) { p2score++; resetBall(); }
  if (ball.x > canvas.width) { p1score++; resetBall(); }
  // Draw scores
  drawText(p1score, canvas.width/4, 40);
  drawText(p2score, 3*canvas.width/4, 40);
}, 1000/60);