
let testSketch02 = function(p) {
    p.setup = function() {
        p.createCanvas(200, 400);
        p.background(0, 200, 173);
    };
};

let p5ts02 = new p5(testSketch02, 'p5ts02');
