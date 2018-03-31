new p5();

//width and height
var canvasX = 500;
var canvasY = 1020;

//point of canvas
var canvasPosX;
var canvasPosY;

//events
var timerId = setInterval(function(){let elm = new EnemyPlane(); ships.push(elm)} ,2000);

//moving objects
var boss = null;
var ships = [];
var bullets = [];

//loaded images
var img;
var hp;
var canvasBack;
var scoreElem;

//background y for scrolling
var background1Y = -330;
var background2Y = -1680;

class Player{

	constructor()
	{
		this.x = canvasX/2;
		this.y = canvasY-100;
		this.width = 60;
		this.height = 80;
		this.hp = 3;
		this.killsLeft = 15;
		this.hpX = [canvasX - 70, canvasX - 50, canvasX - 30];
		this.score = 0;
	}

	enemyCollideCheck()
	{
		if (ships.length==0)
			return;

		for (var i = 0; i < ships.length; i++) {
			if (checkCollision(ships[i].x, ships[i].y, ships[i].width, ships[i].height, this.x, this.y, this.width, this.height))
	  		{
	  			ships[i].y = -500;
		 		this.hp--;
		 		plr.killsLeft--;
	  		}
		}
	}

	draw()
	{
		image(img, this.x, this.y);
	}

	
	drawHp()
	{
		for (var i = 0; i < this.hp; i++) {
			image(hp,this.hpX[i],20);
		}
	}

	shoot()
	{
		bullets.push(new Bullet(this.x + 5, this.y -4));
		bullets.push(new Bullet(this.x + this.width - 7, this.y -4));
	}
}


class EnemyPlane{
	
	constructor()
	{
		this.height = 123;
		this.width = 149;
		this.x = random(0, canvasX - this.width);
		this.y = 20;
		this.hp = 12;
	}

	draw()
	{
		if (this.hp>=0 && this.hp<=4 )
			image(enemy2, this.x, this.y);
		if (this.hp>=5 && this.hp<=9 )
			image(enemy1, this.x, this.y);
		if (this.hp>=10 && this.hp<=12 )
			image(enemy0, this.x, this.y);
	}

	updateCoords()
	{
		this.y+=6;
	}

	bulletsCollide()
	{
		for (var i = 0; i < bullets.length; i++)
		{
			if (checkCollision(bullets[i].x, bullets[i].y, 1, 1, this.x, this.y+this.height-10, this.width, 10))
			{
				bullets[i] = -100;
				this.hp--;
				if (this.hp == 0)
				{
					plr.killsLeft--;
					plr.score += 250;
					scoreElem.html("Счёт: "+plr.score);
					this.y = -1000;
				}

			}
		}	
	}
}

class Boss{

	constructor()
	{
		this.x = canvasX/2;
		this.y = 20;
		this.width = 168;
		this.height = 300;
		this.hp = 100 ;
		this.bossVector = "RIGHT";
	}

	draw()
	{
		if (this.hp <= 20)
			image(boss5,this.x,this.y);
		if (this.hp>20 && this.hp<= 40)
			image(boss4,this.x,this.y);
		if (this.hp>40 && this.hp<= 60)
			image(boss3,this.x,this.y);
		if (this.hp>60 && this.hp<=80)
			image(boss2,this.x,this.y);
		if (this.hp>80 && this.hp<=99)
			image(boss1,this.x,this.y);
		if (this.hp == 100)
			image(boss0,this.x,this.y);
	}

	updateCoords()
	{
		this.y +=0.05;
		switch(this.bossVector)
		{
			case "LEFT":
				if (this.x >=2)
					this.x -= 2;
				else
					this.bossVector="RIGHT";
				break;
			case "RIGHT":
				if (this.x <=300)
					this.x += 2;
				else
					this.bossVector="LEFT";
				break;
		}
	}

	bulletsShip()
	{
		for (var i = 0; i < bullets.length; i++)
		{
			if (checkCollision(this.x, this.y+this.height, this.width, 1, bullets[i].x, bullets[i].y, this.width, this.height))
			{
				bullets[i].y = -100;
				bullets[i].x = -100;
				this.hp--;
				if (this.hp<=0)
				{
					message("ПОБЕДА!");
				}
			}
		}
	}
}

