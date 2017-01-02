var canvas = document.getElementById("canvas");
var i;
var countdown = 6;
var xPos = [];
var yPos = [];
var rad = [];
var direction = 0;
var time = 0;
var banner = document.getElementById("banner");
var start = document.getElementById("c");

var setup = function setup(e) {
    clearInterval(i);
    countdown = 6;
    start.style.visibility= "hidden";
    xPos = [];
    yPos = [];
    rad = [];
    while(canvas.childElementCount != 0){
	canvas.removeChild(canvas.children[0]);
    };
    i = setInterval(background1,1000);
};

var background1 = function background1(e) {
    while(canvas.childElementCount != 0){
	canvas.removeChild(canvas.children[0]);
    };
    banner.textContent = countdown - 1;
    countdown--;
    console.log(countdown);
    if(countdown < 1){
	clearInterval(i);
	console.log("hi");
	banner.textContent = "Wait for it, also the left and right keys work"
	i = setInterval(update,20);
    };
};

var update = function update(e){
    background2();
    drawObs();
    spawnCircle();
    time++;
    console.log(time);
    if(time >= 400){
	clearInterval(i);
	background3();
    }
};

var background3 = function background3(e){
    canvas.style.visibility = "hidden";
    banner.textContent = "Happy Birthday Ryan!!";
    document.getElementById("im").src = "meme.png";
}

var background2 = function background2(e){
    xPos = [];
    yPos = [];
    rad = [];
    while(canvas.childElementCount != 0){
	xPos.push(canvas.children[0].getAttribute("cx"));
	yPos.push(canvas.children[0].getAttribute("cy"));
	rad.push(canvas.children[0].getAttribute("r"));
	canvas.removeChild(canvas.children[0]);
    };
};

var drawObs = function drawObs(e) {
    var fcount = 0;
    for (fcount = xPos.length - 1; fcount >= 0; fcount--) {
	var xobs = xPos[fcount] - 400;
	var yobs = yPos[fcount] - 400;
	var test = Math.sqrt(Math.pow(xobs,2) + Math.pow(yobs,2));
	var mod = 1;
	if (xobs != null && yobs != null && test >= 9 && test < 360){
	    var robs = rad[fcount];
	    var obs = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	    var theta = Math.atan(yobs / xobs) + direction;
	    if(yobs < 0){
		theta += Math.PI;
	    }
	    if((yobs > 0 && xobs < 0) || (yobs < 0 && xobs > 0)){
		mod = -1;
	    }
	    var d = test + 4;
	    var xcalc = (d * Math.cos(theta) * mod) + 400;
	    var ycalc = (d * Math.sin(theta) * mod) + 400;
	    var rcalc = robs * 1.036;
	    obs.setAttribute("cx", xcalc);
	    obs.setAttribute("cy", ycalc);
	    obs.setAttribute("r", rcalc);
	    obs.setAttribute("fill", "red");
	    obs.setAttribute("stroke", "black");
	    canvas.appendChild(obs);
	}
    }
};

var spawnCircle = function spawnCirlce(e) {
    var obs = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var theta = Math.random() * Math.PI * 2;
    //var theta = 1 * Math.PI / 3;
    var xcalc = (Math.cos(theta) * 10) + 400;
    var ycalc = (Math.sin(theta) * 10) + 400;
    var rcalc = 1;
    obs.setAttribute("cx", xcalc);
    obs.setAttribute("cy", ycalc);
    obs.setAttribute("r", rcalc);
    obs.setAttribute("fill", "red");
    obs.setAttribute("stroke", "black");
    canvas.appendChild(obs);
};

document.onkeydown = checkKey;
document.onkeyup = other;
function checkKey(e) {
    console.log(e.keyCode);
    e = e || window.event;
    if (e.keyCode == '37') {
	direction = -1 * Math.PI / 180;
    }
    else if (e.keyCode == '39') {
        direction = Math.PI / 180;
    }
};

function other(e) {
    direction = 0;
};

start.addEventListener("click",setup);
