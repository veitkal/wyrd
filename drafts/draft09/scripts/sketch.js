/* 07 - Langtons Ant
 *
 * This experiment is using Chris Langton's famous Ant,
 * a two-dimensional universal turing maschine. The procedure is this ....
 *
 * This simulation is fascinating, the classic example with one "ant" goes from
 * a modes of simplicity to chaotic to one of emergent order (the so called highway at
 * 11000 updates). This only whith the very basic, simple rules of movement.
 * When several "ants" or entities are sharing the same world, especially when 
 * some are having the possibility to have inverted rules, the way they interact, 
 * changing their collective environment are incredible. The emergent patterns that forms 
 * when they synchronize in collective movements, or when the interfere with each others paths,
 * generating new directions and orders are here looked at through a patterning lens. 
 *
 * Each row is reflecting the current movement of each entity, repeated as often done within
 * within weaving drafts. The interactions, movements are here reflecting something beyond 
 * mere causality, new openings are created in the interaction and ever increasing complexity
 * seen as patterns, shapes and relationships. 
 *
 *
 */

'use strict'

//canvas vars
let canvasWidth, canvasHeight;
let canvasDiv = document.getElementById("draft07_div");
let canvas;

let boxW, boxH, sz, numRows, numCols, numWarps;

let ent;

let cellGrid = [];
let entArr = [];
let statesArr = [];

let bg,fg;

let entSys, pattern;


function setup() {
  // smooth();

  ////init canvaiv');
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('draft07_div');

  numWarps = 15; 
  numCols=100;
  sz = canvasWidth / numCols;
  numRows=round((canvasHeight/2)/sz);
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
  for (let k = 0; k<20; k++) {
  let tempVec = createVector(cellGrid[floor(random(cellGrid.length))][floor(random(cellGrid[0].length))].posX, cellGrid[floor(random(cellGrid.length))][floor(random(cellGrid[0].length))].posY);
    let tempEnt = new Ent(tempVec, sz, 0, sz*cellGrid.length, 0, sz*cellGrid[0].length);
    entArr.push(tempEnt);
  }

  entSys = new EntSystem(cellGrid, sz, 2);
  statesArr = entSys.stateArr;
  pattern = new Pattern(statesArr,  0, canvasHeight/2+(2*sz), canvasWidth, canvasHeight/2, 10);

  noStroke();

}  
   
function draw() {
  background(bg);

  entSys.update();
  entSys.display();

  pattern.update(entSys.stateArr);
  pattern.display();

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
  if (entSys.entArr.length < numWarps) {
    entSys.addEnt(mouseX, mouseY);
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
