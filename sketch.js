let ninjaSprite;
let robotSprite;
let yangSprite;
let houseBackground;

let splunkyCharacters;

function preload() {
    ninjaSprite = loadImage("assets/Ninja.png");
    robotSprite = loadImage("assets/Robot.png");
    yangSprite = loadImage("assets/Yang.png");
    houseBackground = loadImage("assets/EmptyHouse.png");
}

function setup() {
    createCanvas(800, 600);
    imageMode(CENTER);

    splunkyCharacters = [
        new MovementAnimation(robotSprite, 80, 80, 200, 397, 9, 1.5),
        new MovementAnimation(yangSprite, 80, 80, 450, 415, 9, 1),
        new MovementAnimation(ninjaSprite, 80, 80, 400, 240, 9, 1),
    ];
}

function draw() {
    image(houseBackground, 400, 300);
    for (let i = 0; i < splunkyCharacters.length; i++) {
        splunkyCharacters[i].draw();
    }
}

function keyPressed() {
    for (let i = 0; i < splunkyCharacters.length; i++) {
        splunkyCharacters[i].keyPressed();
    }
}

function keyReleased() {
    for (let i = 0; i < splunkyCharacters.length; i++) {
        splunkyCharacters[i].keyReleased();
    }
}

class MovementAnimation {
    constructor(
        spritesheet,
        sw,
        sh,
        dx,
        dy,
        animationLength,
        scaling = 1, //to scale the character size
        xOffset = 0,
        yOffset = 0
    ) {
        this.spritesheet = spritesheet;
        this.sw = sw;
        this.sh = sh;
        this.dx = dx;
        this.dy = dy;
        this.u = 0;
        this.v = 0;
        this.animationLength = animationLength;
        this.currentFrame = 0;
        this.moving = 0;
        this.xDirection = 1;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.scaling = scaling;
    }

    draw() {
        this.u =
            this.moving != 0 ? this.currentFrame % this.animationLength : 0;
        push();
        translate(this.dx, this.dy);
        scale(this.xDirection * this.scaling, this.scaling);

        //this is what generates the image
        image(
            this.spritesheet,
            0,
            0,
            this.sw,
            this.sh,
            this.u * this.sw + this.xOffset,
            this.v * this.sh + this.yOffset,
            this.sw,
            this.sh
        );
        pop();

        if (frameCount % 6 == 0) {
            this.currentFrame++;
        }

        this.dx += this.moving;
    }

    keyPressed() {
        if (keyCode === RIGHT_ARROW) {
            this.moving = 1;
            this.xDirection = 1;
            this.currentFrame = 1; //to have the character go to the 2nd animation frame on keypress
        } else if (keyCode === LEFT_ARROW) {
            this.moving = -1;
            this.xDirection = -1;
            this.currentFrame = 1;
        }
    }

    keyReleased() {
        if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
            this.moving = 0;
        }
    }
}
