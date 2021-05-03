const canvas = document.getElementById("JsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

const INITIAL_COLOR = "black";
const CANVAS_SIZE_X = 1500;
const CANVAS_SIZE_Y = 1000;

let painting = false;

canvas.width = CANVAS_SIZE_X;
canvas.height = CANVAS_SIZE_Y;

ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 5;

function startPainting(event) {
  painting = true;
}
function stopPainting(event) {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const colorr = event.target.style.backgroundColor;
  console.log(colorr);
  ctx.strokeStyle = colorr;
  ctx.fillStyle = colorr;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
