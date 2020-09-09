class PatternCell {

  constructor(_posX, _posY, _sz, _state, _rev) {
    this.posX = _posX;
    this.posY = _posY;
    this.orgY = _posY;
    this.sz = _sz; //size
    this.state = _state;
    this.rev = _rev; //reverse animation
    this.clrI = color(0); //color on/active/live
    this.clrO = color(255); //color off/dead
  }

  display() {
    noStroke();
    fill(this.state!==true?this.clrO:this.clrI);
    // stroke(this.state!==true?this.clrO:this.clrI);
    rect(this.posX, this.posY, this.sz, 1);
  }

  
  update() {

    if (this.rev) {
      this.posY--;
    } else {
      this.posY++;
    }
    if (this.posY > canvasHeight) {
      this.posY = this.orgY;
    }
  }


}
