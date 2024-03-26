import React from 'react'
import styled from 'styled-components'

const SubTitle = ({title, style}) => {
  return <Env style={style}> 
            {title}
        </Env>
}

const Env = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
    font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  text-align:center;
  letter-spacing: normal;
  color: #595a5c;
  `

export default SubTitle