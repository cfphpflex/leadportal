import React, { useState, useEffect, useCallback } from 'react'
import Form from '../../form/form'
import {login} from '../../form/schema'
import styled from 'styled-components'
import { Button, Title, BigTitle, openNotification} from '../../ui/leadexchangeUI'
import { useHistory } from "react-router-dom";
import { useLeadExchange } from '../../../provider/leadexchange'
import { notification } from 'antd';

const Login = () => {
    const rom = useLeadExchange()
    const [submitting, setSubmitting] = useState(null)
    const history = useHistory()
    const {setUI,actions} = rom

    const formButtons = [
        {type:'submit','text':'Login',color:'submit'},
        {type:'secondary','text':'Forgot Password?',color:'secondary'},
    ]

    async function actuallyLogin(v){
        if (!(v.email&&v.password)) return  
        setSubmitting(true)
        const res = await actions.login(v.email, v.password)
        if (res){
            history.push('/createNewPractice')
        } else {
            openNotification('Oops!','Login failed')
        }
        setSubmitting(false)
    }

    function resetPassword(){
        history.push('/password')
    }

    return (<Wrap>
            <BigTitle title={'Welcome'} style={{marginBottom:60}}/>
            <Form
                config={login}
                submitting={submitting}
                buttons={formButtons}
                inputWidth={386}
                onSubmit={(v)=>actuallyLogin(v)}
                onSecondary={()=>resetPassword()}
            />
    </Wrap>);
}

export default Login

const Wrap = styled.div`
    display:flex;
    flex:1;
    flex-direction:column;
    justify-content:center;
    align-content:center; 
`
