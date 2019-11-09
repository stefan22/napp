import React from 'react'



const CheckField = ({fields,onChange,seckey,value}) => (

    <>
      {
        fields.map(itm =>
          itm.type === 'checkbox' ?
            <div className="checkbox" key={seckey}>
              <input
                type={itm.type}
                name={itm.name}
                id={itm.name}
                defaultChecked={false}
                value={value}
                onChange={onChange}
              />
              <label htmlFor={itm.name}>{itm.label}</label>
            </div>
            : false
        )
      }
    </>

)




export default CheckField
