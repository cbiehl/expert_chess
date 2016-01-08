//function to print/return a square string to print it to the console
function PrSQ(sq){
	
	return (FileChar[FilesBrd[sq]] + RankChar[RanksBrd[sq]]);
}

function PrMove(move){
	// moving pawn from e2 to e4 --> e2e4
	//capture a7b8r...
	
	//movestring
	var MvStr;
	
	var ff = FilesBrd[FROMSQ(move)];
	var rf = RanksBrd[FROMSQ(move)];
	var ft = FilesBrd[TOSQ(move)];
	var rt = RanksBrd[TOSQ(move)];
	
	MvStr = FileChar[ff] + RankChar[rf] + FileChar[ft] + RankChar[rt];
	
	var promoted = PROMOTED(move);
	if(promoted != PIECES.EMPTY){
		var pchar = 'q';
		if(PieceKnight[promoted] == BOOL.TRUE){
			pchar = 'n';
		} else if(PieceRookQueen[promoted]==BOOL.TRUE && PieceBishopQueen[promoted] == BOOL.FALSE){
			pchar = 'r';
		} else if(PieceRookQueen[promoted] == BOOL.FALSE && PieceBishopQueen[promoted] == BOOL.FALSE){
			pchar = 'b';
		}
		
		MvStr += pchar;
	}
	return MvStr;
}

//print the movelist to the screen
function PrintMoveList(){
	var index;
	var move;
	console.log("MoveList:");
	//loops through all of our moves
	for(index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply+1];++index){
		move = GameBoard.moveList[index];
		console.log(PrMove(move));
	}
}