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
	shoot: 0,
	
	animSheet: new ig.AnimationSheet( 'media/EntityMonster.png', 160, 189 ),
	sfxDie: new ig.Sound( 'media/sounds/monster_die.*' ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'crawl', 0.2, [0,1] );
		this.addAnim( 'dead', 1, [2] );
		ig.game.monster = this;
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
		
		this.shoot += 1;
		
		if(this.shoot == 50 && ig.game.player.pos.x > 1300 ){
			var x = this.pos.x;
			var y = this.pos.y;
			
			ig.game.spawnEntity( EntityMonstershot, x, y, {flip:this.flip} );
			this.shoot = 0;
		}
		
		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;
		this.currentAnim.flip.x = !this.flip;
		
		if(this.shoot >= 50){
			this.shoot = 0;
		}
		
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