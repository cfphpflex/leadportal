import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { Button, Image, Battery} from '../ui/leadexchangeUI'
import MaterialIcon from '@material/react-material-icon';
import Popover from 'react-tiny-popover'


// function HoverAlerter(ref,showPop, setShowPop) {
//     useEffect(() => {
  
//       function handleMove(event) {
          
//         if (ref.current && ref.current.contains(event.target)) {
//             console.log('hii')
//             if (!showPop) setShowPop(true)
//         } 
//         else {
//             console.log('nooo')
//             if (showPop) setShowPop(false)
//         }
//       }
  
//       document.addEventListener("mousemove", handleMove);
//       return () => {
//         document.removeEventListener("mousemove", handleMove);
//       };
//     }, [ref]);
//   }

const AlertCell = (props) => {
    const {value, style, name, camera, handleClick} = props
    const [showPop,setShowPop] = useState(false)

    const panel = useRef(null)
    // HoverAlerter(panel, showPop,setShowPop);

    
    return (<Image source={'static/alert.png'} style={{width:30,height:30}}/>
        )
}


export default AlertCell

{/* <Popover
        isOpen={showPop}
        position={'top'} // preferred position
        content={(
            <div>
                Hi! I'm popover content.
            </div>
        )}
    ><Cell ref={panel} style={{...style,pointerEvents:'auto'}} onClick={()=>handleClick()}>
    
    </Cell>
    </Popover> */}
