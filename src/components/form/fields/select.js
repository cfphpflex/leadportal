import React, {useEffect,useState} from 'react'
import { Select } from '../../ui/leadexchangeUI'
import EE from '../../utils/events'

const S = (props) => {
  const { name, onChange, setFieldValue, values } = props
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    EE.on(name,(e)=>{
      console.log('emitted!',e)
      setDisabled(e)})
  }, [])

  return <Select
          {...props}
          disabled={disabled}
          onChange={(e)=>{
            if (name==='role'){
              if (e.name!=='surgeon') EE.emit('surgeon',false)
              else EE.emit('surgeon',true)
            }
            setFieldValue(name, e)
          }}
          />
}

export default S
