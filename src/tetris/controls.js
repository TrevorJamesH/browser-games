import React, { Component } from 'react'
import './css/tetris.css'

class Controls extends Component{
  render(){


    return(
      <div>
        <h1 className='Title'> Controls: </h1>
        <h1 className='Title'> W: Rotate </h1>
        <h1 className='Title'> A & D: Move left and right </h1>
        <h1 className='Title'> S: Move down </h1>
      </div>
    )
  }
}


export {Controls}
