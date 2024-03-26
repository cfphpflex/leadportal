import React, {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'
import { Input, Button, openNotification } from '../../ui/leadexchangeUI';
import MaterialIcon from '@material/react-material-icon';
import Person from '../../lists/person'
import { post } from '../../../provider/api'
import EE from '../../utils/events'
//import FadeIn from '../../animated/fadeIn';

const inputStyle = {
  border: '1px solid white',
  // borderRadius:4
}
const inputErrorStyle = {
  // boxShadow: '0 0 0 2px rgba(245, 34, 45, 0.2)',
  // border: '1px solid #ea8a8f',
  // borderRadius:4
}

function useOutsideAlerter(ref,setShow, setResults) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(false)
          setResults(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

const Search = ({ name, required, hideField, values, searchTarget, setFieldValue, fields, placeholder, inputWidth, icon, type, label, value, error, touched, onChange, onBlur, wrapStyle, hideLabels, enableEnter, onEnter}) => {

  const [show, setShow] = useState(null)
  const [results, setResults] = useState([{
    first_name:'mavid',
    last_name:'jones',
    office_phone:'23525235253',
    city:'this cool clinic'
  }])
  const [submitting, setSubmitting] = useState(null)
  const [searching, setSearching] = useState(null)
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [org, setOrg] = useState('')
  const [npi, setNpi] = useState('')

  const panel = useRef(null)
  useOutsideAlerter(panel, setShow, setResults);

  const conditionalStyle = error && touched ? inputErrorStyle : inputStyle

  useEffect(()=>{
    // const thing = pullthedata()
  },[])

  function setNPI(p){
    const data = {...values, ...p}

    if (data.office_phone && typeof data.office_phone === 'string'){
      const oF = data.office_phone
      const p1 = oF.slice(0,3)
      const p2 = oF.slice(3,6)
      const p3 = oF.slice(6,10)
      data.office_phone = {'0':p1,'1':p2,'2':p3}
  }
  if (data.mobile_phone && typeof data.office_phone === 'string'){
      const oF = data.office_phone
      const p1 = oF.slice(0,3)
      const p2 = oF.slice(3,6)
      const p3 = oF.slice(6,10)
      data.mobile_phone = {'0':p1,'1':p2,'2':p3}
  }

  EE.emit('fill-form',data)
  setResults(null)
  setShow(null)
  }

  async function search(){
    if (npi){
      setFieldValue(name,npi)
      setResults(null)
      setShow(null)
      return
    }

    if (org){
      console.log('its org')
      return
    }

    if (!(first&&last)){
      openNotification('Oops!','NPI search requires first and last name')
      return
    }

    const data = { 
      last_name:last,
      first_name:first,
      // org:org,
      // npi:npi
  }

    setSearching(true)

    let res = null
    try{
      let searchPath = searchTarget?searchTarget:'npi'
      res = await post(searchPath,data)
      
      if(res) {
        let filteredRes = []
        
        res.forEach((r)=>{
          if (r.sole_proprietor==='NO') return
          filteredRes.push(r)
        })
        if (res.length&&!filteredRes.length) {
          setResults(null)
          openNotification('Only sole-proprietors found',"Please enter the organization's NPI information")
        }
        setResults(filteredRes)
      }
   } catch(e){
      console.log('e',e)
    }

    if (!res||!res.length) {
        setResults(null)
        openNotification('Sorry!',"No results")
    }
    setSearching(false)
  }

  return(<div style={{...wrapStyle,position:'relative'}}> 
    {!hideLabels && <FieldLabel htmlFor="email"
      style={error && touched ? {color:'#e6303a'} : {}}>
      {`${label}${required?'*':''} ${error && touched ? `(${error})` : ''}`}
    </FieldLabel>}

    <div onClick={()=>{
      if (!show) setShow(true)
  }} ref={panel}> 
      
      <Input
        fake
        name={name}
      //   prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder={placeholder?placeholder:`Enter ${label}`}
        type={type}
        iconRight={'static/glass.png'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{...conditionalStyle,width:inputWidth&&inputWidth,boxShadow:show?'none':null,border:error&&'none'}} 
        onKeyPress={e => {
          if(enableEnter && e.key==='Enter') onEnter() 
        }}
      />

       {/* <FadeIn
        isMounted={show}
        style={{position:'absolute',top:34,left:0,background:'#fff',display:'flex',justifyContent:'center',alignItems:'center',
      borderRadius:10,flexDirection:'column',overflowY:'auto',boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.15)',
      zIndex:10, overflowX:'hidden',width:inputWidth&&inputWidth,maxWidth:inputWidth&&inputWidth}}>
      {(results&&results.length)?
        <div style={{width:'100%', maxHeight:600,overflow:'auto',}}>
        <MaterialIcon icon={'close'} style={{color:'#2ca8c6',position:'absolute',top:8,
        right:10,fontSize:35,cursor:'pointer'}} onClick={()=>{
            setResults(null)
            setShow(null)
            }}/>
            <ResultsHead>
            First Name: {first}; Last Name: {last}; Organization: {org}, NPI: {npi}
            </ResultsHead>
            <div style={{padding:15}}>
            {results.map((p,i)=>{
                const trans = {
                  name: p.first_name+' '+p.last_name,
                  phone:p.office_phone,
                  clinic:p.city
                }

                const person = {...p,...trans}

                return <Person key={i} 
                onClick={()=>{
                  setFieldValue(name,p.npi)
                  setNPI(p)
                  }}
                person={person}/>
            })}
            </div>
      </div>
      :
        <div style={{display:'flex',flex:1,flexDirection:'column',
        position:'relative',justifyContent:'center',alignItems:'center'}}>
        <div style={{position:'absolute',top:0,left:0,width:'100%'}}>
          <Input
            fake
            name={name}
            placeholder={placeholder?placeholder:`Search ${label}`}
            iconRight={'static/glass.png'}
            iconStyle={{top:10,right:-8}}
            envStyle={{width:'100%'}}
            value={value}
            style={{...conditionalStyle, width:inputWidth&&inputWidth,boxShadow:'none',padding:0,margin:0,marginLeft:-8}} 
          />
        </div>
        <div style={{height:60}}/>
        <PullLeft> <FieldLabel>First Name</FieldLabel></PullLeft>
            <Input 
                placeholder={`Enter First Name`}
                type={'text'}
                disabled={org?true:false}
                style={inpStyle}
                value={first}
                onChange={(e)=>setFirst(e.target.value)}/>

        <PullLeft> <FieldLabel>Last Name</FieldLabel></PullLeft>
            <Input 
                placeholder={`Enter Last Name`}
                type={'text'}
                disabled={org?true:false}
                style={inpStyle}
                value={last}
                onChange={(e)=>setLast(e.target.value)}/>

        {(hideField&&hideField.includes('org'))?null:
        <>
            <PullLeft> <FieldLabel>Organization</FieldLabel></PullLeft>
            <Input 
                placeholder={`Enter Organization`}
                type={'text'}
                style={inpStyle}
                disabled={(first||last)?true:false}
                value={org}
                onChange={(e)=>setOrg(e.target.value)}/>
                </>
        }

        <PullLeft> <FieldLabel>NPI</FieldLabel></PullLeft>
            <Input 
                placeholder={`Enter NPI`}
                type={'text'}
                style={{...inpStyle,marginBottom:0}}
                value={npi}
                onChange={(e)=>setNpi(e.target.value)}/>
      
      <Button 
          type='submit'
          color='third'
          submitting={searching}
          text='Search'
          onClick={()=>{
            search()
            }}
          style={{margin:20, width:190}}
      />
      </div>
      }
      </FadeIn>*/}
      
      </div>
  </div>)
}

const inpStyle = {
    width:340
}

const PullLeft = styled.div`
    display:flex;
    width:100%;
    ${'' /* padding-left:25px; */}
    justifyContent:flex-start;
    alignItems:flex-start;
`

const FieldLabel = styled.label`
    font-weight: thin;
    color: #666666;
    font-size: 16px;
    font-weight:500;
  `

  const SubFieldLabel = styled.label`
    font-weight: thin;
    color: #666666;
    font-size: 16px;
    display:flex;
    align-items:flex-start;
    justifyContent:flex-start;
  `

  const ResultsHead = styled.div`
    white-space: nowrap;
    overflow: hidden;
    font-weight:500;
    text-overflow: ellipsis;
    max-width:70%;
    margin:10px;
    margin-left:15px;
    margin-top:15px;
    margin-bottom:10px;
    color:#056779;
`

export default Search
