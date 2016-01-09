function lostMinigame(sq){
	//TODO: an Square sq Figur töten --> Vielleicht über FEN-String?
}

function markAllBlackPawns(){
	//mark all pawn-squares
	var pceType = PIECES.bP;
	
	for(var pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pceType, pceNum)];	
		var rank = RanksBrd[sq]+1;
		var file = FilesBrd[sq]+1;
		frStr = ".Square"+".rank"+rank + ".file"+file;
		$(frStr).addClass("pawnField");
	}
}

function unmarkAllSquares(oldPawnSquare){
	var pceType = PIECES.bP;
	
	for(var pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pceType, pceNum)];	
		var rank = RanksBrd[sq]+1;
		var file = FilesBrd[sq]+1;
		frStr = ".Square"+".rank"+rank + ".file"+file;
		$(frStr).removeClass("pawnField");
	}
	
	var rank = RanksBrd[oldPawnSquare] + 1;
	var file = FilesBrd[oldPawnSquare] + 1;
	frStr = ".Square"+".rank"+rank + ".file"+file;
	$(frStr).removeClass("pawnField");	
}

function playerUsesMissile(destination){
	console.log("Kill the pawn on square " + destination);
	ClearPiece(destination);
	RemoveGUIPiece(destination);
	hasMissile = false;
	
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