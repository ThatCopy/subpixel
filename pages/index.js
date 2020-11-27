import styles from '../styles/Home.module.css'
import { useState } from "react"
import Edit from '../components/Edit';
import Jimp from "jimp";
import Head from 'next/head'

export default function Home() {

  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState();
  const [ready, setReady] = useState(false);

  const pD = (e) => {e.preventDefault()}
 
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
    if (validateFile(file)) {
        setErrorMessage("")
        Jimp.read(URL.createObjectURL(file), (err, img) => {
          img.getBase64(Jimp.AUTO, (err, img) => {
            if(err) throw err;
            setFile(img)
        });
        })
        setReady(true)
    } else {
        setErrorMessage('Bad file type');
    }
  }
  return ready && file ? <div>
    <Head>
      <title>subpixel</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content="subpixel by copy" key="title" />
    </Head>
    <Edit file={file} />
  </div> : (
    <div
      onDragOver={pD}
      onDragEnter={pD}
      onDragLeave={pD}
      onDrop={fileDrop}
      className={styles.drag}
    >
      <Head>
        <title>subpixel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="subpixel by copy" key="title" />
      </Head>
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
          <img alt="upload" className={styles.icon} />
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
