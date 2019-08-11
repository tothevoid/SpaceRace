import {checkCollision} from "../helper"

export class EnemyPlane{
	
	constructor(canvas, canvasX, enemy0, enemy1, enemy2)
	{
		this.height = 123;
		this.width = 149;
		this.x = canvas.random(0, canvasX - this.width);
		this.y = 20;
		this.hp = 8;
        this.toDraw = 30;
        this.canvas = canvas;
        this.enemy0 = enemy0;
        this.enemy1 = enemy1;
        this.enemy2 = enemy2;
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
		if (this.hp>=1 && this.hp<=4 )
			this.canvas.image(this.enemy1, this.x, this.y);
		if (this.hp>=5 && this.hp<=8 )
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
