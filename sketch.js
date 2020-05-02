/* Work to do ->
 * Using FireBase
 * upload on Github
 * host it
 * submmit it 
 */

var drawing = [],currentDraw = [],color=[];
var input1, input2, input3, b, clear;
var r=0, g=0, b=0, t=4;
var info, heading;
var namebox, usename, name = "",greet,nameit;
var g = 1;
var save,undo,redo;
var thrash = [];


function setup() {

  database = firebase.database();

canvas = createCanvas(500,500);
canvas.mousePressed(startPath);

input1 = createInput("0");
input1.position(130+230,90);

input2 = createInput("0");
input2.position(260+180,90);

input3 = createInput("0");
input3.position(390+130,90);

input4 = createInput("4");
input4.position(380+220,90);

b = createButton('Use RGB Color & Thickness');
b.position(680,95);

info = createElement('h3');
info.position(900,160);

heading = createElement('h1');
heading.position(460,10);
heading.html("Paint It & Save It");

clear = createButton('Clear');

namebox = createInput("");
usename=createButton('Set Name');
nameit=createElement('h4');
nameit.html("Type Your Name Here →");

greet = createElement('h2');
greet.position(80,180);

save = createButton('Save Drawing');
undo = createButton('Undo');
redo = createButton('Redo');

}

function draw() {
 
  background(1000);

  clear.mousePressed(function(){
    drawing = [];
    thrash = [];
  });

  usename.mousePressed(function(){
    name = namebox.value();
    g = 2;
  });

  clear.position(900,135);
  undo.position(960,135);
  redo.position(1020,135);

  if (drawing.length>0) {
    save.position(900,235);
    
  } 

if (g === 2) {
  b.mousePressed(function(){
    r = input1.value();
    g = input2.value();
    b = input3.value();
    t = input4.value();
    writeColor(r,g,b,t);
  });
}

if (g === 1) {
  save.position(-950,135);
  undo.position(-950,135);
  clear.position(-900,135);
  redo.position(-9000,135);
  nameit.position(10,215);
} else if (g>1) {
nameit.hide();
}

undo.mousePressed(function(){
  if (drawing.length>0) {
    thrash.push(drawing.pop(drawing.length));
  }
});

redo.mousePressed(function(){
  if (thrash.length>0) {
  drawing.push(thrash.pop(thrash.length));
  }
});

  info.html("X : "+mouseX+" , Y : "+mouseY);

  if (g === 1) {
    textSize(30);
    fill(0);
    text("Enter Your Name In Name Box",50,230);
    text("To Start Painting",150,280);
  
    namebox.position(200,225);
    usename.position(200,270);
  } else {
    namebox.hide();
    usename.hide();
    greet.html("Name : "+ name);
    drawingPart();
  }
if (g>1||g>2) {
  save.mousePressed(()=>{
      upload();;
      alert("Your Drawing Has Been Successfully Saved To 'Google Firebase' !");
  });
}

}

function drawingPart() {

  if (mouseIsPressed && mouseX<500 && mouseX>0 && mouseY>0 && mouseY<500) {
    var point = {
      x: mouseX,
      y: mouseY
    }
    currentDraw.push(point);
  }
  stroke(r,g,b);
  strokeWeight(t);
  noFill();

  for (let i = 0 ;i< drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (let a =0 ;a< path.length; a++) {
      vertex(path[a].x,path[a].y);
    }
    endShape();
  }
}

function startPath() {
  currentDraw = [];
  drawing.push(currentDraw);
}

function readData(data){
  drawn=data.val();

  var drawn = drawing ;
}
function showError(){
  
  console.log("Error in writing to the database");
  
}

function upload(){
  database.ref('painting/'+name+'_data').set({'drawings':drawing});
}





