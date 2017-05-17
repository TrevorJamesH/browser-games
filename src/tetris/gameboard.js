import React, { Component } from 'react'
import './css/tetris.css'

class GameBoard extends Component{

  displayTetromino( squares ){
    this.props.tetromino.shape[this.props.rotation].forEach( (row, rowIndex) => {
      row.forEach( (square, squareIndex) => {
        if( square ){
          squares[this.props.location[0]+rowIndex][this.props.location[1]+squareIndex] = 'Shape'
        }
      })
    })
    return squares
  }

  undisplayTetromino( squares ){
    return this.props.squares.map( row => {
      return row.map( square => {
        if( square === 'Shape' ){
          return 'Black'
        }else{
          return square
        }
      })
    })
  }

  render(){
    let squares = this.props.squares
    if( this.props.tetromino ){
      squares = this.undisplayTetromino( squares )
      squares = this.displayTetromino( squares )
    }
    let squaresJSX = squares.map( (row, rowIndex ) => {
      if( rowIndex >= 3){
        let rowJSX = row.map( (square, squareIndex ) => {
          let color = square
          if( square === 'Shape' ){
            color = this.props.tetromino.color
          }
          return <div key={squareIndex} className={`Square + ${color}`}/>
        })
        return <div key={rowIndex} className='Row'>{rowJSX}</div>
      }
    })

    return(
      <div>
        {squaresJSX}
      </div>
    )
  }
}

export { GameBoard }
