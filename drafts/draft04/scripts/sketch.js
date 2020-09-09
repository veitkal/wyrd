/*
 * Experiment in hand drawn shapes and formes as seen in different new and old weaving patterns. In this case the treadling is drawn by hand side ways. The warping is suggested as being a simple cyclic (ramp like) pattern, that is 012301230123 etc. 

Due to optimizations issues the shed is drawn in one single array walking down the screen, leaving a trail in stead of indiviedual cells or objects representing intersections. It was a problem that induced further interesting ideas around the topic, going beyond being just a necessary hack. Intersting concepts of cycles and accumulation in time and memory took of from here. The cycles in leaving spectral trails, not completely covering it self but adding to each other in layers, merging with and transforming it self.

TODO: add update depending on checkScanIdx
add originial drawing
add smoother curve drawing / remove vrtx or calc

 */


'use strict'
p5.disableFriendlyErrors = true;


//canvas vars
let canvasWidth, canvasHeight;
let canvasDiv = document.getElementById("draft04_div");
let canvas;

let orgX, orgY, maxX, maxY, offX, offY, boxWidth, boxHeight, sz, drawBox; 
let numThreads, numTotalThreads, numShafts, numRepeats, numWarp;

//Scan cells. A grid of invisible cells with states, turned on by drawing. 
//Faster than than looping over each array of vectors within shapeArr
let scanCells;

//scanner vars
let scanHead, speed;

//color vars
let bg, fg;

//shape vars
let shapeArr, vertexArr;

//grid vars
let tieUp, tieUpBox;

//pattern array
let patternArr = [];

function setup() {

  // frameRate(30);
  ////init canvaiv');
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;

  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('draft04_div');
  // createCanvas(canvasWidth, canvasHeight, SVG);

  strokeCap(PROJECT);
  // smooth(0);
  


  //init vars
  numShafts = 5; 
  /*lines up number of threads with shafts as to place tieUp better.
     not ideal but makes for a better impression at this point. 
     but evens out in other drafts i hope. might remove */
  // let oddAdd = numShafts%2===0?0:1;
  // numThreads = 50+oddAdd; 
  if (canvasWidth < 500) {
  numTotalThreads = 23;
  } else if (canvasWidth < 700) {
  numTotalThreads = 43;
  }else {
  numTotalThreads = 63;
  }
  numThreads = numTotalThreads - numShafts;
  numRepeats = 3;
  numWarp = (numShafts*numRepeats);

  offX = 20;
  offY = 20;
  orgX = offX;
  orgY = offY;
  maxX = canvasWidth - offX; //max display width
  maxY = canvasHeight - offY; //max display height
  boxWidth = maxX - (orgX); //width of grid and displayed elements
  sz = boxWidth/numTotalThreads;
  boxHeight = sz * numShafts;

  scanHead = orgX + boxHeight;
  speed = 1;

  shapeArr = [];
  vertexArr = [];


  createDrawBox(orgX + boxHeight, orgY, boxWidth - boxHeight, boxHeight);

  bg = 255; //background colour
  fg = 0;  //foreground colour

  //init cells in grid for scanning drawings
  init_scanCells();
  ////init center grid
  init_tieUp();
  init_pattern();


  background(bg);

  //init example shape
  randomShape();
  shapeArr.push(vertexArr);
}

function draw() {
  ////OPTIMIZATION TEST/////
  //no update of background, instead, rect drawn behind drawbox / tieUp 
  noStroke();
  fill(bg);
  rect(0, 0, width, orgY+boxHeight+10);
  // background(bg);

  // displayDrawBox();
  displayDrawBoxGrid();

  // draw_scanCells(); //uncomment to draw the scan cells
  
  //scan line that goes over the drawing area
  scanner();

  draw_tieUpBox();
  shapeArr.forEach((el) => {
    displayShape(el);
  });

  if (isWithinDrawBox(mouseX, mouseY)) {
    ellipse(mouseX, mouseY, 5, 5);
  }

  //getting current x-index of playhead and passing that to pattern drawing function
  let currIdx = checkScanIdx();

  if (currIdx !== undefined ) { //getting rid of results. need to track and solve
    // calculating the current shed, ie pattern and create pattern
    let shed = calcShed(currIdx);
    // createPattern(shed, patternArr); //using opti instead
    createPattern_opti(shed, patternArr);
  }

  patternArr.forEach((el) => {
    el.display();
    el.update();
    if (el.posY > height) {
      patternArr.shift();
    }
  });

  decoration();
}

