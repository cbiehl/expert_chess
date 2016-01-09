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
	
	animSheet: new ig.AnimationSheet( 'media/hit_comp.png', 24, 24 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		var i = Math.floor(Math.random()*3);
		this.addAnim( 'idle', 1, [i] );
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
			if(ig.game.rocket.isAlive)
				ig.game.rocket.addScore(1);
		}
		this.parent();
	},
	
	check: function(other){
		other.setLiveStatus(false);
		other.kill();
		this.kill();
		console.log('You are dead');
	}

});

});