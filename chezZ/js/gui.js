/*Gunter*/
$('#Missile').click( function () {
	setMissile(!hasMissile);
});

$('#Jetpack').click( function () {
	setJetpack(!hasJetpack)
});

/*Gunter end*/

$("#SetFen").click(function () {
	var fenStr = $("#fenIn").val();	
	NewGame(fenStr);
});

$('#TakeButton').click( function () {
	if(GameBoard.hisPly > 0) {
		TakeMove();
		GameBoard.ply = 0;
		SetInitialBoardPieces();
	}
});

$('#NewGameButton').click( function () {
	NewGame(START_FEN);
});

function NewGame(fenStr) {
	ParseFen(fenStr);
	PrintBoard();
	SetInitialBoardPieces();
	CheckAndSet();
}

function ClearAllPieces() {
	$(".Piece").remove();
}

function SetInitialBoardPieces() {

	var sq;
	var sq120;
	var file,rank;
	var rankName;
	var fileName;
	var imageString;
	var pieceFileName;
	var pce;
	
	ClearAllPieces();
	
	for(sq = 0; sq < 64; ++sq) {
		sq120 = SQ120(sq);
		pce = GameBoard.pieces[sq120];
		if(pce >= PIECES.wP && pce <= PIECES.bK) {
			AddGUIPiece(sq120, pce);
		}
	}
}

