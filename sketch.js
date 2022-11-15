let vy, ay, vx, ax, itemx, itemy, m, r, ra;
let mySound, reverb;
let osc, playing, freq, amp;
let mycolor;
starX = 0; //X of Random stable star's X;
starY = 0; //Y of Random stable star's Y;
stari = 0; //number of stable star;

var pot1 = 0, pot2 = 0, pot3 = 0;

var offsetAngle = 0,
    particle,
    particles = [],
    ctx;

const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1216";
const characteristicsUUID = {
    x: "19b10001-e8f2-537e-4f6c-d104768a1216",
    y: "19b10002-e8f2-537e-4f6c-d104768a1216",
    z: "19b10003-e8f2-537e-4f6c-d104768a1216"
};
var characteristicX;
var characteristicY;
var characteristicZ;

let myBLE;

var notenumber = 1;

function preload() {
    soundFormats('mp3', 'ogg');
    mySound = loadSound(src = "assets/star.mp3");

}

function setup() {
    // Create a p5ble class
    createCanvas(windowWidth, windowHeight);
    noStroke();
    background(0, 0, 0);
    vy = 0;
    ay = 0;
    vx = 0;
    ax = 0;
    r = 1;
    ra = 1;
    itemx = width / 2;
    itemy = height / 2;
    m = 0;
    mySound.play();

    //reverb = new p5.Reverb();
    //reverb.process(mySound, 3, 2);
    myBLE = new p5ble();
    //myBLE.connect(serviceUuid, gotCharacteristics);
    const connectButton = createButton('Connect and Start Notifications')
    connectButton.mousePressed(connectAndStartNotify);
}
function connectAndStartNotify() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function draw() {
    background(17, 5);
    Starings();
    offsetAngle += 0.05;
    //let dryWet = map(itemx, 0, width, 0, 1);
    mycolor = map(itemy, 0, height, 0.5, 1);
    // 1 = all reverb, 0 = no reverb
    //reverb.drywet(dryWet);
    // 1 = all reverb, 0 = no reverb

    fill(128, 234 * mycolor, 237);
    circle(itemx, itemy, r);


    //volume control
    //if (itemx <= width / 2) {
    //    vol = map(itemx, 0, width / 2, 0, 1)
    //}
    //if (itemx > width / 2) {
    //    vol = map(itemx, width / 2, width, 1, 0)
    //}

    //mySound.amp(vol);
   //volume control


    r = r + ra;
    if (r > 50 || r < 0) {
        ra = -ra
    }


    itemMove();
    border();
    speedLimit()


    if (itemx > 0 && itemy > 0) {
        makeParticles(2, itemx, itemy);
    } else {
        background(0);
        makeParticles(2, width / 2, height / 2)
        itemx = width / 2;
        itemy = width / 2
    }
    for (i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.render();
        p.update();
    }
    while (particles.length > 1000) particles.shift();

}



function makeParticles(pcount, mx, my) {

    for (var i = 0; i < pcount; i++) {
        var p = new Particle(mx, my, random(35, 95));

        var angle = PI + random(-PI, PI);
        var speed = random(4, 8);

        p.velX = sin(angle) * speed;
        p.velY = cos(angle) * speed;

        p.size = random(8, 18);

        particles.push(p);
    }
}

function Particle(x, y, h) {
    this.posX = x;
    this.posY = y;
    this.velX = 0;
    this.velY = 0;
    this.shrink = .95;
    this.size = 1;
    this.drag = 0.9;
    this.gravity = 0.2;
    this.hue = h;

    this.update = function () {
        this.velX *= this.drag;
        this.velY *= this.drag;

        this.velY += this.gravity;

        this.posX += this.velX;
        this.posY += this.velY;

        this.size *= this.shrink;
        // this.alpha -= this.fade; 	 
    };

    this.render = function () {
        fill(128, 234 * mycolor, 237);
        ellipse(this.posX, this.posY, this.size);
    };


}

function itemMove() {
    itemx = itemx + vx;
    vx = vx + ax;
    itemy = itemy + vy;
    vy = vy + ay;
    if (pot2 > 0.20) {
        ax = map(pot2, 0.21, 1, 0, -0.5)

    }
    if (-0.1 <= pot2 <= 0.1) {
        ax = 0;
    }
    if (pot2 < -0.20) {
        ax = map(pot2, -0.21, -1, 0, 0.5)

    }

    if (pot1 > 0.20) {
        ay = map(pot1, 0.21, 1, 0, -0.5)

    }
    if (-0.1 <= pot1 <= 0.1) {
        5
        ay = 0;
    }
    if (pot1 < -0.20) {
        ay = map(pot1, -0.21, -1, 0, 0.5)
    }
}
function border() {
    if (itemx > width - r / 2) {
        // if(vx>=2){
        //   vx= -0.8*vx
        // }else{
        //   vx = - vx
        // }
        vx = -vx;
        //playSynth()

    }
    if (itemx < r / 2) {
        // vx= -0.8*vx
        vx = -vx;

    }
    if (itemy > height - r / 2) {
        // if(vy>=2){
        //   vy= -0.8*vy
        // }else{
        //   vy= -vy
        // }
        vy = -vy

    }
    if (itemy < r / 2) {
        // vy= -0.8*vy
        vy = -vy

    }
}
function speedLimit() {
    if (vx > 2) {
        vx = 2;
    }
    if (vx < -2) {
        vx = -2;
    }
    if (vy > 2) {
        vy = 2;
    }
    if (vy < -2) {
        vy = -2;
    }

}
function Starings() {
    if (0 < stari < 50) {
        stari = stari + 1;
        starX = random(width);
        starY = random(height);
        stroke(random(200, 255));
        strokeWeight(random(2))
        point(starX, starY);
        noStroke();
    }

}




// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
    if (error) console.log('error: ', error);
    console.log(characteristics.length);

    for (let i = 0; i < characteristics.length; i++) {
        if (characteristics[i].uuid == characteristicsUUID.x) {
            characteristicX = characteristics[i];
            myBLE.startNotifications(characteristicX, handleX, 'int8');
        } else if (characteristics[i].uuid == characteristicsUUID.y) {
            characteristicY = characteristics[i];
            myBLE.startNotifications(characteristicY, handleY, 'int8');
        } else if (characteristics[i].uuid == characteristicsUUID.z) {
            characteristicZ = characteristics[i];
            myBLE.startNotifications(characteristicZ, handleZ, 'int8');
        } else {
            console.log("nothing");
        }
    }

}

// A function that will be called once got characteristics
function handleX(data) {
    pot1 = Number(data)/100;
}

function handleY(data) {
    pot2 = Number(data)/100;
}

function handleZ(data) {
    pot3 = Number(data)/100;

}
