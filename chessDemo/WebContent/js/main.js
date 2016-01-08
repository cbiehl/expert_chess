$(function(){
	console.log("Main Init Called");	
	init();
	ParseFen(START_FEN);
	PrintBoard();
	GenerateMoves();
	PrintMoveList();
});

function InitFilesRanksBrd(){
	var file = FILES.FILE_A;
	var rank = RANKS.RANK_1;
	var sq = SQUARES.A1;
	
	/*
	 * first loop: set everything to offboard
	 * second loop: loop through files and ranks (=64 squares) and set each of the defined
	 * two arrays to the appropriate value
	 */
	
	for(var index = 0; index < BRD_SQ_NUM; index++){
		FilesBrd[index] = SQUARES.OFFBOARD;
		RanksBrd[index] = SQUARES.OFFBOARD;
	}
	
	for(rank = RANKS.RANK_1; rank<=RANKS.RANK_8; rank++){
		for(file = FILES.FILE_A; file<=FILES.FILE_H; file++){
			sq = FR2SQ(file,rank);
			FilesBrd[sq] = file;
			RanksBrd[sq] = rank;
		}
	}
};


function InitHashKeys(){
	//fill up arrays
	for(var index=0; index<14*120;index++){
		PieceKeys[index]=RAND_32();
	}
	
	SideKey=RAND_32();
	for(var index = 0; index<16; index++){
		CastleKeys[index]=RAND_32();
	}
};

//initialize arrays Sq120ToSq64 and Sq64ToSq120
function InitSq120To64(){
	var index = 0;
	var file = FILES.FILE_A;
	var rank = RANKS.RANK_1;
	var sq = SQUARES.A1;
	var sq64 = 0;
	
	//set the values to something non relevant
	for(index=0; index<BRD_SQ_NUM;index++){
		Sq120ToSq64[index]=65;
	}
	
	for(index=0; index<64;index++){
		Sq64ToSq120[index]=120;
	}
	
	//loop through the board in rank and file order
	for(rank = RANKS.RANK_1;rank<=RANKS.RANK_8;rank++){
		for(file = FILES.FILE_A;file<=FILES.FILE_H;file++){
			sq = FR2SQ(file,rank);
			Sq64ToSq120[sq64]=sq;
			Sq120ToSq64[sq]=sq64;
			sq64++;
		}
	}
}


function init(){
	console.log("init() called");
	InitFilesRanksBrd();
	InitHashKeys();
	InitSq120To64();
};