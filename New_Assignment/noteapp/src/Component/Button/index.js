import React from 'react'

const Button = ({children,classes, onClick,type}) => {
  return (
    <button onClick={onClick} className={`${classes}`} type={type} >{children}</button>
  )
}

export default Button