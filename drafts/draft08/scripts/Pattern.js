/* Pattern Class
 *
 *
 */


class Pattern {
  constructor(_arr, _orgX, _orgY, _width, _height, _numRepeats) {
    this.currArr = _arr; //current array of states
    this.orgX = _orgX;
    this.orgY = _orgY;
    this.width = _width;
    this.height = _height;

    this.repeats = _numRepeats; //nummber of repeats / loops of the pattern
    this.counter = 0;

    this.numCols = this.currArr.length * this.repeats;
    this.sz =  (this.width / (this.numCols));
    this.numRows = floor(this.height/this.sz);
    // this.numRows = 5;
    this.patternArr = init2dArray(this.numRows, this.numCols);
  }

  calcRepeats() {
    let tempArr = [];
    let flatArr = [];

    for(let i = 0; i < this.repeats; i++) {
      tempArr.push(this.currArr);
    }

    flatArr = tempArr.flat();
    return(flatArr);
  }

  calcPattern() {
    // this.patternArr.forEach((el, index) => {
    //   this.patternArr[index] = this.calcRepeats();
    // });

    if(this.counter < this.patternArr.length-1) {
    this.counter++;
    } else {
      this.counter=0;
    }
      this.patternArr[this.counter] = this.calcRepeats();
    console.log(this.flatArr);
  }


  update(_currArr) {
    this.currArr = _currArr;
    this.calcPattern();
  }

  display() {
    for(let i = 0; i < this.patternArr.length; i++) {
      for(let j = 0; j < this.patternArr[0].length; j++) {
        let x = this.orgX + j * this.sz;
        let y = this.orgY + i * this.sz;
        let col = this.patternArr[i][j] === true?0:255;
        noFill();
        fill(col);
        noStroke();
        rect(x,y,this.sz, this.sz);
      }
    }
  }

}
