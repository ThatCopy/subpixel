import styles from "../styles/Slider.module.css"

export default function Silder(props) {
  return (
    <>
      <div className={styles.con}>
        <p>{props.title}</p>
        {
          props.onChange ?
            <input type="range"  className={styles.slider} onChange={e => props.onChange(e)} {...props} />
          :
            <input type="range"  className={styles.slider} {...props} />
        }
      </div>
    </>
  )
}