//
function checkScanIdx(){ //add update depening on successfull check
  for (let i = 0; i < scanCells.length; i++) {
    let currX = scanCells[i][0].getXpos();
      if (scanHead > currX && scanHead < currX + sz) {
        return(i);
      } 
  }
}


function calcShed(_idx) {

  let tempArr = [];
  // tempArr.length = numShafts;

  //creates a new 2d array with the current selected treadles
  //ie every tieUp row is multiplied by the state of the current scan/drawing cells
  for (let i = 0; i < scanCells[0].length; i++) {
    let cellStateVal = scanCells[_idx][i].state?1:0; 
    let tempVal = 0;

    //creating a new 2d array with  
    let tempTieUpArr = tieUp[i].map(cell => (cell.state?1:0) * cellStateVal);
    tempArr.push(tempTieUpArr);
    }

  //collapsing the 2d array and adding all the columns together
  let collapseArr = []; //all the columns added together
  for (let j = 0; j < tieUp.length; j++) {
    let colVal = 0;
    for (let k = 0; k < tieUp.length; k++) {
      let tempColVal = tempArr[k][j];
      colVal += tempColVal; 
    }
    collapseArr.push(colVal); //adding the column values to the array
  }

  let result = collapseArr.map(val => val>0?1:0); //new array with only 0 or 1 (if > 0)
  
  return(result);
}

function createPattern(_shed, _arr) {
  let preResult = [];

  for (let i = 0; i < numRepeats; i++) {
    preResult.push(_shed);
  }
  let result = preResult.flat();
  // console.log(result);

    for (let r = 0; r < result.length; r++) {
      let state = result[r]>0?true:false;
    let x = orgX + (sz * r);
      let y = orgY + drawBox.height;
      // console.log(state);
      let tempCell = new PatternCell(x, y, sz, state, false);
      _arr.push(tempCell);
    }
}

function init_pattern() {
  let cellSz = width / numWarp;
  for (let i = 0; i < numWarp; i++) {
    let x = (cellSz * i);
    let y = orgY + drawBox.height;
    let tempCell = new PatternCell(x, y, cellSz, true, false);

    patternArr.push(tempCell);
  }
}

function createPattern_opti(_shed, _arr) {
  let preResult = [];

  for (let i = 0; i < numRepeats; i++) {
    preResult.push(_shed);
  }
  let result = preResult.flat();

    for (let r = 0; r < patternArr.length; r++) {
      let state = result[r]>0?true:false;
      patternArr[r].state = state;
    }
}

//DRAW BOX / TREADLING 
function createDrawBox(_x, _y, _w, _h) {
  drawBox = {
    posX: _x,
    posY: _y,
    width: _w,
    height: _h
  }
}

function displayDrawBox() {
  noFill();
  stroke(fg);
  strokeWeight(2);
  rect(drawBox.posX, drawBox.posY, drawBox.width, drawBox.height);
}

function decoration() {
  stroke(fg);
  noFill();
  strokeWeight(2);
  line (orgX + (sz * numShafts), orgY-10, orgX + (sz * numShafts), orgY + boxHeight+10);
}

function displayDrawBoxGrid() {
  stroke(0, 50);
  strokeWeight(1);
    for (let j = 0; j < numShafts + 1; j++) {
      let y = orgY + (sz * j);

      line(orgX-sz, y, orgX+boxWidth, y);
  }
}

function isWithinDrawBox(_x, _y) {
  return(
    _x > drawBox.posX 
    && _x < drawBox.posX + drawBox.width
    && _y > drawBox.posY
    && _y < drawBox.posY + drawBox.height);
}

function init_scanCells() {
  scanCells = init2dArray(numThreads, numShafts);

  for (let i = 0; i < numThreads; i++) {
    for (let j = 0; j < numShafts; j++) {
      let x = drawBox.posX + (sz * i);
      let y = drawBox.posY + (sz * j);

      scanCells[i][j] = new Cell(x, y, sz, 0, false);
    }
  }
}

function draw_scanCells() {
  for (let i = 0; i < scanCells.length; i++) {
    for (let j = 0; j < scanCells[0].length; j++) {
      scanCells[i][j].drawCell(0);
    }
  }
}

function scanner() {
  stroke(fg);
  line(scanHead, drawBox.posY, scanHead, drawBox.posY + drawBox.height);
  if (scanHead > drawBox.posX + drawBox.width) {
    scanHead = drawBox.posX;
  }
  scanHead+=speed;
}



