import React from 'react'
import {Select, Icon} from 'antd'
import styled from 'styled-components'
import MaterialIcon from '@material/react-material-icon';
const Option = Select.Option;

const S = ({value, onChange, label, options, disabled}) => {

  return (<div className="rom-select"> 
    <FieldLabel htmlFor="label">
      {label}
    </FieldLabel>

    <InputDiv>

      <Select
        size="large"
        disabled={disabled}
        dropdownStyle={{}}
        style={{width: '100%',height:40, background:'#fff',
          borderRadius:6,
          boxShadow:'0 0 6px 0 rgba(0, 0, 0, 0.15)'}}
          // name={name}
          value={value}
          placeholder={label}
          // {...mergeInVal}
          onChange={onChange}
        >
        {options && options.map((o,i)=>{
          return (<Option key={o.id} value={o.id}>{o.label}</Option>)
        })}
      </Select>

      {/* <MaterialIcon pointerEvents="none" icon={'keyboard_arrow_down'} style={{color:'#2ca8c6',position:'absolute',top:8,
        right:10,fontSize:35, pointerEvents:'none',userSelect:'none'}} /> */}
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
  -webkit-transition: border-color 0.3s ease;
  transition: border-color 0.3s ease;
  margin-top: 5px;
  margin-bottom: 25px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.19;
  display:flex;
  flex-direction:column;
  border-radius: 10px !important;
  position:relative;
`

export default S