import React from 'react'

function FormField({title,value,name, handleChange, placeholder}) {
  return (
    <form>
    <div className='flex flex-col'>
    <label>{title}</label>
        <input name={name} value={value} onChange={handleChange} placeholder={placeholder} 
          className="border rounded-lg"
        />
    </div>
      
    </form>
  )
}

export default FormField
