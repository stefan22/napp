import React from 'react'


const List = ({items,item: Item,onChange,value}) => (

    <>
      {
        items.map((itm,idx) =>
          <Item
            key={idx}
            seckey={idx}
            {...itm}
            onChange={onChange}
            value={value}
          />
        )
      }
    </>

)


export default List
