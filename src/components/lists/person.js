import React, { useState, useEffect, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { Button, Title, BigTitle,Input, SubTitle} from '../ui/leadexchangeUI'
import MaterialIcon from '@material/react-material-icon';


const Person = (props) => {
    const {person,onClick} = props

    return (<Wrap onClick={()=>onClick()}>
        <Cell style={{fontSize:20,fontWeight:550}}>{person.name}</Cell>
        <Cell >{person.clinic}</Cell>
        <Cell >{person.phone}</Cell>
    </Wrap>);
}

export default Person

const Cell = styled.div`
    font-size:18px;
    color:#056779;
`
const Wrap = styled.div`
    display:flex;
    flex-direction:column;
    &:hover{
        background-color:#f1f1f1;
    }
`
