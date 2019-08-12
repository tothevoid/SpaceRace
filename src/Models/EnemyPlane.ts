import {checkCollision} from "../helper"

export class EnemyPlane{
	height = 123;
	width = 149;
	x: number;
	y: number;
	hp: number;
	toDraw: number;

	constructor(private canvas: any,
		private canvasX: number,
		private enemy0: any, 
		private enemy1: any,
		private enemy2: any)
	{
		this.x = canvas.random(0, canvasX - this.width);
		this.y = 20;
		this.hp = 8;
        this.toDraw = 30;
	}

	draw()
	{
		if (this.hp<=0)
		{
			this.canvas.image(this.enemy2, this.x, this.y);
			if (this.toDraw==0)
				this.y = -1000;
			else
				this.toDraw--;
		}
		if (this.hp >= 1 && this.hp <= 4)
			this.canvas.image(this.enemy1, this.x, this.y);
		if (this.hp >= 5 && this.hp <= 8)
			this.canvas.image(this.enemy0, this.x, this.y);
	}

	updateCoords()
	{
		this.y+=8;
	}

	bulletsCollide(bullets, onDead)
	{
		for (let i = 0; i < bullets.length; i++)
		{
			if (checkCollision(bullets[i].x, bullets[i].y, 1, 1, this.x, this.y+this.height-10, this.width, 10))
			{
				bullets[i] = -100;
				this.hp--;
				if (this.hp == 0)
				{
                    onDead();
				}
			}
		}	
	}
}
