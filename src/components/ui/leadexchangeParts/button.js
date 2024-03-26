import React from 'react'
import styled from 'styled-components'
import { Button, CircularProgress } from '@material-ui/core';
import MaterialIcon from '@material/react-material-icon';
import {Image} from '../leadexchangeUI'

const ROMButton = ({text,disabled,dead,onClick,submitting,style,color,invert,icon,iconStyle,type,image}) => {

  const addSty = {}
  
  if (invert){
    addSty.backgroundColor = '#fff'
    addSty.color = styles[color].backgroundColor
  }

  const disabledStyle = disabled&&{backgroundColor: '#adadad'}

  const theme = color||type

  return <Button
    disabled={dead}
    onClick={()=>(!submitting)&&onClick&&onClick()} 
    style={{...styles.general,...styles[theme],...style, ...addSty, ...disabledStyle,opacity:(submitting||dead)&&0.7}}>
    {submitting?
      <CircularProgress size={20} style={{color:'#fff'}}/>
    :
      <>
      {icon&&<MaterialIcon icon={icon} style={{...iconStyle,fontSize:22}}/>}
      {image && <Image source={image} style={{height:32,width:32,marginRight:10}} />}
      {text}
      </>
    }
  </Button>
}

const styles = {
  general:{
    width: 230,
    margin:10,
    height: 50,
    borderRadius: 10,
    color:'#fff',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.22,
    letterSpacing: 'normal',
    textAlign: 'center',
    textTransform: 'none'
  },
  submit:{
    backgroundColor: '#ef9144'
  },
  cancel:{
    backgroundColor: '#db2734'
  },
  success:{
    backgroundColor: '#76b647'
  },
  save:{
    backgroundColor: '#adadad'
  },
  secondary:{
    backgroundColor: '#0899b7'
  },
  third:{
    backgroundColor: '#00b2ce'
  },
  sea:{
    backgroundColor: '#055e6c'
  },
  white:{
    backgroundColor: '#fff'
  },
  info:{
    backgroundColor: '#fff',
    border:'2px solid #055e6c',
    color:'#055e6c'
  },
  
}

export default ROMButton
