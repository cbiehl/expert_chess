ig.module(
	'game.entities.rocket'
)
.requires(
	'impact.entity',
	'game.entities.ball'
)
.defines(function(){

EntityRocket = ig.Entity.extend({
	
	size: {x:101, y:175},
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.B,
	score: 0,
	isAlive: true,
	escape:false,
	
	animSheet: new ig.AnimationSheet( 'media/car_new_small.png', 101,175 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		ig.game.rocket = this;

		this.maxVel.x = 400;
		this.maxVel.y = 400;
		this.zIndex = 100;
	},
	
	update: function(){
		if (ig.input.state('right')){
			this.vel.x=400;
		} else
		if (ig.input.state('left')){
			this.vel.x=-400;
		} else {
			this.vel.x=0;
		}
		
		if(this.pos.y<-350)
			ig.game.youWon();
		this.parent();
	},
//	draw:function(){
//		ig.game.background.draw(0,0);
//		this.parent();
//	},
	addScore: function(n){
		this.score+=n;
	},
	
	setLiveStatus: function(bool){
		this.isAlive = bool;
	},
	
	escapeFct: function(){
		ig.input.unbindAll();
		this.escape = true;
		ig.game.cntDown.pause();
		this.vel.y=-300;
	}
	

});

});