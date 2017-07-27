var inputScale = document.getElementById("scale");
var input = document.getElementById("donations");

function update() {
	scale = Number(inputScale.value) / 100;

	var val = Number(input.value);
	if (val < 100) {
		pointer = pointerb;
		pc = pbc;
	} else {
		pointer = pointerm;
		pc = pmc;
	}

	per = val / max;

	draw();
}

var scale = 0.3333333334;


var max = 1000;
var per = 0.0;

var x = 0.22;
var ymax = 0.3849;
var ymin = 0.7012;
var pmc = 0.4257;
var pbc = 0.7292;

var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

var main = new Image();
main.src = 'res/main.png';
var pointerb = new Image();
pointerb.src = 'res/pointer-below.png';
var pointerm = new Image();
pointerm.src = 'res/pointer-middle.png';

var pointer = pointerm;
var pc = pmc;

var loaded1 = false;
var loaded2 = false;
var loaded3 = false;
main.onload = function () {
	loaded1 = true;
	if (loaded1 && loaded2 && loaded3) {
		update();
	}
};
pointerb.onload = function () {
	loaded2 = true;
	if (loaded1 && loaded2 && loaded3) {
		update();
	}
};
pointerm.onload = function () {
	loaded3 = true;
	if (loaded1 && loaded2 && loaded3) {
		update();
	}
};

function draw() {
	canvas.width = main.width * scale;
	canvas.height = main.height * scale;
	context.drawImage(main, 0, 0, canvas.width, canvas.height);

	var uppx = canvas.height * ymax;
	var downpx = canvas.height * ymin;

	var xo = canvas.width * x;
	var yo = downpx + (uppx - downpx) * per - (pointer.height * scale * pc);
	context.drawImage(pointer, xo, yo,
		pointer.width * scale, pointer.height * scale);

	var fontsize = 100;
	context.font = (scale * fontsize) + "px Tahoma";
	context.fillStyle = 'white';
	context.textAlign = 'center';
	context.fillText(input.value, xo + pointer.width * scale * 0.5574, yo + pointer.height * 0.4253 * scale + (scale * fontsize * 0.35));
}

function exportImage() {
	canvas.style.display = 'none';
	var si = scale;
	scale = 1;
	draw();
  var image = canvas.toDataURL("image/png");

  window.open(image, '_blank');

	scale = si;
	draw();
	canvas.style.display = 'block';
}