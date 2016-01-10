ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.rocket',
	'game.levels.escapeLvl',
	'game.entities.ball',
	'game.entities.white',
	'game.entities.street',
	'game.entities.countdown',
	'game.entities.won'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	clearColor: 'grey',
	time2spawn:0,
	time2Stripes:0,
	time2street:0,
	spawn:true,
	start:true,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		this.loadLevel(LevelEscapeLvl);
		
		ig.game.spawnEntity('EntityCountdown',20,20);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		if(this.start){
			ig.system.stopRunLoop();
			
			$('#ModalIntro').modal('show');
			
			setTimeout(function(){ 
				$('#ModalIntro').modal('hide');
				ig.system.startRunLoop();
			}, 5000);
			
			this.start = false;
		}
		
		this.time2spawn = this.time2spawn-1;
		if(this.time2spawn<0 && this.rocket.isAlive && this.spawn){
			this.time2spawn = 20;
			var newObstacle = ig.game.spawnEntity('EntityBall', Math.random()*200+8,0);
			newObstacle.zIndex = 0;
			newObstacle.vel.y=70;
		}
		// Add your own, additional update code here
		
		this.time2Stripes = this.time2Stripes-1;
		if(this.time2Stripes<0){
			this.time2Stripes = 40;
			for (var i = 0; i<=32; i+=8){
				var newStripe = ig.game.spawnEntity('EntityWhite', 80,-32+i);
				newStripe.zIndex = -10;
				newStripe.vel.y=70;
				
				var newStripe = ig.game.spawnEntity('EntityWhite', 160,-32+i);
				newStripe.zIndex = -10;
				newStripe.vel.y=70;
				
				var newStripe = ig.game.spawnEntity('EntityWhite', 240,-32+i);
				newStripe.zIndex = -10;
				newStripe.vel.y=70;
			}
		}
		
//		this.time2street = this.time2street-1;
//		if(this.time2street<0){
//			this.time2street = 100;
//			var newStreet = ig.game.spawnEntity('EntityStreet', 0,0);
//			newStreet.zIndex = -20;
//			newStreet.vel.y=70;
//		}
		ig.game.sortEntitiesDeferred();
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
	},
	
	youWon: function(){
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
ig.main( '#canvas', MyGame, 60, 240, 160, 3 );

});
