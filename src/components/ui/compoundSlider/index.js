import React, {useState} from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Track, Handle, Tick } from "./slider"
import {scaleLinear} from 'd3-scale'
import styled from 'styled-components'

export default function CompoundSlider(props){
  const {label,subtitle,prefix,single,value,onChange,onUpdate,hideTrack} = props

  // value must look like [0] or [0,0]
  let val = value

  if (!val) val = single?[0]:[0,0]

  const min = props.min||0
  const max = props.max||100

  const isSingle = (single&&single!==undefined)?true:false

  const tickers = scaleLinear()
    .domain([min, max])
    .ticks(10)
    .map((d,i) => {
      return +d
    })

  return <SliderWrap hasSubtitle={subtitle?true:false}>
    <Title>{label}</Title>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
    <Slider
      mode={single?1:2}
      step={1}
      domain={[+min, +max]}
      rootStyle={sliderStyle}
      onUpdate={onUpdate}
      onChange={onChange}
      values={val}
    >
      <Rail>
        {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div>
            {handles.map(handle => (
              <Handle
                prefix={prefix}
                key={handle.id}
                handle={handle}
                domain={[+min, +max]}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>
      {!hideTrack&&<Tracks left={hideTrack?false:isSingle} right={false}>
        {({ tracks, getTrackProps }) => (
          <div>
            {tracks.map(({ id, source, target }) => (
              <Track
                key={id}
                source={source}
                target={target}
                getTrackProps={getTrackProps}
              />
            ))}
          </div>
        )}
      </Tracks>}
      {/* <Ticks values={tickers}>
        {({ ticks }) => (
          <div>
            {ticks.map((tick,i) => (
              <Tick
                key={tick.id}
                tick={tick}
                prev={ticks[i-1]}
                count={ticks.length}
                onClick={()=>handleDateClick(tick)}
              />
            ))}
          </div>
        )}
      </Ticks> */}
    </Slider>
  </SliderWrap>
}

const sliderStyle = {
  position: "relative",
  width: 400,
  touchAction: 'none',
};

const SliderWrap = styled.div`
  height:${p=>p.hasSubtitle?103:82}px;
  width:400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  padding-bottom: 32px;
`
const Title=styled.div`
  color:#666;
  height:24px;
  width:100%;
  text-align:center;
  position:absolute;
  top:10px;

  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #666666;
`
const Subtitle=styled.div`
  color:#acacad;
  height:24px;
  width:100%;
  text-align:center;
  position:absolute;
  top:30px;
`