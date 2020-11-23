import styles from "../styles/Check.module.css"

export default function Check(props) {
  return (
    <>
      <div className={styles.con}>
      <label class="container" style={{display: "flex", alignItems: "center"}}>
        <input type="checkbox" onChange={e => props.onChange(e)} />
        <span class="checkmark">{props.title}</span>
      </label>
      </div>
    </>
  )
}