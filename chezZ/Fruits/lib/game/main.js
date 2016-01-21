ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
//	'game.entities.rocket',
	'game.levels.escapeLvl',
	'game.entities.ball',
	'game.entities.countdown',
	'game.entities.black'
)
.defines(function(){
	
	MyTitle = ig.Game.extend({
		clearColor: "#d0f4f7",
		gravity: 400,

		// The title image
//		title: new ig.Image( 'media/title.png' ),
//		background: new ig.Image('media/background.png'),
		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),

		init: function() {
			// Bind keys
			ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
			ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
			ig.input.bind( ig.KEY.UP_ARROW, 'up' );
			ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
			ig.input.bind( ig.KEY.MOUSE1, 'Mouse1')

			// We want the font's chars to slightly touch each other,
			// so set the letter spacing to -2px.
	//		this.font.letterSpacing = -3;

		},

		update: function() {
			// Check for buttons; start the game if pressed
			if( ig.input.pressed('left') || ig.input.pressed('right')|| ig.input.pressed('up')|| ig.input.pressed('down') || ig.input.pressed('Mouse1') ) {
				ig.system.setGame( MyGame );
				return;
			}
			
			this.parent();
		},

		draw: function() {
			this.parent();

			var cx = ig.system.width/2;
			//this.title.draw( cx - this.title.width/2, 60 );
			//this.background.draw(cx - this.background.width/2, 300);
			var startText = 'Click to start the Game';
			var howtoplayText = 'Shoot the Fruits by clicking them!'
			
			this.font.draw( startText, 120, 80, ig.Font.ALIGN.CENTER);
			this.font.draw( howtoplayText, 120, 60, ig.Font.ALIGN.CENTER);

		}
		
	});	

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	time2spawn:0,
	sound: new ig.Sound( 'media/circus.*'),
	winsound: new ig.Sound( 'media/youwin.*' ), 
	lostsound: new ig.Sound( 'media/lost.*' ),
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.CLICK, 'mouse1')
		ig.game.spawnEntity('EntityCountdown',20,20);
		this.loadLevel(LevelEscapeLvl);
		ig.game.spawnEntity('EntityBlack',0,152);
	//	ig.game.spawnEntity('EntityBlack',2,154);

	//	this.sound.play(); 
	},
	
	
	youWon: function(){
		this.sound.stop();
		this.winsound.play();
		console.log("You won");
		this.stopGame();
		//clemens
		//this.spawnOverlay();
		
		if(Math.random()>0.5){

			$('#ModalOutroJetpack').modal('show');
			
			window.setTimeout(function(){ 
				$('#ModalOutroJetpack').modal('hide');
				window.top.postMessage("DELETEIFRAMEWONJETPACK", '*');
				
	       	}, 4000);
			
		}else{
			$('#ModalOutroMissile').modal('show');
			
			window.setTimeout(function(){ 
				$('#ModalOutroMissile').modal('hide');
				window.top.postMessage("DELETEIFRAMEWONMISSILE", '*');
				
	       	}, 4000);
		}
		
	},
	
	youLost: function(){
		this.sound.stop();
		this.lostsound.play();
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
			this.time2spawn = 30;
			var newObstacle = ig.game.spawnEntity('EntityBall', Math.random()*200+10,0);
			newObstacle.vel.y=40;
			
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
ig.main( '#canvas', MyTitle, 60, 240, 160, 3 );

});
