// Four rules to Game of Life
// 1. If a dead cell has exactly three live neighbours, it comes to life
// 2. If a live cell has less than two live neighbours, it dies
// 3. If a live cell has more than three live neighbours, it dies
// 4. If a live cell has two or three live neighbours, it continues living

var gridWidth = 800;
var gridHeight = 800;
var mainGrid = createGrid(gridWidth);
var tempGrid = createGrid(gridWidth);

Array.prototype.sample = function() {
	return this[Math.floor(Math.random()*this.length)];
}

// grid will have dimensions 
function createGrid(r) {
	var arr = [];

	for (i = 0; i < r; i++) {
		arr[i] = []
 	}

 	return arr;
}

function fillGrid(width, height) {

	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			var randVal = Math.floor(Math.random() + 0.5); // this will give either 0 or 1

			// if 1, alive
			if (randVal === 1) {
				mainGrid[i][j] = 1;
			} else {
				mainGrid[i][j] = 0;
			}
		}
	}
}

function draw(width, height) {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d'); // get canvas to draw on
	console.log(ctx);

	var styles = ["rgb(88, 73, 144)", "rgb(0, 114, 135)", "rgb(142, 51, 109)", "rgb(46, 134, 97)"];

	// clear the canvas before doing anything
	ctx.clearRect(0, 0, width, height);

	for (var i = 1; i < width; i++) {
		for (var j = 1; j < height; j++) {
			if (mainGrid[i][j] === 1) {
				ctx.fillStyle = styles.sample();
				ctx.fillRect(i, j, 1, 1); // x, y, width, height
			}
		}
	}

	console.log(ctx);
}

function liveOneGeneration(w, h) {

	for (var i = 1; i < h - 1; i++) {
		for (var j = 1; j < w - 1; j++) {
			var cellCount = 0;

			// need to count cells to apply rules of life

			// top left
			if (mainGrid[i - 1][j + 1] === 1) {
				cellCount++;
			}

			// top
			if (mainGrid[i][j + 1] === 1) {
				cellCount++;
			}

			// top right
			if (mainGrid[i + 1][j + 1] === 1) {
				cellCount++;
			}

			// left
			if (mainGrid[i - 1][j] === 1) {
				cellCount++;
			}

			// right
			if (mainGrid[i + 1][j] === 1) {
				cellCount++;
			}

			// bottom left
			if (mainGrid[i - 1][j - 1] === 1) {
				cellCount++;
			}

			// bottom right
			if (mainGrid[i + 1][j - 1] === 1) {
				cellCount++;
			}

			// bottom
			if (mainGrid[i][j - 1] === 1) {
				cellCount++;
			}

			// If a dead cell has exactly three live neighbours, it comes to life
			if (mainGrid[i][j] === 0) {
				// make it come alive
				if (cellCount === 3) {
					tempGrid[i][j] = 1;
				}

			// alive cells
			} else {
				// If a live cell has less than two live neighbours, it dies
				if (cellCount < 2) {
					tempGrid[i][j] = 0;
				// If a live cell has more than three live neighbours, it dies
				} else if (cellCount > 3) {
					tempGrid[i][j] = 0;
				} else if (cellCount === 2 || cellCount === 3) {
					// nothing happens, stays alive
					tempGrid[i][j] = 1;
				}
			}
		}
	} 

	for (var i = 0; i < h; i++) {
		for (var j = 0; j < w; j++) {
			mainGrid[i][j] = tempGrid[i][j];
		}
	}
}

document.getElementById('canvas').width = gridWidth;
document.getElementById('canvas').height = gridHeight;

createGrid(gridWidth);
fillGrid(gridWidth, gridHeight);
draw(gridWidth, gridHeight);

setInterval(function() {
    draw(gridWidth, gridHeight);
    liveOneGeneration(gridWidth, gridHeight);
}, 50);

