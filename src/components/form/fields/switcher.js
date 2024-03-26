import React, { useEffect } from 'react'
// import Select from './select'
import styled from 'styled-components'
import { Switch } from '../../ui/leadexchangeUI';
import EE from '../../utils/events'

const inputStyle = {
    border: '1px solid white',
  }
  const inputErrorStyle = {
  }


const Switcher = ({name, placeholder, onSwitchChange, inputWidth,icon, type, label, value, error, touched, onChange, onBlur, enableEnter, onEnter, hideLabels}) => {

// this is used to change associated toggles in parallel
    useEffect(()=>{
        EE.on(name,(e)=>{
            onChange({target:{name,value:e}})
        })
    })

    function handleSwitch(e){
        if (onSwitchChange) onSwitchChange({target:{name,value:e}})
        onChange({target:{name,value:e}})
    }

    const conditionalStyle = error && false ? inputErrorStyle : inputStyle
  
    return <ToggleDiv style={{marginTop:12,marginBottom:12,alignContent:'center',alignItems:'center',flexDirection:'row',justifyContent:'space-between',width:714
    //inputWidth&&inputWidth
    }}> 
     {!hideLabels && <FieldLabel htmlFor="email"
        style={error && touched ? {color:'#e6303a'} : {}}>
        {label}
      </FieldLabel>}
     
      <Switch 
      name={name}
      //   prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
      placeholder={placeholder?placeholder:`Enter ${label}`}
      onChange={onChange}
      onBlur={onBlur}
      style={{...conditionalStyle, }} 
      onClick={(e)=>handleSwitch(e)} 
      checked={value}
      onBlur={()=>onBlur(name)}
  
      />
    </ToggleDiv>
  }

  export default Switcher


  const FieldLabel = styled.label`
    color: #666666;
    font-size: 16px;
    font-weight:500;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: left;
    color: #666666;
  `

  const ToggleDiv = styled.div`
    border-style: solid;
    border: none;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
    background-color: #ffffff;
    padding:10px;
    padding-left: 20px;
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
