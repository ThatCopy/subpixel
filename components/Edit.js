import { useState, useRef, useEffect } from "react"
import styles from "../styles/Edit.module.css"
import Silder from "../components/Slider"
import Check from "../components/Check"
import { saveAs } from 'file-saver'
import filters from "../utils/filters"
import ApplyFilter from "../utils/AppyFilter"


export default function Edit(props) {
  const file = props.file
  var img = new Image()
  img.src = file
  
  const canvasRef = useRef(null)
  const [dScale, setDScale] = useState(40)
  
  let degrees = 0;
  let stl = {
    width: dScale + "%",
    height: "auto"
  }
  
  const pD = (e) => {e.preventDefault()}
  
  function zoom(s) {
    console.log(img)
    setDScale(dScale + s)
    console.log(img)
  }
  
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    img.addEventListener('load', function() {
      ctx.canvas.width = img.width
      ctx.canvas.height = img.height
      ctx.drawImage(img, 0, 0)
    }, false)
    }, [])

    function bright(e) {
      filters.set("brightness", `(${e.target.value}%)`)
      console.log(img)
      ApplyFilter(canvasRef, degrees, img)
    }
    function blur(e) {
      filters.set("blur", `(${e.target.value}px)`)
      ApplyFilter(canvasRef, degrees, img)
    }
    function sepia(e) {
      filters.set("sepia", `(${e.target.value}%)`)
      ApplyFilter(canvasRef, degrees, img)
    }
    function sat(e) {
      filters.set("saturate", `(${e.target.value}%)`)
      ApplyFilter(canvasRef, degrees, img)
    }
    
    function contr(e) {
      filters.set("contrast", `(${e.target.value}%)`)
      ApplyFilter(canvasRef, degrees, img)
    }
    
    function gray(e) {
      if (e.target.checked === true) {filters.set("grayscale", `(100%)`); ApplyFilter(canvasRef, degrees, img);}
      else {filters.set("grayscale", `(0%)`); ApplyFilter(canvasRef, degrees, img);}
    }

    function save() {
      const canvas = canvasRef.current
      saveAs(canvas.toDataURL(), "out.png")
    }
  
  
  return (
    <div
    className={styles.cont}
    onDragOver={pD}
    onDragEnter={pD}
    onDragLeave={pD}
    onDrop={pD}
    >
      <div className={styles.img}>
        <canvas ref={canvasRef} style={stl}></canvas>
      </div> 
      <div className={styles.tools}>
        <div className={styles.toolsBar}>
          <img src="arrow-clockwise.svg" onClick={() => {degrees = degrees + 90; ApplyFilter(canvasRef, degrees, img)}}/>
          <img src="arrow-counter-clockwise.svg" onClick={() => {degrees = degrees - 90; ApplyFilter(canvasRef, degrees, img)}}/>
          <img src="crop.svg" onClick={() => alert("comming soon ;)")} />
          <img src="magnifying-glass-plus.svg"onClick={() => zoom(5)}/>
          <img src="magnifying-glass-minus.svg"onClick={() => zoom(-5)}/>
          <img src="floppy-disk.svg" style={{marginLeft: "15px"}} onClick={() => save()}/>
        </div>
        <div className={styles.adjustments}>
          <h1>Adjustments</h1>
          <Silder title="Brightness" min="0" max="200" defaultValue="100" onChange={e => bright(e, canvasRef, degrees, img)} />
          <Silder title="Contrast" min="0" max="200" defaultValue="100" onChange={e => contr(e, canvasRef, degrees, img)}/>
          <Silder title="Saturation" min="0" max="200" defaultValue="100" onChange={e => sat(e, canvasRef, degrees, img)} />
          <Check title="Grayscale" onChange={e => gray(e, canvasRef, degrees, img)} />
        </div>  
        <div className={styles.adjustments}>
          <h1>Blur</h1>
          <Silder title="" min="0" max="10" defaultValue="0" step="0.001" onChange={e => blur(e, canvasRef, degrees, img)} />
        </div>  
        <div className={styles.adjustments}>
          <h1>Effects</h1>
          <Silder title="Sepia" min="0" max="100" defaultValue="0" onChange={e => sepia(e, canvasRef, degrees, img)} />
        </div>
      </div>
    </div>
  )
}