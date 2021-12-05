import {useState} from 'react'

export const useSwitchIsCorrect = (props) => {
 const [checked, setChecked] = useState(props.initial_value)
 const handleChange = (event) => {
     setChecked(!checked)
 }

 return [
  checked,
  handleChange,
 ]
}
export default useSwitchIsCorrect;