import {Bullet} from './Bullet'
import {checkCollision} from "../helper"

export class Player{

	bullets: Bullet[] = [];
	x: number;
	y: number;
	width: number;
	height: number;
	hp: number;
	hpX: number[];
	score: number;

	constructor(private canvas: any,
		canvasX: number,
		canvasY: number, 
		private img: any,
		private img1: any,
		private img2: any,
		private img3: any)
	{
		this.x = canvasX/2;
		this.y = canvasY-100;
		this.width = 60;
		this.height = 80;
		this.hp = 3;
		this.hpX = [canvasX - 70, canvasX - 50, canvasX - 30];
        this.score = 0;
		this.bullets = [];
	}

	enemyCollideCheck(ships)
	{
		if (ships.length==0)
			return;

		for (let i = 0; i < ships.length; i++) {
			if (ships[i].hp<=0)
				continue;
			
			if (checkCollision(ships[i].x, ships[i].y, ships[i].width, ships[i].height, this.x, this.y, this.width, this.height))
	  		{
	  			ships[i].hp = 0;
		 		this.hp--;
		 		this.score-=100;
	  		}
		}
	}

	draw()
	{
		switch (this.hp)
		{
			case 3:
				this.canvas.image(this.img, this.x, this.y);
				break;
			case 2:
				this.canvas.image(this.img1, this.x, this.y);
				break;
			case 1: 
				this.canvas.image(this.img2, this.x, this.y);
				break;
			case 0: 
				this.canvas.image(this.img3, this.x, this.y);
				break;
		}
		
	}

	shoot()
	{
		this.bullets.push(
			new Bullet(this.canvas, this.x + 5, this.y -4));
		this.bullets.push(
			new Bullet(this.canvas, this.x + this.width - 7, this.y -4));
	}
}