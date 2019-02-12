import React from 'react'

import './platform.scss'

const Platform = ({data}) => {
  return (
    <ul id="platform">
      {
        data.map(item => {
          return (
            <li key={item.cate_type}>
              <a href={item.url}>
                <img src={item.cate_image} alt=""/>
                <p>{item.cate_name}</p>
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Platform