import React from "react";
import { notification } from 'antd';

const openNotification = (title,text,buttons,action,placement,style) => {

  const btn = (<div style={{display:'flex'}}>
   {buttons?buttons:<div style={{height:8}}/>}
  </div>
      );

  const key = `open${Date.now()}`;
   
    notification.open({
      message:title,
      description: text,
      placement:placement?placement:'topLeft',
      top:100,
      btn,
      key,
      onClick: () => {
        if (action) action()
      },
      duration:3,
      style:{
        paddingLeft:190,
        paddingRight:20,
        display:'flex',
        alignItems:'center',
        background: `url(static/error.png) no-repeat scroll 0px 0px`,
        backgroundColor:'#ffffff',
        // fontSize: 22,
        fontWeight: 600,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        color: '#666666',
        width: 512,
        height: 148,

        // width: 897,
        // marginLeft: 335 - 897,
        // height: 161,
        borderRadius: 10,
        boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.16)',
        backgroundColor: '#ffffff',
        ...style
            },
    });
  };


  export default openNotification