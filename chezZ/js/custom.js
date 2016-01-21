function CheckStatus(){
	if(varlostMinigame)
		$("#status").text('You lost your piece!');
	
	if(has2x)
		$("#status").text('You won! You can move a second time!');
	
	if(hasMissile)
		$("#status").text('You won a missile! Shoot one of your enemies pawns.');
	
	if(hasJetpack)
		$("#status").text('You won a jetpack! You can fly to certain fields.');

	if(GameController.GameOver)
		$("#status").text("GAME OVER {black mates}");
}

function changeImage(sq, string){
	//change the image
	var pce = GameBoard.pieces[sq];
	var rank = RanksBrd[sq] + 1;
	var file = FilesBrd[sq] + 1;
	var frStr = ".Piece"+".rank"+rank + ".file"+file;
	var domImg = $(frStr)[0];

	var sourcePath = "images/" + SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase() + string +".png";
	
	domImg.src = sourcePath;
}

function lostMinigame(sq){
	NewGame(oldFEN);
	varlostMinigame = true;
	changeImage(sq,"_death");
	
	if(GameBoard.pieces[sq] == PIECES.wK){
		GameController.GameOver = BOOL.TRUE;
		$("#status").text("GAME OVER {black mates}");
		$(".markedField").removeClass("markedField");
		DeSelectSq(oldSqMinigame);
		
	}
	
	setTimeout(function(){
		ClearPiece(sq);
		RemoveGUIPiece(sq);
		
		if(!GameController.GameOver){
		var parsed = ParseMove(36,36);
		MakeMove(parsed);
		PrintBoard();
		MoveGUIPiece(parsed);
		CheckAndSet();
		PreSearch();
		varlostMinigame = false;
		}
		}, 1000 );
}

//function wonMinigame(sq){ // --> umgezogen in die main.js
//	NewGame(oldFEN);
//	if(Math.random()>0.5){
//		setMissile(true);
//	}else{
//		setJetpack(true);
//	}
//}

//jetpack functions
function setJetpack(bool){
	if(bool){
		debugger;
		changeImage(oldSqMinigame, "_jet");
		markAllJetpackSquares();
		hasJetpack = true;
		SetSqSelected(oldSqMinigame);
	} else{
		changeImage(oldSqMinigame, "");
		unmarkAllJetpackSquares();
		hasJetpack = false;
		DeSelectSq(oldSqMinigame);
	}
}

function markAllJetpackSquares(){
	//loop through all files and ranks
	for(rank = RANKS.RANK_7; rank >= RANKS.RANK_2; rank--) {
		for(file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			sq = FR2SQ(file,rank);
			piece = GameBoard.pieces[sq];
			if(piece == PIECES.EMPTY){
				frStr = ".Square"+".rank"+(rank+1) + ".file"+(file+1);
				if(!($(frStr).hasClass("specialField")))
					$(frStr).addClass("markedField");
			}
		}
	}
}

function unmarkAllJetpackSquares(jumpedToSq){
	//loop through all files and ranks
	for(rank = RANKS.RANK_7; rank >= RANKS.RANK_2; rank--) {
		for(file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			sq = FR2SQ(file,rank);
			piece = GameBoard.pieces[sq];
			if(piece == PIECES.EMPTY){
				frStr = ".Square"+".rank"+(rank+1) + ".file"+(file+1);
				$(frStr).removeClass("markedField");
			}
		}
	}
	
	var rank = RanksBrd[jumpedToSq] + 1;
	var file = FilesBrd[jumpedToSq] + 1;
	frStr = ".Square"+".rank"+rank + ".file"+file;
	$(frStr).removeClass("markedField");	
}

function useJetpack(oldSq, jumpToSq){
	GameBoard.pieces[jumpToSq] = GameBoard.pieces[oldSq];
	GameBoard.pieces[oldSq] = PIECES.EMPTY;
	var fenStr = BoardToFen();
	NewGame(fenStr);
	
	hasJetpack = false;
	unmarkAllJetpackSquares(jumpToSq);
	var rank = RanksBrd[jumpToSq] + 1;
	var file = FilesBrd[jumpToSq] + 1;
	frStr = ".Square"+".rank"+rank + ".file"+file;
	if($(frStr).hasClass("specialField")){
//		setJetpack(true);
		//Spiel aufrufen
		return;
	}
	
	var parsed = ParseMove(36,36);
	MakeMove(parsed);
	PrintBoard();
	MoveGUIPiece(parsed);
	CheckAndSet();
	PreSearch();
	
	DeSelectSq(oldSq);
	DeSelectSq(jumpToSq);
}
	
//Missile functions
function setMissile(bool, destination){
	if(bool){
		changeImage(oldSqMinigame, "_missile");
		markAllBlackPawns();
		hasMissile = true;
		SetSqSelected(oldSqMinigame);
	} else{
		changeImage(oldSqMinigame, "");
		unmarkAllSquares(destination);
		hasMissile = false;
		DeSelectSq(oldSqMinigame);
	}
}

