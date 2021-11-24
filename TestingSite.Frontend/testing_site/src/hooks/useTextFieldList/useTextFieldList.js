import {useState} from 'react'

export const useTextFieldList = (initial_value) => {
 const [value, setValue] = useState(initial_value)
 const [isError,setIsError] = useState(false);
 const handleChange = (event) => {
  setValue(event.target.value)
 }

 return {
  tags:value,
  onTextFieldChange:handleChange,
  isTagsError:isError
 }
}
export default useTextFieldList;