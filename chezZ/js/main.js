$(function() {
	init();
	console.log("Main Init Called");	
	NewGame(START_FEN);
});

function InitFilesRanksBrd() {
	
	var index = 0;
	var file = FILES.FILE_A;
	var rank = RANKS.RANK_1;
	var sq = SQUARES.A1;
	
	for(index = 0; index < BRD_SQ_NUM; ++index) {
		FilesBrd[index] = SQUARES.OFFBOARD;
		RanksBrd[index] = SQUARES.OFFBOARD;
	}
	
	for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
		for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			sq = FR2SQ(file,rank);
			FilesBrd[sq] = file;
			RanksBrd[sq] = rank;
		}
	}
}

function InitHashKeys() {
    var index = 0;
	
	for(index = 0; index < 14 * 120; ++index) {				
		PieceKeys[index] = RAND_32();
	}
	
	SideKey = RAND_32();
	
	for(index = 0; index < 16; ++index) {
		CastleKeys[index] = RAND_32();
	}
}

function InitSq120To64() {

	var index = 0;
	var file = FILES.FILE_A;
	var rank = RANKS.RANK_1;
	var sq = SQUARES.A1;
	var sq64 = 0;

	for(index = 0; index < BRD_SQ_NUM; ++index) {
		Sq120ToSq64[index] = 65;
	}
	
	for(index = 0; index < 64; ++index) {
		Sq64ToSq120[index] = 120;
	}
	
	for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
		for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			sq = FR2SQ(file,rank);
			Sq64ToSq120[sq64] = sq;
			Sq120ToSq64[sq] = sq64;
			sq64++;
		}
	}

}

function InitBoardVars() {

	var index = 0;
	for(index = 0; index < MAXGAMEMOVES; ++index) {
		GameBoard.history.push( {
			move : NOMOVE,
			castlePerm : 0,
			enPas : 0,
			fiftyMove : 0,
			posKey : 0
		});
	}	
	
	for(index = 0; index < PVENTRIES; ++index) {
		GameBoard.PvTable.push({
			move : NOMOVE,
			posKey : 0
		});
	}
}

function InitBoardSquares() {

//frage gunter: Warum zwei gleich heißende Methoden?
	
	var light = 0;
	var rankName;
	var fileName;
	var divString;
	var lastLight = 0;
	var rankIter = 0;
	var fileIter = 0;
	var lightString;
	
	for(rankIter = RANKS.RANK_8; rankIter >= RANKS.RANK_1; rankIter--) {
		light = lastLight ^ 1;
		lastLight ^= 1;
		rankName = "rank" + (rankIter+1);
		for(fileIter = FILES.FILE_A; fileIter <= FILES.FILE_H; fileIter++) {
			fileName = "file" + (fileIter+1);
			
			if(light==0) lightString="Light";
			else lightString = "Dark";
			divString = "<div class=\"Square " + rankName + " " + fileName + " " + lightString + "\"/>";
			light^=1;
			$("#Board").append(divString);
 		}
 	}
}

function InitBoardSquares() {
	var light = 1;
	var rankName;
	var fileName;
	var divString;
	var rankIter;
	var fileIter;
	var lightString;
	
	for(rankIter = RANKS.RANK_8; rankIter >= RANKS.RANK_1; rankIter--) {
		light ^= 1;
		rankName = "rank" + (rankIter + 1);
		for(fileIter = FILES.FILE_A; fileIter <= FILES.FILE_H; fileIter++) {
			fileName = "file" + (fileIter + 1);
			if(light == 0) lightString="Light";
			else lightString = "Dark";
			light^=1;
			divString = "<div class=\"Square " + rankName + " " + fileName + " " + lightString + "\"/>";
			$("#Board").append(divString);
		}
	}
	
	/*gunter start*/
	//file rank string
	var frStr;
	for(var i = 1; i<=NR_OF_SF; i++){
		//rank
		var min = 3;
		var max = 6;
		var sf_rank = Math.floor(Math.random() * (max - min + 1)) + min;

		//file
		var min = 1;
		var max = 8;
		var sf_file = Math.floor(Math.random() * (max - min + 1)) + min;
		frStr = ".Square"+".rank"+sf_rank + ".file"+sf_file;
		$(frStr).addClass("specialField");
	}
	/*gunter end*/
	
}

