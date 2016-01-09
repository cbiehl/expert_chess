ig.module(
	'game.entities.street'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityStreet = ig.Entity.extend({
	
	size: {x:240, y:160},
	
	animSheet: new ig.AnimationSheet( 'media/streetEnt.png', 240, 160 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
	},
	
	update: function(){
		
		if(this.pos.y>150){
			this.kill();
			console.log(this.pos.y);
		}
		this.parent();
	}
});
});