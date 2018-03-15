var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

var myMusic;
var context = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 30;
var minRadius = 1;

var colorArray = [
    '#324D5C',
    '#46B29D',
    '#F0CA4D',
    '#E37B40',
    '#F53855'
];

// Mouse Interactivity
window.addEventListener('mousemove',
    function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})

// Resize Screen
window.addEventListener('resize',
    function(event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})




// Circle Object
function Circle(x,y,dx,dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = radius;
    this.age = 0;

    this.draw = function(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }

    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (this.age > 0){
            this.age -= 1;
        }

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < maxRadius && this.age == 0){
            this.radius += 2.5;
            if (this.radius >= maxRadius){
                this.age = 23;
            }
        } else if (this.radius > this.minRadius && this.age == 0){
            this.radius -= .7;
            if (this.radius < 0){
                this.radius = 0;
            }
        }

        this.draw();
    }
}


var circleArray = [];

for (var i = 0; i < 900; i++){
    var radius = Math.random() * 0 + 0;
    var x = Math.random() * (innerWidth - radius*2) + radius;
    var y = Math.random() * (innerHeight - radius*2) + radius;
    var dy = (Math.random() - 0.5) * 3;
    var dx = (Math.random() - 0.5) * 3;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

// console.log(circleArray);

//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function drawText() {
    // Text
    context.font = "50px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Under Construction", canvas.width/2, canvas.height/2);
}


function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0,0, innerWidth, innerHeight);

    drawText();
    for ( var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}


// myMusic = new sound("Hiding Your Reality.mp3");
// myMusic.play();
animate();

