import styles from "../styles/Slider.module.css"

export default function Silder(props) {
  return (
    <>
      <div className={styles.con}>
        <p>{props.title}</p>
        {
          props.onChange ?
            <input type="range" min="1" max="100" defaultValue="1" className={styles.slider} onChange={e => props.onChange(e)} />
          :
            <input type="range" min="1" max="100" defaultValue="1" className={styles.slider} />
        }
      </div>
    </>
  )
}