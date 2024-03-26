
import React from 'react'
import styled from 'styled-components'

const Image = ({source, style, onClick}) => {
  return <MyImage source={source} style={style} onClick={onClick} />
}

export default Image

const MyImage = styled.div`
background-image: ${p=>`url(${p.source})`};
width:100px;
height:100px;
background-position: center; /* Center the image */
background-repeat: no-repeat; /* Do not repeat the image */
background-size: contain; /* Resize the background image to cover the entire container */
`