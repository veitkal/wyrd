class Shape {
  constructor() {
    this.off = _rev?_off*-1:_off; //check reverse and use negative offset
    this.minX = _minX + this.off;
    this.width = _width - this.off;
    this.minY = _minY;
    this.height = _height;
    this.rev = _rev;
    this.off = 10

    this.osc1 = 0;
    this.osc2 = 0;
    this.noise = 0;

    this.posX = this.minX;
    this.posY = random(this.minY + this.height);
    this.vertArr = [];
    this.fin = false; //bool to check if x is at final position

    // this.vertArr.push(createVector(this.posX, this.posY));
    // for (let i = 0; i < this.numV; i++) {
    //     let tempV = createVector(this.minX + (i * this.width), this.minY + (i*this.height));
    //     this.vertArr.push(tempV);
    // }
  }

  draw_wave() {
    beginShape();
    stroke(0);
    noFill();
    for (let i = 0; i < this.vertArr.length; i++) {
      curveVertex(this.vertArr[i].x, this.vertArr[i].y);
    }
    endShape();

  }

  update_wave() {
    this.posY = (Math.sin(frameCount * this.osc1 + Math.sin(frameCount * this.osc2)) * noise(frameCount * this.noise)  + 1) / 2 * this.height + this.minY;
    // this.posY = (noise(frameCount * 0.05)) * this.height + this.minY;
    let tempVec = createVector(this.posX, this.posY);


    this.vertArr.push(tempVec);

    if (this.rev) {
      if (this.vertArr[this.vertArr.length - 1].x > this.width) {
        this.posX--;
      } else {
        this.fin = true;
        for (let i = 0; i < this.vertArr.length -1; i++) {
          if (i > 1) {
            this.vertArr[i].y = this.vertArr[i+1].y;
          }

          if (i < 1) {
            this.vertArr[0].y = this.vertArr[1].y;
            this.vertArr[1].y = this.vertArr[2].y;
          }
        }
        this.vertArr.pop();
      }
    } else {

      if (this.vertArr[this.vertArr.length - 1].x < this.width) {
        this.posX++;
      } else {
        this.fin = true;
        for (let i = 0; i < this.vertArr.length -1; i++) {
          if (i > 1) {
            this.vertArr[i].y = this.vertArr[i+1].y;
          }

          if (i < 1) {
            this.vertArr[0].y = this.vertArr[1].y;
            this.vertArr[1].y = this.vertArr[2].y;
          }
        }
        this.vertArr.pop();
      }
    }
    ellipse(this.posX, this.posY, 5, 5);
  }

  returnCurrPos() {
    let tempVec = createVector(this.vertArr[0]);
    return (tempVec);
  }

}