function windowResized() {
  //when window is rezised, rezise canvas and re-setup and re-draw background
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;
  resizeCanvas(canvasWidth, canvasHeight); //needed for refresh to work
  window.location.href = window.location.href;
  window.location.reload(true);
  background(bg);
}

//SHAPE
function createShape(x, y) {
  let tempVar = createVector(x, y);
  vertexArr.push(tempVar);
}

function displayShape(_arr) {
  // fill(fg);
  noFill();
  stroke(fg);
  strokeWeight(1);

    beginShape();
  _arr.forEach((el) => {
      curveVertex(el.x, el.y)
  });
    endShape();
}

function randomShape() {
  let tempX = 0;
  let tempY = 0;
  let tempNumPoints = random(13, 77);
  vertexArr = [];

  for (let i = 0; i < tempNumPoints+1; i++) {
    tempX = drawBox.posX + (i * drawBox.width)  / tempNumPoints+ random(-10, 10);
    tempY = drawBox.posY + noise(i * random(33)) * drawBox.height;
    createShape(tempX, tempY);
    scanCells_clickCheck(tempX, tempY);
  }
    
}



//INTERACTION
function mouseDragged() {
  if (isWithinDrawBox(mouseX, mouseY)) {
    createShape(pmouseX, pmouseY);
    scanCells_clickCheck(pmouseX, pmouseY);
  }
}

function mouseReleased() {
  shapeArr.push(vertexArr);
  // shapeArr.push(vertexArr);
}

function mousePressed() {
  //clear arrays and states of cells
  if (isWithinDrawBox(mouseX, mouseY)) {
    shapeArr = [];
    for (let i = 0; i < numThreads; i++) {
      for (let j = 0; j < numShafts; j++) {
        scanCells[i][j].state = false;
      }
    }
  }
  vertexArr = [];
  if (mouseButton === CENTER) {
    shapeArr = [];
    for (let i = 0; i < scanCells.length; i++) {
      for (let j = 0; j < scanCells[i].length; j++) {
          scanCells[i][j].state = false;
      }
    }
  }
  tieUp_clickCheck(mouseX, mouseY);
}


//randomize tieUp
function randomTieUp() {
  for (let i = 0; i < tieUp.length; i++) {
    for (let j = 0; j < tieUp[0].length; j++) {
      let randomState = random(2)>=1?true:false;
      tieUp[i][j].state = randomState;
    } 
  }
}


//TIEUP
function init_tieUp() {
  tieUpBox =  {
    posX: orgX - sz/2,
    posY: orgY,
    boxWidth: boxHeight,
    boxHeight: boxHeight
  };

  tieUp = init2dArray(numShafts, numShafts);

  for (let i = 0; i < tieUp.length; i++) {
    for (let j = 0; j < tieUp[0].length; j++) {
      let tieUpX = tieUpBox.posX + (i*sz);
      let tieUpY = tieUpBox.posY + (j*sz);
      let randomState = random(2)>=1?true:false;
      tieUp[j][i] = new Cell(tieUpX, tieUpY, sz, sz * 0.6, randomState);
    } 
  }
}


function draw_tieUpBox() {
  noFill();
  stroke(fg);
  strokeWeight(2);

  stroke(fg);
  strokeWeight(1);
  for (let i = 0; i < numShafts; i++) {
    for (let j = 0; j < numShafts; j++) {
      let x = tieUpBox.posX + (sz*i);
      let y = tieUpBox.posY + 4 + (j*sz);
      line(x, y, x, y+(sz-8));

    }
  }

  for (let i = 0; i < tieUp.length; i++) {
    for (let j = 0; j < tieUp[0].length; j++) {
      tieUp[i][j].drawCell(1);
    }
  }
}

function tieUp_clickCheck(_x, _y) {
  for (let i = 0; i < tieUp.length; i++) {
    for (let j = 0; j < tieUp[0].length; j++) {
      if (tieUp[i][j].withinBounds(_x, _y)) {
        tieUp[i][j].stateFlip();
      }
    }
  }
}

function scanCells_clickCheck(_x, _y) {
  for (let i = 0; i < scanCells.length; i++) {
    for (let j = 0; j < scanCells[i].length; j++) {
      if (scanCells[i][j].withinBounds(_x, _y)) {
        scanCells[i][j].stateOn();
      }
    }
  }
}

function vertCheck(_y) {
  for (let i = 0; i < tieUp.length; i++) {
    // for (let j = 0; j < tieUp[0].length; j++) {
      if (tieUp[i][0].withinYbounds(_y)) {
        // console.log(i);
        return (i);
      }
  }
}

