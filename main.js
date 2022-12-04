video = "";
objects = [];
status = "";
function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 350);
    canvas.center();
}
function draw() {
    image(video, 0, 0, 480, 350);
    if (status != "") {
        objectDetector.detect(video, gotResult);
    }
    for (i = 0; 1 < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

        fill("blue");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        stroke("red");
        noFill();
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects..";

}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
}