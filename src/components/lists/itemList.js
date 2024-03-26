import React, { useState, useRef, useCallback, useContext, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { Button, Title, BigTitle,Input, SubTitle,Image} from '../ui/leadexchangeUI'
import { useHistory } from "react-router-dom";
import MaterialIcon from '@material/react-material-icon';
import ItemCell from './itemCell'

const ItemList = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const { camera, headers, items, buttons } = props

    const history = useHistory()

    function handleClick(p){
        // if patient
        if (p.procedure) history.push(`patientProfile/${p.id}`)
    }

    const caret = 'arrow_drop_down' //'arrow_drop_up'

    const headersRender = []

    headers.forEach((h,i)=>{
        headersRender.push(<TheHeadCell><Head>
        {h.key==='space'?
            <TheHeadCell 
            style={{width:100,}} 
            key={i}/>
            :
            <>
            {h.label}
            <MaterialIcon icon={caret} />
            </>
        }
        </Head></TheHeadCell>)
    })

    if (camera) {
        headersRender.unshift(<TheHeadCell 
            style={{width:50,}}/>)
    }

    if (buttons){
        headersRender.push(
                <TheHeadCell 
                style={{width:buttons.length*230+buttons.length*10+100}}/>)
    }

    return (<div style={{display:'flex',flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>
    <div style={{width:'100%'}}>

    <TheTable>
        <TheHead>
            <TableHeadRow>
            {headersRender}
            </TableHeadRow>
        </TheHead>

        <TheBody>

            {items&&items.map((p,ii)=>{
                const cells = []

                headers.forEach((h,i)=>{
                        if (camera&&i===0)cells.push(<TheCell key={i} >
                                <ItemCell 
                                    handleClick={()=>history.push(`romTime/${p.id}`)}
                                    patient={p}
                                    isLast={i===headers.length-1}
                                    isFirst={i===0}
                                    camera/>
                        </TheCell>)

                        const value = p[h.key]

                        cells.push(<TheCell key={i+'cell'}><ItemCell 
                            isLast={i===headers.length-1}
                            isFirst={i===0}
                            handleClick={()=>handleClick(p)}
                            key={i+h.key+ii+''} 
                            name={h.key}
                            value={value}/></TheCell>)

                        })

                return <TableRow key={ii+'row'} onClick={()=>handleClick(p)} style={{paddingLeft:!camera&&0}}>
                  {cells}

                  {buttons&& <TheCell style={{backgroundColor: '#ffffff',borderTopRightRadius:10,borderBottomRightRadius:10}}>
                  <div style={{display:'flex',justifyContent:'flex-end'}}>
                        {buttons.map((b,bi)=>{
                            return <Button
                            color={b.color}
                            disabled={p.isDefault}
                            key={bi}
                            style={{margin:10,marginBottom:5,marginTop:5,...b.style}}
                            text={b.text}
                            onClick={()=>b.func&&b.func(p)}
                            />
                        })}
                    </div>
                </TheCell>
                  }        

                  </TableRow>
        
        })}

        </TheBody>
    </TheTable>
    </div>   
    </div>);
}

export default ItemList

const Head = styled.div`
    display:flex;
    flex:1;
    min-height:50px;
    max-height:50px;
    height:50px;
    flex-direction:row;
    justify-content:center;
    align-content:center; 
    align-items:center; 
    text-transform:uppercase;

    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: 0.32px;
    text-align: center;
    color: #106179;
    cursor:pointer;
`

const Cloud = styled.div`
    position:absolute;
    left:0;
    top:0;
    z-index:1;
    padding: 20px;
    height:66px;
    border-radius: 10px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
    background-color: #ffffff;
    margin-top:20px;
    width:${p=>p.width?`${p.width}`:'600px'};
    border:${p=>p.isDefault?'#0899b7 2px solid':null};
`


const TheTable = styled.div`
    display: table;
    width:100%;
    z-index:1;
    border-spacing:0 20px;
    
`
const TheHead = styled.thead`


`
const TheBody = styled.tbody`


`

const TheCell = styled.td`
    ${'' /* padding:10px; */}
    overflow:hidden;
    ${'' /* background-color: #ffffff; */}
`

const TheHeadCell = styled.th`
`

const TableRow = styled.tr`
    overflow:hidden;
    display: table-row;
    padding: 20px;
    height:66px !important;
    max-height:66px !important;
    border-radius: 10px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
    ${'' /* width:${p=>p.width?`${p.width}`:'600px'}; */}
    border:${p=>p.isDefault?'#0899b7 2px solid':null};
`

const TableHeadRow = styled.tr`
    overflow:hidden;
    display: table-row;
    padding: 20px;
    
`



// #table{ 
//     display: table; 
// }
// .tr{ 
//     display: table-row; 
// }
// .td{ 
//     display: table-cell; }
