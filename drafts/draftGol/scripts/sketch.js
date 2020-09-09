'use strict'

//main variables
let numWarps, numShafts, wWidth, wHeight, padding, originX, originY, bg, fg;

//objects
let draft;
let socket;

//dom elements
let update_freeze = document.getElementById('update-freeze_button');
let randomize_button = document.getElementById('random_button');
let update_warp_toggle = document.getElementById('update-warp_toggle');
let update_tieUp_toggle = document.getElementById('update-tieUp_toggle');
let update_weft_toggle = document.getElementById('update-weft_toggle');
let updateRate_slider = document.getElementById('updateRate_slider');

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
    numWarps = 60;
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
    updateState = true;
    warp_update_state = true;
    tieUp_update_state = true;
    weft_update_state = true;
    draft.updateRate = updateRate_slider.value;
    // updateToggle = createCheckbox('update', true);
    // updateToggle.changed(updateChange);
    // updateButton = createButton("update toggle");
    // updateButton.mousePressed(updateChange);

    // testSlider = createSlider(0, 255, 100);
    // updateButton.parent('draft_param');
    // testSlider.parent('draft_param');
    // updateToggle.parent('draft_param');

    //SOCKETS
    socket = io.connect('http://localhost:3000'); //specify in server.js

    // Specify a function to call every time 'mousedata'
    // packets are received over the socket
    socket.on('mousedata',
        function(data) {
            //When we receive data draw a blue circle
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
update_freeze.addEventListener('click', () => {
    update_warp_toggle.checked = false;
    warp_update_state = false;
    update_tieUp_toggle.checked = false;
    tieUp_update_state = false;
    update_weft_toggle.checked = false;
    weft_update_state = false;
});

update_warp_toggle.addEventListener('change', () => {
    if (update_warp_toggle.checked) {
        warp_update_state = true;
    }
    if (!update_warp_toggle.checked) {
        warp_update_state = false;
    }
});
update_tieUp_toggle.addEventListener('change', () => {
    if (update_tieUp_toggle.checked) {
        tieUp_update_state = true;
    }
    if (!update_tieUp_toggle.checked) {
        tieUp_update_state = false;
    }
});
update_weft_toggle.addEventListener('change', () => {
    if (update_weft_toggle.checked) {
        weft_update_state = true;
    }
    if (!update_weft_toggle.checked) {
        weft_update_state = false;
    }
});

updateRate_slider.oninput = function() {
    draft.updateRate = this.value;
}

randomize_button.onclick = function() {
    console.log("bdd");
    draft.threadingStateRandom();
    draft.tieUpStateRandom();
    draft.treadlingStateRandom();
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
