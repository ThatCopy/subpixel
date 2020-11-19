import styles from "../styles/Slider.module.css"

export default function Silder({title, props}) {
  return (
    <>
      <div className={styles.con}>
        <p>{title}</p>
        <input type="range" min="1" max="100" defaultValue="1" className={styles.slider} />
      </div>
    </>
  )
}