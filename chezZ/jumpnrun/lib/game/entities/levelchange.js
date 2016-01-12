ig.module(
	'game.entities.levelchange'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityLevelchange = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 0, 255, 0.7)',
	
	size: {x: 32, y: 32},
	level: null,
	sfxWon: new ig.Sound( 'media/sounds/youwin.*' ),
	
	triggeredBy: function( entity, trigger ) {
		
		if(entity.coins == 9){
			this.sfxWon.play();
			ig.game.youWon("nope");
		}else{
			ig.game.youWon("europe");
		}
		
		/*
		if( this.level ) {
			var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b ) {
				return a.toUpperCase() + b;
			});
			
			ig.game.loadLevelDeferred( ig.global['Level'+levelName] );
		}
		*/
	},
	
	update: function(){}
});

});