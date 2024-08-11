var w = window.innerWidth, h = window.innerHeight;

const CELL = rand(15, 150/2)*2-1;
var proportions = Math.min(w, h);
const SIZE = Math.round(proportions*0.9/CELL);
const INDENT_X = Math.round((w-CELL*SIZE)/2);
const INDENT_Y = Math.round((h-CELL*SIZE)/2)

const WALL_COLOR = 'black';
const FREE_COLOR = 'white';

var countOfCells = Math.ceil((CELL-1)/2)*Math.ceil((CELL-1)/2);
var countOfVisitedCells = 1;

const matrix = createMatrix(CELL);
const cleaner = {
        x: rand(1, (CELL-1)/2)*2-1,
        y: rand(1, (CELL-1)/2)*2-1
    }

function setup() {
  noStroke();
  createCanvas(w, h);
  background(255);
  matrix[cleaner.y][cleaner.x] = 1;
  matrix[1][0] = 1;
  matrix[CELL-2][CELL-1] = 1;
  while(countOfVisitedCells < countOfCells)
    moveCleaner(cleaner);
  drawMatrix();
  fxpreview();
}

function draw() {
}

function createMatrix(cell){
  const matrix = [];
  for(let y = 0; y < cell; y++){
    const cell = [];
    for(let x = 0; x < cell; x++){
      cell.push(0);
    }
    matrix.push(cell);
  }
  return matrix;
}

function drawMatrix(){
  for(let y = 0; y < CELL; y++){
    for(let x = 0; x < CELL; x++){
      const color = matrix[y][x] ? FREE_COLOR: WALL_COLOR;
      fill(color);
      square(x*SIZE+INDENT_X, y*SIZE+INDENT_Y, SIZE);
      }
  }
}

function moveCleaner(cleaner) {
  const directions = [];
  if(cleaner.x > 1)
    directions.push([-2, 0])
  if(cleaner.x < CELL-2)
    directions.push([2, 0])
  if(cleaner.y > 1)
    directions.push([0, -2])
  if(cleaner.y < CELL-2)
    directions.push([0, 2])
  const [dx, dy] = getRandomItem(directions);
  cleaner.x += dx;
  cleaner.y += dy;
  if(!matrix[cleaner.y][cleaner.x]){        
      matrix[cleaner.y][cleaner.x] = 1
      matrix[cleaner.y - dy/2][cleaner.x - dx/2] = 1
      countOfVisitedCells++
  }
}

function getRandomItem(array) {
  const index = Math.floor(fxrand() * array.length);
  return array[index];
}

function rand(min, max){
  return Math.floor(fxrand() * (max - min + 1)) + min
}