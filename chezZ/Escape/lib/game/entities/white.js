ig.module(
	'game.entities.white'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityWhite = ig.Entity.extend({
	
	size: {x:8, y:8},
	collides: ig.Entity.COLLIDES.NEVER,
	checkAgainst: ig.Entity.TYPE.NONE,
	type: ig.Entity.TYPE.NONE,
	animSheet: new ig.AnimationSheet( 'media/white.png', 8, 8 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
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