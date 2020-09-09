'use strict'

//main variables
let numWarps, numShafts, wWidth, wHeight, padding, originX, originY, bg, fg;

//objects
let draft;
// let socket;

// state
let updateState;
let warp_update_state;
let tieUp_update_state;
let weft_update_state;

let canvasWidth, canvasHeight;

let canvasDiv = document.getElementById("draft01_div");
let canvas;

function setup() {

    //init canvaiv');
    canvasWidth = canvasDiv.offsetWidth;
    canvasHeight = canvasDiv.offsetHeight;
    //init vars
    numWarps = 20;
    numShafts = 4;
    originX = 0;
    originY = 0;
    wWidth =  canvasWidth * 0.7;
    wHeight = canvasHeight * 0.7;
    padding = 0;
    bg = color(255, 255, 255);
    fg = color(0, 0, 0);

    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('draft01_div');

    background(255);

    draft = new Draft(numWarps, numShafts, wWidth, wHeight, padding, bg, fg);
    draft.setupDraft();

    //PARAMETERS
    updateState = true;
    warp_update_state = true;
    tieUp_update_state = true;
    weft_update_state = true;
  draft.updateRate = 4;
    draft.randomizeOscVals();
}


function draw() {
    // if (updateState === true) {
    draft.updateDraft(); 
    // }

    if (warp_update_state === true) {
        draft.updateThreading();
    }
    if (tieUp_update_state === true) {
        draft.updateTieUp();
    }
    if (weft_update_state === true) {
        draft.updateTreadling();
    }

    draft.drawDraft();

  if(millis() % 10000 === 0) {
    draft.randomizeOscVals();
  }

    noFill();
    stroke(fg);

}

function windowResized() {
    // setup();
    canvasWidth = canvasDiv.offsetWidth;
    canvasHeight = canvasDiv.offsetHeight;
    wWidth =  canvasWidth * 0.7;
    wHeight = canvasHeight * 0.7;
    resizeCanvas(canvasWidth, canvasHeight);
    draft.resetDraft(numWarps, numShafts, wWidth, wHeight, padding, bg, fg);
    draft.setupDraft();
    background(255);
}


function mouseDragged() {
    console.log(draft.osc1_freq1);
}

function mousePressed() {
    draft.clickCheck(mouseX, mouseY, false, true);
  if (draft.threadingBounds(mouseX, mouseY)) {
    warp_update_state = !warp_update_state;
  }

  if (draft.tieUpBounds(mouseX, mouseY)) {
  }
  if (draft.treadlingBounds(mouseX, mouseY)) {
    weft_update_state = !weft_update_state;
  }
  if (draft.drawDownBounds(mouseX, mouseY)) {
    draft.randomizeOscVals();
  }
}

function updateChange() {
    updateState = !updateState;
}
