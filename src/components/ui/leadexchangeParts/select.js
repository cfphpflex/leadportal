import React from 'react'
import styled from 'styled-components'
import MaterialIcon from '@material/react-material-icon';
import Select from 'react-select';

const S = ({name, setFieldValue, required, style, disabled, icon, type, func, label, placeholder, value, error, touched, onChange, onBlur, wrapStyle, hideLabels, enableEnter, onEnter, validator, options}) => {

  const customStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused
          ? '#eee'
          : null,
        color: isDisabled
          ? '#ccc':null,
        cursor: 'default',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? null : null),
        },
      };
    },
    singleValue: (provided, state) => ({
      ...provided,
      width:'80%'
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex:20,
      transition:'.02 s'
    }),
    indicatorsContainer:(provided, state) => ({
      // ...provided,
      opacity:0,
      height:0,
      width:0
    }),
    input:(provided, state) => ({
      // ...provided,
      paddingTop:13,
    }),
    container: (provided, state) => ({
      // ...provided,
      borderRadius: 10,
      width: 386, background:'#fff',
      boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.15)', ...style
    }),
    control: (provided, state) => ({
      height:46,
      // none of react-select's styles are passed to <Control />
      // width: 200,
    }),
    valueContainer: (provided, state) => ({
      height:'100%',
      paddingLeft:15
      // none of react-select's styles are passed to <Control />
      // width: 200,
    }),
  }

  const mergeInVal = {}
  if(value) mergeInVal.value=value
  return (<div style={wrapStyle}> 
    {!hideLabels && <FieldLabel htmlFor="email"
      style={error && touched ? {color:'#e6303a'} : {}}>
      {`${label}${required?'*':''} ${error && touched ? `(Required)` : ''}`}
    </FieldLabel>}

    <InputDiv style={wrapStyle} disabled={disabled}>

      <Select
      styles={{...customStyles}}
      // name={name}
      isDisabled={disabled}
        value={value}
        // placeholder={placeholder || label}
        // {...mergeInVal}
        onChange={(e)=>{
          onChange(e)
        }}
        // onBlur={()=>{
        //   onBlur({target:{name}})
        // }}
        options={options}
        />

      <MaterialIcon pointerEvents="none" icon={'keyboard_arrow_down'} style={{color:'#2ca8c6',position:'absolute',top:8,
        right:10,fontSize:35, pointerEvents:'none',userSelect:'none'}} />
    </InputDiv>


  </div>)
}


const FieldLabel = styled.label`
    font-weight: thin;
    color: #666666;
    font-size: 16px;
    font-weight:500;
  `

  const InputDiv = styled.div`
  
  /* width: calc(100% - 0.6rem); */
  -webkit-transition: border-color 0.3s ease;
  transition: border-color 0.3s ease;
  margin-top: 10px;
  margin-bottom: 25px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.19;
  display:flex;
  flex-direction:column;
  border-radius: 10px !important;
  position:relative;
  opacity:${p=>p.disabled&&0.6}
`

export default S