import React from 'react'
import styled from 'styled-components'
import Image from './image'

const TextArea = ({title, fake, icon, disabled, iconRight, iconStyle, envStyle, style, name, placeholder, label, type, value, onChange, onBlur, enableEnter, onEnter}) => {

if (fake) return <div style={{envStyle}}><FakeInput
      icon={icon}
      name={name}
      type={type}
      style={{...style}}>
      {value?
      <div>{value}</div> 
      :
      <div style={{color:'#adadad'}}>{placeholder?placeholder:`Enter ${label}`}</div>
      }
{}
</FakeInput>

{iconRight&&<Image source={iconRight} style={{position:'absolute',top:44,right:15,height:26,width:26,...iconStyle}}/>}
</div>

 return <div><MyInput
  icon={icon}
  name={name}
  disabled={disabled}
//   prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
  placeholder={placeholder?placeholder:`Enter ${label}`}
  type={type}
  value={value}
  onChange={onChange}
  onBlur={onBlur}
  style={{...style}} 
  onKeyPress={e => {
    if(enableEnter && e.key==='Enter') onEnter() 
  }}
/>
{iconRight&&<Image source={iconRight} style={{position:'absolute',top:44,right:15,height:26,width:26}}/>}
</div>
}

const MyInput = styled.textarea`
      border: none;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
      border-radius: 10px;
      height: 46px;
      padding-left: ${p=>p.icon?'60px':'15px'};
      width: 395px;
      /* width: calc(100% - 0.6rem); */
      transition: border-color 0.3s ease;
      margin-top: 10px;
      margin-bottom: 25px;
      font-size: 16px;
      font-weight: 500px;
      line-height: 1.19;
      ${'' /* color: #adadad; */}
      display:flex;
      flex-direction:column;
      background: ${p=>p.icon?`url(${p.icon}) no-repeat scroll 20px 10px`:null};
      background-color: ${p=>p.disabled?'#ddd':'#ffffff'};
      resize: none;
`

const FakeInput = styled.div`
      border: none;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
      border-radius: 10px;
      height: 46px;
      padding-left: ${p=>p.icon?'60px':'15px'};
      width: 395px;
      /* width: calc(100% - 0.6rem); */
      transition: border-color 0.3s ease;
      margin-top: 10px;
      margin-bottom: 25px;
      font-size: 16px;
      font-weight: 500px;
      line-height: 1.19;
      ${'' /* color: #adadad; */}
      display:flex;
      justify-content:center;
      flex-direction:column;
      background: ${p=>p.icon?`url(${p.icon}) no-repeat scroll 20px 10px`:null};
      background-color: ${p=>p.disabled?'#ddd':'#ffffff'};
`


export default TextArea