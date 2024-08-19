import React from 'react'

function FormField({title,value,name, handleChange, placeholder,select}) {
  return (
    <form>
    <div className='flex flex-col'>
    <label className='font-bold'>{title}</label>
        <input name={name} value={value} onChange={handleChange} placeholder={placeholder} 
          className="border-2 py-2 px-4 rounded-lg"
        />
        
    </div>
      <div>
        {select}
      </div>
    </form>
  )
}

export default FormField
