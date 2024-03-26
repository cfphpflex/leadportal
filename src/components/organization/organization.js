import React, { useState, useEffect, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { Button, Title, BigTitle} from '../ui/leadexchangeUI'
import { useHistory } from "react-router-dom";
import { post } from '../../provider/api'
import { useLeadExchange } from '../../provider/leadexchange'
import EE from '../utils/events'
import Select from '../form/fields/select'
import ItemList from '../lists/itemList'
import { organizationsHeaders } from '../listHeaders'
import { fakeorganizations } from '../fakeData'

const organizations = () => {
    const leadExchange = useLeadExchange()
   // const [submitting, setSubmitting] = useState(null)
    //const history = useHistory()
    const {ui, setUI} = useLeadExchange

    console.log('ui',ui)

    const buttons = [
        {
            color:'submit',
            text:'Edit',
            func:(p)=>edit(p)
        },
        {
            color:'cancel',
            text:'Archive',
            func:(p)=>archive(p)
        },
    ]

    function edit(p){
        // put p.id into the path
       // history.push(`/editorganization`)
    }

    function archive(p){

    }


    return (<Wrap>
            <Title title={'organizations'}/>
                <div style={{display:'flex',flexDirection:'column',padding:50,paddingTop:20,width:'100%'}}>
                    <ItemList 
                    items={fakeorganizations}
                    headers={organizationsHeaders}
                    buttons={buttons} />
                </div>
            </Wrap>);
}

export default organizations

const Wrap = styled.div`
    display:flex;
    flex:1;
    width:100%;
    flex-direction:column;
    align-items:center; 
`

const SelectRow = styled.div`
    display:flex;
    justify-content:space-between;
    align-content:center; 
    width:880px;
    margin-left:35px;
`
