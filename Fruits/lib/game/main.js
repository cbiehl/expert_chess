ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
//	'game.entities.rocket',
	'game.levels.escapeLvl',
	'game.entities.ball',
	'game.entities.countdown'
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
		ig.input.bind(ig.KEY.CLICK, 'mouse1')
		
		ig.game.spawnEntity('EntityCountdown',20,20);
		this.loadLevel(LevelEscapeLvl);
		
	},
	
	
	youWon: function(){
		console.log("You won");
		this.stopGame();
		//clemens
		//this.spawnOverlay();
		
		var rand = Math.random();
		
		if(rand > 0.66){
			
			$('#ModalOutroJetpack').modal('show');
			
			window.setTimeout(function(){ 
				$('#ModalOutroJetpack').modal('hide');
				window.top.postMessage("DELETEIFRAMEWONJETPACK", '*');
				
	       	}, 4000);
			
		}else if(0.33 < rand < 0.66){
			
			$('#ModalOutroMissile').modal('show');
			
			window.setTimeout(function(){ 
				$('#ModalOutroMissile').modal('hide');
				window.top.postMessage("DELETEIFRAMEWONMISSILE", '*');
				
	       	}, 4000);
			
		}else{
			
			$('#ModalOutro2x').modal('show');
			
			window.setTimeout(function(){ 
				$('#ModalOutro2x').modal('hide');
				window.top.postMessage("DELETEIFRAMEWON2X", '*');
				
	       	}, 4000);
		
	},
	
	youLost: function(){
		console.log('You are dead');
		console.log('You lost');
		ig.game.stopGame();
		
		$('#ModalOutroLost').modal('show');
		
		window.setTimeout(function(){ 
			$('#ModalOutroLost').modal('hide');
			window.top.postMessage("DELETEIFRAMELOST", '*'); 
		}, 4000);
	},
	
	stopGame: function(){
		ig.system.stopRunLoop();
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		this.time2spawn = this.time2spawn-1;
		if(this.time2spawn<0){
			this.time2spawn = 80;
			var newObstacle = ig.game.spawnEntity('EntityBall', Math.random()*200+10,0);
			newObstacle.vel.y=70;
			
		}
},
		// Add your own, additional update code here
	
	

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
	//	this.font.draw( 'Shoot the fruits by clicking them!', x, y, ig.Font.ALIGN.CENTER );
		x = 10;
		y=0;
//		this.font.draw( 'x ' + this.rocket.score, x, y+10 )
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 240, 160, 3 );

});
