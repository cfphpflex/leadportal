import React, {useState,useRef,useEffect} from "react";
import { Link } from "react-router-dom";
import { Button, Image, openNotification } from './ui/leadexchangeUI'
import { useHistory } from 'react-router-dom'
import "../styles/header.css";
import styled from 'styled-components'
import Logo from "./ui/logo";
import MaterialIcon from '@material/react-material-icon';
import { post, clear } from '../provider/api'
import { notification } from 'antd';
import {useLeadExchange} from '../provider/leadexchange'

function useOutsideAlerter(ref,menuRef,setShowMenu, setOpened) {
  useEffect(() => {

    function handleClickOutside(event) {
      if (menuRef.current && menuRef.current.contains(event.target)) return
      if (ref.current && !ref.current.contains(event.target)) {
        setShowMenu(null)
        setOpened({})
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref,menuRef]);
}

const Header = () => {
  const rom = useLeadExchange()
  const {ui,setUI} = rom

  const [showMenu,setShowMenu] = useState(null)
  const [w,setW] = useState(700)
  const [opened,setOpened] = useState({})
  let history = useHistory()
  const panel = useRef(null)
  const menuRef = useRef(null)
  useOutsideAlerter(panel, menuRef, setShowMenu,setOpened);

  const showNotification = (title,text,action) => {

    const btn = (<div style={{display:'flex'}}>
    <Button style={{width:150}} color={'secondary'} text={'Yes'}/>
    <Button style={{width:150}} color={'cancel'} text={'No'}/>
    </div>
        
    );
    const key = `open${Date.now()}`;
    
    notification.open({
      message: title,
      description: text,
      onClick: () => {
        if (action) action()
      },
      top:300,
      btn,
      key,
      duration:3,
      style:{
        paddingLeft:220,
        display:'flex',
        alignItems:'center',
        background: `url(static/call.png) no-repeat scroll 0px 1px`,
        //backgroundColor:'#ffffff',
        // fontSize: 22,
        // fontWeight: 600,
        // fontStretch: 'normal',
        // fontStyle: 'normal',
        // lineHeight: 1.5,
        // letterSpacing: 'normal',
        // color: '#666666',


        width: 897,
        marginLeft: 335 - 897,
        height: 161,
        borderRadius: 10,
        boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.16)',
        backgroundColor: '#ffffff',
            },
    });
  };

  const dropdownItems = [
    {label:'Version 1.0.0',color:'#0899b7',invert:true},
    {label:'Search',path:'/search'},
    {label:'Patients',path:'/patients'},
    // {label:'Messaßge Center', tba:'true'},
    {label:'Templates',path:'/treatmentPlanTemplates'},
    { label:'Manage Teams',
      options:[{label:'Overview',path:'/teamManagement'},
              {label:'Add Team Member',path:'/addTeamMember'}
              ]
    },
    {label:'Settings',
      options:[{label:'Permissions',path:'/permissions'},
            {label:'Notifications',path:'/notifications'}
            ]
  },
  {label:'Edit Practice',path:'/editPractice'},
    {label:'Logout',func:()=>logoutUser()}
  ]

  window.onresize = ()=>{ setW(window.innerWidth) };
  useEffect(()=>{
    setW(window.innerWidth)
  },[])

  useEffect(()=>{
    rom.hydrateUI()
  },[])

  function sendTo(path){
    history.push(path)
    setOpened({})
    setShowMenu(false)
  }

  const user = ui&&ui.user

  function logoutUser(){
    post('logout')

    // so that logout has token
    setTimeout(()=>{
      setUI(null)
      setShowMenu(false)
      history.push('/')
    },300)
    
  }

  const caret = showMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'

  return ( <div className="headerWrapper" style={{display:'flex',
  justifyContent:'space-between',position:'relative',
  height:79,maxHeight:79,minHeight:79,padding:0}}>
    <div style={{marginBottom:13,marginLeft:35}} onClick={()=>{
      openNotification('','This is an error message, watch out! It could be long.',<div style={{height:8}}/>)
      showNotification('','Incoming call from Lamarche, Robert',()=>console.log('answer'))
    }}>
      <Logo />
    </div>

    {user&&<>
          <div style={{...styles.dropdownTitle, left:w/2-72}} ref={menuRef} onClick={(e)=>{
            setShowMenu(!showMenu)
          }}>
          Menu <MaterialIcon icon={caret} style={{fontSize:37}}/>
          </div>
         
          <RightSide>
            <Button
            color='submit'
            text={'Add Patient'}
            icon={'add'}
            onClick={()=>sendTo('/patientInformation/new')}
            style={{width:140,height:40,fontSize:15,marginRight:69,borderRadius:6}}
            />
            <div style={styles.username}>
              {user.username}
            </div>
          </RightSide>
        </>
    }

    {showMenu&&
    <div style={{position:'absolute',width:'100%',top:79,left:0,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'}}>
      <Dropdown ref={panel}>
      {dropdownItems.map((d,i)=>{
        const opn = opened[d.label]
        const deepCaret = opn ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
        return <div key={i}><Item key={i} invert={d.invert} 
        color={d.color} style={{opacity:d.tba?0.6:1,boxShadow: opn&&'0 3px 6px 0 rgba(0, 0, 0, 0.15)'}} 
        onClick={()=>{
          if (d.options) setOpened({...opened,[d.label]:!opn})
          if (d.path) sendTo(d.path)
          if(d.func) d.func()
        }}>
          {d.label}
          {d.options&&<MaterialIcon icon={deepCaret} style={{fontSize:37,color:'#0899b7'}}/>}
          
        </Item>

        {opn&&
        <div style={{boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.15)'}}>
        {d.options.map((o,ii)=>{
          return <SubItem key={ii} 
          // style={{boxShadow:ii===0&&'0px 13px 0px #eee, 0px -4px 5px #ddd'}}
          onClick={()=>{
            if(o.path) sendTo(o.path)
            if(o.func) o.func()
            }}>
            {o.label}
          </SubItem>
        })}
          </div>
          }
        </div>
      })}
      </Dropdown>
    </div>}
  </div>
)
}



const styles = {
  dropdownTitle:{
    position:'absolute',
    top:0,
    left:700,
    userSelect:'none',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    color:'#fff',
    fontWeight:500,
    padding:21,
    fontSize:22,
    cursor:'pointer'
  },
  username:{
    color:'#fff',
    // fontWeight:500,
    fontSize:18

  },
}

const RightSide = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-right:60px;
`

const Item = styled.div`
    display:flex;
    padding:14px;
    user-select:none;
    font-size:18px;
    font-weight:500;
    justify-content:space-between;
    align-items:center;
    cursor:pointer;
    color:${p=>p.color?p.color:null};
    &:hover{
      ${'' /* background:#f1f1f1; */}
      background:#0899b7;
      color:#fff;
    }
`

const SubItem = styled.div`
    display:flex;
    padding:14px;
    font-size:18px;
    user-select:none;
    font-weight:500;
    
    background-color:#f6fbfc;
    justify-content:space-between;
    align-items:center;
    &:hover{
      background:#ddd;
    }
`

const Dropdown = styled.div`
    z-index:10;
    background:#fff;
    width:275px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
`


export default Header;
