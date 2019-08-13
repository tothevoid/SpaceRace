import {checkCollision} from "../helper"
import { Player } from "./Player";
import { Boss } from "./Boss";

export class Rocket{

	constructor(private canvas: any, private x: number,
		private y: number, width: number, private image: any){
		this.respawnRocket(x, y, width);
		this.canvas = canvas;
		this.image = image;
	}

	move(player: Player, boss: Boss, canvasY: number){
		if (checkCollision(this.x, this.y + 87,
			21, 1,
			player.x, player.y,
			player.width, player.height)){
			player.hp--;
			this.respawnRocket(boss.x, boss.y, boss.width);
			return;
		}

		if (this.y > canvasY){
			this.respawnRocket(boss.x, boss.y, boss.width);
			return;
		}
		this.y += 20;
	}

	draw(){
		this.canvas.image(this.image, this.x, this.y);
	}
	
	private respawnRocket(bossX: number, bossY: number, bossWidth: number){
		this.x = bossX + (bossWidth / 2) + 10.5;
		this.y = bossY + 310;
	}
 }