import filters from "./filters"
import ApplyFilter from "./AppyFilter"

function bright(e, canvasRef, degrees, img) {
  filters.set("brightness", `(${e.target.value}%)`)
  ApplyFilter(canvasRef, degrees, img)
}
function blur(e, canvasRef, degrees, img) {
  filters.set("blur", `(${e.target.value}px)`)
  ApplyFilter(canvasRef, degrees, img)
}
function sepia(e, canvasRef, degrees, img) {
  filters.set("sepia", `(${e.target.value}%)`)
  ApplyFilter(canvasRef, degrees, img)
}
function sat(e, canvasRef, degrees, img) {
  filters.set("saturate", `(${e.target.value}%)`)
  ApplyFilter(canvasRef, degrees, img)
}

function contr(e, canvasRef, degrees, img) {
  filters.set("contrast", `(${e.target.value}%)`)
  ApplyFilter(canvasRef, degrees, img)
}

function gray(e, canvasRef, degrees, img) {
  if (e.target.checked === true) {filters.set("grayscale", `(100%)`); ApplyFilter(canvasRef, degrees, img);}
  else {filters.set("grayscale", `(0%)`); ApplyFilter(canvasRef, degrees, img);}
}


module.exports = {
    bright,
    blur,
    sepia,
    sat,
    contr,
    gray
}