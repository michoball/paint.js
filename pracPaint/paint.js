const canvas = document.getElementById("JsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE_X = 1500;
const CANVAS_SIZE_Y = 1000;

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE_X;
canvas.height = CANVAS_SIZE_Y;

ctx.fillStyle = "wheat";
ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 5;

function startPainting(event) {
  if (event.button === 0) {
    painting = true;
  }
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

  ctx.strokeStyle = colorr;
  ctx.fillStyle = colorr;
}

function handleRange(event) {
  const stroke = event.target.value;
  ctx.lineWidth = stroke;
}

function handleMode(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function handleborad(event) {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSave(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "SAVE_IMG";
  link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleborad);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRange);
}

if (mode) {
  mode.addEventListener("click", handleMode);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSave);
}
