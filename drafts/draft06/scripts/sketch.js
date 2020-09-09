/* 06 - Constallation Logics
 *
 *
 *
 *
 */

'use strict'

//canvas vars
let canvasWidth, canvasHeight;
let canvasDiv = document.getElementById("draft06_div");
let canvas;

let numWarps, numRepeats, numVert, orgX, orgY, offX, offY, sz, szWarp, threadSize, wWidth, wHeight, warpLength, shapeCount, treadlingCount;

let shapeBox, shapeGrid;

let bg, fg;

let treadlingArr = [];
let shapeArr = [];
let repeatArr = [];
let treadlingX = [];
let axL = [];
let axR = [];

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
  numVert = floor(random(3,13));
  offX = 10;
  offY = 0;
  orgX = offX;
  orgY = offY;

  //checking device size to keep responsive
  if (canvasHeight > 320) {
    sz = 25;
  } else {
    sz = 15;
  }
  szWarp = sz/3;
  wWidth = canvasWidth-offX;
  wHeight = canvasHeight-offY;
  shapeCount = 0;
  treadlingCount = 0;

  //colours
  bg = 255;
  fg = 0;

  //create reference box for shape
  initShapeBox(wWidth/2 - ((numWarps+1)*sz/2), orgY, (numWarps+1)*sz, (numWarps+1)*sz);

  warpLength = wWidth - (orgX);

  //init shape
  shapeArr = [];
  for (let i = 0; i < numVert; i++) {
    // let x = random(sz, shapeBox.w-sz);
    // let y = random(sz, shapeBox.h-sk);
    let x = floor(random(numWarps))*sz;
    let y = floor(random(numWarps))*sz;
    // x = 100;
    // y = orgY + sz;
    let tempVec = createVector(shapeBox.x+sz+x,orgY+sz+y);
    let v = new Vert(tempVec);
    shapeArr.push(v)
  }

  background(bg);
  calcTreadling(treadlingArr);

  randomizeShape(treadlingCount);

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
    ellipse(el.pos.x, el.pos.y, 3);
  });
  endShape(CLOSE);

  displayWarpThreads();

  beginShape();
  treadlingArr.forEach(el => {
    el.update();
    el.display();
    noFill();
    stroke(fg);
    vertex(el.pos.x, el.pos.y);
  });
  endShape();

  // if (treadlingArr.length > numRepeats * numVert) {
  //   treadlingArr.shift();
  // }

  //update treadling once a second
  // if (frameCount % (5) === 0) {
    treadlingUpdateIdx(treadlingCount);
      treadlingCount++;
  // }

  //grid
  push();
  translate(0, canvasHeight/2);
  shapeArr.forEach((el, index) => {
    noStroke();
    fill(fg);
    rect(el.pos.x, 20+el.pos.y*0.6, sz*0.6);
  });
  pop();
  
  if (frameCount % (60 * 13) === 0) {
    randomizeShape(treadlingCount);
  }

  shapeArr.forEach((el, index) => {
    let y1 = 50 + shapeBox.h + orgY + (szWarp*numWarps) + el.pos.y*0.7;
    let y2 = 50 + shapeBox.h + orgY + (szWarp*numWarps) + el.pos.y*0.7;
    stroke(fg);
    beginShape();
    vertex(canvasWidth/2 - shapeBox.w/2, y1);
    vertex(canvasWidth/2 + shapeBox.w/2, y2);
    endShape();
  });


  if (treadlingCount > treadlingArr.length - 1) {treadlingCount = 0; }

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
    let x1 = orgX;
    let x2 = wWidth;
    let y = orgY + szWarp + (szWarp*i)+shapeBox.h;
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

  //dotted lines
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

  //middle cross
  strokeWeight(1);
  stroke(fg);
  line(shapeBox.x+x-csz, y-csz, shapeBox.x+x+csz, y+csz);
  line(shapeBox.x+x-csz, y+csz, shapeBox.x+x+csz, y-csz);
}

  function calcRepeat(_inputArr) {
    //returns a new array sorted after x value. .slice() needed to not touch org array
    // repeatArr = []; //clear array
    repeatArr = _inputArr.slice().sort((a, b) => (a.pos.x > b.pos.x) ? 1 : -1) ;
    // let repeat = shapeArr.sort(valSort);
    // let repeat = shapeArr.slice().sort(function(a,b) {
    //   return a.pos.x-b.pos.x;
    // });
    return(repeatArr);
  }


