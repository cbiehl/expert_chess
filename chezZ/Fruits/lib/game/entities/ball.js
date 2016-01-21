ig.module(
	'game.entities.ball'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBall = ig.Entity.extend({
	
	size: {x:24, y:24},
	collides: ig.Entity.COLLIDES.NEVER,
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collision:false,
	shootsound: new ig.Sound( 'media/shoot.*' ),

	
	animSheet: new ig.AnimationSheet( 'media/car.png', 24, 24 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		var i = Math.floor(Math.random()*3);
		this.addAnim( 'idle', 1, [i] );
		ig.input.bind( ig.KEY.MOUSE1, 'leftButton' );
	},
	
	handleMovementTrace: function(res){
		if (res.collision.x || res.collision.y){
			this.collision = true;
		}
		this.parent(res);
	},
	

	 
	inFocus: function() {
	    return (
	       (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
	       ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
	       (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
	       ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
	    );
	 },
	
	update: function(){
		if(this.collision){
			ig.game.youLost();
			this.collision=false;
			
		}
		 if (ig.input.pressed('leftButton')) {
		        ig.log('clicked');
		        this.shootsound.play();
		   
		    }
		
		 if (ig.input.pressed('leftButton') && this.inFocus()) {
		        ig.log('clicked');
		        
		        this.kill();
		    }
		


		this.parent();
	},
	

});

});