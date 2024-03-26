import React, { useState, useEffect, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { Button, Image, Battery} from '../ui/leadexchangeUI'
import MaterialIcon from '@material/react-material-icon';
import Popover from 'react-tiny-popover'
import AlertCell from './alertCell'
import { Tooltip } from 'antd'
import moment from 'moment'


const ItemCell = (props) => {
    const {value, style, name, camera, handleClick, isLast, isFirst} = props
    
    if (name==='space') return <Cell 
                            {...props}
                                style={{width:100}} 
                                />
    // for patients
    if (camera) return <Cell {...props}>
        <Image style={{width:50,height:30}} source={'static/camera.png'}/>
        </Cell>

    if (name==='pain') return <Cell {...props} style={{...style,fontWeight:'bold',color:'#efa700'}}>
    <MaterialIcon icon='arrow_downward' style={{fontSize:17,marginRight:5}}/>
    {value}
    </Cell>
    
    
    if (name==='postOpDay') return <Cell {...props} style={{...style,fontWeight:'bold'}}>{value}</Cell>

    if (name==='romExtF') return <Cell {...props} style={style}>
    <MaterialIcon icon='arrow_downward' style={{fontSize:17,marginRight:5,color: '#00b2ce'}}/>
        <Pill>
            <span>{value}</span>
        </Pill>
    <MaterialIcon icon='arrow_upward' style={{fontSize:17,marginLeft:5,color: '#00b2ce'}}/>
</Cell>
    
    
    

    if (name==='alerts') {

        const alerttexts = ['OH NO!','HELP!','thank god. OH WAIT, NO AHHH!!!']
        const text = (<div>
        {alerttexts.map((a,i)=>{
            return <div key={i}>
            {/* <div style={{fontWeight:'bold'}}>{moment().format('LL')}</div> */}
            <div style={{color:'red'}}>{a}</div> 
            </div>
        })}
        </div>)

        return<Tooltip placement="left" title={text} //overlayStyle={{backgroundColor:'#222',borderRadius:10}}
        >
            <Cell {...props} style={style}>
            <AlertCell {...props}/>
            </Cell> 
            </Tooltip>
    }

    if (name==='sessionCompTot') return <Cell {...props} style={{...style,fontWeight:'bold'}}>{value}</Cell>

// for devices
    if (name==='pcSerial') return <Cell {...props} style={{...style, flexDirection:'column'}}>
    {value}
    <div style={{display:'flex',marginTop:5}}>
        <Battery color={''} type={'L'} style={{marginRight:15}}/>
        <Battery color={''} type={'R'}/>
    </div>
    </Cell>
    if (name==='aaSerial'||name==='asSerial') return <Cell {...props} style={{...style, flexDirection:'column'}}>
    {value}
    <div style={{marginTop:5}}>
    <Battery />
    </div>
    </Cell>
    
// default
    return <Cell {...props} style={style}>{value}</Cell>
}

export default ItemCell

const Cell = styled.div`
display:flex;
flex:1;
overflow:hidden;
height:78px;
align-content:center;
justify-content:center;
align-items:center;
${'' /* padding-top:45px;
padding-bottom:45px; */}
${'' /* border:1px solid red; */}
${'' /* height:80px; */}
${'' /* margin-top:20px; */}
padding:5px;
${'' /* min-height:60px; */}
${'' /* max-height:60px; */}
z-index:1;
${'' /* width:100%; */}
text-align:center;
font-size: 16px;
background:#fff;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: 1.19;
letter-spacing: normal;
color: #797a7c;
padding-left:${p=>p.isFirst&&'30px'};
padding-right:${p=>p.isLast&&'30px'};
border-radius:${p=>p.isFirst?'10px 0 0 10px':p.isLast?'0 10px 10px 0':null}
${'' /* user-select:none;
pointer-events:none; */}
`

const Pill = styled.div`
display:flex;
align-content:center;
justify-content:center;
align-items:center;
color:#fff;
width: 96px;
border-radius: 25px;
background-color: #00b2ce;
padding:8px;
`
