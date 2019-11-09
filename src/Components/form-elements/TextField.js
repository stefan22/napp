import React from 'react'



const TextField = ({onChange,onBlur,fields,title,seckey,value}) => {

  return (
    <div className='text-input-field'>
      <h3>{seckey+1}. {title}</h3>

      {
        fields.map(itm =>
          (itm.type !== 'dropdown' && itm.type !== 'checkbox') ?
            <div key={itm.name}
            >
              <label
                className='input-label'
                htmlFor={itm.name}
              >
                {itm.label}
              </label>
              <input
                id={itm.name}
                type={itm.type}
                name={itm.name}
                className='text-input'
                value={value}
                required={true}
                onChange={onChange}
              />
            </div> : false
        )
      }
    </div>
  )

}


export default TextField
