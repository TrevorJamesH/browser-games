import React, { Component } from 'react'
import './css/tetris.css'
import { Shapes } from './shapes'
import { GameBoard } from './gameboard'
import { Collision } from './checks'
import { Upcoming } from './upcoming'
import { Controls } from './controls'

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
      interval: null
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
    this.setState( {squares: currentState.squares} )
    this.completeCheck()
  }

  completeCheck(){
    for(let i = 3; i < 23; i++){
      let complete = true
      this.state.squares[i].forEach( square => {
        if( square === 'Black' ){complete = false}
      })
      let currentState = this.state
      if( complete ){
        this.speedUp()
        currentState.score++
        currentState.squares[i] = currentState.squares[i].map( square => square = 'Black')
        for( let j = i; j > 0; j-- ){
          currentState.squares[j] = JSON.parse(JSON.stringify(currentState.squares[j-1]))
        }
      }
      this.setState({squares: currentState.squares, score: currentState.score})
    }
  }

  handleKeyPress(event){
    if(event.key === 'w' && this.state.play === true && !Collision.rotate( this.state.squares, this.state.tetromino, this.state.location, this.state.rotation )){
      this.rotate()
      clearTimeout()
    }
    if(event.key === 'a' && this.state.play === true &&  !Collision.left( this.state.squares, this.state.tetromino, this.state.location, this.state.rotation )){
      this.move( -1 )
    }
    if(event.key === 'd' && this.state.play === true &&  !Collision.right( this.state.squares, this.state.tetromino, this.state.location, this.state.rotation )){
      this.move( 1 )
    }
    if(event.key === 's' && this.state.play === true){
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

  down(){
    if( !this.state.tetromino ){
      return
    }
    if( Collision.down( this.state.squares, this.state.tetromino, this.state.location, this.state.rotation )){
      if( this.state.location[0] <= 1 ){
        this.gameOver()
      }else{
        this.setTetromino()
        this.nextShape()
      }
    }else{
      this.setState(
        {
          location: [(this.state.location[0] + 1),this.state.location[1]],
        }
      )
    }
  }

  startButton(){
    this.newGame()
  }

  gameOver(){
    console.log('gameOver')
    this.setTetromino()
    this.setState({
      tetromino: null,
      location: null,
      rotation: 0,
      play: 'GameOver',
      interval: 500
    })
  }

  tick(){
    console.log('location',this.state.location)
    this.down()
    let intervalId = setTimeout( () => this.tick(), this.state.interval)
    this.setState({intervalId: intervalId})
  }

  speedUp(){
    let newInterval = this.state.interval - 50
    this.setState({interval: newInterval})
    console.log('speedUp')
    console.log('interval',this.state.interval)
  }

  newGame(){
    console.log('newGame')
    clearTimeout(this.state.intervalId)
    this.setState({
      squares: this.initializeSquares(),
      // tetromino: null,
      nextTetromino: Shapes.newShape(),
      location: [0,4],
      rotation: 0,
      score: 0,
      play: true,
      interval: 500
    })
    this.nextShape()
    this.tick()

  }

  render(){
    let buttonText = !this.state.play ? 'Start Game' : 'New Game'
    let gameOver = this.state.play === 'GameOver' ? 'Game Over    ' : ''

    return(
      <div onKeyPress={this.handleKeyPress.bind(this)} className='Page'>
        <div className="Title">
          <h1>Tetross</h1>
          <h2>{gameOver}Score: {this.state.score}</h2>
        </div>
        <div className='Layout'>
          <div className='Gameboard'>
            <GameBoard squares={this.state.squares} rotation={this.state.rotation} location={this.state.location} tetromino={this.state.tetromino} />
            <button onClick={this.startButton.bind(this)} className='StartButton'>{buttonText}</button>
          </div>
          <div className='Upcoming'>
            <Upcoming nextTetromino={this.state.nextTetromino}/>
            <Controls/>
          </div>
        </div>
      </div>
    )
  }
}

export {Tetris}
