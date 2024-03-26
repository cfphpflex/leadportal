import React from "react";
import styled from 'styled-components'

const foots = [
  {label:'LeadExchange Technologies, Inc.'},
  {label:'1 (888) 320-9390'},
  {label:'Privacy Policy', func:()=>console.log('link')},
  {label:'Disclaimer', func:()=>console.log('link')},
  {label:'Contact Us', func:()=>console.log('link')},

]

const Footer = (props) => (
  <Wrapper >
    <div style={{width: '100%',display: 'flex',justifyContent: 'center'}}>
    {foots.map((f,i)=>{
      let space = 15
      if (i===foots.length-1) space = 0
      return <W key={i}>
      <Lnk func={f.func} onClick={()=>f.func&&f.func()}>{f.label}</Lnk>
      {space>0&&
        <W>
          <div style={{width:space}}/>
          <div style={{color:'#0899b7'}}>|</div>
          <div style={{width:space}}/>
        </W>
      }
      </W>
    })}
    </div>
  </Wrapper>
);

export default Footer;


const Wrapper = styled.div`
   border-bottom: 7px solid #055e6c;
    padding-bottom:17px;
    margin-top:50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const W = styled.div`
    display: flex;
    align-items: center;
`

const Lnk = styled.div`
  ${'' /* margin: 0px 5px 0px 5px; */}
  font-size: 14px;
  line-height: 1.21;
  color: #595a5c;
  cursor:${p=>p.func&&'pointer'};
`

