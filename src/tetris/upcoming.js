import React, { Component } from 'react'
import './css/tetris.css'

class Upcoming extends Component{
  render(){
    let squaresJSX = this.props.nextTetromino.shape[0].map( ( row, rowIndex ) => {
      let rowJSX = row.map( ( square, squareIndex ) => {
        let color = "Grey"
        if( square ){
          color = this.props.nextTetromino.color
        }
        return <div key={squareIndex} className={`Square + ${color}`}/>
      })
      return <div key={rowIndex} className='Row'>{rowJSX}</div>
    })


    return(
      <div>
        <h1 className='Title'>Next</h1>
        {squaresJSX}
      </div>
    )
  }
}

export {Upcoming}
