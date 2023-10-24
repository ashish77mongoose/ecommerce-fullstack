import React from 'react'
import Select from 'react-select'
const ReactSelect = ({ className,
    label,
    error,
    helperText,
    ...rest}) => {
  return (
    <div className='w-full flex flex-col gap-1'>
         {label && <label htmlFor="">{label}</label>}
    <Select
      isClearable
     {...rest}
      formatOptionLabel={(option) => (
        <div className="
        flex ">
          <div>{option.flag}</div>
          <div>
            {option.label}
            <span className="text-neutral-500 ml-1">
              {option.region}
            </span>
          </div>
        </div>
      )}
      classNames={{
        control: () => 'border-1',
        input: () => 'text-lg',
        option: () => 'text-lg'
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6'
        }
      })}
    />
     {helperText && <p className="text-gray-600 text-xs">{helperText}</p>}
      {error && <p className="form-error">{error}</p>}
  </div>
  )
}

export default ReactSelect
