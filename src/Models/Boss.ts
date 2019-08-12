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
		canvasX: number,
		public canvasY: number,
		public images: any[], rocketImage: any)
	{
		this.x = canvasX / 2;
		this.y = 20;
        this.width = 168;
		this.height = 300;
		this.hp = 100;
        this.isMovingRight = false;
		this.rocket = new Rocket(canvas, this.x, this.y, 
			this.width, rocketImage);
		this.images = images;
    }

	draw(player: Player)
	{
		let imageIndex = 0
	
		if (this.hp > 80) imageIndex = 1;
		else if (this.hp > 60) imageIndex = 2;
		else if (this.hp > 40) imageIndex = 3;
		else if (this.hp > 10) imageIndex = 4;
		else if (this.hp >= 0) imageIndex = 5;

 		if (this.images && imageIndex >= 0 &&
			imageIndex + 1 <= this.images.length){
			this.canvas.image(this.images[imageIndex], this.x, this.y);
		}
		this.rocket.draw(this.hp);
		this.rocket.move(player, this, this.canvasY);
		this.drawHpBar();
	}

	updateCoords(canvasWidth: number, displayFunc: (text: string)=>void)
	{
		if (this.y > this.canvasY)
			displayFunc("The boss has ran out. You won!");

		this.y += (this.hp <= 10) ? 10: 0.05;
		if (this.x + this.width >= canvasWidth || this.x <= 0){
			this.isMovingRight = !this.isMovingRight;
		}
		this.x += (this.isMovingRight) ? 2 : -2;
	}

	checkBulletsCollision(bullets: Bullet[], 
		displayFunc: (text: string) => void): Bullet[]
	{
		return bullets.filter((bullet: Bullet) => {
			let result = true;
			if (checkCollision(this.x, this.y + this.height,
				this.width, 1,
				bullet.x, bullet.y,
				this.width, this.height))
				{
					this.hp--;
					if (this.hp <= 0)
					{
						displayFunc("You won!");
					}
					result = false;
				}
				return result;
		});
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
				if (this.hp <= 0){
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