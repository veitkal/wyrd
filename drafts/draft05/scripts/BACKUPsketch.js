/*

REF: https://editor.p5js.org/aferriss

TODO: 

 */


'use strict'
//p5.disableFriendlyErrors = true;


//canvas vars
let canvasWidth, canvasHeight;
let canvasDiv = document.getElementById("draft05_div");
let canvas;

//buffers
let buffer0, buffer1;

//colours
let bg, fg;

  let num = 100;
let sz;
    let c = 0;
let s;

let m = false;

function setup() {

  // frameRate(30);
  ////init canvaiv');
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;

  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('draft05_div');

  //buffers
  buffer0 = createGraphics(canvasWidth, canvasHeight, WEBGL);
  buffer1 = createGraphics(canvasWidth, canvasHeight, WEBGL);

  //vars
  
  //colours
  bg = 255;
  fg = 0;
  s = 0.1;

  background(bg);
  noStroke();
  buffer0.noStroke();
  buffer1.noStroke();

}

function draw() {
  feedCenterSquare();
}

function cirq() {
  blendMode(DIFFERENCE);
  // filter(THRESHOLD);
  // filter(BLUR, 3);
  buffer0.clear();
  buffer0.texture(buffer1);
  buffer0.plane(canvasWidth, canvasHeight);
  // buffer0.background(bg);

  // translate(-width/2, -height/2);
  // buffer0.stroke(0, 0.05);
  buffer0.noStroke();
  buffer1.noStroke();

   if(m) {
   testDisp();
  m = false;
   }
  
  // if(frameCount % 10000 === 1) {
  // testDisp();
  // }
  // for (let i =0; i < num; i++) {
  //   sz = width / num;
  //   // buffer0.fill(random(255)>150?255:0);
  //   buffer0.fill(random(255)>150?255:0);
  //   // buffer0.rectMode(CENTER);
  //   buffer0.rect(i*sz - width/2, -height/2, sz, sz);
  // }
  // buffer0.fill(bg);
 
  buffer0.push();
  // buffer0.fill(bg);
  buffer0.translate(-width/2, -height/2);
  // buffer1.translate(0,sin(frameCount*0.01)*0.1);
  // buffer1.translate(0,s);
  // buffer1.scale(0.9999999999999,1.00001);
  // buffer1.scale(0.95, 1);
  // buffer1.scale(1.1, 1.0001);
  buffer1.rotateZ(sin(frameCount * 0.1)*.01);
  buffer1.scale(0.99999,sin(frameCount * 0.1)*0.00001+1.00001);
  buffer0.texture(buffer0);
  // buffer0.plane(width,sz);
  buffer0.plane(width,sz);
  buffer0.pop();


  buffer1.clear();
  // buffer1.background(bg);
  buffer1.texture(buffer0)
  buffer1.plane(canvasWidth, canvasHeight);

  image(buffer1, 0, 0);
  image(buffer0, 0, 0);
  
}

function testDisp() {

  for (let i =0; i < num; i++) {
    for (let j =0; j < num; j++) {
    sz = width / num;
    // buffer0.fill(random(255)>150?255:0);
    buffer0.fill(random(255)>150?255:0);
    // buffer0.rectMode(CENTER);
    buffer0.rect(i*sz - width/2, j * sz -height/2, sz, sz);
    }
  }
}

function centerGrid() {

  for (let i =0; i < num; i++) {
    for (let j =0; j < num; j++) {
    sz = width / num;
    // buffer0.fill(random(255)>150?255:0);
    buffer0.fill(random(255)>150?255:0);
    // buffer0.rectMode(CENTER);
    buffer0.rect(i*sz - width/2, j * sz -height/2, sz, sz);
    }
  }
}

function mouseDragged() {
  let x = mouseX / width;
  let y = mouseY / height;
  buffer1.scale(map(x, 0, 1, -1, 1) * 0.0001, map(x, 0, 1, -1, 1)*0.0001);
}

function mousePressed() {
  m = true;
  // testDisp();
}

//-----------------


function feedCenter() {
  blendMode(SUBTRACT);
  filter(THRESHOLD);
  // filter(BLUR, 3);
  buffer0.clear();
  buffer0.texture(buffer1);
  buffer0.plane(canvasWidth, canvasHeight);
  // buffer0.background(bg);

  // translate(-width/2, -height/2);
  // buffer0.stroke(0, 0.05);
  buffer0.noStroke();
  buffer1.noStroke();

   if(m) {
   testDisp();
  m = false;
   }
  
  // if(frameCount % 10000 === 1) {
  // testDisp();
  // }
  // for (let i =0; i < num; i++) {
  //   sz = width / num;
  //   // buffer0.fill(random(255)>150?255:0);
  //   buffer0.fill(random(255)>150?255:0);
  //   // buffer0.rectMode(CENTER);
  //   buffer0.rect(i*sz - width/2, -height/2, sz, sz);
  // }
  // buffer0.fill(bg);
 
  buffer0.push();
  // buffer0.fill(bg);
  buffer0.translate(-width/2, -height/2);
  // buffer1.translate(0,sin(frameCount*0.01)*0.1);
  // buffer1.translate(0,s);
  // buffer1.scale(0.9999999999999,1.00001);
  // buffer1.rotateZ(sin(frameCount * 0.1)*1);
  buffer1.scale(0.9999999999,sin(frameCount * 0.1)*0.00001+1.00001);
  buffer0.texture(buffer0);
  // buffer0.plane(width,sz);
  buffer0.plane(width,sz);
  buffer0.pop();

  buffer1.clear();
  // buffer1.background(bg);
  buffer1.texture(buffer0)
  buffer1.plane(canvasWidth, canvasHeight);

  image(buffer1, 0, 0);
  image(buffer0, 0, 0);
  
}

function feedCenterSquare() {
  blendMode(SUBTRACT);
  // filter(ERODE);
  // filter(BLUR, 3);
  buffer0.clear();
  buffer0.texture(buffer1);
  buffer0.plane(canvasWidth, canvasHeight);
  // buffer0.background(bg);

  // translate(-width/2, -height/2);
  // buffer0.stroke(0, 0.05);
  buffer0.noStroke();
  buffer1.noStroke();

   if(m) {
   testDisp();
  m = false;
   }
  
  // if(frameCount % 10000 === 1) {
  // testDisp();
  // }
  // for (let i =0; i < num; i++) {
  //   sz = width / num;
  //   // buffer0.fill(random(255)>150?255:0);
  //   buffer0.fill(random(255)>150?255:0);
  //   // buffer0.rectMode(CENTER);
  //   buffer0.rect(i*sz - width/2, -height/2, sz, sz);
  // }
  // buffer0.fill(bg);
 
  buffer0.push();
  // buffer0.fill(bg);
  // buffer0.translate(-width/2, -height/2);
  // buffer1.translate(0,sin(frameCount*0.01)*0.1);
  // buffer1.translate(0,s);
  // buffer1.scale(0.9999999999999,1.00001);
  // buffer1.scale(0.9999999999999,sin(frameCount * 0.01)*0.001+1.000001);
  buffer1.rotateZ(0.00001);
  buffer0.texture(buffer0);
  // buffer0.plane(width,sz);
  buffer0.plane(sz*5,sz*5);
  buffer0.pop();

  buffer1.clear();
  // buffer1.background(bg);
  buffer1.texture(buffer0)
  buffer1.plane(canvasWidth, canvasHeight);

  image(buffer1, 0, 0);
  image(buffer0, 0, 0);
 }
