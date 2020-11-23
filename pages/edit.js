import { useContext, useState, useRef, useEffect } from "react"
import FileContext from "../components/FileContext"
import { useRouter } from 'next/router'
import styles from "../styles/Edit.module.css"
import Silder from "../components/Slider";
import Check from "../components/Check";
import { saveAs } from 'file-saver';
import Jimp from "jimp";

export default function Edit() {
  const { file, setFile } = useContext(FileContext);
  const canvasRef = useRef(null)
  const router = useRouter()
  
  if(!file && typeof window !== 'undefined'){
    router.push("/")
  }

  const [resize, setResize] = useState()
  const [dScale, setDScale] = useState(1)

  let degrees = 0;

  let stl = {
    transform: "scale(" + dScale + ")"
  }


  const pD = (e) => {e.preventDefault()}



  function zoom(s) {
    setDScale(dScale + s)
    console.log(dScale)
  }


  let filters = new Map([
    ["contrast", "(100%)"],
    ["brightness", "(100%)"],
    ["grayscale", "(0%)"],
    ["blur", "(0px)"],
    ["saturate", "(100%)"],
    ["sepia", "(0%)"]
  ])

  var img = new Image()
  img.src = file;

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d');

    img.addEventListener('load', function() {
      ctx.canvas.width = img.width
      ctx.canvas.height = img.height
      ctx.drawImage(img, 0, 0)
    }, false);
      
    }, [])

    function ApplyFilter() {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d');
      //degree check and rotate canvas
      if(degrees == 360 || degrees == -360) degrees = 0
      if(degrees == 90 || degrees == 270 || degrees == -90 || degrees == -270) {
        canvas.width = img.height
        canvas.height = img.width
      } else {
        canvas.width = img.width
        canvas.height = img.height
      }
      // stuff idk
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

    function bright(e) {
      filters.set("brightness", `(${e.target.value}%)`)
      ApplyFilter(-img.width/2, -img.height/2)
    }

    function contr(e) {
      filters.set("contrast", `(${e.target.value}%)`)
      ApplyFilter()
    }
    function gray(e) {
      if (e.target.checked === true) {filters.set("grayscale", `(100%)`); ApplyFilter();}
      else {filters.set("grayscale", `(0%)`); ApplyFilter();}
    }
    function blur(e) {
      filters.set("blur", `(${e.target.value}px)`)
      ApplyFilter()
    }
    function sepia(e) {
      filters.set("sepia", `(${e.target.value}%)`)
      ApplyFilter()
    }
    function sat(e) {
      filters.set("saturate", `(${e.target.value}%)`)
      ApplyFilter()
    }

    function rotate() {
      ApplyFilter()
    }

    function save( ) {
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
      <div className={styles.img} style={{ opacity: resize ? "0.5" : "1" }}>
        <canvas ref={canvasRef} style={stl}></canvas>
      </div> 
      <div className={styles.tools} style={{ opacity: resize ? "0.5" : "1" }}>
        <div className={styles.toolsBar}>
        <img src="arrow-clockwise.svg" onClick={() => {degrees = degrees + 90; rotate()}}/>
        <img src="arrow-counter-clockwise.svg" onClick={() => {degrees = degrees - 90; rotate()}}/>
        <img src="crop.svg" onClick={() => alert("comming soon ;)")} />
        <img src="magnifying-glass-plus.svg"onClick={() => zoom(0.10)}/>
        <img src="magnifying-glass-minus.svg"onClick={() => zoom(-0.10)}/>
        <img src="floppy-disk.svg" style={{marginLeft: "15px"}} onClick={() => save()}/>
      </div>
        <div className={styles.adjustments}>
          <h1>Adjustments</h1>
          <Silder title="Brightness" min="0" max="200" defaultValue="100" onChange={bright} />
          <Silder title="Contrast" min="0" max="200" defaultValue="100" onChange={contr}/>
          <Silder title="Saturation" min="0" max="200" defaultValue="100" onChange={sat} />
          <Check title="Grayscale" onChange={gray} />
        </div>  
        <div className={styles.adjustments}>
          <h1>Blur</h1>
          <Silder title="" min="0" max="10" defaultValue="0" step="0.001" onChange={blur} />
        </div>  
        <div className={styles.adjustments}>
          <h1>Effects</h1>
          <Silder title="Sepia" min="0" max="100" defaultValue="0" onChange={sepia} />
        </div>
      </div>
    </div>
  )
}