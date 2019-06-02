var canvas = document.querySelector('canvas');

function resize() {
	// Our canvas must cover full height of screen
	// regardless of the resolution
	var height = window.innerHeight;

	// So we need to calculate the proper scaled width
	// that should work well with every resolution
	var ratio = canvas.width/canvas.height;
	var width = height * ratio;

	canvas.style.width = width+'px';
	canvas.style.height = height+'px';
}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);