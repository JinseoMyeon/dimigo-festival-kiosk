import "../styles/components/inputbar.scss"

export default function InputBar(props) {
  const value = props.value || "";
  const placeholder = props.placeholder || "";
  const id = props.id || "";
  const type = props.type || "text";
  
  return (
    <input type={type} id={id} inputMode={props.inputMode || ""} className='inputbar' placeholder={props.placeholder} onChange={props.onChange} value={props.value}/> 
  )
}