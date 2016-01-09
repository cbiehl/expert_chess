ig.module(
	'game.entities.won'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityWon = ig.Entity.extend({
	
	size: {x:140, y:50},
	animSheet: new ig.AnimationSheet( 'media/won.png', 140, 50 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		if(Math.random()>0.5){
			this.addAnim( 'idle', 1, [0] );
			console.log("projektil");
		}
		else{
			this.addAnim( 'idle', 1, [0] );
			console.log("jetpack");
		}
	},
	
//	handleMovementTrace: function(res){
//		if (res.collision.x || res.collision.y){
//			this.collision = true;
//		}
//		this.parent(res);
//	},
	
	update: function(){
		if(this.pos.y>=160){
			this.kill();
		}
//		if(this.collision){
//			this.collision=false;
//			this.kill();
//		}
		this.parent();
	}
});
});