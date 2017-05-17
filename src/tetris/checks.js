class Collision{
  static left( squares, tetromino, location, rotation ){
    let collision = false
    tetromino.shape[rotation].forEach( (row, rowIndex) => {
      row.forEach( (square, squareIndex) => {
        if( square ){
          let squareToLeft = squares[location[0]+rowIndex][location[1]+squareIndex-1]
          if( squareToLeft !== 'Shape' ){
            if( !squareToLeft || squareToLeft !== 'Black' ){
              collision = true
            }
          }
        }
      })
    })
    return collision
  }

  static right( squares, tetromino, location, rotation ){
    let collision = false
    tetromino.shape[rotation].forEach( (row, rowIndex) => {
      row.forEach( (square, squareIndex) => {
        if( square ){
          let squareToRight = squares[location[0]+rowIndex][location[1]+squareIndex+1]
          if( squareToRight !== 'Shape' ){
            if( !squareToRight || squareToRight !== 'Black' ){
              collision = true
            }
          }
        }
      })
    })
    return collision
  }

  static down( squares, tetromino, location, rotation ){
    let collision = false
    tetromino.shape[rotation].forEach( (row, rowIndex) => {
      row.forEach( (square, squareIndex) => {
        if( square ){
          if( !squares[location[0]+rowIndex+1] ){
            collision = true
          }else{
            let squareBellow = squares[location[0]+rowIndex+1][location[1]+squareIndex]
            if( squareBellow !== 'Shape' ){
              if( !squareBellow || squareBellow !== 'Black' ){
                collision = true
              }
            }
          }
        }
      })
    })
    return collision
  }

  static rotate( squares, tetromino, location, rotation ){
    let collision = false
    tetromino.shape[(rotation + 1)%4].forEach( (row, rowIndex) => {
      row.forEach( (square, squareIndex) => {
        if( square ){
          if( !squares[location[0]+rowIndex] ){
            collision = true
          }else if( !squares[location[0]+rowIndex][location[1]+squareIndex] ){
            collision = true
          }else if( squares[location[0]+rowIndex][location[1]+squareIndex] !== 'Black' ){
            if( squares[location[0]+rowIndex][location[1]+squareIndex] !== 'Shape'){
              collision = true
            }
          }
        }
      })
    })
    return collision
  }

}

export { Collision }
