import React, { useState, useEffect, useCallback, useContext } from 'react'
import Form from '../form/form'
import {organization} from '../form/schema'
import styled from 'styled-components'
import { Button, Title, BigTitle} from '../ui/leadexchangeUI'
import { useHistory } from "react-router-dom";
import { get,patch } from '../../provider/api'   // UPDATE organization only needs GET & PATCH methods
import { useLeadExchange } from '../../provider/leadexchange'   // UPDATE organization only needs GET & PATCH methods
import EE from '../utils/events'

const CreateNeworganization = () => {
    const leadExchange = useLeadExchange()
    const {ui} = leadExchange

    const [submitting, setSubmitting] = useState(null)
    const [renderForm, setRenderForm] = useState(true)
    const [initialValues, setInitialValues] = useState({})
    
    const {organizationTypes} = ui
    const history = useHistory()
    const formButtons = [
        {type:'submit','text':'Save Changes',color:'submit', style:{width:375}},
    ]

    useEffect(()=>{

        EE.on('fill-address',(e)=>{
            console.log('fill address',e)
            let updates = {...e}
            setInitialValues(updates)
            refreshForm()
        })

        EE.on('fill-form',(e)=>{
            console.log('fill form',e)
            let updates = {...e}
            setInitialValues(updates)
            refreshForm()
        })
    },[])

    function refreshForm(){
        setRenderForm(false)
        setTimeout(()=>{
            setRenderForm(true)
        },20)
    }

    async function edit(v){
        const oF = v.office_phone
        let phoneFormatted = ''+oF['0']+oF['1']+oF['2']

        const data = {
            "npi": v.npi+'',
            "name": v.organizationName,
            "organization_type_id": v.organizationType.id,
            "address":
                {
                    "line_1": v.line_1||'',
                    "city": v.city||'',
                    "state": v.state||'',
                    "zip_code": v.zip_code||''
                },
            "phone_number":
                {
                    "phone_name": "Office Phone",
                    "phone_number": phoneFormatted?phoneFormatted:''
                }
        }

        try{
            setSubmitting(true)
            const res = await patch('organization/'+v.organizationType.id,data)
            history.push('/editorganization')
        } catch(e){
            setSubmitting(false)
            console.log('e',e)
        }
    }



    //2.  pull data into const organizationDataType for the dropdown


    const organizationType = organization.map(p=>{
        return {
            ...p,
            options:p.options&&p.options.map(o=>{
                return {...o}
            })
        }
    })



    const pConfig = organization.map(p=>{
        return {
            ...p,
            options:p.options&&p.options.map(o=>{
                return {...o}
            })
        }
    })

    if (organizationTypes&&organizationTypes.length) {
        pConfig[2].options = [...organizationTypes]
    }
    

    return (<Wrap>
            <Title title={'Edit organization'} />
            {renderForm&&<Form
                config={pConfig}
                submitting={submitting}
                initialValues={initialValues}
                buttons={formButtons}
                inputWidth={386}
                formStyle={{flexWrap:'wrap',flexDirection:'row',justifyContent:'space-between',maxWidth:800}}
                onSubmit={(v)=>edit(v)}
            />}
    </Wrap>);
}

export default CreateNeworganization

const Wrap = styled.div`
    display:flex;
    flex:1;
    flex-direction:column;
    align-content:center; 
`
