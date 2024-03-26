import React, { useState, useEffect, useCallback, useContext } from 'react'
import styled from 'styled-components'
import MaterialIcon from '@material/react-material-icon';


const Detail = (props) => {
    const {style, label, name, dataKey} = props

    const color = (dataKey==='extension'||dataKey==='flexion') ? '#00b2ce' : dataKey==='pain' ? '#efa700' : null
    // for patients
return <div style={style}>
<Head>{label}</Head>

  <div style={{display:'flex'}}>
    <Deet style={{color}}>{name?name:'-'}</Deet>
    {(dataKey==='extension'||dataKey==='flexion')&&
      <MaterialIcon icon='arrow_downward' style={{fontSize:17,marginLeft:5,color}}/>
    }
  </div>
</div>
}

export default Detail

const Cell = styled.div`
display:flex;
align-content:center;
justify-content:center;
align-items:center;
${'' /* padding-top:45px;
padding-bottom:45px; */}
${'' /* border:1px solid red; */}
height:80px;
margin-top:20px;
padding:5px;
min-height:60px;
max-height:60px;
z-index:2;
width:100%;
text-align:center;
font-size: 16px;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: 1.19;
letter-spacing: normal;
color: #797a7c;
`

const Head = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: 0.32px;
  text-align: left;
  color: #055e6c;
  margin-bottom:4px;
`

const Deet = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #666666;
`