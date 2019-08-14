export class Bullet{
	constructor(private canvas: any, 
		public x: number,
		public y: number){}

	draw(){
 		this.canvas.stroke('#ffd700');
 		this.canvas.rect(this.x, this.y, 1, 10);
		this.setNewCoordinates();
	}

	setNewCoordinates(){
		this.y -= 10;
	}
}