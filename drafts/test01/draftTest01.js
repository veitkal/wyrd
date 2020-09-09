
// let canvasDiv = document.getElementById('p5ts01');

    let canvasDiv = document.getElementById("p5ts01");
    let wWidth = canvasDiv.offsetWidth;
    let wHeight = canvasDiv.offsetHeight;
    let canvas;
function setup() {
    console.log(canvasDiv);
    canvas = createCanvas(wWidth, wHeight);
    canvas.parent('p5ts01');
    background(255);
}

function draw() {
    stroke(0);
    strokeWeight(10);
    noFill();
    rect(50, 50, wWidth - 100, wHeight -100);
}

function windowResized() {
    // background(22,0,222);
    canvasDiv = document.getElementById("p5ts01");
    wWidth = canvasDiv.offsetWidth;
    wHeight = canvasDiv.offsetHeight;
    background(255);
    setup();
}


// let testSketch01 = function(p) {
//     p.wWidth = p.windowWidth;
//     p.wHeight = p.windowHeight;
//     p.setup = function() {
//         p.createCanvas(p.wWidth, p.wHeight);
//         p.background(200, 0, 173);
//         p.createButton("TEST BUTTON");
//         p.resizeCanvas(p.windowWidth, p.windowHeight);
//     };

//     p.windowResized = function() {
//     };
// };

// let p5ts01 = new p5(testSketch01, 'p5ts01');


