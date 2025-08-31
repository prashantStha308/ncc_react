import React from 'react'

const ButtonDefault = ({
  // Content
  children,
  
  // Behavior
  onClick,
  disabled = false,
  type = "button",
  
  // Custom overrides
  className = "",
  style = {},
  
  leftIcon,
  rightIcon,
}) => {
  

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`rounded-sm text-sm md:text-base px-4 p-1.5 flex items-center gap-2 cursor-pointer ${className}`}
      style={style}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}

      <span className={`font-medium text-xs `}>{children}</span>
      
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  )
}


export default ButtonDefault;