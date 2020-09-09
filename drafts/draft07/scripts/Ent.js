
///ENTITY or ant or termt etc
//

class Ent {
  constructor(_pos, _sz, _minX, _maxX, _minY, _maxY) {
    this.pos = _pos;
    this.sz = _sz;
    this.dir = 0; //0 = north, 1 = east, 2 = south = 3 = west;
    this.minX = _minX;
    this.maxX = _maxX;
    this.minY = _minY;
    this.maxY = _maxY;

    //Used to have room for non exakt pixel accuracy
    this.midX = _pos.x + this.sz/2;
    this.midY = _pos.y + this.sz/2;

    this.inv = random(1) > 0.5?true:false;
  }

  right() {
    if(!this.inv) {
    this.dir = (this.dir+1) % 4; //change diraction with modulo wrap around
    } else if (this.inv) {
    this.dir = (this.dir-1+4) % 4; // change direction with modulo wrap around
    }
    this.forward();
  }

  left() {
    if(!this.inv) {
    this.dir = (this.dir-1+4) % 4; // change direction with modulo wrap around
    } else if (this.inv) {
    this.dir = (this.dir+1) % 4; //change diraction with modulo wrap around
    }
    this.forward();
  }

  forward(_num) {
    switch(this.dir) {
      case 0: 
        this.pos.y-=this.sz;
        break;
      case 1: 
        this.pos.x+=this.sz;
        break;
      case 2: 
        this.pos.y+=this.sz;
        break;
      case 3: 
        this.pos.x-=this.sz;
        break;
    }

    this.checkEdges();

  }

  checkEdges() {
    if (this.pos.x > this.maxX - this.sz) {  this.pos.x = this.minX }
    if (this.pos.x < this.minX) { this.pos.x = this.maxX - this.sz}
    if (this.pos.y > this.maxY - this.sz) {  this.pos.y = this.minY }
    if (this.pos.y < this.minY) { this.pos.y = this.maxY - this.sz}
  }
  display() {
    if(!this.inv) {
    stroke(250,100,0);
    strokeWeight(3);
    noFill();
    } else if(this.inv) {
    stroke(0,100,250);
    strokeWeight(3);
    noFill();
    } 
    rect(this.pos.x, this.pos.y, this.sz);

    this.midX = this.pos.x + this.sz/2;
    this.midY = this.pos.y + this.sz/2;
    
    ellipse(this.midX, this.midY, 3,3);
  }

}
