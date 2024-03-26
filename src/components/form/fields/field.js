import React from 'react'
// import Select from './select'
import styled from 'styled-components'
// import File from './file'
// import Select from './select'
// import {DateTimePick, TimePick} from './datetime'
import PhoneInput from './phoneInput'
import DateInput from './dateInput'

import Search from './search'
import Select from './select'
import Address from './address'
import Switcher from './switcher'

// import Packages from './packages'
// import ColorSelector from './colorSelector'
// import ImageUploader from './imageUploader'
import { Input, Switch, TextArea } from '../../ui/leadexchangeUI';

const inputStyle = {
  border: '1px solid white',
  // borderRadius:4
}
const inputErrorStyle = {
  // boxShadow: '0 0 0 2px rgba(245, 34, 45, 0.2)',
  // border: '1px solid #ea8a8f',
  // borderRadius:4
}

const Space = ({name, required, placeholder, inputWidth, inputStyle, icon, type, label, value, error, touched, onChange, onBlur, wrapStyle, hideLabels, enableEnter, onEnter}) => {
  const conditionalStyle = error && false ? inputErrorStyle : inputStyle
  
  return(<div style={{...wrapStyle,opacity:0}}> 
    <div
      style={{...conditionalStyle, width:inputWidth&&inputWidth, ...inputStyle}} 
    />
  </div>)
}

const TextInput = ({name, required, placeholder, inputWidth, inputStyle, icon, type, label, value, error, touched, onChange, onBlur, wrapStyle, hideLabels, enableEnter, onEnter}) => {
  const conditionalStyle = error && touched ? inputErrorStyle : inputStyle

  return(<div style={wrapStyle}> 
    {!hideLabels && <FieldLabel htmlFor="email"
      style={error && touched ? {color:'#e6303a'} : {}}>
      {`${label}${required?'*':''} ${error && touched ? `(${error})` : ''}`}
    </FieldLabel>}
    <Input
      name={name}
    //   prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
      placeholder={placeholder?placeholder:`Enter ${label}`}
      type={type}
      autoComplete="off"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      style={{...conditionalStyle, width:inputWidth&&inputWidth, ...inputStyle}} 
      onKeyPress={e => {
        if(enableEnter && e.key==='Enter') onEnter() 
      }}
    />
  </div>)
}

const TextAreaInput = ({name, placeholder, inputWidth, inputStyle, icon, style, type, label, value, error, touched, onChange, onBlur, wrapStyle, hideLabels, enableEnter, onEnter}) => {
  const conditionalStyle = error && false ? inputErrorStyle : inputStyle
  
  return(<InputDiv style={wrapStyle}> 
    {!hideLabels && <FieldLabel htmlFor="email"
      style={error && false ? {color:'#e6303a'} : {}}>
      {`${label} ${error && touched ? `(${error})` : ''}`}
    </FieldLabel>}
    <TextArea
      name={name}
    //   prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
      placeholder={placeholder?placeholder:`Enter ${label}`}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      style={{...conditionalStyle, width:inputWidth&&inputWidth,...style, ...inputStyle}} 
      onKeyPress={e =>{ 
        if(enableEnter && e.key==='Enter') onEnter() 
      }}
    />
    {/*error && touched && <div className="input-feedback">{error}</div>*/}
  </InputDiv>)
}

const PasswordInput = ({name, placeholder, inputWidth, inputStyle, required, icon, type, label, value, error, touched, onChange, onBlur, enableEnter, onEnter, hideLabels,wrapStyle}) => {
  
  const conditionalStyle = error && touched ? inputErrorStyle : inputStyle
  
  return(<div style={wrapStyle}> 
    {!hideLabels && <FieldLabel htmlFor="email"
      style={error && touched ? {color:'#e6303a'} : {}}>
      {`${label}${required?'*':''} ${error && touched ? `(${error})` : ''}`}
    </FieldLabel>}
    <Input
      name={name}
    //   prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
    placeholder={placeholder?placeholder:`Enter ${label}`}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      style={{...conditionalStyle, width:inputWidth&&inputWidth, ...inputStyle}} 
      onKeyPress={e => {
        if(enableEnter && e.key==='Enter') onEnter() 
      }}
    />
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

const Field = (props) => {
  switch(props.type) {
    case 'space':
      return <Space {...props} />
    case 'text':
      return <TextInput {...props} />
    case 'textarea':
      return <TextAreaInput {...props} />
    case 'password':
      return <PasswordInput {...props} />
    case 'phone':
      return <PhoneInput {...props} />
    case 'date':
      return <DateInput {...props} />
    case 'npi':
      return <Search {...props} />
    case 'select':
      return <Select {...props} />
    case 'boolean':
      return <Switcher {...props} />
    case 'address':
      return <Address {...props} />

    // case 'number':
    //   return <TextInput {...props} />
    // case 'textarea':
    //   return <TextAreaInput {...props} />
    // case 'select':
    //   return <Select {...props} />
    // case 'file':
    //   return <File {...props} />
    // case 'address':
    //   return <Address {...props} />
    // case 'datetime':
    //   return <DateTimePick {...props} />
    // case 'time':
    //   return <TimePick {...props} />
    // case 'packages':
    //   return <Packages {...props} />
    // case 'color':
    //   return <ColorSelector {...props} />
    // case 'image':
    //   return <ImageUploader {...props} />
    // case 'boolean':
    //   return <CheckBox {...props} />
    // case 'select':
    //   return <Select {...props} />
    default:
      return <TextInput {...props} />
  }
}

export default Field
