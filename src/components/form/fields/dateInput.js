import React from 'react'
import styled from 'styled-components'
import { Input } from '../../ui/leadexchangeUI';

const inputStyle = {
  border: '1px solid white',
  // borderRadius:4
}
const inputErrorStyle = {
  // boxShadow: '0 0 0 2px rgba(245, 34, 45, 0.2)',
  // border: '1px solid #ea8a8f',
  // borderRadius:4
}

const DateInput = ({values, setFieldValue, field, name, required, fields, placeholder, inputWidth, icon, type, label, value, error, touched, onChange, onBlur, wrapStyle, hideLabels, enableEnter, onEnter}) => {

  return(<div style={{...wrapStyle,width:inputWidth,inputWidth}}> 
    {!hideLabels && <FieldLabel htmlFor="email"
      style={error && touched ? {color:'#e6303a'} : {}}>
      {`${label}${required?'*':''} ${error && touched ? `(Required)` : ''}`}
    </FieldLabel>}

<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:220}}>
      <Input
        name={name}
        id='date1'
        placeholder={'00'}
        value={value&&value['0']}
        style={{width:50}}
        onChange={(e)=>{
          const val = value ? {...value} : {'0':'','1':'','2':''}
          if (e.target.value.length>2) return
          val['0'] = e.target.value
          setFieldValue(name, val)
          }}
      />
<span>/</span>
    <Input
        name={name}
        id='date2'
        value={value&&value['1']}
        style={{width:50}}
        placeholder={'00'}
        onChange={(e)=>{
          const val = value ? {...value} : {'0':'','1':'','2':''}
          if (e.target.value.length>2) return
          val['1'] = e.target.value
          setFieldValue(name, val)
          }}
      />
<span>/</span>
    <Input
        name={name}
        id='date3'
        placeholder={'2020'}
        value={value&&value['2']}
        style={{width:70}}
        onChange={(e)=>{
          const val = value ? {...value} : {'0':'','1':'','2':''}
          if (e.target.value.length>4) return
          val['2'] = e.target.value
          setFieldValue(name, val)
          }}
      />
      </div>
    
  </div>)
}

const FieldLabel = styled.label`
font-weight: thin;
color: #666666;
font-size: 16px;
font-weight:500;
`

export default DateInput
