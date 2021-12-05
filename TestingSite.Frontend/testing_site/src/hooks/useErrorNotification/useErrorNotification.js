import {useState} from 'react'

export const useErrorNotification = () => {
 const [error, setError] = useState("")
 const [isOpen,setIsOpen] = useState(false);

 return [
  error,
  setError,
  isOpen,
  setIsOpen
 ]
}
export default useErrorNotification;