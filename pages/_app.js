import '../styles/globals.css'
import FileContext from "../components/FileContext"
import {useState} from "react"
function MyApp({ Component, pageProps }) {
  const [file, setFile] = useState(null);
  const value = { file, setFile };

  return <FileContext.Provider value={value}><Component {...pageProps} /></FileContext.Provider>
}

export default MyApp
