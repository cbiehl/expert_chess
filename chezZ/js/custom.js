function lostMinigame(sq){
	NewGame(oldFEN);
	ClearPiece(sq);
	RemoveGUIPiece(sq);
	
	var parsed = ParseMove(36,36);
	MakeMove(parsed);
	PrintBoard();
	MoveGUIPiece(parsed);
	CheckAndSet();
	PreSearch();
}

function wonMinigame(sq){
	NewGame(oldFEN);
	if(Math.random()>0.5){
		setJetpack(true);
	}else{
		setMissile(true);
	}
}

//jetpack functions
function setJetpack(bool){
	if(bool){
		markAllJetpackSquares();
		hasJetpack = true;
	} else{
		unmarkAllJetpackSquares();
		hasJetpack = false;
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
	
	var parsed = ParseMove(36,36);
	MakeMove(parsed);
	PrintBoard();
	MoveGUIPiece(parsed);
	CheckAndSet();
	PreSearch();
}
	
//Missile functions
function setMissile(bool){
	if(bool){
		markAllBlackPawns();
		hasMissile = true;
	} else{
		unmarkAllSquares(0);
		hasMissile = false;
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
	unmarkAllSquares(destination);
}

function computerUsesMissile(){
	var pceType = PIECES.wP;
	var nr_of_wP = GameBoard.pceNum[pceType];
	var pawnNumber;
	var pawnToKill;
	
	if(nr_of_wP!=0){
		pawnNumber = Math.floor(Math.random() * (nr_of_wP));
		
		pawnToKill = GameBoard.pList[PCEINDEX(pceType, pawnNumber)];
		//TODO: Kill pawn
			//Set FEN-String? Schauen, was nach Capture Move passiert...
	}
	
	
	//TODO : return false / true -> Ausgabe, dass kein Bauer mehr auf dem Feld war?
}



/*Notizen:
	Bei Neuaufruf: Select alten Square
	Bei Neuaufruf überprüfen, ob Item --> playerUsesMissile() aufrufen bzw. in "MarkFields" Funktion auslagern
	Bei OnClick dann benutzen & ausgewählten töten

*/