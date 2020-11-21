let canvas;
let  centerX, centerY, startX, startY, w, h, sz, numX, numY, t;
let cellArr = [];
let enterButton = document.getElementById('enter_button').getBoundingClientRect();

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style("z-index", "-1");

  centerX = windowWidth/2;
  centerY = windowHeight/2;
  numX=5;
  w = 100;
  h = windowHeight - centerY - 30;
  h = windowHeight;
  numY = 49;
  sz = h/numY;
  w = sz * numX;
  startX = centerX - (w/2);
  startY = 0;
  t=0;

  for(let i = 0; i < numY; i++) {
    tempX = startX + (floor(random(numX)) * sz);
    c = new Cell(tempX, startY + (i*sz), sz);
    cellArr.push(c);
  }
}

function draw() {
  background(255);

  stroke(0);
  // rect(startX, startY, w, h);

  //draw grid
  for (let i = 0; i < numX+1; i++) {
    for (let j = 0; j < numY; j ++) {
      let locX = startX + (i*sz);
      let locY = startY + (j*sz);
      line(locX, 0, locX, h);
      line(startX, locY, startX+w, locY);
    }
  }

  //update all cells
  cellArr.forEach((el) => {
  el.draw();
    if(mouseX > centerX - enterButton.width/2 && mouseX < centerX+enterButton.width/2 && mouseY > centerY - enterButton.height/2 && mouseY < centerY+enterButton.height/2) {
      el.hoverDisp();
    } else if (mouseY < el.pos.y + sz/2 && mouseY > el.pos.y - sz/2) {
      el.dodge(mouseX, mouseY);
  el.update();
    } else {
      el.goBack();
  el.update();
    }
  });

  // if(mouseX > centerX - enterButton.width/2 && mouseX < centerX+enterButton.width/2 && mouseY > centerY - enterButton.height/2 && mouseY < centerY+enterButton.height/2) {
  //   cellArr.forEach((el) => {
  //     el.hoverDisp();
  //   });
  // }

  
  t++;
}

function mousePressed() {
    c = new Cell(mouseX, mouseY, sz);
    c.getInLine(numX,numY);
    cellArr.push(c);
}
function mouseDragged() {
//     c = new Cell(mouseX, mouseY, sz);
//     cellArr.push(c);
  cellArr.forEach((el) => {
    if (mouseY < el.pos.y + sz/2 && mouseY > el.pos.y - sz/2) {
      el.dodge(mouseX, mouseY);
    } 
  });
}


class Cell {
  constructor(_x, _y, _sz) {
    this.x = _x;
    this.y = _y;
    this.pos = createVector(_x, _y);
    this.oldPos = createVector(_x, _y);
    this.newPos = createVector(_x, _y);
    this.orgX = _x;
    this.orgY = _y;
    this.sz = _sz;
    this.lerpAmount = random(.05, .1);
    this.hoverPos = createVector(random(width), random(height));
  }

  draw() {
    fill(0);
    noStroke();
    rect(this.pos.x, this.pos.y, this.sz, this.sz);
  }

  update() {
    if (frameCount % 60 == 0) {
      this.pos.y+=sz;
      this.oldPos.y+=sz;
    }
    this.checkEdge();
  }

  checkEdge() {
    if (this.pos.y > h) {
      this.pos.y = 0;
      this.oldPos.y = 0;
    }
  }

  //lerp position to no position
  dodge(_x, _y) {
    this.newPos.x = _x;
    this.newPos.y = _y;
    this.pos = p5.Vector.lerp(this.pos, this.newPos, this.lerpAmount);
  }
  //back to original position;
  goBack() {
    if (this.pos != this.oldPos) {
    this.pos = p5.Vector.lerp(this.pos, this.oldPos, 0.05);
    }
  }
  //get a random position in the grid
  getInLine(_numX, _numY) {
    let tempX = startX + (floor(random(numX)) * sz);
    let tempY = floor(random(_numY)) * this.sz;
    this.oldPos.x = tempX;
    this.oldPos.y = tempY;
  }
  //movement when button is hovered over
  hoverDisp() {
    this.pos = p5.Vector.lerp(this.pos, this.hoverPos, this.lerpAmount);
  }

}
