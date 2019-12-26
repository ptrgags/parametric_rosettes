const MAX_X = 2.0;
const PERIOD = 800;
let pattern = ROSETTE_8K3;
let curve = [];

function setup() {
    createCanvas(500, 750);
    background(0);
    console.log(width);
}

function draw_polyline(points, close) {
    beginShape();
    for (const [x, y] of points) {
        vertex(x, y);
    }
    if (close) {
        endShape(CLOSE);
    } else {
        endShape();
    }
}

function draw() {
    const t = (frameCount / PERIOD) * TWO_PI;
    background(0);
    
    push();
    translate(width / 2, height / 2);
    const scale_factor = width / 2 / MAX_X;
    scale(scale_factor, -scale_factor);
    strokeWeight(1.0 / scale_factor);
    
    const sums = [...pattern.partial_sums(t),];
    if (frameCount < PERIOD) {
        curve.push(sums[sums.length - 1]);
    }
    stroke(255);
    noFill(); 
    draw_polyline(curve, frameCount >= PERIOD);
    draw_polyline(sums, false);
    
    pop();
}
