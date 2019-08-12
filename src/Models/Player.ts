import {Bullet} from './Bullet'
import {checkCollision} from "../helper"
import { EnemyPlane } from './EnemyPlane';

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
		private images: any[])
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

	enemyCollideCheck(ships: EnemyPlane[], updateScore: (score: number) => void)
	{
		if (ships.length === 0) return;
		ships.forEach((ship: EnemyPlane) => {
			if (ship.hp <= 0) return;
			if (checkCollision(ship.x, ship.y,
				ship.width, ship.height,
				this.x, this.y,
				this.width, this.height))
	  		{
	  			ship.hp = 0;
		 		this.hp--;
				this.score -= 100;
				updateScore(this.score); 
	  		}
		})
	}

	draw()
	{
		const imageIndex = 3 - this.hp;
		if (imageIndex >= 0 && this.images &&
			imageIndex + 1 <= this.images.length){
			this.canvas.image(this.images[imageIndex], this.x, this.y);	
		}
	}

	shoot()
	{
		this.bullets.push(
			new Bullet(this.canvas, this.x + 5, this.y - 4));
		this.bullets.push(
			new Bullet(this.canvas, this.x + this.width - 7, this.y -4));
	}
}