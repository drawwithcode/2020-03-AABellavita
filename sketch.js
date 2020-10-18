// variables
let n_img = 0;

function preload(){
    // load images
    myLoad = loadImage("../assets/images/myLoad.jpg");
    myMenu = loadImage("../assets/images/myMenu.jpg");
    myGirl = loadImage("../assets/images/myGirl.jpg");
    myGirl2 = loadImage("../assets/images/myGirl2.jpg");
    myFight = loadImage("../assets/images/myFight.png");
    myRoute = loadImage("../assets/images/myRoute.png");
    myStart = loadImage("../assets/images/myStart.png");
    myTrump = loadImage("../assets/images/myTrump.png");
    myTrump2 = loadImage("../assets/images/myTrump2.png");
    myGameboy = loadImage("../assets/images/myGameboy.png");
    // load songs
    startSong = loadSound("../assets/sounds/startSong.mp3");
    fightSong = loadSound("../assets/sounds/fightSong.mp3");
    introSong = loadSound("../assets/sounds/introSong.mp3");
    themeSong = loadSound("../assets/sounds/themeSong.mp3");
    routeSong = loadSound("../assets/sounds/routeSong.mp3");
}

function setup() {
    createCanvas(windowWidth,windowHeight)
    background(0);

    analyzer = new p5.Amplitude();
    analyzer.setInput(themeSong);
    analyzer.setInput(fightSong);
    analyzer.setInput(introSong);
    analyzer.setInput(routeSong);

    imageMode(CENTER);
    image(myLoad, width / 2, height / 2 - 180, 330, 215);
    image(myGameboy, width / 2, height / 2, 375, 666);

    // Button Play
    push();
    buttonplay = createImg("../assets/images/myPlay.svg");
    buttonplay.style("width", "32px");
    buttonplay.position(width / 2 + 118, height / 2 + 122);
    buttonplay.mousePressed(playClicked);
    pop();
    // Button Pause
    push();
    buttonpause = createImg("../assets/images/myPause.svg");
    buttonpause.style("width", "32px");
    buttonpause.position(width / 2 + 52, height / 2 + 148);
    buttonpause.mousePressed(pauseClicked);
    pop();
    // Button Next
    push();
    buttonnext = createImg("../assets/images/myNext.svg");
    buttonnext.style("width", "32px");
    buttonnext.position(width / 2 - 72, height / 2 + 135);
    buttonnext.mousePressed(nextClicked);
    pop();
    // Button Back
    push();
    buttonback = createImg("../assets/images/myBack.svg");
    buttonback.style("width", "32px");
    buttonback.position(width / 2 - 155, height / 2 + 135);
    buttonback.mousePressed(backClicked);
    pop();

    startSong.play();
}

function draw() {
    let volume = 0;
    volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, 250);

    if (fightSong.isPlaying() || themeSong.isPlaying() || routeSong.isPlaying() || introSong.isPlaying()) {
        imageMode(CORNER);
        image(myGirl, 0, 0, width / 2, height);
        image(myGirl2, width / 2, 0, width / 2, height);
        imageMode(CENTER);
        image(myTrump, width / 2 - 250 - volume, height / 2, height / 5, volume * 5);
        image(myTrump2, width / 2 + 250 + volume, height / 2, height / 5, volume * 5);
        image(myGameboy, width / 2, height / 2, 375, 666);
        let myScreen = new RubyImage();
        myScreen.display();
    }
}

class RubyImage {
    constructor(temp_x, temp_y, temp_w, temp_h) {
        this.x = width / 2;
        this.y = height / 2 - 180;
        this.w = 330;
        this.h = 215;
    }
    display() {
        push();
        if (n_img == 0) {
            image(myLoad, this.x, this.y, this.w, this.h);
        } else if (n_img == 1) {
            image(myMenu, this.x, this.y, this.w, this.h);
        } else if (n_img == 2) {
            image(myStart, this.x, this.y, this.w, this.h);
        } else if (n_img == 3) {
            image(myFight, this.x, this.y, this.w, this.h);
        } else if (n_img == 4) {
            image(myRoute, this.x, this.y, this.w, this.h);
        }
        image(myGameboy, width / 2, height / 2, 375, 666);
        pop();
    }
}

function nextClicked() {
    n_img++;
    if (n_img == 5) {
        n_img = 1;
    }
    if (n_img == 1 && themeSong.isPlaying() == false) {
        startSong.stop();
        routeSong.stop();
        themeSong.loop();
    } else if (n_img == 2 && introSong.isPlaying() == false) {
	    themeSong.stop();
	    introSong.loop();
    } else if (n_img == 3 && fightSong.isPlaying() == false) {
        introSong.stop();
	    fightSong.loop();
    } else if (n_img == 4 && routeSong.isPlaying() == false) {
        fightSong.stop();
	    routeSong.loop();
    }
}

function backClicked() {
    n_img--;
    if (n_img == 0 || n_img == -1) {
        n_img = 4;
    }
    if (n_img == 4 && routeSong.isPlaying() == false) {
        startSong.stop();
	    themeSong.stop();
	    routeSong.loop();
    } else if (n_img == 3 && fightSong.isPlaying() == false) {
        routeSong.stop();
        fightSong.loop();
    } else if (n_img == 2 && introSong.isPlaying() == false) {
        fightSong.stop();
        introSong.loop();
    } else if (n_img == 1 && themeSong.isPlaying() == false) {
        introSong.stop();
	    themeSong.loop();
    }
}

function playClicked() {
    if (n_img == 0) {
        n_img++;
        startSong.stop();
        themeSong.loop();
    }
    if (themeSong.isPaused()) {
        themeSong.loop();
    } else if (introSong.isPaused()) {
        introSong.loop();
    } else if (fightSong.isPaused()) {
        fightSong.loop();
    } else if (routeSong.isPaused()) {
        routeSong.loop();
    }
}

function pauseClicked() {
    background(0);
    image(myGameboy, width / 2, height / 2, 375, 666);
    fightSong.pause();
    introSong.pause();
    themeSong.pause();
    routeSong.pause();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);

    let volume = 0;
    volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, 300);

    if (fightSong.isPlaying() || themeSong.isPlaying() || routeSong.isPlaying() || introSong.isPlaying()) {
        imageMode(CORNER);
        image(myGirl, 0, 0, width/2, height);
        image(myGirl2, width / 2, 0, width / 2, height);
        imageMode(CENTER)
        image(myTrump, width / 2 - 250 - volume, height / 2, height / 5, volume * 5);
        image(myTrump2, width / 2 + 250 + volume, height / 2, height / 5, volume * 5);
        let myScreen = new RubyImage();
        myScreen.display();
    }
    if (n_img == 0) {
        let myScreen = new RubyImage();
        myScreen.display();
    }
    imageMode(CENTER);
    image(myGameboy, width / 2, height / 2, 375, 666);

    // Button Play
    push();
    buttonplay.position(width / 2 + 118, height / 2 + 122);
    pop();
    // Button Pause
    push();
    buttonpause.position(width / 2 + 52, height / 2 + 148);
    pop();
    // Button Next
    push();
    buttonnext.position(width / 2 - 72, height / 2 + 135);
    pop();
    // Button Back
    push();
    buttonback.position(width / 2 - 155, height / 2 + 135);
    pop();
}
