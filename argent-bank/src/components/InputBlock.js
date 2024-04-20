const InputBlock = ({classes, type, id, label, val, placeholder, disabled, onChange, onFocus}) => {
  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={val} placeholder={placeholder} disabled={disabled} onChange={onChange} onFocus={onFocus} />
    </div>
  )
}

export default InputBlock