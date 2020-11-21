import { useContext, useState, useEffect } from "react"
import FileContext from "../components/FileContext"
import { useRouter } from 'next/router'
import styles from "../styles/Edit.module.css"
import Jimp from 'jimp/es';
import Silder from "../components/Slider";
import Check from "../components/Check";
import { saveAs } from 'file-saver';
import b64toBlob from "../utils/b64toBlob";

export default function Edit() {
  const { file, setFile } = useContext(FileContext);
  
  const router = useRouter()
  
  if(!file && typeof window !== 'undefined'){
    router.push("/")
  }

  const [resize, setResize] = useState()
  const [crop, setCrop] = useState(false)
  const [dScale, setDScale] = useState(1)
  const [err, setErr] = useState("")
  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [defImg, setDefImg] = useState()
  var [adj, setAd] = useState([0 /* bright */, 0 /* cont */, 0 /* blur */, 0 /* sepia */, 0/* pixel */])
  
  let stl = {
    transform: "scale(" + dScale + ")"
  }


  const pD = (e) => {e.preventDefault()}
  
  function rotate(deg) {
    Jimp.read(file, (err, img) => {
      if(err) throw err;
      img.rotate(deg)
      img.getBase64(Jimp.MIME_PNG, (err, img) => {
        if(err) throw err;
        setFile(img)
      });
    })
  }
  
  function zoom(s) {
    setDScale(dScale + s)
    console.log(dScale)
  }

  function resizeF() {
    setResize(true)
  }

  function cropF() {
    setCrop(true) 
  }

  function rsz() {
    if(!/^\d+$/.test(x) || !/^\d+$/.test(y)) setErr("The size is invalid")
    setErr("")
    Jimp.read(file, (err, img) => {
      if(err) throw err;
      img.resize(Number(x), Number(y))
      img.getBase64(Jimp.MIME_PNG, (err, img) => {
        if(err) throw err;
        setFile(img)
        setResize(false)
      });
    })
  }

  function bright(e) {
    setAd([e.target.value / Math.pow(10, 2), adj[1], adj[2], adj[3], adj[4]])
    setAdj()
   }

  function cont(e) {
    setAd([adj[0], e.target.value / Math.pow(10, 2), adj[2], adj[3], adj[4]])
    setAdj()
  }

  function save( ) {
    saveAs(b64toBlob("data:image/jpeg;base64" + file), "out.png")
  }

  function setAdj() {
    console.log(adj)
    if(!defImg) {
      Jimp.read(file, (err, img) => {
        img.brightness(adj[0])
        img.contrast(adj[1])
        img.getBase64(Jimp.MIME_PNG, (err, img) => {
          if(err) throw err;
          setFile(img)
          setDefImg(img)
        });
      })
    }
    else {
      Jimp.read(defImg, (err, img) => {
        img.brightness(adj[0])
        img.contrast(adj[1])
        img.getBase64(Jimp.MIME_PNG, (err, img) => {
          if(err) throw err;
          setFile(img)
        });
      })
    }
  }

  return (
    <div
      className={styles.cont}
      onDragOver={pD}
      onDragEnter={pD}
      onDragLeave={pD}
      onDrop={pD}
    >
      { crop ?
        <div className={styles.img} style={{ opacity: resize ? "0.5" : "1" }}>
          <img src={file} style={stl} />
        </div> 
      :
      <div className={styles.img} style={{ opacity: resize ? "0.5" : "1" }}>
        <img src={file} style={stl} />
      </div> 
      }
      <div className={styles.tools} style={{ opacity: resize ? "0.5" : "1" }}>
        <div className={styles.toolsBar}>
        <img src="arrow-clockwise.svg" onClick={() => rotate(90)}/>
        <img src="arrow-counter-clockwise.svg" onClick={() => rotate(-90)}/>
        <img src="arrows-out-simple.svg" onClick={() => resizeF()}/>
        <img src="crop.svg" onClick={() => cropF()} />
        <img src="magnifying-glass-plus.svg"onClick={() => zoom(0.10  )}/>
        <img src="magnifying-glass-minus.svg"onClick={() => zoom(-0.10)}/>
        <img src="floppy-disk.svg" style={{marginLeft: "15px"}} onClick={() => save()}/>
      </div>
        <div className={styles.adjustments}>
          <h1>Adjustments</h1>
          <Silder title="Brightness" onChange={bright} />
          <Silder title="Contrast" onChange={cont} />
          <Check title="Grayscale" />
        </div>  
        <div className={styles.adjustments}>
          <h1>Blur</h1>
          <Silder title="" />
        </div>  
        <div className={styles.adjustments}>
          <h1>Effects</h1>
          <Silder title="Sepia" />
          <Silder title="Pixelate" />
        </div>
      </div>
      {resize ? <div className={styles.popup}>
        <div className={styles.pop}>
          <h2 style={{ padding: 5, fontSize: 40 }}>Resize</h2>
            <img src="x-circle.svg" style={{width: 30}} onClick={() => setResize(false)} />
          </div>
          <div className={styles.nums}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <h3 style={{paddingRight: "5px"}}>w</h3>
              <input name="x" type="number" min="1" value={x} onChange={(e) => setX(e.target.value)} />
            </div>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} >
              <h3 style={{paddingRight: "5px"}}>h</h3>
              <input name="y" type="number" min="1" value={y} onChange={(e) => setY(e.target.value)} />
            </div>
          </div>
          <h4 style={{color: "red", textAlign: "center" }}>{err}</h4>
          <button className={styles.saveBut} onClick={() => rsz()}><img src="check.svg" /></button>
        </div> : null}
    </div>
  )
}