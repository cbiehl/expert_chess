ig.module(
	'game.entities.black'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBlack = ig.Entity.extend({
	
	size: {x:240, y:8},
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet( 'media/groundnew.png',240,8 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );

	},
	
	update: function(){

		this.parent();
	}
	

	

	

});

});