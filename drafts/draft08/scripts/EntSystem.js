
/*
 * System of entities, or ants if you will.
 * reads a 2d array with cell
*/

class EntSystem {
  constructor(_gridArray, _sz, _numEnts) {
    this.gridArr = _gridArray;
    this.sz = _sz;
    this.entArr = [];
    this.numEnts = _numEnts;
    this.stateArr = new Array(this.numEnts); //current states of cells visited by ents


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


  doLangton(_x, _y, _ent) {
    let x = _ent.midX;
    let y = _ent.midY;
    this.gridArr.forEach((el, index) => {
      el.forEach((cell) => {
        if (cell.withinBounds(x, y) && cell.state === true) {
          _ent.left();
          cell.stateFlip();
          // ent.forward();
        }
        else if (cell.withinBounds(x, y) && cell.state === false) {
          _ent.right();
          cell.stateFlip();
          // ent.forward();
        } 
      });
    });
  }

  
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



}

