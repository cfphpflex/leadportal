import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Formik } from 'formik';
import styled from 'styled-components'
import Field from './fields/field'
import {initialize, validator} from './inits'
import { CircularProgress } from '@material-ui/core';
import { Button } from '../ui/leadexchangeUI'
// import EE from '../utils/events'


function Form({buttons, formStyle, supplementButton, onSwitchChange, columns, onSecondary, inputWidth, inputStyle, disabled, header, config, onSubmit, submitting, hideLabels, title, buttonText, buttonType, buttonId, enableEnterAll, extraStyle, hide, initialValues, success, onCancel, style, resetOnSubmit, loadForm, validateOnMount, extraFieldVars}){

  const inits = initialize(config)
  const initials = {...inits, ...initialValues}

  const extras = extraFieldVars||{}

  return (<Wrap>
  {!hide && title &&
    <TitleWrap>
      {/* {!hide && success && <CheckMark style={{marginRight:8}} />} */}
       <Title success={success}>{title}</Title>
    </TitleWrap>
  }
    <Formik
      initialValues={initials}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={validateOnMount}
      // isInitialValid={initialValues && Object.keys(initialValues).length > 0}
      validationSchema={validator(config)}>
      {props => {
        const {values,touched,errors,dirty,isValid,validateForm,isSubmitting,handleChange,handleBlur,handleSubmit,handleReset,setFieldValue} = props;
        
        const areErrors = Object.keys(errors).length
        // console.log('errors',errors)
        return (
          !hide && <form onSubmit={handleSubmit} style={{display:'flex',
            flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <FormWrap style={formStyle}>
            {header && header({values})}

            
            {!config.length ? <div style={{width:'100%',textAlign:'center'}}>
              <CircularProgress size={50} style={{color:'#0899b7'}}/>
            </div>
            : config.map((field)=>{
              if (field.hidden) return <span key={field.name}></span>
              if (typeof field==='string'){
                return <SectionTitle key={field}>{field}</SectionTitle>
              }
      
              return (<Field {...field} {...extras}
                key={field.name}
                // id={id}
                inputWidth={inputWidth}
                inputStyle={inputStyle}
                setFieldValue={setFieldValue}
                enableEnter={enableEnterAll}
                value={values[field.name]}
                values={values}
                onChange={(e)=>{
                  handleChange(e)}}
                onSwitchChange={onSwitchChange}
                onBlur={handleBlur}
                error={errors[field.name]}
                touched={touched[field.name]}
                onEnter={handleSubmit}
                hideLabels={hideLabels}
                wrapStyle={extraStyle && extraStyle.fields && extraStyle.fields[field.name]}
                locationButtonColor={extraStyle&&extraStyle.locationButtonColor}
              />)
            })}
            </FormWrap>

            {supplementButton&&supplementButton}

            <ButtonWrap>
            {buttons&&buttons.map((b,i)=>{
                return (<Button type={b.type}
                text={b.text || 'Submit'} key={i}
                disabled={i!==0&&(areErrors||disabled)} 
                id={b.id||'myId'}
                color={b.color||b.type}
                style={b.style}
                submitting={b.type==='submit'&&submitting} 
                onClick={async (e,f,g)=>{
                  // const v = await validateForm()
                  // if (v) console.log('v',v)
                  if (b.type==='submit') {
                      handleSubmit(e,f,g)
                      if(resetOnSubmit) setTimeout(()=>handleReset(),100)
                  }
                  if (b.type==='cancel'&&onCancel) onCancel()
                  if (b.type==='secondary'&&onSecondary) onSecondary()
                }}/>)
            })}
              </ButtonWrap>
          </form>
        );
      }}
    </Formik>
  </Wrap>);
}

export default Form

const Wrap = styled.div`
display:flex;
justify-content:center;
`
const SectionTitle=styled.div`
  font-size:16px;
  font-weight: bold;
  margin-bottom:8px;
`
const TitleWrap=styled.div`
  display:flex;
  align-items: center;
  margin-bottom:8px;
  min-width:24px;
`
const Title = styled.div`
  font-size:16px;
  font-weight: bold;
  color:${p=>p.success?'teal':'rgba(0, 0, 0, 0.65)'};
`
const ButtonWrap = styled.div`
margin-top:25px;
    display:flex;
`

const FormWrap = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
