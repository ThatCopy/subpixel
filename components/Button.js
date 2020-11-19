import styles from "../styles/Button.module.css"

export default function Button({src, w, h, i, click, props}) {
    let stylB = {
        width: w+"rem",
        height: h+"rem"
    }
    let stylI = {width: i+"rem"}
    return (
        <>
            <button className={styles.b} style={stylB} onClick={() => click()} ><img src={src} style={stylI} /></button>
        </>
    )
}