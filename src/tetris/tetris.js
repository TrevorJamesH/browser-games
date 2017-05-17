import React, { Component } from 'react'
import './css/tetris.css'
import { Shapes } from './shapes'
import { GameBoard } from './gameboard'
import { Collision } from './checks'
import { Upcoming } from './upcoming'

class Tetris extends Component {
  constructor(){
    super()
    this.state = {
      squares: this.initializeSquares(),
      tetromino: null,
      nextTetromino: Shapes.newShape(),
      location: null,
      rotation: 0,
      score: 0,
      play: false,
      interval: 500
    }
  }

  initializeSquares(){
    let squares = []
    for( let y = 1; y <= 23; y++ ){
      let row = []
      for( let x = 1; x <= 10; x++ ){
        row.push('Black')
      }
      squares.push(row)
    }
    return squares
  }

  nextShape(){
    this.setState(
      {
        tetromino: this.state.nextTetromino,
        nextTetromino: Shapes.newShape(),
        location:[0,4],
        rotation:0
      }
    )
  }

  setTetromino(){
    let currentState = this.state
    currentState.tetromino.shape[currentState.rotation].forEach( (row, rowIndex) => {
      row.forEach( (square, squareIndex) => {
        if( square ){
          currentState.squares[currentState.location[0]+rowIndex][currentState.location[1]+squareIndex] = currentState.tetromino.color
        }
      })
    })
    currentState.rotation = 0
    currentState.location = null
    currentState.tetromino = null
    this.setState( currentState )
    this.completeCheck()
    this.nextShape()
  }

  completeCheck(){
    for(let i = 3; i < 23; i++){
      let complete = true
      this.state.squares[i].forEach( square => {
        if( square === 'Black' ){complete = false}
      })
      let currentState = this.state
      if( complete ){
        currentState.score++
        currentState.squares[i] = currentState.squares[i].map( square => square = 'Black')
        for( let j = i; j > 0; j--){
          currentState.squares[j] = JSON.parse(JSON.stringify(currentState.squares[j-1]))
        }
      }
      this.setState(currentState)
    }
  }

  handleKeyPress(event){
    if(event.key === 'w' && !Collision.rotate( this.state.squares, this.state.tetromino, this.state.location, this.state.rotation )){
      this.rotate()
      clearTimeout()
    }
    if(event.key === 'a' && !Collision.left( this.state.squares, this.state.tetromino, this.state.location, this.state.rotation )){
      this.move( -1 )
    }
    if(event.key === 'd' && !Collision.right( this.state.squares, this.state.tetromino, this.state.location, this.state.rotation )){
      this.move( 1 )
    }
    if(event.key === 's'){
      this.down()
    }
  }

  rotate(){
    this.setState(
      {
        rotation: (this.state.rotation + 1) % 4,
      }
    )
  }

  move( direction ){
    this.setState(
      {
        location: [(this.state.location[0]),this.state.location[1] + direction],
      }
    )
  }

  tick(){
    this.down()
  }

  down(){
    if( Collision.down( this.state.squares, this.state.tetromino, this.state.location, this.state.rotation )){
      if( this.state.location <= 2 ){
        this.gameOver()
      }else{
        this.setTetromino()
      }
    }else{
      this.setState(
        {
          location: [(this.state.location[0] + 1),this.state.location[1]],
        }
      )
    }
  }

  playPause(){
    if(!this.state.play){
      let intervalID = setInterval( () => this.tick(),this.state.interval)
      this.setState({intervalID: intervalID})
      this.setState({play: true})
      this.nextShape()
    }
    if(this.state.play){
      this.setState({play: false})
      clearInterval( this.state.intervalID )
    }
  }

  gameOver(){
    clearInterval( this.state.intervalID )
    this.setState({
      tetromino: null,
      nextTetromino: Shapes.newShape(),
      location: null,
      rotation: 0,
      score: 0,
      play: 'GameOver',
      interval: 500
    })
  }

  render(){
    let buttonText = !this.state.play ? 'Start Game' : 'Pause Game'
    let gameOver = this.state.play === 'GameOver' ? 'Game Over' : ''

    return(
      <div onKeyPress={this.handleKeyPress.bind(this)} className='Page'>
        <div className="Title">
          <h1>Tetross</h1>
          <h2>{gameOver}Score:{this.state.score}</h2>
        </div>
        <div className='Layout'>
          <div className='Gameboard'>
            <GameBoard squares={this.state.squares} rotation={this.state.rotation} location={this.state.location} tetromino={this.state.tetromino} />
            <button onClick={this.playPause.bind(this)} className='StartButton'>{buttonText}</button>
          </div>
          <div className='Upcoming'>
            <Upcoming nextTetromino={this.state.nextTetromino}/>
          </div>
        </div>
      </div>
    )
  }
}

export {Tetris}
