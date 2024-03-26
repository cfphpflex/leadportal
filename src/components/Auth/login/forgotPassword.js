import React, { useState, useEffect, useCallback } from 'react'
import Form from '../../form/form'
import {forgotPassword} from '../../form/schema'
import styled from 'styled-components'
import { Button, Title, BigTitle, SubTitle} from '../../ui/leadexchangeUI'
import { Redirect } from "react-router-dom";
import {post} from "../../../provider/api";

const ForgotPassword = (props) => {
    const [submitting, setSubmitting] = useState(null)
    const [toLogin, setToLogin] = useState(null)

    const formButtons = [
        {type:'submit',
        'text':'Send',
        color:'submit',
        style:{width:273,height:60}
        },
        {type:'cancel',
        'text':'Cancel',
        color:'cancel',
        style:{width:273,height:60}
        }
    ]


    async function resetPassword(v){
        if (!(v.email)) return

        const data = {
           // "username": v.email

            "username":"amos@leadexchange.com",
            "password":"Testing1@",
            "new_password":"Testing1@",
            "confirm_password":"Testing1@"

        }
        console.log('Testing_fp');

        console.log(data);
        try{
            setSubmitting(true)
            const res = await post('forgotpassword',data)
            if (res){
                const theUI = {
                    token:res.access_token,
                    user:res.user
                }
               /* setUI(theUI)
                history.push('/createNewPractice')*/
                return
            }
        } catch(e){
            console.log('e',e)
            /*openNotification('Oops!','Login failed')*/
        }
        setSubmitting(false)
    }

    function cancel(){
        setToLogin(true)
    }

    if (toLogin)  return <Redirect to='/' />

    return (<Wrap>
            <div style={{display:'flex',marginRight:200,flexDirection:'column',alignItems:'center'}}>
                <BigTitle title={'Forgot Password?'} style={{maxWidth:380,margin:30,marginTop:-20,fontSize:92,
  fontWeight: 300,
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.17,
  letterSpacing: 'normal',
  color: '#3e9fc0'}}/>
                <SubTitle 
                title={"Please enter the email address for your account, we will send you instructions to reset your password"} 
                style={{maxWidth:550,
                    fontSize: 28,fontWeight: 500,
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.21,
  letterSpacing: 'normal',
  color: '#595a5c'}}/>
            </div>
            <Form
                config={forgotPassword}
                submitting={submitting}
                hideLabels
                buttons={formButtons}
                inputStyle={{width:570,height:76,fontSize: 24,fontWeight: 500,paddingLeft:30}}
                onSubmit={(v)=>resetPassword(v)}
                onCancel={()=>cancel()}
            />
    </Wrap>);
}

export default ForgotPassword

const Wrap = styled.div`
    display:flex;
    flex:1;
    flex-direction:row;
    justify-content:center;
    align-content:center; 
    align-items:center; 
`
