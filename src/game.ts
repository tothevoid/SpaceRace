import {Player} from './Models/Player';
import {EnemyPlane} from "./Models/EnemyPlane"
import {Boss} from "./Models/Boss"

import p5 from "p5";
import "p5/lib/addons/p5.dom" 

//width and height
//TODO: resize and min width/support
const canvasX = 500;
const canvasY = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

//point of canvas
let canvasPosX;
let canvasPosY;

const move = (canvas, plr) =>
{
	if (canvas.keyIsDown(canvas.LEFT_ARROW) && 
		plr.x!=0) {
		plr.x -= 5;
	}

	else if (canvas.keyIsDown(canvas.RIGHT_ARROW) && 
		plr.x != canvasX-plr.width) {
		plr.x += 5;
	}
}

const mainFunc = (sk) => {
	let active = true;
	let ships = [];
	let plr;
	let bossAssets = [];
	// let boss0, boss1, boss2, boss3, boss4, boss5, rck;
	let boss, rck;
	let enemy0, enemy1, enemy2;

	let hp, canvasBack, scoreElem;

	//background y for scrolling
	let background1Y = -330;
	let background2Y = -1680;
	
	let shipsSpawned = 0;
	let timer;

	const createEnemyPlane = (canvas, enemy0, enemy1, enemy2) => {
		let elm = new EnemyPlane(canvas, canvasX, enemy0, enemy1, enemy2);
		shipsSpawned+=1;
		ships.push(elm);
	}

	const scrollBackground = () =>
	{	
		sk.image(canvasBack, 0, background1Y);
		sk.image(canvasBack, 0, background2Y);
		if (background1Y == 1020)
			background1Y = -1680;
		if (background2Y == 1020)
			background2Y = -1680;
		background1Y+=5;
		background2Y+=5;
	}

	const displayMessage = (text) =>
	{
		sk.noLoop();
		scoreElem.innerHTML = "";
		let div = sk.createDiv();
		div.id("rect");
		const size = (canvasY-350)/2;
		div.position(canvasPosX+10, size);
		let button = sk.createButton('Try again');
		button.position(canvasPosX+50, size+200);
		button.mousePressed(()=>location.reload());
		button.id("btn");
		let p = sk.createP(text);
		p.id("title");
		p.position(canvasPosX+50, size+50);
	}

	sk.setup = () => {
		var cnv = sk.createCanvas(canvasX,canvasY);
		canvasPosX = 600;
		canvasPosY = 0;
		cnv.position(canvasPosX, canvasPosY);
		
		scoreElem = sk.createDiv('Score: 00000');
		scoreElem.position(canvasPosX+20, 20);
		scoreElem.id = 'score';
		scoreElem.style('color', 'white');

		enemy0 = sk.loadImage('./assets/enemy/enemy0.png');
		enemy1 = sk.loadImage('./assets/enemy/enemy1.png');
		enemy2 = sk.loadImage('./assets/enemy/enemy2.png');

		timer = setInterval(()=>
			createEnemyPlane(sk, enemy0, enemy1, enemy2), 2000);

		const loadAssets = (name: string, quantity: number) => {
			let output = [];
			//TODO: Fix
			[0,1,2,3,4,5].forEach((_,index)=>{
				output.push(sk.loadImage(`${name}${index}.png`));
			})
			return output;
		}

		document.addEventListener('visibilitychange', function(){
			if (active && timer)
			{
				clearInterval(timer);
				active = false;
			}
			else
			{
				timer = setInterval(()=>
					createEnemyPlane(sk, enemy0, enemy1, enemy2), 2000);
			}
		});

		canvasBack = sk.loadImage('./assets/additional/canvas.jpg');
		hp = sk.loadImage('./assets/additional/hp.png');

		bossAssets = loadAssets("./assets/boss/boss", 6);
		// boss0 = sk.loadImage('./assets/boss/boss0.png');
		// boss1 = sk.loadImage('./assets/boss/boss1.png');
		// boss2 = sk.loadImage('./assets/boss/boss2.png');
		// boss3 = sk.loadImage('./assets/boss/boss3.png');
		// boss4 = sk.loadImage('./assets/boss/boss4.png');
		// boss5 = sk.loadImage('./assets/boss/boss5.png');

		rck = sk.loadImage('./assets/additional/rocket.png');

		const img = sk.loadImage('./assets/character/mainActor.png');
		const img1 = sk.loadImage('./assets/character/mainActor1.png');
		const img2 = sk.loadImage('./assets/character/mainActor2.png');
		const img3 = sk.loadImage('./assets/character/mainActor3.png');
		plr = new Player(sk, canvasX, canvasY, img, img1, img2, img3);
		sk.frameRate(60);
	}
	sk.draw = () => {
		if (plr.hp == 0)
			displayMessage("You've lost");
		ships = ships.filter(ship => ship.y >= 0 && ship.y <= canvasY+50);
		plr.bullets = plr.bullets.filter(bullet => bullet.y >= 0);
		scrollBackground();
		
		for (var i = 0; i < plr.hp; i++) {
			sk.image(hp, plr.hpX[i], 20);
		}

		move(sk, plr);
		if (!boss && shipsSpawned === 5)
		{
			boss = new Boss(sk, canvasX, canvasY, bossAssets, rck);
			clearInterval(timer);
		}
		plr.enemyCollideCheck(ships);
		plr.bullets.forEach(function(element) {
			element.draw();
			element.move();
		});

		const onDead = ()=> {
			plr.score += 250;
			scoreElem.html("Счёт: "+plr.score);	
		}

		ships.forEach(function(element) {
			element.draw(onDead);
			element.updateCoords();
			element.bulletsCollide(plr.bullets, onDead);
		});

		plr.draw(); 
		
		if (boss!=null)
		{
			boss.draw(plr);
			boss.updateCoords(displayMessage);
			plr.bullets = boss
				.checkBulletsCollision(plr.bullets, displayMessage);
			boss.checkActorCollision(plr, displayMessage);
		}
	}
	sk.keyPressed = () => {
		if (sk.keyCode==32)
		{
			plr.shoot();
		}
	}
}

new p5(mainFunc);