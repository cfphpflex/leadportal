import React, {useState} from 'react'
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

const inputs = [
  {
    symbol:'('
  },
  {
    digits:3,
    placeholder:'000',
    width:60,
    index:'0'
  },
  {
    symbol:')'
  },
  {
    digits:3,
    placeholder:'000',
    width:60,
    index:'1'
  },
  {
    symbol:'-'
  },
  {
    digits:4,
    placeholder:'0000',
    width:70,
    index:'2'
  },
]



const PhoneInput = ({values, setFieldValue, field, name, required, fields, placeholder, inputWidth, icon, type, label, value, error, touched, onChange, onBlur, wrapStyle, hideLabels, enableEnter, onEnter}) => {

  return(<div style={{...wrapStyle,width:inputWidth,inputWidth}}> 
    {!hideLabels && <FieldLabel htmlFor="email"
      style={error && touched ? {color:'#e6303a'} : {}}>
      {`${label}${required?'*':''} ${error && touched ? `(Required)` : ''}`}
    </FieldLabel>}

<div style={{display:'flex',justifyContent:'space-between',
alignContent:'center',alignItems:'center',width:248,marginTop:10,
marginBottom: 25}}>
  {
    inputs.map((o,i)=>{
    
    if (o.symbol) return <div key={i}>{o.symbol}</div>

    let reg = /^(\s*|\d+)$/;
    return <Input
          key={i}
          name={name}
          id={'phone'+i}
          placeholder={o.placeholder}
          value={value?value[o.index]:''}
          type="tel"
          style={{width:o.width,margin:0}}
          onChange={(e)=>{
            let curVal = e.target.value
            const val = value ? {...value} : {'0':'','1':'','2':''}

            if (!reg.test(curVal)||curVal.length>o.digits) return

            val[o.index] = curVal

            setFieldValue(name, val)
            }}
        />
  })
  }
      </div>
  </div>)
}


const FieldLabel = styled.label`
  font-weight: thin;
  color: #666666;
  font-size: 16px;
  font-weight:500;
`
  const InputDiv = styled.div`
    border-style: solid;
    border: none;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
    background-color: #ffffff;
    
    height: 50px;
    padding-left: 15px;
    width: 376px;
    /* width: calc(100% - 0.6rem); */
    -webkit-transition: border-color 0.3s ease;
    transition: border-color 0.3s ease;
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.19;
    color: #adadad;
    display:flex;
    flex-direction:column;
    border-radius: 10px !important;
  `

export default PhoneInput
