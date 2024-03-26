import React from 'react'
import styled from 'styled-components'

const BigTitle = ({title, style}) => {
  return <Env style={style}> 
            {title}
        </Env>
}

const Env = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
    font-size: 72px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: #3e9fc0;
    text-align:center;
  `

export default BigTitle