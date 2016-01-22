ig.module(
	'game.entities.ball'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBall = ig.Entity.extend({
	
	size: {x:121, y:160},
	collides: ig.Entity.COLLIDES.PASSIVE,
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collision:false,
	
	animSheet: new ig.AnimationSheet( 'media/hit_comp_new.png', 121, 160 ),
	sCrash: new ig.Sound( 'media/sounds/crash.*' ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		var i = Math.floor(Math.random()*2);
		this.addAnim( 'idle', 1, [i] );
		this.maxVel.x = 200;
		this.maxVel.y = 350;
	},
	
//	handleMovementTrace: function(res){
//		if (res.collision.x || res.collision.y){
//			this.collision = true;
//		}
//		this.parent(res);
//	},
	
	update: function(){
		if(this.pos.y>=850){
			this.kill();
			if(ig.game.rocket.isAlive)
				ig.game.rocket.addScore(1);
		}
//		if(this.collision){
//			this.collision=false;
//			this.kill();
//			if(ig.game.rocket.isAlive)
//				ig.game.rocket.addScore(1);
//		}
		this.parent();
	},
	
	check: function(other){
		if(this.pos.y<722){
			ig.game.bgSound.stop();
			this.sCrash.play();
			other.setLiveStatus(false);
			other.kill();
			this.kill();
			ig.game.youLost();
		}
	this.parent();
	}

});

});