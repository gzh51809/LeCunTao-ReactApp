import React from 'react'

import '@/components/tools/fixBar.scss'

import chat from '@/assets/img/iconkefu@3x.png'
import totop from '@/assets/img/iconZhiding.png'

const FixBar = ({obj, fix}) => {
  return (
    <div className="fixBar">
      <div className="chat">
        <img src={chat} alt=""/>
      </div>
      <div className="toTop" onClick={() => {
        let scrollToptimer = setInterval(function () {
          var top = obj.scrollTop
          var speed = top / 4
          obj.scrollTop -= speed;
          if (top === 0) {
              clearInterval(scrollToptimer);
          }
        }, 30); 
        // obj.scrollTop = 0
      }} style={{visibility: fix ? 'visible' : 'hidden'}}>
        <img src={totop} alt=""/>
      </div>
    </div>
  )
}

export default FixBar