class Bullet
{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}

	move()
	{
		this.y -= 10;
	}

	draw()
	{
 		stroke('#ffd700');
 		rect(this.x, this.y, 1, 10);
	}
}

var plr = new Player();

function setup(){

    var cnv = createCanvas(canvasX,canvasY);
    canvasPosX = (windowWidth - width) / 2 + 10;
  	canvasPosY = 0;
  	cnv.position(canvasPosX, canvasPosY);
  	
  	scoreElem = createDiv('Счёт: 00000');
    scoreElem.position(canvasPosX+20, 20);
    scoreElem.id = 'score';
    scoreElem.style('color', 'white');
	

	img = loadImage('mainActor.png');
	canvasBack = loadImage('canvas.jpg');
	hp = loadImage('hp.png');

	boss0 = loadImage('boss0.png');
	boss1 = loadImage('boss1.png');
	boss2 = loadImage('boss2.png');
	boss3 = loadImage('boss3.png');
	boss4 = loadImage('boss4.png');
	boss5 = loadImage('boss5.png');

	enemy0 = loadImage('enemy0.png');
	enemy1 = loadImage('enemy1.png');
	enemy2 = loadImage('enemy2.png');

	frameRate(60);
}

function draw()
{
	if (plr.hp == 0)
		message('ВЫ ПРОИГРАЛИ');
	ships = ships.filter(ship => ship.y >= 0 && ship.y <= canvasY+50);
	bullets = bullets.filter(bullet => bullet.y >= 0);
	scrollBackground();
	plr.draw();
	plr.drawHp();
	console.log(plr.score);
	move();
	if (plr.killsLeft == 0 && boss == null)
	{
		boss = new Boss();
		clearInterval(timerId);
	}
	plr.enemyCollideCheck();
	bullets.forEach(function(element) {
  		element.draw();
  		element.move();
	});

	ships.forEach(function(element) {
  		element.draw();
  		element.updateCoords();
  		element.bulletsCollide();
	});

	if (boss!=null)
	{
		boss.draw();
		boss.updateCoords();
		boss.bulletsShip();
		noStroke();
		color(65);
		rect(boss.x, boss.y-15, boss.width, 10);
		var size = boss.width/100*boss.hp;
		color('#ED2939');
		rect(boss.x, boss.y-15, size, 10);
	}
	
}

function scrollBackground()
{
	image(canvasBack, 0, background1Y);
	image(canvasBack, 0, background2Y);
	if (background1Y == 1020)
		background1Y = -1680;
	if (background2Y == 1020)
		background2Y = -1680;
	background1Y+=5;
	background2Y+=5;
}

function message(text)
{
	noLoop();
	scoreElem.innerHTML="";
	print(canvasX + ":" + canvasY + "-" + canvasPosX + ":" + canvasPosY);
	div = createDiv();
	div.id("rect");
	div.position(canvasPosX+10, 200);
	button = createButton('Начать заново');
	button.position(canvasPosX+50, 400);
	button.mousePressed(function(){location.reload();});
	button.id("btn");
	p = createP(text);
	p.id("title");
	p.position(canvasPosX+50, 250);
}


function move()
{
	  if (keyIsDown(LEFT_ARROW)&&plr.x!=0) {
	    plr.x -= 5;
	  }

	  if (keyIsDown(RIGHT_ARROW)&&plr.x!=canvasX-plr.width) {
	    plr.x += 5;
	  }
}

function keyPressed()
{
	if (keyCode==32)
	{
		plr.shoot();
	}
}

function checkCollision(obj1X, obj1Y, obj1Width, obj1Height, obj2X, obj2Y, obj2Width, obj2Height)
{
	var XColl=false;
  	var YColl=false;

  	if ((obj1X + obj1Width >= obj2X) && (obj1X <= obj2X + obj2Width)) XColl = true;
  	if ((obj1Y + obj1Height >= obj2Y) && (obj1Y <= obj2Y + obj2Height)) YColl = true;

  	if (XColl&YColl)
  		return true;
  	return false;
}


 