function init() {
	console.log("init() called");
	InitFilesRanksBrd();
	InitHashKeys();
	InitSq120To64();
	InitBoardVars();
	InitMvvLva();
	InitBoardSquares();
	
	
	/* clemens start - field highlighting */
	
	function mouseenterSquare(e) {
		  // do not fire this event if we are dragging a piece
		  // NOTE: this should never happen, but it's a safeguard
		  if (DRAGGING_A_PIECE !== false) return;

		  if (cfg.hasOwnProperty('onMouseoverSquare') !== true ||
		    typeof cfg.onMouseoverSquare !== 'function') return;	// no cfg in here

		  // get the square
		  var square = $(e.currentTarget).attr('data-square');

		  // NOTE: this should never happen; defensive
		  if (validSquare(square) !== true) return;

		  // get the piece on this square
		  var piece = false;
		  if (CURRENT_POSITION.hasOwnProperty(square) === true) {
		    piece = CURRENT_POSITION[square];
		  }

		  // execute their function
		  cfg.onMouseoverSquare(square, piece, deepCopy(CURRENT_POSITION),
		    CURRENT_ORIENTATION);
		}

		function mouseleaveSquare(e) {
		  // do not fire this event if we are dragging a piece
		  // NOTE: this should never happen, but it's a safeguard
		  if (DRAGGING_A_PIECE !== false) return;

		  if (cfg.hasOwnProperty('onMouseoutSquare') !== true ||
		    typeof cfg.onMouseoutSquare !== 'function') return;

		  // get the square
		  var square = $(e.currentTarget).attr('data-square');

		  // NOTE: this should never happen; defensive
		  if (validSquare(square) !== true) return;

		  // get the piece on this square
		  var piece = false;
		  if (CURRENT_POSITION.hasOwnProperty(square) === true) {
		    piece = CURRENT_POSITION[square];
		  }

		  // execute their function
		  cfg.onMouseoutSquare(square, piece, deepCopy(CURRENT_POSITION),
		    CURRENT_ORIENTATION);
		}
		
	/* --- */
		
	var greySquare = function(square) {
		var squareEl = $('#Board .square-' + square);
	  
		var background = '#a9a9a9';
		if (squareEl.hasClass('black-3c85d') === true) {
			background = '#696969';
		}

		squareEl.css('background', background);
	};
	
	var onMouseoverSquare = function(square, piece) {
		// get list of possible moves for this square
		var moves = game.moves({
			square: square,
			verbose: true
		});

		// exit if there are no moves available for this square
		if (moves.length === 0) return;

		// highlight the square they moused over
		greySquare(square);

		// highlight the possible squares for this piece
		for (var i = 0; i < moves.length; i++) {
			greySquare(moves[i].to);
		}
	};

	var onMouseoutSquare = function(square, piece) {
	  removeGreySquares();
	};
	
	/* START BEARBEITET */
	
	var greySquare = function(square) {
		var squareEl = $('#Board .square-' + square);
	  
		var background = '#a9a9a9';
		if (squareEl.hasClass('black-3c85d') === true) {
			background = '#696969';
		}

		squareEl.css('background', background);
	};
	
	/* minigame integration */
	window.onmessage = function(message){
		if(message.data == "DELETEIFRAMELOST"){
			
			var element = document.getElementById("minigame");
			element.parentNode.removeChild(element);
			//TODO: delete token, enemy's turn
			console.log("LOST MINIGAME LOST MINIGAME LOST MINIGAME LOST");
			wonMinigame = false;
			lostMinigame = true;
			
		}else if(message.data == "DELETEIFRAMEWON"){
			
			var element = document.getElementById("minigame");
			element.parentNode.removeChild(element);
			//TODO: get item, player's turn again
			setMissile(true);
			console.log("WIN WIN WIN YEAH WIN WIN WIN");
			wonMinigame = true;
			lostMinigame = false;
		}
	}
	
	/* clemens end */
	/* notes:
	 * 		Spielzüge beider Seiten stoppen:
	 * 			GameController.EngineSide = COLOURS.BOTH;
	 *			GameController.PlayerSide = COLOURS.BOTH;
	 */
}
