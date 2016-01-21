ig.module(
    'game.entities.countdown'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityCountdown = ig.Entity.extend({
    
    size: {x:16, y:16},
    collides: ig.Entity.COLLIDES.NONE,
    stop:false,
    
    animSheet: new ig.AnimationSheet( 'media/countdown4.png', 48, 48 ),
    
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim( '10', 1, [10] );
        this.addAnim( '9', 1, [9] );
        this.addAnim( '8', 1, [8] );
        this.addAnim( '7', 1, [7] );
        this.addAnim( '6', 1, [6] );
        this.addAnim( '5', 1, [5] );
        this.addAnim( '4', 1, [4] );
        this.addAnim( '3', 1, [3] );
        this.addAnim( '2', 1, [2] );
        this.addAnim( '1', 1, [1] );
        this.addAnim( '0', 1, [0] );
        this.countdown = new ig.Timer(15);
        ig.game.cntDown = this.countdown;
    },
    
    update: function() {
    	if(!this.stop)
    		this.currentAnim = this.anims[Math.ceil(Math.abs(this.countdown.delta()))];
	    if (this.countdown.delta()>0 && !this.stop){
	      	this.currentAnim = this.anims[0];
	       	this.stop = true;
	       	ig.game.rocket.escapeFct();
	    }
	        	
    	if(this.countdown.delta()>-2)
    		ig.game.spawn = false;
    	
        this.parent();
        
    }
});

});