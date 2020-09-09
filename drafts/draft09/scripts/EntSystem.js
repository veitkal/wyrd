
/*
 * System of entities, or ants if you will.
 * reads a 2d array with cells
*/

class EntSystem {
  constructor(_gridArray, _sz, _numEnts) {
    this.gridArr = _gridArray;
    this.sz = _sz;
    this.entArr = [];
    this.numEnts = _numEnts;
    this.stateArr = new Array(this.numEnts); //current states of cells visited by ents


    //setup of the system
    for (let k = 0; k<this.numEnts; k++) {
      let tempVec = createVector(this.gridArr[floor(random(this.gridArr.length))][floor(random(this.gridArr[0].length))].posX, this.gridArr[floor(random(this.gridArr.length))][floor(random(this.gridArr[0].length))].posY);
      let tempEnt = new Ent(tempVec, this.sz, 0, this.sz*this.gridArr.length, 0, this.sz*this.gridArr[0].length);
      this.entArr.push(tempEnt);
    }

  }

  update() {
    this.entArr.forEach((el, index) => {
      this.doLangton(el.midX, el.midY, el);
        this.stateArr[index] = this.getState(el);
    });
  }

  display() {
    this.gridArr.forEach((el) => {
      el.forEach((cell) => {
        cell.drawCell();
      });
    });
    
    this.entArr.forEach(el => {
      el.display();
    });
  }


  //the langton wal
  doLangton(_x, _y, _ent) {
    let x = _ent.midX;
    let y = _ent.midY;
    this.gridArr.forEach((el, index) => {
      el.forEach((cell, cellIndex) => {
      

        if (cell.withinBounds(x, y) && cell.state === true) {
          if (random(1) > 0.99) {
            _ent.leftRight();
            _ent.left();
          } else if (random(1) > 0.99) {
            _ent.leftLeft();
          } else if (random(1) > 0.99) {
            _ent.leftRight();
          } else {
             _ent.left();
          }
          cell.stateFlip();
          // ent.forward();
        }
        else if (cell.withinBounds(x, y) && cell.state === false) {
          if (random(1) > 0.99) {
             _ent.rightLeft();
            _ent.right();
          } else if (random(1) > 0.99) {
            _ent.rightRight();
          } else if (random(1) > 0.99) {
            _ent.rightLeft();
          } else {
            _ent.right();
          }
          cell.stateFlip();
          // ent.forward();
         
        } 
      });
    });
  }

  
  //get current state from specific ent
  getState(_ent) {
    let currState = false;
    let x = _ent.midX;
    let y = _ent.midY;
    this.gridArr.forEach(el => {
      el.forEach((cell, index) => {
        if (cell.withinBounds(x, y)) {
          currState = cell.state;
        }
      });
    });
    return(currState);
  }

  //add a new ant at x/y
  addEnt(_x, _y) {
    let xy = createVector(_x,_y);
    let tempEnt = new Ent(xy, this.sz, 0, this.sz*this.gridArr.length, 0, this.sz*this.gridArr[0].length);
      this.entArr.push(tempEnt);
  }


}

