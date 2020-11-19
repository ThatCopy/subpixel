import styles from "../styles/Check.module.css"

export default function Check({title, props}) {
  return (
    <>
      <div className={styles.con}>
      <label class="container" style={{display: "flex", alignItems: "center"}}>
        <input type="checkbox" />
        <span class="checkmark">{title}</span>
      </label>
      </div>
    </>
  )
}