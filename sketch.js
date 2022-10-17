var thresholdSlider;

function setup() {
    createCanvas(900, 800, WEBGL);
    camera(800, -600, 800, 1, 1, 1, 0, 1, 0);
    
    confLocs = [];
    confTheta = [];
    
    for (var i = 0; i <200; i ++) {
        random(-500, 500);
        var locX = random(-500, 500);
        var locY = random(-800, 0);
        var locZ = random (-500, 500);
        confLocs.push(createVector (locX, locY, locZ));
        confTheta.push(random(0,360));
    }
    
    

    thresholdSlider = createSlider(0, 255, 200);
    thresholdSlider.position(700, 750);

}

function draw() {
    background(125);
    
    push();
    noStroke();
    normalMaterial();
    confetti();
    pop();
    angleMode(DEGREES);
    
    let locationX = mouseX - height/2;
    let locationY = mouseY - width/2;
    
    //new Lights 
    pointLight(255,255, locationX, locationY, 100);
    ambientLight(60, 60, 60);
    
    var xLoc = cos(frameCount/4) * height * 3/2;
    var zLoc = sin(frameCount/4) * height * 3/2;
    
    camera (xLoc, -600, zLoc , 1, 1, 1, 0, 1, 0);
    //translate(xLoc, 0, zLoc);
    
    for (var x = -400; x < 400; x+=50){
        for (var z = -400;z < 400; z+=50){
            push();
            var distance = dist(0, 0, x, z) + frameCount;
            var length = map (sin(distance), -1, 1, 100, 300) 
            translate(x, 0, z);
            ambientMaterial(255, 0, 255); //new Ambient Material
            box(50, length, 50);
            pop();
        }
    }  

//    Step 2: Set the material to normal, set the stroke to zero and use a stroke weight of two
//    normalMaterial();
//    stroke(0);
//    strokeWeight(2);
    

}


function confetti(){
    for (var i=0; i<confLocs.length; i++){
        push();
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        rotateX(confTheta[i]);
        plane(15, 15);
        
        confLocs[i].y += 1;
        confTheta[i] += 10;
        
        if(confLocs[i].y > 0){
            confLocs[i].y = -800;
        }
        pop();
    }
}