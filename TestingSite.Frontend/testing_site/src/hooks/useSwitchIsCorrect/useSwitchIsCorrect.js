import {useState} from 'react'

export const useSwitchIsCorrect = (props) => {
 const [checked, setChecked] = useState(props.initial_value)
 const handleChange = (event) => {
     if(props.IsChangeAllowed) setChecked(event.target.value)
 }

 return {
  checked,
  onChange:handleChange,
 }
}
export default useSwitchIsCorrect;