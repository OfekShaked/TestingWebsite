import {useState} from 'react'

export const useSelect = (initial_value) => {
 const [value, setValue] = useState(initial_value)
 const handleChange = (event) => {
    setValue(event.target.value)
 }

 return [
  value,
  handleChange,
 ]
}
export default useSelect;