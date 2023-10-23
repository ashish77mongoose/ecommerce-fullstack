import React from 'react'

const ActionButton = ({className,children,...rest}) => {
  return (
    <button {...rest} className={`w-8 h-8 text-18 bg-amber-200 hover:bg-amber-300 rounded-md flex-center ${className}`}>
      {children}
    </button>
  )
}

export default ActionButton
