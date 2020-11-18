import { useContext, useState } from "react"
import FileContext from "../components/FileContext"
import { useRouter } from 'next/router'
import styles from "../styles/Edit.module.css"
import Jimp from 'jimp/es';

export default function Edit() {
    const { file, setFile } = useContext(FileContext);
    const router = useRouter()

    const [dScale, setDScale] = useState(1)

    let stl = {
        transform: "scale("+ dScale +")"
    }

    if(!file) {
        return (<h2 onClick={() => router.push("/")}>No file provided, click to go home</h2>)
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

    return (
    <div
        className={styles.cont}
        onDragOver={pD}
        onDragEnter={pD}
        onDragLeave={pD}
        onDrop={pD}
    >
        <div className={styles.img}>
            <img src={file} style={stl} />
        </div> 
        <div className={styles.tools}>
            <div className={styles.toolsBar}>
                <img src="arrow-clockwise.svg" onClick={() => rotate(90)}/>
                <img src="arrow-counter-clockwise.svg" onClick={() => rotate(-90)}/>
                <img src="arrows-out-simple.svg"/>
                <img src="crop.svg"/>
                <img src="magnifying-glass-plus.svg"onClick={() => zoom(0.25)}/>
                <img src="magnifying-glass-minus.svg"onClick={() => zoom(-0.25)}/>
            </div>
            Hello    
        </div> 
    </div>
    )
}