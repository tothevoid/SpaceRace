import { checkCollision } from "../helper"
import { Rocket } from "./Rocket"
import { Player } from "./Player"
import { Bullet } from "./Bullet";

export class Boss{
	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private hp: number;
	private isMovingRight: boolean;
	private rocket: Rocket;

	constructor(private canvas: any,
		public canvasX: number,
		public canvasY: number,
		public images: any[], rocketImage)
	{
		this.x = canvasX/2;
		this.y = 20;
        this.width = 168;
        this.canvasX = canvasX;
        this.canvasY = canvasY;
		this.height = 300;
		this.hp = 100 ;
        this.isMovingRight = false;
        this.canvas = canvas;
		this.rocket = new Rocket(canvas, this.x, this.y, 
			this.width, rocketImage);
		this.images = images;
    }

	draw(plr: Player)
	{
		let imageIndex = 0
		//TODO: optimize
		if (this.hp <= 10) imageIndex = 5;
		else if (this.hp>10 && this.hp <= 40) imageIndex = 4;
		else if (this.hp>40 && this.hp <= 60) imageIndex = 3;
		else if (this.hp>60 && this.hp <=80) imageIndex = 2;
		else if (this.hp>80 && this.hp <=99) imageIndex = 1;

		if (this.images && imageIndex >= 0 &&
			imageIndex + 1 <= this.images.length){
			this.canvas.image(this.images[imageIndex], this.x, this.y);
		}
		this.rocket.draw(this.hp);
		this.rocket.move(plr, this, this.canvasY);
		this.drawHpBar();
	}

	updateCoords(displayFunc: (text: string)=>void)
	{
		if (this.y > this.canvasY)
			displayFunc("The boss has ran out. You won!");

		if (this.hp <= 10)
		{
			this.y += 10;
			return;
		}
		this.y += 0.05;
		if (this.isMovingRight)
		{
			//TODO: canvas width
			if (this.x <= 300){
				this.x += 2;
			} else {
				this.isMovingRight = !this.isMovingRight;
			}
		} else {
			if (this.x >=2){
				this.x -= 2;
			} else{
				this.isMovingRight = !this.isMovingRight;
			}
		}		
	}

	checkBulletsCollision(bullets: Bullet[], 
		displayFunc: (text: string) => void): Bullet[]
	{
		let newBullets: Bullet[] = []
		for (let i = 0; i < bullets.length; i++)
		{
			if (checkCollision(this.x, this.y + this.height,
				this.width, 1,
				bullets[i].x, bullets[i].y,
				this.width, this.height))
			{
				this.hp--;
				if (this.hp <= 0)
				{
					displayFunc("You won!");
				}
			} else {
				newBullets.push(bullets[i]) 
			}
		}
		return newBullets;
	}

	checkActorCollision(player: Player, 
		displayFunc: (text: string) => void)
	{
		if (checkCollision(this.x, this.y + this.height, 
			this.width, 1,
			player.x, player.y,
			player.width, player.height))
			{
				player.hp = 0;
				if (this.hp <= 0)
				{
					displayFunc("You've lost!");
				}
			}
	}

	private drawHpBar(){
		this.canvas.noStroke();
		this.canvas.fill(65);
		const yPos = this.y - 15;
		this.canvas.rect(this.x, yPos, this.width, 10);
		const size = this.width / 100 * this.hp;
		this.canvas.fill('#ED2939');
		this.canvas.rect(this.x, yPos, size, 10);
	}
}