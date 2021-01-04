import styles from "../styles/Crop.module.css"
import {useEffect, useRef, useState} from "react"
import Jimp from "jimp"

export default function Crop(props) {
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const saveButtonRef = useRef(null);
  const [context, setContext] = useState(null);

  useEffect(() => {
    console.log(screen.availWidth, screen.availHeight)
    const canvas = canvasRef.current
    const img = new Image()
    img.src = props.imgSrc.toDataURL()
    let mouseDown = false;
    let start = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };
    let canvasOffsetLeft = 0;
    let canvasOffsetTop = 0;
    let cropped = false

    let wrh
    let newWidth
    let newHeight

    let clicked = false

    function handleMouseDown(evt) {
      if(cropped) { return }
      mouseDown = true;

      start = {
        x: evt.clientX - canvasOffsetLeft,
        y: evt.clientY - canvasOffsetTop,
      };
    }

    function handleMouseUp(evt) {
      mouseDown = false;
      if(!context || cropped) {return }
      let width = end.x - start.x
      let height = end.y - start.y
      console.log(width, height)
      cropped = true
    }

    function reset() {
      console.log("test1234")
      if(!context) { return "eeee" }
      canvasRef.current.width = newWidth
      canvasRef.current.height = newHeight
      context.drawImage(img, 0, 0, newWidth , newHeight)
      cropped = false
    }


    function handleMouseMove(evt) {
      if (mouseDown && context && !cropped) {
        end = {
          x: evt.clientX - canvasOffsetLeft,
          y: evt.clientY - canvasOffsetTop,
        };

        const canvas = canvasRef.current
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(img, 0, 0, newWidth , newHeight)
        context.beginPath()
        let width = end.x - start.x
        let height = end.y - start.y
        context.rect(start.x, start.y, width, height)
        context.strokeStyle = "black"
        context.lineWidth = 1
        context.stroke()
      }
    }

    function save() {
      if(clicked) {return}
      clicked = true
      let width = end.x - start.x
      let height = end.y - start.y
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, 0, 0, newWidth , newHeight)
      Jimp.read(canvasRef.current.toDataURL(), (err, i) => {
        if(err) throw Error(err)
        i.crop(start.x, start.y, width, height)
        i.getBase64(Jimp.AUTO, (err, i) => {
          if(err) throw Error(err)
          props.setCropped(false)
          props.img.src = i
          props.setFile(i)
          console.log("jimp",props.img.width)
          console.log("jimp",props.img.height)
          console.log(height, width)
          props.editCanvasRef.current.height = height
          props.editCanvasRef.current.width = width
        });
      })
    }

    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');
      const button = buttonRef.current
      const saveButton = saveButtonRef.current
      button.addEventListener("click", reset)
      saveButton.addEventListener("click", save)

      if (renderCtx) {
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        canvasRef.current.addEventListener('mouseup', handleMouseUp);
        canvasRef.current.addEventListener('mousemove', handleMouseMove);
        img.addEventListener("load", () => {
          wrh = img.width / img.height;
          newWidth = screen.availWidth * 0.6;
          newHeight = newWidth / wrh;
          if (newHeight > screen.availHeight * 0.6) {
            newHeight = screen.availHeight * 0.6;
            newWidth = newHeight * wrh;
          }
          canvasRef.current.width = newWidth
          canvasRef.current.height = newHeight
          renderCtx.drawImage(img, 0, 0, newWidth , newHeight)
          canvasOffsetLeft = canvasRef.current.offsetLeft;
          canvasOffsetTop = canvasRef.current.offsetTop;
        })

        setContext(renderCtx);
      }
    }

    return function cleanup() {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current.removeEventListener('mouseup', handleMouseUp);
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        saveButtonRef.current.removeEventListener("click", save);
        buttonRef.current.removeEventListener("click", reset);
      }
    }
  }, [context]);

  return (
    <main className={styles.main}>
      <div className={styles.imageDiv}>
          <canvas
            id="canvas"
            ref={canvasRef}
          />
      </div>
      <div className={styles.buttons}>
        <button className={styles.b} ref={buttonRef}>Reset</button>
        <button className={styles.b} ref={saveButtonRef}>Save</button>
      </div>
    </main>
  );
}