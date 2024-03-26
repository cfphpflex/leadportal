import React from 'react'
import styled from 'styled-components'

const Title = ({title,style}) => {
  return <Env style={style}> 
    {title}
  </Env>
}

const Env = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
    align-items:center;
    width:100%;
    font-size: 46px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.24;
    letter-spacing: normal;
    color: #595a5c;
    margin-top:33px;
    margin-bottom:30px;
  `

export default Title