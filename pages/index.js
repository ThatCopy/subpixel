import styles from '../styles/Home.module.css'
import { useState, useContext } from "react"
import { useRouter } from 'next/router'
import FileContext from "../components/FileContext"
import Jimp from 'jimp/es';

export default function Home() {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState('');
  const { file, setFile } = useContext(FileContext);

  const pD = (e) => {e.preventDefault()}
 
  function toBase(blob) {   
    let reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
        var base64data = reader.result;                
        return base64data;
    }
  }
  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length === 1) {
        handleFiles(files[0]);
    } else {
      setErrorMessage("Too many files")
    }
  }  

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (validTypes.indexOf(file.type) === -1) {
        return false;
    }
    return true;
  }

  const handleFiles = (file) => {
    console.log(file)
    if (validateFile(file)) {
        console.log(file)
        setErrorMessage("")
        Jimp.read(URL.createObjectURL(file), (err, img) => {
          img.getBase64(Jimp.MIME_PNG, (err, img) => {
            if(err) throw err;
            setFile(img)
        });
        })
        router.push("/edit")
    } else {
        setErrorMessage('Bad file type');
    }
  }
  return (
    <div
      onDragOver={pD}
      onDragEnter={pD}
      onDragLeave={pD}
      onDrop={fileDrop}
      className={styles.drag}
    >
    <div className={styles.container}>
      <div className={styles.image}>
        { errorMessage ? 
          <>
          <img src="cloud-slash.svg" alt="upload" className={styles.icon} />
          <div className={styles.text}>
            <h3>{errorMessage}</h3>
            <span className={styles.fo}>supported formats: png, jpg, webp</span>
          </div>
        </>
        :
          <>
          <img src="Frame 3.svg" alt="upload" className={styles.icon} />
          <div className={styles.text}>
            <h3>Drag and drop a photo</h3>
            <span className={styles.fo}>supported formats: png, jpg, webp</span>
          </div>
        </>
        }
      </div>
    </div>
    </div>
  )
}
