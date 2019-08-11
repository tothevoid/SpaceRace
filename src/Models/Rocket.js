import {checkCollision} from "../helper"

export class Rocket{
 	constructor(canvas, x, y, width, image)
	{
		this.x = x + (width/2) + 10.5;
		this.y = y + 310;
        this.active = true;
		this.canvas = canvas;
		this.image = image;
	}

	move(plr, boss, canvasY)
	{
		if (checkCollision(this.x, this.y+87, 21, 1, plr.x, plr.y, plr.width, plr.height))
		{
			this.x = boss.x+(boss.width/2)-10.5;
			plr.hp--;
			this.y = boss.y+310;
		}

		if (this.y > canvasY && this.active)
		{
			this.x = boss.x+(boss.width/2)+10.5;
			this.y = boss.y+310;
			return;

		}
		this.y += 20;
	}

	draw(bossHp)
	{
		if (bossHp<=10)
		{
			this.active = false;
			this.y = 1000;
		}
		this.canvas.image(this.image,this.x,this.y);
	}
 } 