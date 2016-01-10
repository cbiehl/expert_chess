ig.module( 'game.levels.grasslands' )
.requires( 'impact.image','game.entities.trigger','game.entities.coin','game.entities.hurt','game.entities.player','game.entities.levelchange','game.entities.monster' )
.defines(function(){
LevelGrasslands=/*JSON[*/{
	"entities": [
		{
			"type": "EntityTrigger",
			"x": 980,
			"y": 932,
			"settings": {
				"size": {
					"x": 216,
					"y": 48
				},
				"target": {
					"1": "hurt100"
				},
				"wait": 0
			}
		},
		{
			"type": "EntityCoin",
			"x": 2400,
			"y": 328
		},
		{
			"type": "EntityCoin",
			"x": 1092,
			"y": 696
		},
		{
			"type": "EntityCoin",
			"x": 1188,
			"y": 740
		},
		{
			"type": "EntityCoin",
			"x": 3164,
			"y": 188
		},
		{
			"type": "EntityCoin",
			"x": 996,
			"y": 724
		},
		{
			"type": "EntityCoin",
			"x": 2328,
			"y": 328
		},
		{
			"type": "EntityHurt",
			"x": 2396,
			"y": 1268,
			"settings": {
				"name": "hurt100",
				"damage": 100
			}
		},
		{
			"type": "EntityPlayer",
			"x": 89,
			"y": 822
		},
		{
			"type": "EntityCoin",
			"x": 2256,
			"y": 328
		},
		{
			"type": "EntityTrigger",
			"x": 3848,
			"y": 928,
			"settings": {
				"size": {
					"x": 560,
					"y": 124
				},
				"target": {
					"1": "hurt100"
				},
				"wait": 0
			}
		},
		{
			"type": "EntityCoin",
			"x": 2044,
			"y": 536
		},
		{
			"type": "EntityCoin",
			"x": 2472,
			"y": 328
		},
		{
			"type": "EntityTrigger",
			"x": 4144,
			"y": 660,
			"settings": {
				"size": {
					"x": 48,
					"y": 108
				},
				"target": {
					"1": "exit"
				}
			}
		},
		{
			"type": "EntityLevelchange",
			"x": 4000,
			"y": 700,
			"settings": {
				"name": "exit",
				"level": "snowhills"
			}
		},
		{
			"type": "EntityMonster",
			"x": 3088,
			"y": 376
		},
		{
			"type": "EntityTrigger",
			"x": 2244,
			"y": 876,
			"settings": {
				"trigger1": "hurt100",
				"trigger": {
					"1": "hurt100"
				},
				"target": {
					"1": "hurt100"
				}
			}
		},
		{
			"type": "EntityTrigger",
			"x": 2344,
			"y": 876,
			"settings": {
				"target": {
					"1": "hurt100"
				}
			}
		},
		{
			"type": "EntityTrigger",
			"x": 2312,
			"y": 876
		},
		{
			"type": "EntityTrigger",
			"x": 2280,
			"y": 876
		},
		{
			"type": "EntityTrigger",
			"x": 632,
			"y": 876,
			"settings": {
				"size": {
					"x": 208,
					"y": 32
				},
				"target": {
					"1": "hurt100"
				}
			}
		}
	],
	"layer": [
		{
			"name": "background",
			"width": 32,
			"height": 16,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/tiles-70.png",
			"repeat": true,
			"preRender": false,
			"distance": "2",
			"tilesize": 70,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,41,42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,14,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,13,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,41,42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,28],
				[0,0,0,0,0,0,0,0,0,0,0,27,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,14,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,13,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,28,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]
		},
		{
			"name": "collision",
			"width": 64,
			"height": 16,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 70,
			"foreground": false,
			"data": [
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,12,12,12,1,1,1,1,24,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,12,12,1,1,1,1,1,1,1,1,1,1,24,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,2,1,1,1,1,1,1,0,0,0,0,1,0,1,1,24,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,2,1,1,1,0,1,1,1,0,0,0,0,1,0,0,1,1,1,1,1,0,0,0,12,12,12,0,0,1],
				[1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,0,0,24,0,0,2,1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
				[12,12,12,12,12,12,12,12,12,12,12,12,12,12,0,0,0,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
			]
		},
		{
			"name": "main",
			"width": 64,
			"height": 16,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/tiles-70.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 70,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65,65,65,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,182,182,182,182,182,182,182,0,0,0,0,0,0,0,0,0,0,0,0,169,0,0,0,0,154,169,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,182,182,182,182,182,182,182,182,182,0,0,0,0,0,0,0,0,0,0,0,37,106,106,106,106,106,106,106,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,182,182,182,182,182,168,168,0,169,182,182,0,0,0,0,0,37,106,106,106,23,177,177,177,177,177,177,177,176,9,0,0,0,0,98,0,0,0,80,0,0,0,0],
				[64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,182,182,182,182,182,182,182,182,0,169,169,182,182,182,182,182,182,37,23,177,177,177,177,177,177,177,177,177,177,177,177,176,9,0,98,0,98,0,0,0,94,0,0,0,0],
				[64,0,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0,182,182,182,182,182,182,182,182,182,182,169,169,169,169,0,0,0,0,37,23,177,177,177,177,177,177,177,177,177,177,177,177,177,177,176,120,120,120,98,98,182,120,120,120,0,0,0],
				[64,0,66,0,47,0,169,0,0,152,152,152,0,169,0,0,182,182,182,182,182,182,182,182,182,182,37,120,120,120,120,9,152,152,37,23,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,119,119,119,119,119,119,119,119,0],
				[120,120,120,120,120,120,120,120,120,120,120,120,120,120,119,119,119,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,23,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,50,50,50,50,50,50,50,50,0],
				[177,177,177,177,177,177,177,177,177,177,177,177,177,177,50,50,50,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,50,50,50,50,50,50,50,50,0],
				[177,177,177,177,177,177,177,177,177,177,177,177,177,177,50,50,50,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,0]
			]
		}
	]
}/*]JSON*/;
LevelGrasslandsResources=[new ig.Image('media/tiles-70.png'), new ig.Image('media/tiles-70.png')];
});