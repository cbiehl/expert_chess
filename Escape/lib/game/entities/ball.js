ig.module(
	'game.entities.ball'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBall = ig.Entity.extend({
	
	size: {x:24, y:24},
	collides: ig.Entity.COLLIDES.ACTIVE,
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.A,
	collision:false,
	
	animSheet: new ig.AnimationSheet( 'media/hit.png', 24, 24 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
	},
	
	handleMovementTrace: function(res){
		if (res.collision.x || res.collision.y){
			this.collision = true;
		}
		this.parent(res);
	},
	
	update: function(){
		if(this.collision){
			this.collision=false;
			this.kill();
		}
		this.parent();
	},
	
	check: function(other){
		other.kill();
		this.kill();
		alert('You are dead');
	}

});

});