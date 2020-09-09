class Sample {
  constructor(_orgX, _orgY, _sz, _numCols, _numRows) {
    this.orgX = _orgX;
    this.orgY = _orgY;
    this.sz = _sz;
    this.numCols = _numCols;
    this.numRows = _numRows;
    this.bg = color(255,0);
    this.fg = color(0);
    this.scroll = false;

    this.sequenceArr = []; //the original sequence to be offset
    this.sampleArr = init2dArray(this.numCols, this.numRows);

    this.initSequence();
    this.calcOffsetPatter();

  }

  initSequence() {
    for (let i = 0; i < this.numCols; i++) {
      let r = floor(random(2));
      this.sequenceArr[i] = r;
    }
  }

  calcOffsetPatter() {
    let idxCount = 0;
    let tempArr = this.sequenceArr;

    for(let i = 0; i < this.numRows; i++) {
      for(let j = 0; j < this.numRows; j++) {
      // console.log(tempArr)
      this.sampleArr[i][j] = tempArr[j];
      }
      // let tempVal = tempArr[tempArr.length-1];
      // tempArr.unshift(tempVal);
      // tempArr.pop();
      let tempVal = tempArr[0];
      tempArr.push(tempVal);
      tempArr.shift();
    }
  }

  update() {
    // let tempVal;
    // let tempArr;
    // if (this.scroll === true) {
    //   for (let i = 0; i < this.sampleArr.length; i++) {
    //     tempArr = this.sampleArr[i];
    //     if (random(1) > 0.9) {
    //       tempVal = tempArr[this.numRows];
    //       console.log(this.sampleArr[i].lenth);
    //       // this.sampleArr[i][0] = tempVal;
    //       tempArr.unshift(tempVal);
    //       // this.sampleArr[i].resize(this.numRows);
    //       // this.sampleArr[i].pop();
    //       // this.sampleArr[i].length = this.numRows;
    //       this.sampleArr[i] = tempArr;

    //       // for (let j = 0; j < this.sampleArr[0].length; j++) {
    //       // }
    //     }
    //   }
    // }

    if (this.scroll === true) {
    for(let i = 0; i < this.sampleArr.length; i++) {
    let tempArr = this.sampleArr[i];
        if (random(1) > 0.9) {
      for(let j = 0; j < this.numRows; j++) {
      // console.log(tempArr)
      let tempVal = tempArr[(j+1)%(tempArr.length)];
        tempArr[j] = tempVal;
      }
      this.sampleArr[i] = tempArr;
        }
      // let tempVal = tempArr[tempArr.length-1];
      // tempArr.unshift(tempVal);
      // tempArr.pop();
    }
    }
  }
  
  display() {
    for(let i = 0; i < this.numCols; i++) {
      for(let j = 0; j < this.numRows; j++) {
        let x = this.sz*i + this.orgX;
        let y = this.sz*j + this.orgY;

        let clr = this.sampleArr[j][i] !== 0 ? this.fg:this.bg;
        fill(clr);
        noStroke();
        strokeWeight(1);
        rect(x,y, this.sz, this.sz);

      }
    }
    strokeWeight(4);
    noFill();
    stroke(0);
    rect(this.orgX, this.orgY, this.numCols*this.sz, this.numRows * this.sz);
  }

  withinBounds(x, y) {
    return (x > this.orgX && x < this.orgX + this.numCols*this.sz && y > this.orgY && y < this.orgY + this.numRows*this.sz);
  }
}

