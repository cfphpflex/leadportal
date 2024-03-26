import React, {useState} from 'react'
import styled from 'styled-components'
import { Input } from '../../ui/leadexchangeUI';
import { post } from '../../../provider/api'
import EE from '../../utils/events'
import { Modal } from 'antd';
import { CircularProgress } from '@material-ui/core';

const inputStyle = {
  border: '1px solid white',
  // borderRadius:4
}
const inputErrorStyle = {
  // boxShadow: '0 0 0 2px rgba(245, 34, 45, 0.2)',
  // border: '1px solid #ea8a8f',
  // borderRadius:4
}

const Address = ({name, values, required, placeholder, inputWidth, inputStyle, icon, type, label, value, error, touched, onChange, onBlur, wrapStyle, hideLabels, enableEnter, onEnter}) => {
  const conditionalStyle = error && touched ? inputErrorStyle : inputStyle

  const [results,setResults] = useState([])
  const [loading,setLoading] = useState(false)
  const [show,setShow] = useState(false)

  async function getSuggestions(){
    if (!value) return
    setShow(true)
    const data = {
      input: value
    }
    setLoading(true)
    const res = await post('google/autocomplete',data)
    console.log('res',res)
    if(res) {
      setResults(res)
    }
    setLoading(false)
  }

  function selectAddress(p){
    let addy = p.text.split(',')
    const len = addy.length
    let state = addy[len-2].replace(/\s/g,'')
    let city = addy[len-3]
    let line1 = p.text.split(city)

    const data = {
      ...values,
      city:city,
      state:state,
      line_1:line1[0].replace(/,/g,'')
    }

    EE.emit('fill-address',data)
  }
  
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
      onBlur={getSuggestions}
      style={{...conditionalStyle, width:inputWidth&&inputWidth,...inputStyle}} 
      onKeyPress={e => {
        if(enableEnter && e.key==='Enter') onEnter() 
      }}
    />

    {show&&
    <div/>}


    <Modal
        title={'Suggestions'}
        visible={show}
        onCancel={()=>setShow(false)}
        footer={[
          
        ]}
        closable={true}
        bodyStyle={{ padding: 1,minHeight:200 }}
        // style={{ marginTop: -33 }}
        >
        <Suggestions results={results} 
        loading={loading} selectAddress={selectAddress}/>
      </Modal>

  </div>)
}

const FieldLabel = styled.label`
font-weight: thin;
color: #666666;
font-size: 16px;
font-weight:500;
`

export default Address

const Suggestions = (props) => {
    const { results, selectAddress, loading } = props

    return (
      <div style={{display:'flex','flex':1, flexDirection:'column'}}>
      {loading?<CircularProgress size={20} style={{color:'#000',margin:10}}/>
      :results.length?results.map((r,i)=>{
        return <Item item={r} key={i} selectAddress={selectAddress}/>
      }):<div style={{margin:10}}>
        No results
      </div>
      }
      </div>
    )
}

const Item = (props) => {
  const {item,selectAddress} = props
return <div style={{padding:10,cursor:'pointer'}} 
onClick={()=>selectAddress(item)}>
  {item.text}
</div>
}
