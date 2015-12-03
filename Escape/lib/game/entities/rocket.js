ig.module(
	'game.entities.rocket'
)
.requires(
	'impact.entity',
	'game.entities.ball'
)
.defines(function(){

EntityRocket = ig.Entity.extend({
	
	size: {x:24, y:32},
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.A,
	score: 0,
	isAlive: true,
	
	animSheet: new ig.AnimationSheet( 'media/car.png', 24, 32 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		ig.game.rocket = this;
	},
	
	update: function(){
		if (ig.input.state('right')){
			this.vel.x=100;
		} else
		if (ig.input.state('left')){
			this.vel.x=-100;
		} else {
			this.vel.x=0;
		}
			
		this.parent();
	},
	
	addScore: function(n){
		this.score+=n;
	},
	
	setLiveStatus: function(bool){
		this.isAlive = bool;
	}
	

});

});