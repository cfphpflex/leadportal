import React, { useState, useEffect, useCallback, useContext } from 'react'
import Form from '../form/form'
//import {organization} from '../form/schema'
import {leadexchange, organizationType} from '../form/schema'
import styled from 'styled-components'
import { Button, Title, BigTitle} from '../ui/leadexchangeUI'
import { useHistory } from "react-router-dom";
import { get, post } from '../../provider/api' // CREATE NEW organization ONLY NEEDS GET & POST METHODS
import { useLeadExchange } from '../../provider/leadexchange'
import EE from '../utils/events'

const CreateNeworganization = () => {
    const leadexchange = useLeadExchange()
    const {ui} = leadexchange

    const [submitting, setSubmitting] = useState(null)
    const [renderForm, setRenderForm] = useState(true)
    const [initialValues, setInitialValues] = useState({})
    const {organizationTypes} = ui
    const history = useHistory()
    const formButtons = [
        {type:'submit','text':'Create New organization',color:'submit', style:{width:375}},
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

    async function create(v){
        const oF = v.office_phone
        let phoneFormatted = ''+oF['0']+oF['1']+oF['2']

        console.log('v',v)


        const data = {
            "npi": v.npi+'',
            "name": v.organizationName,
            "organization_type_id": v.organizationType&&v.organizationType.id,
            "address":
                {
                    "line_1": v.line_1||'',
                    "city": v.city||'',
                    "state": v.state||'',
                    "zip_code": v.zip_code||''
                },
            "phone_number":
                {
                    "name": "Office Phone",
                    "number": phoneFormatted?phoneFormatted:''
                }
        }

        try{
            setSubmitting(true)
            const res = await post('organization',data)
            history.push('/addTeamMember')
        } catch(e){
            setSubmitting(false)
            console.log('e',e)
        }
    }

    const pConfig = organizationType.map(p=>{
        console.log("start dropdown");
        console.log(organizationType);
        console.log("end dropdown");
        return {
            ...p,
            object:p.object&&p.object.map(o=>{
                return {...o}
            })
        }
    })


   /* const pConfig = organization.map(p=>{
        return {
            ...p,
            options:p.options&&p.options.map(o=>{
                return {...o}
            })
        }
    })*/

    if (organizationTypes&&organizationTypes.length) {
        pConfig[2].options = [...organizationTypes]
    }
    

    return (<Wrap>
            <Title title={'Create New organization'} />
            {renderForm&&<Form
                config={pConfig}
                submitting={submitting}
                initialValues={initialValues}
                buttons={formButtons}
                inputWidth={386}
                formStyle={{flexWrap:'wrap',flexDirection:'row',justifyContent:'space-between',maxWidth:800}}
                onSubmit={(v)=>create(v)}
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