function DeSelectSq(sq) {
	$('.Square').each( function(index) {
		if(PieceIsOnSq(sq, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
				$(this).removeClass('SqSelected');
		}
	} );
}

function SetSqSelected(sq) {
	$('.Square').each( function(index) {
		if(PieceIsOnSq(sq, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
				$(this).addClass('SqSelected');
		}
	} );
}

function ClickedSquare(pageX, pageY) {
	console.log('ClickedSquare() at ' + pageX + ',' + pageY);
	var position = $('#Board').position();
	
	var workedX = Math.floor(position.left);
	var workedY = Math.floor(position.top);
	
	pageX = Math.floor(pageX);
	pageY = Math.floor(pageY);
	
	var file = Math.floor((pageX-workedX) / 60);
	var rank = 7 - Math.floor((pageY-workedY) / 60);
	
	var sq = FR2SQ(file,rank);
	
	//gunter - if anweisung
	if(!hasMissile){
		console.log('Clicked sq:' + PrSq(sq));
		
		SetSqSelected(sq);	
	}
	
	return sq;
}

$(document).on('click','.Piece', function (e) {
	//gunter - umschließende if anweisung
	if(!hasMissile && !hasJetpack){
		console.log('Piece Click');
		if(UserMove.from == SQUARES.NO_SQ) {
			UserMove.from = ClickedSquare(e.pageX, e.pageY);
		} else {
			UserMove.to = ClickedSquare(e.pageX, e.pageY);
		}
		
		MakeUserMove();
	} else if(hasMissile && !hasJetpack){
		var to = ClickedSquare(e.pageX, e.pageY);
		if(GameBoard.pieces[to] == PIECES.bP){
			//Kill the pawn on square to
			playerUsesMissile(to);
		}
			
	}
});

$(document).on('click','.Square', function (e) {
	//gunter - umschließende if anweisung
	if(!hasMissile && !hasJetpack){
		console.log('Square Click');	
		if(UserMove.from != SQUARES.NO_SQ) {
			UserMove.to = ClickedSquare(e.pageX, e.pageY);
			MakeUserMove();
		}
	}
	/*gunter start*/
	//use jetpack
	if(hasJetpack){
//		if(UserMove.from != SQUARES.NO_SQ) {
			UserMove.to = ClickedSquare(e.pageX, e.pageY);
			var rank = RanksBrd[UserMove.to] + 1;
			var file = FilesBrd[UserMove.to] + 1;
			frStr = ".Square"+".rank"+rank + ".file"+file;
			if($(frStr).hasClass("markedField"))
				useJetpack(oldSqMinigame,UserMove.to);
//		}		
	}
	/*gunter end*/

});

function MakeUserMove() {
	
	/* clemens start
	var manageMinigame = function(session_id,fen,position) {
		var id = 
		
	    $.ajax({
	        url: 'php/sessionmgmt.php',
	        type: 'POST',
	        data: {id:id, fen:BoardToFen(), position: TODO},
	        success: function(blablubvariable) {
	            console.log(blablubvariable);
	        }
	    });
	};
	/* clemens end */

	if(UserMove.from != SQUARES.NO_SQ && UserMove.to != SQUARES.NO_SQ) {
		var to = UserMove.to;
		var file = FilesBrd[to]+1;
		var rank = RanksBrd[to]+1;
		
		var domSq = $(".Square"+".rank"+rank + ".file"+file);
		var isSpecialField = domSq.hasClass("specialField");
		
		console.log("User Move:" + PrSq(UserMove.from) + PrSq(UserMove.to));	
		var parsed = ParseMove(UserMove.from,UserMove.to);
		
		if(parsed != NOMOVE) {
			debugger;
			MakeMove(parsed);
			PrintBoard();
			MoveGUIPiece(parsed);
			CheckAndSet();
			PreSearch();
			if(isSpecialField)
				changeSide = true;
			
			oldFEN = BoardToFen();
			console.log(oldFEN);
			/*gunter start*/
			//Anmerkung - evtl Abspringen nach Deselect etc.
			var to = UserMove.to;
			var file = FilesBrd[to]+1;
			var rank = RanksBrd[to]+1;
			
			var domSq = $(".Square"+".rank"+rank + ".file"+file);
			if(domSq.hasClass("specialField")){
				console.log("Jetzt sollten wir in Impact abspringen");
				oldSqMinigame = to;
			/*gunter end*/
			/*clemens start*/
				var iframe = document.createElement("iframe");
				var random_game = Math.random();
				if(random_game <= 0.33){
					iframe.src = "Escape/index.html";
				}else if(random_game > 0.33 && random_game >= 0.66){
					//Shoot the Fruit
				}else{
					//Monster
				}
				
				iframe.src = "Escape/index.html"; //TODO
				iframe.id = "minigame";
				iframe.style.width = "100%";
				iframe.style.height = "100%";
				iframe.style.position = "fixed";
				iframe.style.top = "0px";
				iframe.style.left = "0px";
				iframe.style.bottom = "0px";
				iframe.style.right = "0px";
				iframe.style.border = "none";
				iframe.style.margin = "0";
				iframe.style.padding = "0";
				iframe.style.overflow = "hidden";
				iframe.style.zIndex = "999999";
				
				$('#EscapeModal').modal('show');
				
				setTimeout(function(){
					$('#EscapeModal').modal('hide');
					document.body.appendChild(iframe);
					iframe.contentWindow.focus();
				}, 8000);
			/*clemens end*/
			}
		}
	
		DeSelectSq(UserMove.from);
		DeSelectSq(UserMove.to);
		
		UserMove.from = SQUARES.NO_SQ;
		UserMove.to = SQUARES.NO_SQ;
	}

}

function PieceIsOnSq(sq, top, left) {

	if( (RanksBrd[sq] == 7 - Math.round(top/60) ) && 
		FilesBrd[sq] == Math.round(left/60) ) {
		return BOOL.TRUE;
	}
		
	return BOOL.FALSE;

}

function RemoveGUIPiece(sq) {

	$('.Piece').each( function(index) {
		if(PieceIsOnSq(sq, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			$(this).remove();
		}
	} );
	
}

function AddGUIPiece(sq, pce) {

	var file = FilesBrd[sq];
	var rank = RanksBrd[sq];
	var rankName = "rank" + (rank+1);
	var	fileName = "file" + (file+1);
	var pieceFileName = "images/" + SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase() + ".png";
	var	imageString = "<image src=\"" + pieceFileName + "\" class=\"Piece " + rankName + " " + fileName + "\"/>";
	$("#Board").append(imageString);
}

function MoveGUIPiece(move) {
	
	var from = FROMSQ(move);
	var to = TOSQ(move);	
	
	if(move & MFLAGEP) {
		var epRemove;
		if(GameBoard.side == COLOURS.BLACK) {
			epRemove = to - 10;
		} else {
			epRemove = to + 10;
		}
		RemoveGUIPiece(epRemove);
	} else if(CAPTURED(move)) {
		RemoveGUIPiece(to);
	}
	
	var file = FilesBrd[to];
	var rank = RanksBrd[to];
	var rankName = "rank" + (rank+1);
	var	fileName = "file" + (file+1);
	
	$('.Piece').each( function(index) {
		if(PieceIsOnSq(from, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			$(this).removeClass();
			$(this).addClass("Piece " + rankName + " " + fileName);
		}
	} );
	
	if(move & MFLAGCA) {
		switch(to) {
			case SQUARES.G1: RemoveGUIPiece(SQUARES.H1); AddGUIPiece(SQUARES.F1, PIECES.wR); break;
			case SQUARES.C1: RemoveGUIPiece(SQUARES.A1); AddGUIPiece(SQUARES.D1, PIECES.wR); break;
			case SQUARES.G8: RemoveGUIPiece(SQUARES.H8); AddGUIPiece(SQUARES.F8, PIECES.bR); break;
			case SQUARES.C8: RemoveGUIPiece(SQUARES.A8); AddGUIPiece(SQUARES.D8, PIECES.bR); break;
		}
	} else if (PROMOTED(move)) {
		RemoveGUIPiece(to);
		AddGUIPiece(to, PROMOTED(move));
	}
	
}

function DrawMaterial() {

	if (GameBoard.pceNum[PIECES.wP]!=0 || GameBoard.pceNum[PIECES.bP]!=0) return BOOL.FALSE;
	if (GameBoard.pceNum[PIECES.wQ]!=0 || GameBoard.pceNum[PIECES.bQ]!=0 ||
					GameBoard.pceNum[PIECES.wR]!=0 || GameBoard.pceNum[PIECES.bR]!=0) return BOOL.FALSE;
	if (GameBoard.pceNum[PIECES.wB] > 1 || GameBoard.pceNum[PIECES.bB] > 1) {return BOOL.FALSE;}
    if (GameBoard.pceNum[PIECES.wN] > 1 || GameBoard.pceNum[PIECES.bN] > 1) {return BOOL.FALSE;}
	
	if (GameBoard.pceNum[PIECES.wN]!=0 && GameBoard.pceNum[PIECES.wB]!=0) {return BOOL.FALSE;}
	if (GameBoard.pceNum[PIECES.bN]!=0 && GameBoard.pceNum[PIECES.bB]!=0) {return BOOL.FALSE;}
	 
	return BOOL.TRUE;
}

function ThreeFoldRep() {
	var i = 0, r = 0;
	
	for(i = 0; i < GameBoard.hisPly; ++i) {
		if (GameBoard.history[i].posKey == GameBoard.posKey) {
		    r++;
		}
	}
	return r;
}

function CheckResult() {
	if(GameBoard.fiftyMove >= 100) {
		 $("#GameStatus").text("GAME DRAWN {fifty move rule}"); 
		 return BOOL.TRUE;
	}
	
	if (ThreeFoldRep() >= 2) {
     	$("#GameStatus").text("GAME DRAWN {3-fold repetition}"); 
     	return BOOL.TRUE;
    }
	
	if (DrawMaterial() == BOOL.TRUE) {
     	$("#GameStatus").text("GAME DRAWN {insufficient material to mate}"); 
     	return BOOL.TRUE;
    }
    
    GenerateMoves();
      
    var MoveNum = 0;
	var found = 0;
	
	for(MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum)  {	
       
        if ( MakeMove(GameBoard.moveList[MoveNum]) == BOOL.FALSE)  {
            continue;
        }
        found++;
		TakeMove();
		break;
    }
	
	if(found != 0) return BOOL.FALSE;
	
	var InCheck = SqAttacked(GameBoard.pList[PCEINDEX(Kings[GameBoard.side],0)], GameBoard.side^1);
	
	if(InCheck == BOOL.TRUE) {
		if(GameBoard.side == COLOURS.WHITE) {
	      $("#GameStatus").text("GAME OVER {black mates}");
	      return BOOL.TRUE;
        } else {
	      $("#GameStatus").text("GAME OVER {white mates}");
	      return BOOL.TRUE;
        }
	} else {
		$("#GameStatus").text("GAME DRAWN {stalemate}");return BOOL.TRUE;
	}
	
	return BOOL.FALSE;	
}

function CheckAndSet() {
	if(CheckResult() == BOOL.TRUE) {
		GameController.GameOver = BOOL.TRUE;
	} else {
		GameController.GameOver = BOOL.FALSE;
		$("#GameStatus").text('');
	}
	//gunter
	document.getElementById("fenIn").value = BoardToFen();
}

function PreSearch() {
	if(GameController.GameOver == BOOL.FALSE) {
		SearchController.thinking = BOOL.TRUE;
		setTimeout( function() { StartSearch(); }, 200 );
	}
}

$('#SearchButton').click( function () {	
	GameController.PlayerSide = GameController.side ^ 1;
	PreSearch();
});

function StartSearch() {

	SearchController.depth = MAXDEPTH;
	var t = $.now();
	var tt = $('#ThinkTimeChoice').val();
	
	SearchController.time = parseInt(tt) * 1000;
	SearchPosition();
	
	//TODO: Hier Checken, ob auf Feld getreten
	debugger;
	MakeMove(SearchController.best);
	MoveGUIPiece(SearchController.best);
	
	CheckAndSet();
}














































