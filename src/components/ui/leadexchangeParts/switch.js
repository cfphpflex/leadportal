import React from 'react'
import styled from 'styled-components'
import { Button } from '../leadexchangeUI';

const Switch = ({onClick,style,checked}) => {
  
  return <div style={{display:'flex',flexDirection:'row'}}>
            <Button 
                onClick={()=>onClick(true)} 
                style={checked?{...enabled}:{...disabled}}
                text={'On'}
                />
            <Button 
                onClick={()=>onClick(false)} 
                style={!checked?{...enabled}:{...disabled}}
                text={'Off'}
                />
  </div>
}

const enabled = {
    backgroundColor: '#00b2ce',
    color:'#fff',
    width:60,
    margin:0
}

const disabled = {
    backgroundColor: '#fff',
    color:'#00b2ce',
    width:60,
    margin:0
}

export default Switch
