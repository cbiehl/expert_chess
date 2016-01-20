ig.module(
	'game.entities.monstershot'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityMonstershot = ig.Entity.extend({

	_wmIgnore: true, // This entity will no be available in Weltmeister

	size: {x: 24, y: 24},
	offset: {x: 6, y: 6},
	maxVel: {x: 800, y: 400},
	
	// The fraction of force with which this entity bounces back in collisions
	bounciness: 0.8, 
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check Against A (player)
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/evilbanana.png', 36, 36 ),
	sfxSpawn: new ig.Sound( 'media/sounds/evilbanana.*' ),
	
	bounceCounter: 0,
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = 200;
		this.addAnim( 'idle', 1, [0] );
		
		this.sfxSpawn.play();
	},
	
	reset: function( x, y, settings ) {
		// This function is called when an instance of this class is resurrected
		// from the entity pool. (Pooling is enabled at the bottom of this file).
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = 200;
		this.sfxSpawn.play();
		
		// Remember, this a used entity, so we have to reset our bounceCounter
		// as well
		this.bounceCounter = 0;
	},

	update: function() {
		this.parent();

		this.currentAnim.angle += ig.system.tick * 10;
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		// Kill this shot if it bounced more than 3 times
		if( res.collision.x || res.collision.y || res.collision.slope ) {
			this.bounceCounter++;
			if( this.bounceCounter > 3 ) {
				this.kill();
			}
		}
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		other.receiveDamage( 1, this );
		this.kill();
	}	
});

ig.EntityPool.enableFor( EntityMonstershot );


});
