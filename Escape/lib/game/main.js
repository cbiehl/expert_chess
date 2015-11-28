ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.rocket',
	'game.levels.escapeLvl',
	'game.entities.ball'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	time2spawn:0,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		this.loadLevel(LevelEscapeLvl);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		this.time2spawn = this.time2spawn-1;
		if(this.time2spawn<0 && this.rocket.isAlive){
			this.time2spawn = 20;
			var newObstacle = ig.game.spawnEntity('EntityBall', Math.random()*200+10,0);
			newObstacle.vel.y=70;
		}
		// Add your own, additional update code here
	},
	

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'Avoid a collision!', x, y, ig.Font.ALIGN.CENTER );
		x = 10;
		y=0;
		this.font.draw( 'x ' + this.rocket.score, x, y+10 )
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 240, 160, 2 );

});
