import filters from "./filters";

module.exports = function(canvasRef, degrees, img) {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    //degree check and rotate canvas
    if(degrees == 360 || degrees == -360) degrees = 0
    if(degrees == 90 || degrees == 270 || degrees == -90 || degrees == -270) {
      canvas.width = img.height
      canvas.height = img.width
    } else {
      canvas.width = img.width
      canvas.height = img.height
    }
    // rotate stuff
    ctx.translate(canvas.width/2,canvas.height/2)
    ctx.rotate(degrees*Math.PI/180)

    //filter
    let filtersArray = []
    for (const e of filters) {
      filtersArray.push(e.join(""))
    }

    //draw the image
    ctx.filter = filtersArray.join(" ");
    ctx.drawImage(img, -img.width/2, -img.height/2)
    ctx.translate(-canvas.width/2,-canvas.height/2)
  } 