function calcTreadling(_arr) {
  let tempArr = [];
  let flatArr = [];
  // treadlingArr = [];

  if (treadlingArr.length < 1) {
  //sorting the repeat, copying n times and flatten into a single array
  for (let i = 0; i < numRepeats; i++) {
    // let tempArr = calcRepeat(shapeArr);
    tempArr.push(calcRepeat(shapeArr));
  }

  flatArr = tempArr.flat();

  //calculating new x positions along the x-axis of treadling area
  threadSize = warpLength / (flatArr.length);
  flatArr.forEach((el, index) => {
    // let tempPos = createVector(orgX + shapeBox.w + (index * threadSize), el.newPos.y+100);
    let tempPos = createVector(orgX + (index * threadSize), el.newPos.y/3+(shapeBox.h));
    let tempVert = new Vert(tempPos);
    treadlingArr.push(tempVert);
    treadlingArr[index].newPos = tempPos;
    treadlingX.push(orgX + (index * threadSize));
  });
  } else {
    //sorting the repeat, copying n times and flatten into a single array
    for (let i = 0; i < numRepeats; i++) {
      // let tempArr = calcRepeat(shapeArr);
      tempArr.push(calcRepeat(shapeArr));
    }

    flatArr = tempArr.flat();

    //calculating new x positions along the x-axis of treadling area
    threadSize = warpLength / (flatArr.length);
    flatArr.forEach((el, index) => {
      let tempPos = createVector(orgX + shapeBox.w + (index * threadSize), el.pos.y/3+(shapeBox.h));
      // let tempVert = new Vert(tempPos);
      // treadlingArr.push(tempVert);
      treadlingArr[index].newPos = tempPos;
    });
  }

  
}

function treadlingUpdateIdx(_idx) {
  //updates the position of the treadling objects by index, ie used for one by one
  //
  //only if they are not the last one
  if (treadlingCount < treadlingArr.length - 1) {
    treadlingArr[_idx].rePos(createVector(treadlingX[_idx], treadlingArr[_idx+1].pos.y));
  } else {
    // if they are the last one
    if (shapeCount > repeatArr.length-1) { shapeCount = 0};
    let tempY = repeatArr[shapeCount].pos.y/3;
    treadlingArr[_idx].rePos(createVector(treadlingX[_idx], tempY + (shapeBox.h)));
    shapeCount++;

  }
}

function treadlingUpdate() {
  //updates the position of the treadling objects
  treadlingArr.forEach((el,index) => {
    //only if they are not the last one
    if (index < treadlingArr.length - 1) {
      el.rePos(createVector(el.pos.x, treadlingArr[index+1].pos.y));
    } else {
      // if they are the last one
      if (shapeCount > repeatArr.length-1) { shapeCount = 0};
      let tempY = repeatArr[shapeCount].pos.y;
      el.rePos(createVector(el.pos.x, tempY));
      shapeCount++;
      
      // el.rePos(createVector(el.pos.x, treadlingArr[0].pos.y));
    }
  });
}

function calcTreadlingNew(_arr) {
  let tempArr = [];
  let flatArr = [];
  // treadlingArr = [];

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
  console.log(treadlingArr);
}

function randomizeShape() {
    shapeArr.forEach((el, index) => {
      let x = floor(random(numWarps))*sz;
      let y = floor(random(numWarps))*sz;
      let tempVec = createVector(shapeBox.x+sz+x,orgY+sz+y);
      el.rePos(tempVec);
    });
}
//---------------------
//INTERACTION
function mousePressed() {
    randomizeShape();
}

function mouseDragged() {
    // calcTreadling(treadlingArr);
    treadlingUpdate();
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
    this.newPos = _pos;
    this.lerpAmnt = random(0.1,0.2);
    // this.lerpAmnt = 0.2;

  }

  update() {
    this.pos = p5.Vector.lerp(this.pos, this.newPos, this.lerpAmnt);
  }

  display() {
    fill(fg);
    // noStroke();
   
 
  }

  rePos(_newPos) {
    this.pos = this.newPos;
    this.newPos = _newPos;
  }
}


