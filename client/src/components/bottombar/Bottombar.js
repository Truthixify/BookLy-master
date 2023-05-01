import React from 'react'
import './bottombar.css'

export default function Bottombar(props) {
  return (
    <div className="bottombar">
      {props.children}
    </div>
  )
}
