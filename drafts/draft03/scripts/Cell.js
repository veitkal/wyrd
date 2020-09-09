//Cell class
//

class Cell {
  constructor(_posX, _posY, _size, _padding, _state) {
    this.posX = _posX;
    this.posY = _posY;
    this.sz = _size;
    this.padding = _padding;
    this.state = _state;
    this.prevState = _state;

    this.clrI = color(0); //color on/active/live
    this.clrO = color(255); //color off/dead
  }

  drawCell() {
    noStroke();
    fill(this.state!==true?this.clrO:this.clrI);
    rect(this.posX+(this.padding/2), this.posY+(this.padding/2), this.sz-(this.padding), this.sz-(this.padding));
  }

  updatePrev() {
    this.prevState = this.state;
  }

  updateState(s) {
    this.state = s;
  }

  withinYbounds(_y) {
    return (_y > this.posY && _y < this.posY + this.sz);
    // return (true);
  }

  withinBounds(_x, _y) {
    // return (_x > this.posX && _x < this.posX + (this.sz*2) && _y > this.posY && _y < this.posY + (this.sz*2)); //with padding
    return (_x > this.posX && _x < this.posX + (this.sz) && _y > this.posY && _y < this.posY + (this.sz));
    // return (_x > this.posX && _x);
    // return (true);
  }

  stateFlip() {
    this.state = !this.state;
  }
  stateOn() {
    this.state = true;
  }
}
