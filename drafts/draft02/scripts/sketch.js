'use strict'

//main variables
let numWarps, numShafts, wWidth, wHeight, padding, originX, originY, bg, fg;

//objects
let draft;
let socket;


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
    // wWidth = constrain(windowWidth - 200, 1, 300); //REVIEW THIS
    // wWidth = map(windowWidth, 0, window.screen.width, 150, 1000); //REVIEW THIS
    // wWidth = map(windowWidth, 0, window.screen.width, 150, 1300); //REVIEW THIS
    // wHeight = windowHeight - 200;
    padding = 0;
    bg = color(255, 255, 255);
    fg = color(0, 0, 0);

    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('draft01_div');

    // createCanvas(wWidth*1.2,wHeight * 1.5);
    background(255);
    // bg = color(0);
    // fg = color(255);

    draft = new Draft(numWarps, numShafts, wWidth, wHeight, padding, bg, fg);
    draft.setupDraft();

    //PARAMETERS

    //SOCKETS
    socket = io.connect('http://localhost:3000'); //specify in server.js

    // Specify a function to call every time 'mousedata'
    // packets are received over the socket
    socket.on('warpState', 
        function(data) {
            console.log("nanana");
        });

    socket.on('mousedata',
        function(data) {
            console.log("socket in: " + data.x + " " + data.y + " " + data.d);
            if (data.d === true) { 
            draft.clickCheck(data.x, data.y, true);
            } else {
            draft.clickCheck(data.x, data.y, false);
            }
        }
    );

}

// ui listeners

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
    draft.clickCheck(mouseX, mouseY, true);
    sendMouseData(mouseX, mouseY, true);
}

function mousePressed() {
    draft.clickCheck(mouseX, mouseY, false);
    sendMouseData(mouseX, mouseY, false);
    let warpState = draft.getWarpState();
    let tieUpState = draft.getTieUpState();
    let treadlingState = draft.getTreadlingState();
    sendDraftData(warpState, tieUpState, treadlingState);
}

//Sedning draft state data
function sendDraftData(warpState, tieUpState, treadlingState) {
    const data = {
        warpState:  warpState,
        tieUpState:  tieUpState,
        treadlingState:  treadlingState
    }

    console.log("draft data sent" + data);
    socket.emit('draftData', data);
}

// Function for sending data to the socket
function sendMouseData(xpos, ypos, draggedBool) {
    console.log("sendmouse: " + xpos + " " + ypos + " " + draggedBool);
 
  // Make a JS object with the x and y data
  const data = {
    x: xpos,
    y: ypos,
    d: draggedBool
  }

  // Send that object to the socket
  socket.emit('mousedata', data);
}

function updateChange() {
    updateState = !updateState;
}
