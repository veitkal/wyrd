
let testSketch03 = function(p) {
    p.setup = function() {
        p.createCanvas(200, 400);
        p.background(0, 0, 173);
    };
};

let p5ts03 = new p5(testSketch03, 'p5ts03');
