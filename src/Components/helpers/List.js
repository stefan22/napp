import React, {Component} from 'react'


class List extends Component {
  render() {
    const {items, item: Item} = this.props

    return (
      <>
        {
          items.map((itm,idx) =>
            <Item
              key={itm.id}
              seckey={idx}
              {...itm}
            />
          )
        }
      </>
    )
  }

}


export default List
