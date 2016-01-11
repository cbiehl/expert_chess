ig.module(
	'game.entities.monster'
)
.requires(
	'impact.entity',
	'game.entities.monstershot'
)
.defines(function(){
	
EntityMonster = ig.Entity.extend({
	size: {x: 160, y: 179},
	offset: {x: 0, y: 0},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	health: 3,
	
	
	speed: 40,
	flip: false,
	
	animSheet: new ig.AnimationSheet( 'media/EntityMonster.png', 160, 189 ),
	sfxDie: new ig.Sound( 'media/sounds/blob-die.*' ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'crawl', 0.2, [0,1] );
		this.addAnim( 'dead', 1, [2] );
	},
	
	
	update: function() {
		// Near an edge? return!
		if( !ig.game.collisionMap.getTile(
				this.pos.x + (this.flip ? +4 : this.size.x -4),
				this.pos.y + this.size.y+1
			)
		) {
			this.flip = !this.flip;
			
			var x = Math.random() * 100;
			var y = Math.random() * 100;
			
		}
		
//		setTimeout(function(){  //TODO: let monster shoot and add damage to player
//			ig.game.spawnEntity( EntityMonstershot, this.pos.x, this.pos.y, {flip:this.flip} );
//		}, 3000);
		
		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;
		this.currentAnim.flip.x = !this.flip;
		
		this.parent();
	},
	
	kill: function() {
		this.sfxDie.play();
		this.parent();
		
	},
	
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		// Collision with a wall? return!
		if( res.collision.x ) {
			this.flip = !this.flip;
			this.offset.x = this.flip ? 0 : 24;
		}
	},
	
	check: function( other ) {
		other.receiveDamage( 1, this );
	}
});

});