function markAllBlackPawns(){
	//mark all pawn-squares
	var pceType = PIECES.bP;
	
	for(var pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pceType, pceNum)];	
		var rank = RanksBrd[sq]+1;
		var file = FilesBrd[sq]+1;
		frStr = ".Square"+".rank"+rank + ".file"+file;
		$(frStr).addClass("markedField");
	}
}

function unmarkAllSquares(oldPawnSquare){
	var pceType = PIECES.bP;
	
	for(var pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pceType, pceNum)];	
		var rank = RanksBrd[sq]+1;
		var file = FilesBrd[sq]+1;
		frStr = ".Square"+".rank"+rank + ".file"+file;
		$(frStr).removeClass("markedField");
	}
	
	var rank = RanksBrd[oldPawnSquare] + 1;
	var file = FilesBrd[oldPawnSquare] + 1;
	frStr = ".Square"+".rank"+rank + ".file"+file;
	$(frStr).removeClass("markedField");	
}

function playerUsesMissile(destination){
	console.log("Kill the pawn on square " + destination);
	unmarkAllSquares(destination);
	changeImage(destination,"_death");
	setTimeout(function(){
		ClearPiece(destination);
		RemoveGUIPiece(destination);
		hasMissile = false;
		
		//führt einen "ungültigen" Zug durch --> Seite wechselt
		var parsed = ParseMove(36,36);
		MakeMove(parsed);
		PrintBoard();
		MoveGUIPiece(parsed);
		CheckAndSet();
		PreSearch();
		
		//update fen string  TODO: vllt auslagern - hier nicht so passend
		document.getElementById("fenIn").value = BoardToFen();
	
		//unmark all squares
		setMissile(false, destination);
	}, 1000 );
}


//ai functions
function computerUsesMissile(from){
	changeImage(from,"_missile");
	setTimeout(function(){
	var pceType = PIECES.wP;
	var nr_of_wP = GameBoard.pceNum[pceType];
	var pawnNumber;
	var pawnToKill;
	
	if(nr_of_wP!=0){
		pawnNumber = Math.floor(Math.random() * (nr_of_wP));
		
		pawnToKill = GameBoard.pList[PCEINDEX(pceType, pawnNumber)];
		changeImage(pawnToKill,"_death");
		setTimeout(function(){
			ClearPiece(pawnToKill);
			RemoveGUIPiece(pawnToKill);
			//TODO Statusleiste
			console.log("Your pawn on square " +FileChar[FilesBrd[pawnToKill]]+RankChar[RanksBrd[pawnToKill]]+ " was killed!");
		}, 1000 );
	}
	changeImage(from,"");
	}, 1000 );	
	
	//TODO : return false / true -> Ausgabe, dass kein Bauer mehr auf dem Feld war?
}

function computerUsesJetpack(from){
	changeImage(from, "_jet");
	setTimeout( function() {
		var loop = true;

	while(loop){
		var rankmin = 1;
		var rankmax = 6;
		var sf_rank = Math.floor(Math.random() * (rankmax - rankmin + 1)) + rankmin;
		
		var filemin = 0;
		var filemax = 7;
		var sf_file = Math.floor(Math.random() * (filemax - filemin + 1)) + filemin;
		
		var sq_to = FR2SQ(sf_file,sf_rank);
		if(GameBoard.pieces[sq_to] == PIECES.EMPTY){
			var rank = RanksBrd[sq_to]+1;
			var file = FilesBrd[sq_to]+1;
			
			var domSq = $(".Square"+".rank"+rank + ".file"+file);
			var isSpecialField = domSq.hasClass("specialField");
			if(!isSpecialField)
				loop = false;
		}
	}
	

	
	GameBoard.pieces[sq_to] = GameBoard.pieces[from];
	GameBoard.pieces[from] = PIECES.EMPTY;
	var fenStr = BoardToFen();
	NewGame(fenStr);
	changeImage(sq_to, "");
	}, 1000 );
}

function aiPlaysGame(to){
	var random = Math.random();
	if(random<=0.8){
		//won the game, use item
		console.log("ai won the game");
		if(Math.random()<=0.5){
			$("#status").text('Computer won a missile!');
			computerUsesMissile(to);
			setTimeout(function(){
				$("#status").text('Your turn! Move a piece!');
			},1000);
		}else{
			$("#status").text('Computer won a jetpack!');
			computerUsesJetpack(to);
			setTimeout(function(){
				$("#status").text('Your turn! Move a piece!');
			},1000);
		}
	}else{
		$("#status").text('Computer lost the game and his token!');
		//lost the game, kill the piece
		changeImage(to,"_death");
		setTimeout(function(){
		ClearPiece(to);
		RemoveGUIPiece(to);
		}, 1000 );
		setTimeout(function(){
			$("#status").text('Your turn! Move a piece!');
		},1000);
	}
}


/*Notizen:
	Bei Neuaufruf: Select alten Square
	Bei Neuaufruf überprüfen, ob Item --> playerUsesMissile() aufrufen bzw. in "MarkFields" Funktion auslagern
	Bei OnClick dann benutzen & ausgewählten töten

*/