import { checkCollision } from "../helper"
import { Bullet } from "./Bullet";

export class EnemyPlane{
	height = 123;
	width = 149;
	x: number;
	y: number;
	hp: number;
	deathVisibilityFrames: number;

	constructor(private canvas: any,
		canvasX: number,
		private images: any[]){
		this.x = canvas.random(0, canvasX - this.width);
		this.y = -1 * this.width;
		this.hp = 8;
        this.deathVisibilityFrames = 60;
	}

	draw(){
		let imageIndex = 2;
		if (this.hp >= 5) imageIndex = 0;
		else if (this.hp >= 1) imageIndex = 1;
		else {
			this.deathVisibilityFrames --;
		}
		if (imageIndex >= 0 && this.images &&
			imageIndex + 1 <= this.images.length){
			this.canvas.image(this.images[imageIndex], this.x, this.y);
		}
		this.setNewCoordinates()
	}

	setNewCoordinates(){
		this.y += 8;
	}

	bulletsCollide(bullets: any[],
		updateScore: (delta: number) => void): Bullet[]{
		return (this.hp <= 0) ? bullets: 
		bullets.filter((bullet: Bullet) => {
			var result = true;
			if (checkCollision(bullet.x, bullet.y,
				1, 1,
				this.x, this.y + this.height - 10,
				this.width, 10)){
				this.hp--;
				if (this.hp === 0){
                    updateScore(250);
				}
				result = false;
			}
			return result;
		})
	}

	isShouldBeRemoved = () =>
		this.deathVisibilityFrames <= 0 && this.hp <= 0
	
}
