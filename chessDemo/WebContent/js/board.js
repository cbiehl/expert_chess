//function to get the index of the piece
function PCEINDEX(pce,pceNum){
	return (pce*10 + pceNum);
}
var GameBoard = {};

GameBoard.pieces = new Array(BRD_SQ_NUM);
GameBoard.side = COLORS.WHITE;
//everytime a move is made we will increment fiftyMove by one
//when fiftyMove hits 100 --> draw
//reset fiftyMove to 0 when a pawn is moved or capture is made
GameBoard.fiftyMove = 0;
//count all of the moves - history ply
GameBoard.hisPly = 0;
//number of half moves made in the search tree
GameBoard.ply = 0;
//en passant rule
GameBoard.enPas = 0;

//castle permission: 
/*
 *  0001 white kingside castling
 *  0010 white queenside castling
 *  0100 black kingside castling
 *  1000 black queenside castling
 *  
 *  if (1101 & WKCA) != 0 --> white can castle kingside
 */
GameBoard.castlePerm = 0;
GameBoard.material = new Array(2); //White, Black material of pieces
//keeps track of piece number (f.g pceNum[bP]=4)
GameBoard.pceNum = new Array(13); //indexed by Piece, for example white pawn = 1
/* 
*
* loop(pieces[])
* 	if(piece on sq = Side tomove)
* 		then genmoves() for piece on sq
*
*/
/*
 * piece list : given piece - on what square is the piece on?
 * --> sqOfpiece= PlistArray[index] gives sq
 * 
 * wP * 10 + wPNum --> 0 based index of num of pieces(GameBoard.pceNum)
 * knight: wN * 10 + wNnum
 * 
 * say we have 4 white pawns, GameBoard.pceNum[wP] = 4
 * for (pceNum = 0; pceNum<GameBoard.pceNum[wP]; pceNum++){
 * 	sq = PlistArray[wP * 10 + pceNum] --> will give us the square of each of the pawns
 * }
 * 	sq1 = PlistArray[wP * 10 + 0]
 * sq2 = PlistArray[wP * 10 + 1]
 * sq3 = PlistArray[wP * 10 + 2]
 * sq4 = PlistArray[wP * 10 + 3]
 * 
 * wP index: from 10 to 19
 * wN index: from 20 to 29
 * 
 */
GameBoard.pList = new Array(14*10);
//unique number that represents a position on the board
GameBoard.posKey = 0;
//moveList
GameBoard.moveList = new Array(MAXDEPTH*MAXPOSITIONMOVES);
GameBoard.moveScores = new Array(MAXDEPTH*MAXPOSITIONMOVES);
//to know where the movelist starts for a given depth
GameBoard.moveListStart = new Array(MAXDEPTH);


function PrintBoard(){
	var sq,file,rank,piece;
	console.log("\nGame Board:\n");
	/*
	 * a8->h8
	 * a7->h7
	 * ...
	 * a1->h1
	 */
	for(rank=RANKS.RANK_8; rank>=RANKS.RANK_1;rank--){
		var line = (RankChar[rank] + "   ");
		for(file = FILES.FILE_A;file<=FILES.FILE_H;file++){
			sq = FR2SQ(file,rank);
			piece = GameBoard.pieces[sq];
			line += (" " + PceChar[piece] + " ");
		}
		console.log(line);
	}
	
	console.log("");
	var line = "   ";
	for(file = FILES.FILE_A;file<=FILES.FILE_H;file++){
		line += (' ' + FileChar[file] + ' ');
	}
	console.log(line);
	console.log("side:" + SideChar[GameBoard.side]);
	console.log("enPas"+GameBoard.enPas);
	line="";
	
	if(GameBoard.castlePerm & CASTLEBIT.WKCA) line += 'K';
	if(GameBoard.castlePerm & CASTLEBIT.WQCA) line += 'Q';
	if(GameBoard.castlePerm & CASTLEBIT.BKCA) line += 'k';
	if(GameBoard.castlePerm & CASTLEBIT.BQCA) line += 'q';
	console.log("castle: " + line);
	console.log("key: " + GameBoard.posKey.toString(16));
}


/*
 * zobrist hashing in chess: http://www.chessbin.com/post/Transposition-Table-and-Zobrist-Hashing
 * 
 * generating posKey:
 * what is unique in our position:
 * 	piece on sq
 * 	Side to move
 * 	Castle permission
 * 	EnPas sq
 * 
 * pos ^= RandNum for all pces on sq
 * pos ^= RandNum side.. and so on
 * 
 * if a piece moves - xor again
 */

