import React from 'react'


const SelectField = ({fields,value,onChange}) => {

  return (
    <>
    {
      fields.map((sel,idx) =>

        (sel.type === 'dropdown') ?

          <div key={idx}>
            <label
              className='label-field'
              htmlFor={sel.name}
            >
              {sel.label}
            </label>
            <select
              className='select'
              name={sel.name}
              id={sel.name}
              type='dropdown'
              onChange={onChange}
            >
              {
                sel.options.map(option =>
                  <option
                    key={option}
                    value={value}
                  >
                    {option}
                  </option>
                )
              }

            </select>
          </div>
          : false
      )
    }
    </>
  )

}



export default SelectField
