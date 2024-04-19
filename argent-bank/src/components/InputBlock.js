const InputBlock = ({classes, type, id, label, val, disabled, onChange}) => {
  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={val} disabled={disabled} onChange={onChange} />
    </div>
  )
}

export default InputBlock