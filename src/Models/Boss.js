import {checkCollision} from "../helper"
import {Rocket} from "./Rocket"

export class Boss{
    constructor(canvas, canvasX, canvasY,
        boss0, boss1, boss2, boss3, boss4, boss5, rck)
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
		this.rocket = new Rocket(canvas, this.x, this.y, this.width, rck);
        this.boss0 = boss0;
        this.boss1 = boss1;
        this.boss2 = boss2;
        this.boss3 = boss3;
        this.boss4 = boss4;
        this.boss5 = boss5;
    }

	draw(plr)
	{
		if (this.hp <= 10)
			this.canvas.image(this.boss5,this.x,this.y);
		else if (this.hp>10 && this.hp <= 40)
            this.canvas.image(this.boss4,this.x,this.y);
		else if (this.hp>40 && this.hp <= 60)
            this.canvas.image(this.boss3,this.x,this.y);
		else if (this.hp>60 && this.hp <=80)
            this.canvas.image(this.boss2,this.x,this.y);
		else if (this.hp>80 && this.hp <=99)
            this.canvas.image(this.boss1,this.x,this.y);
		else if (this.hp == 100)
            this.canvas.image(this.boss0,this.x,this.y);
		this.rocket.draw(this.hp);
		this.rocket.move(plr, this, this.canvasY);
	}

	updateCoords(displayFunc)
	{
		if (this.y > this.canvasY)
			displayFunc("The boss has ran out. You won!");

		if (this.hp<=10)
		{
			this.y +=25;
			return;
		}
		this.y += 0.05;
		if (this.isMovingRight)
		{
			if (this.x <=300){
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

	bulletsShip(bullets, displayFunc)
	{
		for (let i = 0; i < bullets.length; i++)
		{
			if (checkCollision(this.x, this.y+this.height,
				this.width, 1,
				bullets[i].x, bullets[i].y,
				this.width, this.height))
			{
				bullets[i].y = -100;
				bullets[i].x = -100;
				this.hp--;
				if (this.hp <= 0)
				{
					displayFunc("You won!");
				}
			}
		}
	}

	checkActorCollision(plr, displayFunc)
	{
		if (checkCollision(this.x, this.y+this.height, 
			this.width, 1,
			plr.x, plr.y,
			plr.width, plr.height))
			{
				plr.hp = 0;
				if (this.hp <= 0)
				{
					displayFunc("You've lost!");
				}
			}
	}
}