ig.module(
	'game.entities.rocket'
)
.requires(
	'impact.entity',
	'game.entities.ball'
)
.defines(function(){

EntityRocket = ig.Entity.extend({
	
	size: {x:32, y:32},
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.A,
	
	animSheet: new ig.AnimationSheet( 'media/myRocket.png', 32, 32 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
	},
	
	update: function(){
		if (ig.input.state('right')){
			this.vel.x=80;
		} else
		if (ig.input.state('left')){
			this.vel.x=-80;
		} else {
			this.vel.x=0;
		}
			
		this.parent();
	}
	

});

});