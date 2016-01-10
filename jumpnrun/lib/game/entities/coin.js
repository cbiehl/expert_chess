ig.module(
	'game.entities.coin'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityCoin = ig.Entity.extend({
	size: {x: 40, y: 40},
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet( 'media/coin.png', 40, 40 ),
	sfxCollect: new ig.Sound( 'media/sounds/coin.*' ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		//this.addAnim( 'idle', 0.1, [0,0,0,0,0,0,0,0,0,1,2] );
		this.addAnim( 'idle', 0.1, [0,1] );
	},
	
	
	update: function() {		
		// Do nothing in this update function; don't even call this.parent().
		// The coin just sits there, isn't affected by gravity and doesn't move.

		// We still have to update the animation, though. This is normally done
		// in the .parent() update:
		this.currentAnim.update();
	},
	
	
	check: function( other ) {
		// The instanceof should always be true, since the player is
		// the only entity with TYPE.A - and we only check against A.
		if( other instanceof EntityPlayer ) {
			other.giveCoins(1);
			this.sfxCollect.play();
			this.kill();
		}
	}
});

});