//var piece1 = RAND_32();
//var piece2 = RAND_32();
//var piece3 = RAND_32();
//var piece4 = RAND_32();
//
//var key = 0;
//key ^= piece1;
//key ^= piece2;
//key ^= piece3;
//key ^= piece4;
//console.log("key: "+ key.toString(16));
//piece1 gets captured
//remove piece1 from the key:
//key ^= piece1;
//console.log("piece1 out key:" + key.toString(16));
//key = 0;
//key ^= piece2;
//key^= piece3;
//key^=piece4;
//console.log("build no piece1: "+key.toString(16));
//hash in into final key -> unique number for a given piece on a given square
//generate hashkey
//when a piece is captured or move we can just hash out and in pieces or side to move..
function GeneratePosKey(){
	var sq= 0;
	var finalKey=0;
	var piece = PIECES.EMPTY;
	
	//loop through all of the squares	
	for(sq=0;sq<BRD_SQ_NUM;sq++){
		//get the piece of the particular square
		piece = GameBoard.pieces[sq];
		//if that piece is not empty and is not offboard-->we have a piece
		if(piece!= PIECES.EMPTY && piece != SQUARES.OFFBOARD)
				//hash in the random key, individual unique for the particular square and piece combination
				finalKey^=PieceKeys[(piece*120)+sq];
	}
	
	if(GameBoard.side==COLORS.WHITE){
		finalKey^=SideKey;
	}
	
	if(GameBoard.enPas != SQUARES.NO_SQ){
		finalKey^=PieceKeys[GameBoard.enPas];
	}
	
	//hash in castle permissions
	finalKey ^= CastleKeys[GameBoard.castlePerm];
	return finalKey;
}

//print the pieceList to the screen
function PrintPieceLists(){
	var piece, pceNum;
	//loop through every piece type
	for(piece = PIECES.wP; piece <= PIECES.bK; piece++){
		//for each of the piece type loop through the number of pieces
		for(pceNum = 0; pceNum < GameBoard.pceNum[piece]; pceNum++){
			console.log('Piece ' + PceChar[piece] + ' on ' + PrSQ(GameBoard.pList[PCEINDEX(piece,pceNum)]));
		}
	}
}

function UpdateListsMaterial(){
	var piece, sq, index, color;
	
	//set all of the pieces in pList to empty
	for(var i = 0;i<14*120;i++){
		GameBoard.pList[i] = PIECES.EMPTY;
	}
	
	//set the material to 0
	for(var i=0;i<2;i++){
		GameBoard.material[i]=0;
	}
	//set the number of pieces on the board to 0
	for(var i=0;i<13;i++){
		GameBoard.pceNum[i]=0;
	}
	
	for(index=0; index<64;index++){
		sq = SQ120(index);
		piece = GameBoard.pieces[sq];
		//if the piece is not empty
		if(piece != PIECES.EMPTY){
			
			//piece color
			color = PieceCol[piece];
			//increment material value for that particular color by the value of this piece
			GameBoard.material[color] += PieceVal[piece];
			//index of that particular piece, for the current number of pieces
			GameBoard.pList[PCEINDEX(piece,GameBoard.pceNum[piece])] = sq;
			//increment the piece number
			GameBoard.pceNum[piece]++;
		}
	}
	PrintPieceLists();
}



//reset the board
function ResetBoard(){
	//set all of the pieces offboard
	for(var i=0;i<BRD_SQ_NUM;i++){
		GameBoard.pieces[i] = SQUARES.OFFBOARD;
	}
	
	//set the internal squares to empty
	for(var i=0;i<64;i++){
		GameBoard.pieces[SQ120(i)] = PIECES.EMPTY;
	}
	
	GameBoard.side = COLORS.BOTH;
	GameBoard.enPas = SQUARES.NO_SQ;
	GameBoard.fiftyMove=0;
	GameBoard.ply=0;
	GameBoard.hisPly=0;
	GameBoard.castlePerm=0;
	GameBoard.posKey=0;
	GameBoard.moveListStart[GameBoard.ply]=0;
}

//rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
function ParseFen(fen){
	ResetBoard();
	
	//start with rank 8 and file a
	//we have to loop through ranks and files, everytime we
	//come across a slash or a space we will decrement ranks 
	var rank = RANKS.RANK_8;
	var file = FILES.FILE_A;
	var piece = 0;
	var count = 0;
	var sq120 = 0;
	//will be used to point a particular character in the string
	var fenCnt = 0; //fen[fenCnt]
	
	while((rank >= RANKS.RANK_1) && fenCnt < fen.length){
		count = 1;
		
		switch(fen[fenCnt]){
			case 'p':piece = PIECES.bP; break;
			case 'r':piece = PIECES.bR; break;
			case 'n':piece = PIECES.bN; break;
			case 'b':piece = PIECES.bB; break;
			case 'k':piece = PIECES.bK; break;
			case 'q':piece = PIECES.bQ; break;
			case 'P':piece = PIECES.wP; break;
			case 'R':piece = PIECES.wR; break;
			case 'N':piece = PIECES.wN; break;
			case 'B':piece = PIECES.wB; break;
			case 'K':piece = PIECES.wK; break;
			case 'Q':piece = PIECES.wQ; break;
			
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
					piece = PIECES.EMPTY;
					//set the number-character to a integer
					count = Number(fen[fenCnt]);
					break;
					
			case '/':
			case ' ':
					rank--;
					file = FILES.FILE_A;
					fenCnt++;
					continue;
			default:
				console.log("FEN error");
				return;
		} //end switch
		
		for (var i=0; i<count;i++){
			sq120 = FR2SQ(file,rank);
			GameBoard.pieces[sq120]=piece;
			file++;
		}
		fenCnt++;
	} //end while
	
	GameBoard.side = (fen[fenCnt]=='w') ? COLORS.WHITE : COLORS.BLACK;
	//if there would not be a castle permission there would be a dash
	fenCnt+=2;
	
	for(var i = 0;i<4;i++){
		if (fen[fenCnt] == ' ')
			break;
		switch(fen[fenCnt]){
		case 'K': GameBoard.castlePerm |= CASTLEBIT.WKCA; break;
		case 'Q': GameBoard.castlePerm |= CASTLEBIT.WQCA; break;
		case 'k': GameBoard.castlePerm |= CASTLEBIT.BKCA; break;
		case 'q': GameBoard.castlePerm |= CASTLEBIT.BQCA; break;
		default: break;
		}
		fenCnt++;
	}
	fenCnt++;
	
	//enPas: dash or for example e6
	if(fen[fenCnt] != '-'){
		file = fen[fenCnt].charCodeAt() - 'a'.charCodeAt();
		rank = Number(fen[fenCnt+1]) -1;
		console.log("fen[fenCnt]:" + fen[fenCnt] + " File: "+file+ " Rank: "+ rank);
		GameBoard.enPas = FR2SQ(file,rank);
	}
	
	GameBoard.posKey = GeneratePosKey();
	UpdateListsMaterial();
	PrintSqAttacked();
}

function PrintSqAttacked(){
	
	var sq,file,rank,piece;
	console.log("\nAttacked:\n");
	
	//going from the back rank, incrementing by file, print a X or a - depending
	//on whether the square is attacked by the current side to move or not
	for(rank = RANKS.RANK_8; rank>= RANKS.RANK_1;rank--){
		var line =((rank+1) + " ");
		for(file = FILES.FILE_A; file<=FILES.FILE_H;file++){
			sq = FR2SQ(file,rank);
			if(SqAttacked(sq,GameBoard.side))
				piece = "X";
			else piece ="-";
			line+= (" " + piece + " ");
		}
		console.log(line);
	}
	console.log("");
}


//is the square sq attacked by the side side?
function SqAttacked(sq, side){
	var pce;
	var t_sq;
	var index;
	
	if(side == COLORS.WHITE){
		//then a white pawn is attacking the square
		if(GameBoard.pieces[sq-11] == PIECES.wP || GameBoard.pieces[sq-9] == PIECES.wP){
			return BOOL.TRUE;
		}
	} else{
		//then a black pawn is attacking the square
		if(GameBoard.pieces[sq+11] == PIECES.bP || GameBoard.pieces[sq+9] == PIECES.bP){
			return BOOL.TRUE;
		}
	}
	
	//for non sliding pieces
	//knight
	for(index = 0; index < 8; index++){
		//square we looking at + knight direction
		pce = GameBoard.pieces[sq + KnDir[index]];
		if(pce != SQUARES.OFFBOARD && PieceCol[pce] == side && PieceKnight[pce] == BOOL.TRUE){
			//knight of the correct color
			return BOOL.TRUE;
		}
	}
	
	//sliding pieces
	//rook
	for(index = 0; index<4; index++){
		dir = RkDir[index];
		t_sq = sq + dir;
		pce = GameBoard.pieces[t_sq];
		//keep looping until we hit a piece
		while(pce!=SQUARES.OFFBOARD){
			if(pce != PIECES.EMPTY){
				if(PieceRookQueen[pce]==BOOL.TRUE && PieceCol[pce] == side){
					return BOOL.TRUE;
				}
				break;
			}
			//move on to the next square
			t_sq += dir;
			//set our piece to pieces[t_sq]
			pce = GameBoard.pieces[t_sq];
		}
	}
	
	//sliding pieces
	//bishop
	for(index = 0; index<4; index++){
		dir = BiDir[index];
		t_sq = sq + dir;
		pce = GameBoard.pieces[t_sq];
		//keep looping until we hit a piece
		while(pce!=SQUARES.OFFBOARD){
			if(pce != PIECES.EMPTY){
				if(PieceBishopQueen[pce]==BOOL.TRUE && PieceCol[pce] == side){
					return BOOL.TRUE;
				}
				break;
			}
			//move on to the next square
			t_sq += dir;
			//set our piece to pieces[t_sq]
			pce = GameBoard.pieces[t_sq];
		}
	}
	
	//king
	for(index = 0; index < 8; index++){
		//square we looking at + knight direction
		pce = GameBoard.pieces[sq + KiDir[index]];
		if(pce != SQUARES.OFFBOARD && PieceCol[pce] == side && PieceKing[pce] == BOOL.TRUE){
			//knight of the correct color
			return BOOL.TRUE;
		}
	}
	
	return BOOL.FALSE;
}

















