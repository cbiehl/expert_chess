var PIECES = { EMPTY:0, wP:1, wN:2, wB:3, wR:4, wQ:5, wK:6,
			bP:7, bN:8, bB:9, bR: 10, bQ:11, bK:12};

var BRD_SQ_NUM = 120;

var FILES = { FILE_A:0, FILE_B:1, FILE_C:2, FILE_D:3,
		FILE_E:4, FILE_F:5, FILE_G:6, FILE_H:7, FILE_NONE:8};


var RANKS = {RANK_1:0, RANK_2:1, RANK_3:2, RANK_4:3, RANK_5:4,
		RANK_6: 5, RANK_7:6, RANK_8:7, RANK_NONE:8};

var COLORS = { WHITE:0, BLACK:1, BOTH:2};

var CASTLEBIT = { WKCA:1, WQCA:2, BKCA:4, BQCA: 8};

var SQUARES = {
	A1: 21, B1:22, C1:23, D1:24, E1:25, F1:26, G1:27, H1:28,
	A8: 91, B8:92, C8:93, D8:94, E8:95, F8:96, G8:97, H8:98,
	NO_SQ:99, OFFBOARD: 100
};

var BOOL = { FALSE:0, TRUE:1};

//store the list of moves that the board has in a given position in one array
//indexed by halv moves
//allocate the space of the array, we don't expect that there will be more than 2048 half moves in a game
var MAXGAMEMOVES = 2048;
//given position, we don't expect more than 256 moves to be generated
var MAXPOSITIONMOVES = 256;
//max depth that the engine will search through
var MAXDEPTH = 64;

var FilesBrd = new Array(BRD_SQ_NUM);
var RanksBrd = new Array(BRD_SQ_NUM);

var START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1";

var PceChar = ".PNBRQKpnbrqk";
var SideChar = "wb-";
var RankChar = "12345678";
var FileChar = "abcdefgh";


	//translate file&rank to a square number
function FR2SQ(f,r){
	return (21 + f) + (r*10);
}

//
var PieceBig = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE ];
//queen or rook
var PieceMaj = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE ];
//bishop or knight
var PieceMin = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
//pawn--> value:100, knight:325...
var PieceVal= [ 0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000  ];
var PieceCol = [ COLORS.BOTH, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE,
	COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK ];

//Is the piece a pawn, a knight...
var PiecePawn = [ BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];	
var PieceKnight = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
var PieceKing = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE ];
var PieceRookQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];
var PieceBishopQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE ];
var PieceSlides = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];

var KnDir = [-8, -19, -21, -12, 8, 19, 21, 12];
var RkDir = [-1, -10, 1, 10];
var BiDir = [-9, -11, 11, 9];
var KiDir = [-1, -10, 1, 10, -9, -11, 11, 9];

//array indexed by piece type - how many directions that piece can move in?
var DirNum = [0, 0, 8, 4, 4 ,8, 8, 0, 8, 4, 4, 8, 8];
//reference the correct directions array
//PceDir[wN][0], PceDir[wN][1]...
var PceDir = [0, 0, KnDir, BiDir, RkDir, KiDir, KiDir, 0, KnDir, BiDir, RkDir, KiDir, KiDir];
//get the piece depending on the side
//if the side to move is white - we will start at index 0 - keep looping to get the next piece while the value in this array is not 0
//black will start at index 3
var LoopNonSlidePce = [PIECES.wN, PIECES.wK, 0, PIECES.bN, PIECES.bK, 0];
//indexed by side
var LoopNonSlideIndex = [0, 3];
/*
 * while(pce!=0)
	 * move generation for non sliding pieces:
	 * pceIndex = LoopNonSlideIndex[side(white)] (0)
	 * pce = LoopNonSlidePce[pceIndex] (wN)
	 * pceIndex++;
	 * loop pceDir[wN][0-8]
	 * ...
 */


var LoopSlidePce = [PIECES.wB, PIECES.wR, PIECES.wQ, 0, PIECES.bB, PIECES.bR, PIECES.bQ, 0];
var LoopSlideIndex = [0, 4];

//used for piece on a particular square --> Pce*120 + sq
//en passant pce==EMPTY*120+sq
var PieceKeys = new Array (14*120);
//xor in or out
var SideKey;
//castle permission can be from 0 to 15(1111)
var CastleKeys = new Array(16);

var Sq120ToSq64 = new Array(BRD_SQ_NUM);
var Sq64ToSq120 = new Array(64);
//random number
function RAND_32(){
	
	return (Math.floor((Math.random()*255)+1) << 23) | (Math.floor((Math.random()*255)+1) << 16)
		| (Math.floor((Math.random()*255)+1) << 8) | (Math.floor((Math.random()*255)+1));
}	

function SQ64(sq120){
	return Sq120ToSq64[sq120];
}

function SQ120(sq64){
	return Sq64ToSq120[sq64];
}

function PCEINDEX(pce, pceNum){
	return (pce*10 + pceNum);
}


/*
Moves:
FromSq
F     C    7
1111 1100 0111

our squares can reach from 21 --> 98
move structure: (first 7 bits to move our from square)
From sq: 0000 0000 0000 0000 0000 0111 1111 --> From 0x7f
so our moves will look like that:
0010 1100 0000 1111 0000 0111 1111 --> stored in var d
from Sq = d & 0x7F (bitwise and with hexadecimal 7f)

To sq will be shifted left by seven bits (To >> 7, then bitwise and with 0x7F)


Need to know:
EnPas Cap
Captured Piece or not
Promoted Piece
Pawn Starting Move?
Castling Move

To get the captured information, we will shift it by 14, then bitwise and with 0xF
Captured >> 14, 0xF
EP 0x40000
Pawn Start 0x80000
Promoted Piece >> 20, 0xF
Castle 0x1000000
*/

//..to get the from square..
function FROMSQ(m){
	return (m & 0x7F);
}

function TOSQ(m){
	return ((m >> 7) & 0x7F);
}

function CAPTURED(m){
	return ((m >> 14) & 0xF);
}

function PROMOTED(m){
	return ((m>>20) & 0xF);
}

//move flag for en passante
var MFLAGEP = 0x40000;
//pawn start
var MFLAGPS = 0x80000;
//castling
var MFLAGCA = 0x1000000;

//is the move a capture move? Is something captured
var MFLAGCAP = 0x7C000;
//was the move a promotion or not?
var MFLAGPROM = 0xF00000;

var NOMOVE = 0;


function SQOFFBOARD(sq){
	if(FilesBrd[sq]==SQUARES.OFFBOARD)
		return BOOL.TRUE;
	return BOOL.FALSE;
}
