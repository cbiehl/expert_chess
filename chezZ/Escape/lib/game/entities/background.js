ig.module(
	'game.entities.background'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBackground = ig.Entity.extend({
	
	size: {x:1080, y:800},
	checkAgainst: ig.Entity.TYPE.NONE,

	animSheet: new ig.AnimationSheet( 'media/black_2.png', 1080,800),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		this.zIndex = -20;
	},
	
	update: function(){
		this.parent();
	},
//	draw:function(){
//		ig.game.background.draw(0,0);
//		this.parent();
//	},

});

});