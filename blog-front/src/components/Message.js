import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {

  const notification = useSelector(state => state.notification)

//Styles-----------------------------------------
  const frame = {
    color: notification.style === 'error' ? 'red' : 'green',
    width: (window.innerWidth - 100),
    position: 'relative',
    left: 30,
    height: '4vh',
    border: notification.style === 'error' ? '2px solid red' : notification.style === 'added' ? '2px solid green': 'none',
    borderRadius: '5px',
    display: 'table-cell',
    verticalAlign: 'middle'
  }
  const text = {
    paddingLeft:'2vw'
  }
//------------------------------------------------
  
  return (
    <div style={frame}> 
      <div style={text}>{notification.message}</div>
    </div>  
  )
}

export default Message