export class Bullet
{
	constructor(canvas, x, y)
	{
		this.x = x;
        this.y = y;
        this.canvas = canvas;
	}

	move()
	{
		this.y -= 10;
	}

	draw()
	{
 		this.canvas.stroke('#ffd700');
 		this.canvas.rect(this.x, this.y, 1, 10);
	}
}