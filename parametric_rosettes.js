const MAX_X = 2.0;
const PERIOD = 800;
const THICKNESS = 3.0;
let pattern = ROSETTES["8k + 3"];
let curve = [];
let start_frame = 0;

function make_select() {
    const sel = createSelect();
    sel.position(10, 10);
    for (const x of Object.keys(ROSETTES)) {
        sel.option(x);
    }
    sel.changed(change_rosette);
}

function change_rosette(e) {
    const selected = e.target.value;
    pattern = ROSETTES[selected];
    curve = [];
    start_frame = frameCount;
}

function setup() {
    createCanvas(500, 750);
    make_select();
    
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
    const frame = frameCount - start_frame;
    const t = (frame / PERIOD) * TWO_PI;
    background(0);
    
    push();
    translate(width / 2, height / 2);
    const scale_factor = width / 2 / MAX_X;
    scale(scale_factor, -scale_factor);
    strokeWeight(THICKNESS / scale_factor);
    
    const sums = [...pattern.partial_sums(t),];
    if (frame < PERIOD) {
        curve.push(sums[sums.length - 1]);
    }
    
    noFill();
    strokeJoin(ROUND);
    stroke(71, 142, 204);
    draw_polyline(curve, frame >= PERIOD);
    stroke(255);
    draw_polyline(sums, false);
    
    pop();
}
