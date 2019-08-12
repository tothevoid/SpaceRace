import {Player} from './Models/Player';
import {EnemyPlane} from "./Models/EnemyPlane"
import {Boss} from "./Models/Boss"

import p5 from "p5";
import "p5/lib/addons/p5.dom" 

//width and height
//TODO: resize and min width/support
const canvasY = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

const screenWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

const minCanvasWidth = 500;
const canvasX = (screenWidth < minCanvasWidth) ?
	screenWidth : minCanvasWidth;

//point of canvas
let canvasPosX = (screenWidth > canvasX) ? 
	(screenWidth - canvasX) / 2: screenWidth; 
let canvasPosY = 0;

const move = (canvas: any, plr: Player) =>
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
	let ships: EnemyPlane[] = [];
	let plr: Player;
	let bossAssets = [];
	let enemyAssets = [];
	let boss, rck;
	let enemy0, enemy1, enemy2;

	let hp, canvasBack, scoreElem;

	//background y for scrolling
	let background1Y = -330;
	let background2Y = -1680;
	
	let shipsSpawned = 0;
	let timer;

	const createEnemyPlane = () => {
		let elm = new EnemyPlane(sk, canvasX, enemyAssets);
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
		cnv.position(canvasPosX, canvasPosY);
		
		scoreElem = sk.createDiv('Score: 00000');
		scoreElem.position(canvasPosX+20, 20);
		scoreElem.id = 'score';
		scoreElem.style('color', 'white');

		timer = setInterval(()=>
			createEnemyPlane(), 2000);

		const loadAssets = (name: string, quantity: number) => 
			Array.apply(null, new Array(quantity))
				.map((_: number,index: number)=>
					sk.loadImage(`${name}${index}.png`));	

		document.addEventListener('visibilitychange', function(){
			if (active && timer)
			{
				clearInterval(timer);
				active = false;
			}
			else
			{
				timer = setInterval(()=>
					createEnemyPlane(), 2000);
			}
		});

		canvasBack = sk.loadImage('./assets/additional/canvas.jpg');
		hp = sk.loadImage('./assets/additional/hp.png');

		bossAssets = loadAssets("./assets/boss/boss", 6);
		enemyAssets = loadAssets("./assets/enemy/enemy", 3);
		
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
		ships = ships.filter((ship: EnemyPlane) => 
			!(ship.deathVisibilityFrames <= 0 && ship.hp <= 0));
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

		const onDead = () => {
			plr.score += 250;
			scoreElem.html("Счёт: "+plr.score);	
		}

		ships.forEach((enemy: EnemyPlane) => {
			enemy.draw();
			enemy.updateCoords();
			plr.bullets = enemy.
				bulletsCollide(plr.bullets, onDead);
		});

		plr.draw(); 
		
		if (boss)
		{
			boss.draw(plr);
			boss.updateCoords(canvasX, displayMessage);
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