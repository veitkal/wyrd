'use strict'
p5.disableFriendlyErrors = true;


let canvasWidth, canvasHeight;
let canvasDiv = document.getElementById("draft03_div");
let canvas;

let numRows, numCols, offX, offY, orgX, orgY, maxX, maxY, lngth, hght, sz, bg, fg;
let tieUp, tieUpBox;
let waveL, waveR;

let patternL = [];
let patternR = [];

let osc1L_slider = document.getElementById('osc1L_slider');
let osc2L_slider = document.getElementById('osc2L_slider');
let noise1L_slider = document.getElementById('noise1L_slider');
let osc1R_slider = document.getElementById('osc1R_slider');
let osc2R_slider = document.getElementById('osc2R_slider');
let noise1R_slider = document.getElementById('noise1R_slider');
let random_button = document.getElementById('random_button');

function setup() {

  // frameRate(30);
  //init canvaiv');
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;

  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('draft03_div');


  // init vars
  numRows = 5;
  numCols = 5;
  hght = canvasHeight*0.15;
  offX = 20;
  offY = canvasHeight/2 - (hght / 2);
  orgX = offX;
  orgY = offY;
  maxX = canvasWidth - offX;
  maxY = canvasHeight - offY;
  lngth = maxX - orgX;
  sz = hght/numRows;
  bg = 255;
  fg = 0;

  init_tieUp();

  waveL = new WaveLine(orgX, width/2 - hght/2, canvasHeight/2 - hght/2, hght, 10, false);
  waveR = new WaveLine(maxX, width/2 + hght/2, canvasHeight/2 - hght/2, hght, 10, true);

  background(bg);
}


function windowResized() {
  // setup();
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;
  resizeCanvas(canvasWidth, canvasHeight);
  setup();
  background(bg);
}


function draw() {
  background(bg);
  threadLines();

  if (waveL.fin) {
    let vertL = vertCheck(waveL.posY);
    createPattern(vertL, height/2+hght/2+5, false, patternL);
  }
  if (waveR.fin) {
    let vertR = vertCheck(waveR.posY);
    createPattern(vertR, height/2-hght/2-5, true, patternR);
  }

  draw_tieUpBox();
  waveL.draw_wave();
  waveL.update_wave();
  waveR.draw_wave();
  waveR.update_wave();
  
  updateWaveVals();

  patternL.forEach((el) => {
    el.display();
    el.update();
    if (el.posY >= height) {
      patternL.shift();
    }
  });

  patternR.forEach((el) => {
    el.display();
    el.update();
    if (el.posY <= 0) {
      patternR.shift();
    }
  });

}

function mouseDragged() {
  let mouseDir = 1;

  if (mouseX > pmouseX) {
    mouseDir = 2;
  } else if (mouseX < pmouseX) {
    mouseDir = 0;
  }
  else {
    mouseDir = 1;
  }
}

function mousePressed() {
  clickCheck(mouseX, mouseY);
}

// random_button.onclick = function() {
//   for (let i = 0; i < tieUp.length; i++) {
//     for (let j = 0; j < tieUp[0].length; j++) {
//       let randomState = random(2)>=1?true:false;
//       tieUp[i][j].state = randomState;
//     } 
//   }
// }


function threadLines() { stroke(fg);
  strokeWeight(1);
  for (let i = 0; i <= numRows; i++) {
    let y = i*sz;
    line(orgX, orgY+y, maxX, orgY+y);
  }
}



function init_tieUp() {
  tieUpBox =  {
    posX: lngth/2 - (hght/2) + orgX,
    posY: orgY,
    boxWidth: hght,
    boxHeight: hght
  };

  tieUp = init2dArray(numCols, numRows);

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
  rect(tieUpBox.posX, tieUpBox.posY, tieUpBox.boxWidth, tieUpBox.boxHeight);

  strokeWeight(1);
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      let x = sz*i;
      let y = sz*j;
      line(tieUpBox.posX, tieUpBox.posY + y, tieUpBox.posX + tieUpBox.boxWidth, tieUpBox.posY + y,);
      line(tieUpBox.posX + x, tieUpBox.posY, tieUpBox.posX + x, tieUpBox.posY + tieUpBox.boxHeight);
    }
  }

  for (let i = 0; i < tieUp.length; i++) {
    for (let j = 0; j < tieUp[0].length; j++) {
      tieUp[i][j].drawCell();
    }
  }
}

function clickCheck(_x, _y) {
  for (let i = 0; i < tieUp.length; i++) {
    for (let j = 0; j < tieUp[0].length; j++) {
      if (tieUp[i][j].withinBounds(_x, _y)) {
        tieUp[i][j].stateFlip();
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

function createPattern(_idx, _startY, _rev, _arr) {
    for (let j = 0; j < tieUp[0].length; j++) {
      let state = tieUp[_idx][j].state;
      let x = tieUp[_idx][j].posX;
      let tempCell = new PatternCell(x, _startY, sz, state, _rev);

      _arr.push(tempCell);
  }
}

function updateWaveVals() {
  waveL.osc1 = osc1L_slider.value;
  waveL.osc2 = osc2L_slider.value;
  waveL.noise = noise1L_slider.value;
  waveR.osc1 = osc1R_slider.value;
  waveR.osc2 = osc2R_slider.value;
  waveR.noise = noise1R_slider.value;
}


