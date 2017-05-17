


class J {
  constructor(){
    this.color = 'Blue'
    this.rotation = 0
    this.shape = [
      [
        [1,0,0],
        [1,1,1],
        [0,0,0]
      ],
      [
        [0,1,1],
        [0,1,0],
        [0,1,0]
      ],
      [
        [0,0,0],
        [1,1,1],
        [0,0,1]
      ],
      [
        [0,1,0],
        [0,1,0],
        [1,1,0]
      ]
    ]
  }
}

class T {
  constructor(){
    this.color = 'Purple'
    this.rotation = 0
    this.shape = [
      [
        [0,1,0],
        [1,1,1],
        [0,0,0]
      ],
      [
        [0,1,0],
        [0,1,1],
        [0,1,0]
      ],
      [
        [0,0,0],
        [1,1,1],
        [0,1,0]
      ],
      [
        [0,1,0],
        [1,1,0],
        [0,1,0]
      ]
    ]
  }
}

class L {
  constructor(){
    this.color = 'Orange'
    this.rotation = 0
    this.shape = [
      [
        [0,0,0],
        [1,1,1],
        [1,0,0]
      ],
      [
        [1,1,0],
        [0,1,0],
        [0,1,0]
      ],
      [
        [0,0,1],
        [1,1,1],
        [0,0,0]
      ],
      [
        [0,1,0],
        [0,1,0],
        [0,1,1]
      ]
    ]
  }
}

class S {
  constructor(){
    this.color = 'Green'
    this.rotation = 0
    this.shape = [
      [
        [0,1,1],
        [1,1,0],
        [0,0,0]
      ],
      [
        [0,1,0],
        [0,1,1],
        [0,0,1]
      ],
      [
        [0,0,0],
        [0,1,1],
        [1,1,0]
      ],
      [
        [1,0,0],
        [1,1,0],
        [0,1,0]
      ]
    ]
  }
}

class Z {
  constructor(){
    this.color = 'Red'
    this.rotation = 0
    this.shape = [
      [
        [1,1,0],
        [0,1,1],
        [0,0,0]
      ],
      [
        [0,0,1],
        [0,1,1],
        [0,1,0]
      ],
      [
        [0,0,0],
        [1,1,0],
        [0,1,1]
      ],
      [
        [0,1,0],
        [1,1,0],
        [1,0,0]
      ]
    ]
  }
}

class I {
  constructor(){
    this.color = 'Teal'
    this.rotation = 0
    this.shape = [
      [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]
      ],
      [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
      ]
    ]
  }
}

class O {
  constructor(){
    this.color = 'Yellow'
    this.rotation = 0
    this.shape = [
      [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
      ],
      [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
      ],
      [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
      ],
      [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
      ],
    ]
  }
}

class Shapes{

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static newShape(){
    let number = this.getRandomInt(1,8)
    if(number === 1){return new O()}
    if(number === 2){return new T()}
    if(number === 3){return new J()}
    if(number === 4){return new L()}
    if(number === 5){return new S()}
    if(number === 6){return new Z()}
    if(number === 7){return new I()}
  }
}


export {Shapes}
