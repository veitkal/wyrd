/* 08 - Offset
 *
 *
 *
 *
 */

'use strict'

//canvas vars
let canvasWidth, canvasHeight;
let canvasDiv = document.getElementById("draft08_div");
let canvas;

let boxW, boxH, sz, numRows, numCols, numWarps;

let numSamples;

let cellGrid = [];
let entArr = [];
let statesArr = [];

let bg, fg;

let entSys, pattern;

let sample, sample2, sample3, sample4;


function setup() {
  // smooth();

  ////init canvaiv');
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('draft08_div');

  // numWarps = 15; 
  numSamples = 3;
  numCols=28;
  sz = canvasWidth / numCols;
  numRows=floor((canvasHeight)/sz);
  //colours
  bg = 255;
  fg = 0;

  cellGrid = init2dArray(numCols, numRows);

  //populating cellGriod with cells with selected states
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      let x = sz*i;
      let y = sz*j;

      let rState = random(1) > 0.5?true:false;
      let tempCell = new Cell(x,y,sz, 0.5, false);
      cellGrid[i][j] = tempCell;
    }
  }

  //creating an array of n enteties
  // for (let k = 0; k<20; k++) {
  // let tempVec = createVector(cellGrid[floor(random(cellGrid.length))][floor(random(cellGrid[0].length))].posX, cellGrid[floor(random(cellGrid.length))][floor(random(cellGrid[0].length))].posY);
  //   let tempEnt = new Ent(tempVec, sz, 0, sz*cellGrid.length, 0, sz*cellGrid[0].length);
  //   entArr.push(tempEnt);
  // }

  // entSys = new EntSystem(cellGrid, sz, 10);
  // statesArr = entSys.stateArr;
  // pattern = new Pattern(statesArr,  0, canvasHeight/2+(2*sz), canvasWidth, canvasHeight/2, 10);

  sample = new Sample(sz*4,sz*4,sz,8,8);
  sample2 = new Sample(sz*16,sz*4,sz,8,8);
  sample3 = new Sample(sz*4,sz*16,sz,8,8);
  sample4 = new Sample(sz*16,sz*16,sz,8,8);


}  
   
function draw() {
  background(bg);
  if (canvasWidth > 600) {
    scale(0.9,0.9);
  }

  for (let i = 1; i < numCols; i++) {
    for (let j = 1; j < numRows; j++) {
  strokeWeight(0.1);
  stroke(133);
      let x = i * sz;
      let y = j * sz;
      line(x, 0, x, canvasHeight);
      line(0, y, canvasWidth, y);
    }
  }
  sample.display();
  sample2.display();
  sample3.display();
  sample4.display();

  sample.update();
  sample2.update();
  sample3.update();
  sample4.update();


}  
   

function initShapeBox(_x, _y, _w, _h) {
  shapeBox = {
    x: _x,
      y: _y,
      w: _w,
      h: _h,
  }
}

//INTERACTION
function mousePressed() {
  // sample.forEach((el) => {
  // if (el.withinBounds(mouseX, mouseY)) {
  //   el.scroll = !el.scroll;
  // }
  // });
  if (sample.withinBounds(mouseX, mouseY)) {
    sample.scroll = !sample.scroll;
  }
  if (sample2.withinBounds(mouseX, mouseY)) {
    sample2.scroll = !sample2.scroll;
  }
  if (sample3.withinBounds(mouseX, mouseY)) {
    sample3.scroll = !sample3.scroll;
  }
  if (sample4.withinBounds(mouseX, mouseY)) {
    sample4.scroll = !sample4.scroll;
  }
}

function keyPressed() {
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

function checkCurrState(_x, _y, _ent) {
  let x = _ent.midX;
  let y = _ent.midY;
  cellGrid.forEach((el) => {
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
