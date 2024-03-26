import React from 'react'
import styled from 'styled-components'

const Battery = ({style, color, type}) => {
  return <Env style={style}> 
            <Case color={color}>
                <Cell color={color}/>
                <S/>
                <Cell color={color}/>
                <S/>
                <Cell color={color}/>
            </Case>
            <Tip color={color}/>
            {type&&<Type color={color}>{type}</Type>}
        </Env>
}

const Env = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
    align-items:center;
  `

  const S = styled.div`
    width:1px;
  `

const Case = styled.div`
    display:flex;
    align-content:center;
    align-items:center;
    padding:2px;
    border-radius: 2px;
    border: solid 1px #76b647;
`

const Cell = styled.div`
    width: 7px;
    height: 10px;
    border-radius: 2px;
    border: solid 1px #76b647;
    background-color: #76b647;
`
const Tip = styled.div`
    width: 4px;
    height: 9px;
    border: solid 1px #76b647;
    border-left:none;
`
const Type = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-left:4px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #76b647;
`


export default Battery