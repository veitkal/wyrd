/* 06 - Constallation Logics
 *
 *
 *
 */

'use strict'

//canvas vars
let canvasWidth, canvasHeight;
let canvasDiv = document.getElementById("draft06_div");
let canvas;

let numWarps, numRepeats, numVert, orgX, orgY, offX, offY, sz, threadSize, wWidth, wHeight, warpLength;

let shapeBox, shapeGrid;

let bg, fg;

let treadlingArr = [];
let shapeArr = [];

function setup() {
  smooth();

  ////init canvaiv');
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('draft06_div');

  //var init
  numWarps = 5;
  numRepeats = 10;
  numVert = 5;
  offX = 0;
  offY = 0;
  orgX = offX;
  orgY = offY;
  sz = 15;
  wWidth = canvasWidth-offX;
  wHeight = canvasHeight-offY;

  //colours
  bg = 255;
  fg = 0;

  //create reference box for shape
  initShapeBox(orgX, orgY, (numWarps+1)*sz, (numWarps+1)*sz);

  warpLength = wWidth - (orgX+shapeBox.w);

  //init shape
  shapeArr = [];
  for (let i = 0; i < numVert; i++) {
    // let x = random(sz, shapeBox.w-sz);
    // let y = random(sz, shapeBox.h-sk);
    let x = floor(random(numWarps))*sz;
    let y = floor(random(numWarps))*sz;
    // x = 100;
    // y = orgY + sz;
    let tempVec = createVector(orgX+sz+x,orgY+sz+y);
    let v = new Vert(tempVec);
    shapeArr.push(v)
  }

  background(bg);
  calcTreadling(treadlingArr);

}  
   
function draw() {
  background(bg);
  // displayShapeBox(); //debugBox
  displayShapeDeco(); //shape decorations

  //draw shape + vertices
  beginShape();
  shapeArr.forEach((el, index) => {
    el.display();
    el.update();
   stroke(fg);
    noFill();
    vertex(el.pos.x, el.pos.y);
  });
  endShape(CLOSE);

  displayWarpThreads();

  beginShape();
  treadlingArr.forEach(el => {
    el.display();
    noFill();
    stroke(fg);
    vertex(el.pos.x, el.pos.y);
  });
  endShape();


  calcTreadling(treadlingArr);
}  
   

function initShapeBox(_x, _y, _w, _h) {
  shapeBox = {
    x: _x,
      y: _y,
      w: _w,
      h: _h,
  }
}

function displayWarpThreads() {
  for (let i = 0; i < numWarps; i++) {
    let x1 = orgX+shapeBox.w;
    let x2 = wWidth;
    let y = orgY + sz + (sz*i);
    line(x1, y, x2, y);
  }
}

function displayShapeBox() {
  noStroke();
  fill(233);
  rect(shapeBox.x, shapeBox.y, shapeBox.w, shapeBox.h);

  stroke(fg);

  for (let i = 0; i < numWarps; i++) {
    for (let j = 0; j < numWarps; j++) {
      let x = sz + (sz * i);
      let y = sz + (sz * j);

      line(shapeBox.x, y, shapeBox.w,y);
      line(x, shapeBox.y, x, shapeBox.h);
    }
  }
}

function displayShapeDeco() {
  // decorations of shapeBox
  let x = shapeBox.w/2;
  let y = shapeBox.h/2;
  let csz = 5; //cross size
  let num = numWarps;

  stroke(fg);
  strokeWeight(1);
  for (let i = 0; i < num; i++) {
    let sz1 = i * (x/num);
    // let sz1 = shapeBox.h/num;
    let x1 = shapeBox.x + sz1;
    let x2 = shapeBox.x - sz1;
    let y1 = shapeBox.y + sz1;
    let y2 = shapeBox.y - sz1;

    line(x2 + x, shapeBox.y+y, x2 + x, shapeBox.y+y);
    line(x1+x, shapeBox.y + y, x1+x, shapeBox.y+y);

    line(shapeBox.x + x, y + y1, shapeBox.x + x, y + y1);
    line(shapeBox.x + x, y + y2, shapeBox.x + x, y + y2);
  }

  strokeWeight(1);
  stroke(fg);
  line(x-csz, y-csz, x+csz, y+csz);
  line(x-csz, y+csz, x+csz, y-csz);
}

  function calcRepeat(_inputArr) {
    //returns a new array sorted after x value. .slice() needed to not touch org array
    let repeat = _inputArr.slice().sort((a, b) => (a.pos.x > b.pos.x) ? 1 : -1) ;
    // let repeat = shapeArr.sort(valSort);
    // let repeat = shapeArr.slice().sort(function(a,b) {
    //   return a.pos.x-b.pos.x;
    // });
    return(repeat);
  }

function calcTreadling(_arr) {
  let tempArr = [];
  let flatArr = [];

  //sorting the repeat, copying n times and flatten into a single array
  for (let i = 0; i < numRepeats; i++) {
    // let tempArr = calcRepeat(shapeArr);
    tempArr.push(calcRepeat(shapeArr));
  }

  flatArr = tempArr.flat();

  //calculating new x positions along the x-axis of treadling area
  threadSize = warpLength / (flatArr.length);
  flatArr.forEach((el, index) => {
    let tempPos = createVector(orgX + shapeBox.w + (index * threadSize), el.pos.y);
    let tempVert = new Vert(tempPos);
    treadlingArr.push(tempVert);
  });

}
//---------------------
//INTERACTION
function mousePressed() {
}

//--------------------
//ON WINDOW RESIZE
function windowResized() {
  //when window is rezised, rezise canvas and re-setup and re-draw background
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;
  resizeCanvas(canvasWidth, canvasHeight);
  setup();
  background(bg);
}

//---------------------
class Cell {
  constructor(_posX, _posY, _sz) {
    this.posX = _posX;
    this.posY = _posY;
    this.sz = _sz;
  }

  drawCell() {
    stroke(255,0,0);
    rect(this.posX, this.posY, this.sz, this.sz);
  }

}

class Vert {
  constructor(_pos) {
    this.pos = _pos;
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.newPos = createVector(0,0);

  }

  update() {
    this.newPos = createVector(mouseX, mouseY);
    this.newPos.sub(this.pos);
    this.newPos.setMag(0.5);

    this.acc = this.newPos;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(5);
  }

  display() {
    fill(fg);
    noStroke();
   
    ellipse(this.pos.x, this.pos.y, 3);
  }

  rePos() {
  }
}


