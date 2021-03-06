ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'plugins.touch-button',
	'plugins.gamepad',
	'plugins.impact-splash-loader',
	
	'game.levels.escapeLvl',
	'game.entities.ball',
	'game.entities.white',
	'game.entities.countdown',
	'game.entities.background'
)
.defines(function(){

	MyTitle = ig.Game.extend({
		clearColor: "#d0f4f7",
		gravity: 800,

		// The title image
		title: new ig.Image( 'media/title.png' ),
		background: new ig.Image('media/background.png'),
		// Load a font
		font: new ig.Font( 'media/fredoka-one.font.png' ),

		init: function() {
			// Bind keys
			ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
			ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
			ig.input.bind( ig.KEY.UP_ARROW, 'up' );
			ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );

			ig.input.bind( ig.GAMEPAD.PAD_LEFT, 'left' );
			ig.input.bind( ig.GAMEPAD.PAD_RIGHT, 'right' );
			// We want the font's chars to slightly touch each other,
			// so set the letter spacing to -2px.
			this.font.letterSpacing = -2;
			
			if( window.myTouchButtons ) {
				window.myTouchButtons.align(); 
			}

		},

		update: function() {
			// Check for buttons; start the game if pressed
			if( ig.input.pressed('left') || ig.input.pressed('right')|| ig.input.pressed('up')|| ig.input.pressed('down') ) {
				ig.system.setGame( MyGame );
				return;
			}
			
			this.parent();
		},

		draw: function() {
			this.parent();

			var cx = ig.system.width/2;
			this.title.draw( cx - this.title.width/2, 60 );
			this.background.draw(cx - this.background.width/2, 300);
			var startText = 'Press an arrow key to play!';
			
			this.font.draw( startText, cx, 420, ig.Font.ALIGN.CENTER);

			if( window.myTouchButtons ) {
				window.myTouchButtons.draw(); 
			}
			
		}
		
	});	
	
MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	clearColor: 'grey',
	time2spawn:0,
	time2Stripes:0,
	time2street:0,
	spawn:true,
//	start:true,
	twoObstacles:false,
	speed: 300,
//	backgroundImage:new ig.Image('media/black_2.png'),
//	background,
	sBG: new ig.Sound( 'media/sounds/background.*' ),
	sWin: new ig.Sound( 'media/sounds/youwin.*' ),
	
	init: function() {
		
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		
		ig.input.bind( ig.GAMEPAD.PAD_LEFT, 'left' );
		ig.input.bind( ig.GAMEPAD.PAD_RIGHT, 'right' );
		
		this.loadLevel(LevelEscapeLvl);

		ig.game.spawnEntity('EntityBackground',0,0);
		
		ig.game.spawnEntity('EntityCountdown',20,20);

		for(var k =0; k<=900; k+=300){
			
			var newStripe = ig.game.spawnEntity('EntityWhite', 360,-100+k);
			newStripe.zIndex = -10;
			newStripe.vel.y=this.speed;
			
			var newStripe = ig.game.spawnEntity('EntityWhite', 720,-100+k);
			newStripe.zIndex = -10;
			newStripe.vel.y=this.speed;
			
//			for (var i = 0; i<=200; i+=40){
//				var newStripe = ig.game.spawnEntity('EntityWhite', 360,-100+k+i);
//				newStripe.zIndex = -10;
//				newStripe.vel.y=this.speed;
//				
//				var newStripe = ig.game.spawnEntity('EntityWhite', 720,-100+k+i);
//				newStripe.zIndex = -10;
//				newStripe.vel.y=this.speed;
//			}
		}
		
		ig.game.bgSound = this.sBG;
		ig.game.bgSound.play();
		
		if( window.myTouchButtons ) {
			window.myTouchButtons.align(); 
		}
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
//		if(this.start){
//			ig.system.stopRunLoop();
//			
//			$('#ModalIntro').modal('show');
//			
//			setTimeout(function(){ 
//				$('#ModalIntro').modal('hide');
//				ig.system.startRunLoop();
//			}, 5000);
//			
//			this.start = false;
//		}
		
		this.time2spawn = this.time2spawn-1;
		if(this.time2spawn<0 && this.rocket.isAlive && this.spawn){
			this.time2spawn = 48;
			var xPosition = Math.random()*900+8;
			var newObstacle = ig.game.spawnEntity('EntityBall', xPosition,-20);
			newObstacle.zIndex = 0;
			newObstacle.vel.y=this.speed;
			
			this.twoObstacles = !this.twoObstacles;
			if(this.twoObstacles){
				var difference = Math.random()*300+150;
				if(xPosition<500){
					var newObstacle = ig.game.spawnEntity('EntityBall', xPosition+difference,-30);
					newObstacle.zIndex = 0;
					newObstacle.vel.y=this.speed;
				}	
				else{
					var newObstacle = ig.game.spawnEntity('EntityBall', xPosition-difference,-30);
					newObstacle.zIndex = 0;
					newObstacle.vel.y=this.speed;
				}
			}
		}
		// Add your own, additional update code here
		
		this.time2Stripes = this.time2Stripes-1;
		if(this.time2Stripes<0){
			this.time2Stripes = 60;
			var newStripe = ig.game.spawnEntity('EntityWhite', 360,-400);
			newStripe.zIndex = -10;
			newStripe.vel.y=this.speed;	
			
			var newStripe = ig.game.spawnEntity('EntityWhite', 720,-400);
			newStripe.zIndex = -10;
			newStripe.vel.y=this.speed;
			
//			for (var i = 0; i<=200; i+=40){
//				var newStripe = ig.game.spawnEntity('EntityWhite', 360,-400+i);
//				newStripe.zIndex = -10;
//				newStripe.vel.y=this.speed;
//				
//				var newStripe = ig.game.spawnEntity('EntityWhite', 720,-400+i);
//				newStripe.zIndex = -10;
//				newStripe.vel.y=this.speed;
//				
//			}
		}
		
		ig.game.sortEntitiesDeferred();
	},
	

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
//		this.font.draw( 'Avoid a collision!', x, y, ig.Font.ALIGN.CENTER );
//		x = 10;
//		y=0;
//		this.font.draw( 'x ' + this.rocket.score, x, y+10 )
		
		if( window.myTouchButtons ) {
			window.myTouchButtons.draw(); 
		}
	},
	
	youWon: function(){
		ig.game.bgSound.stop();
		this.sWin.play();
		console.log("You won");
		this.stopGame();
		
		//clemens
		var rand = Math.random();
		
		var ranNum = Math.random();
		if(ranNum<=0.4){

			$('#ModalOutroJetpack').modal('show');
			
			window.setTimeout(function(){ 
				$('#ModalOutroJetpack').modal('hide');
				window.top.postMessage("DELETEIFRAMEWONJETPACK", '*');
				
	       	}, 4000);
			
		}else if(ranNum<=0.8){
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
		}
		
	},
	
	spawnOverlay: function(){
		ig.game.spawnEntity('EntityWon',50,30);
	},
	
	youLost: function(){
		console.log('You are dead');
		console.log('You lost');
		ig.game.cntDown.pause();
		ig.game.stopGame();
		// clemens
		
		$('#ModalOutroLost').modal('show');
		
		window.setTimeout(function(){ 
			$('#ModalOutroLost').modal('hide');
			window.top.postMessage("DELETEIFRAMELOST", '*'); 
		}, 4000);
	},
	
	stopGame: function(){
		ig.system.stopRunLoop();
	}
});

// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
	ig.main( '#canvas', MyTitle, 60, 1080, 800, 1 );

if( ig.ua.mobile ) {
	// Use the TouchButton Plugin to create a TouchButtonCollection that we
	// can draw in our game classes.
	
	// Touch buttons are anchored to either the left or right and top or bottom
	// screen edge.
	var buttonImage = new ig.Image( 'media/touch-buttons.png' );
	myTouchButtons = new ig.TouchButtonCollection([
		new ig.TouchButton( 'left', {left: 330, bottom: 0}, 128, 128, buttonImage, 0 ),
		new ig.TouchButton( 'right', {left: 620, bottom: 0}, 128, 128, buttonImage, 1 ),
	]);
}

});

