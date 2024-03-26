import React, { Fragment } from "react";
import PropTypes from "prop-types";
import MaterialIcon from '@material/react-material-icon';

// *******************************************************
// RAIL (non-active track)
// *******************************************************
const railOuterStyle = {
  position: "absolute",
  width: "100%",
  height: 40,
  transform: "translate(0%, -50%)",
  cursor: "pointer"
  // border: "1px solid grey"
};

const railInnerStyle = {
  position: "absolute",
  width: "100%",
  height: 18,
  transform: "translate(0%, -50%)",
  borderRadius: 9,
  pointerEvents: "none",
  backgroundColor: "#afafaf"
};

export function SliderRail({ getRailProps }) {
  return (
    <Fragment>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </Fragment>
  );
}

SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export function Handle({ // your handle component
  handle: { id, value, percent }, 
  getHandleProps,
  prefix,
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -12,
        marginTop: -17,
        zIndex: 2,
        width: 26,
        height: 32,
        border: 0,
        background:'white',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: 7,
        color: '#333',
        boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.16)',

      }}
      {...getHandleProps(id)}
    >
      <div style={{fontSize:15,fontWeight:'bold',position:'absolute',left:-4,top:34,color:'#01b2cf',width:32,textAlign:'center'}}>
        {`${prefix||''}${value}`}
      </div>
      <MaterialIcon icon="drag_indicator"
        style={{cursor:'pointer',fontSize:24,color:'#ccc',left:1,top:4,position:'absolute'}}
      />
    </div>
  )
}

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function Track({ source, target, getTrackProps, disabled }) {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(0%, -50%)",
        height: 18,
        
        backgroundColor: '#01b2cf',
        borderRadius: 9,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()}
    />
  );
}

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Track.defaultProps = {
  disabled: false
};

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({ tick, prev, count, onClick }) {  // your own tick component
  const day = tick.value
  const v = prev && prev.value
  if(v===day) return (<div style={{
    position: 'absolute',
    marginTop: 24,
    marginLeft: `${(-(100 / count) / 2) + 5}%`,
    width: `${100 / count}%`,
    left: `${tick.percent}%`,
  }}>
    {tick.value}
  </div>)
  // console.log("yes?",yes)
  return (
    <div>
      {/* <div
        style={{
          position: 'absolute',
          marginTop: 22,
          marginLeft: -0.5,
          width: 1,
          height: 8,
          backgroundColor: 'silver',
          left: `${tick.percent}%`,
        }}
      /> */}
      <div
        style={{
          position: 'absolute',
          marginTop: 10,
          marginLeft: `${(-(100 / count) / 2) + 5}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
          display:'flex',
          justifyContent:'center',
        }}
      >
        {tick.value}
      </div>
    </div>
  )
}
