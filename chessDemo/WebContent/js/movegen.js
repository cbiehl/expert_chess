//construct a move
function MOVE(from, to, captured, promoted, flag){
	return (from | (to << 7) | (captured << 14) | (promoted << 20) | flag);
}
//adding moves into the moveList
function AddCaptureMove(move){
	//call our movelist on a certain index
	GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply+1]] = move;
	//relevant for search tree
	GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply+1]] = 0;
	GameBoard.moveList[GameBoard.ply+1];
	
}

function AddQuietMove(move){
	//call our movelist on a certain index
	GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply+1]] = move;
	//relevant for search tree
	GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply+1]] = 0;
	GameBoard.moveList[GameBoard.ply+1];
	
}

function AddEnPassanteMove(move){
	//call our movelist on a certain index
	GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply+1]] = move;
	//relevant for search tree
	GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply+1]] = 0;
	GameBoard.moveList[GameBoard.ply+1];
	
}

function GenerateMoves(){
	/*
	 * GameBoard.moveListStart --> 'index' for the first move at a given ply
	 * GameBoard.moveList[index]
	 * 
	 * say ply is 1, we want to loop through all moves
	 * for(index = GameBoard.moveListStart[ply(1)]); index < GameBoard.moveListStart[2];++index){
	 * 	move = moveList[index]
	 * 	...use move
	 * }
	 */

	GameBoard.moveListStart[GameBoard.ply+1] = GameBoard.moveListStart[GameBoard.ply];
	
	var pceType, pceNum, sq, pceIndex, pce, t_sq, dir;
	
	if(GameBoard.side == COLORS.WHITE){
		pceType = PIECES.wP;
		//loop through all the pawns we have on our board using the piece list
		for(pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceType){
			sq = GameBoard.pList[PCEINDEX(pceType, pceNum)];
			
			if(GameBoard.pieces[sq+10] == PIECES.EMPTY){
				//Add Pawn Move
				if(RanksBrd[sq] == RANKS.RANK_2 && GameBoard.pieces[sq+20] == PIECES.EMPTY){
					//pawn start move - Add Quiet Move
				}
			}
			
			if(SQOFFBOARD(sq + 9) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq+9]] == COLORS.BLACK){
				//generate a capture move
				//Add Pawn Cap Move
			}
			
			if(SQOFFBOARD(sq + 11) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq+11]] == COLORS.BLACK){
				//generate a capture move
				//Add Pawn Cap Move
			}
			
			if(GameBoard.enPas != SQUARES.NOSQ){
				//if it is a enPassante square, we can generate a enPassante capture
				if(sq + 9 == GameBoard.enPas){
					//Add enPas Move
				}
				
				if(sq + 11 == GameBoard.enPas){
					//Add enPas Move
				}
			}
		}
		
		//castling
		if(GameBoard.castlePerm & CASTLEBIT.WKCA){
			if(GameBoard.pieces[SQUARES.F1] == PIECES.EMPTY && GameBoard.pieces[SQUARES.G1] == PIECES.EMPTY){
				if(SqAttacked(SQUARES.F1, COLORS.BLACK) == BOOL.FALSE && SqAttacked(SQUARES.E1, COLORS.BLACK) == BOOL.FALSE){
					//Add quiet (castling) move
				}
			}
		}
		
		if(GameBoard.castlePerm & CASTLEBIT.WQCA){
			if(GameBoard.pieces[SQUARES.D1] == PIECES.EMPTY && GameBoard.pieces[SQUARES.C1] == PIECES.EMPTY && GameBoard.pieces[SQUARES.B1] == PIECES.EMPTY){
				if(SqAttacked(SQUARES.D1, COLORS.BLACK) == BOOL.FALSE && SqAttacked(SQUARES.E1, COLORS.BLACK) == BOOL.FALSE){
					//Add quiet (castling) move
				}
			}
		}
	} else{
		pceType = PIECES.bP;
		
		//loop through all the pawns we have on our board using the piece list
		for(pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceType){
			sq = GameBoard.pList[PCEINDEX(pceType, pceNum)];
			
			if(GameBoard.pieces[sq-10] == PIECES.EMPTY){
				//Add Pawn Move
				if(RankBrd[sq] == RANKS.RANK_2 && GameBoard.pieces[sq-20] == PIECES.EMPTY){
					//pawn start move - Add Quiet Move
				}
			}
			
			if(SQOFFBOARD(sq - 9) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq-9]] == COLORS.WHITE){
				//generate a capture move
				//Add Pawn Cap Move
			}
			
			if(SQOFFBOARD(sq - 11) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq-11]] == COLORS.WHITE){
				//generate a capture move
				//Add Pawn Cap Move
			}
			
			if(GameBoard.enPas != SQUARES.NOSQ){
				//if it is a enPassante square, we can generate a enPassante capture
				if(sq - 9 == GameBoard.enPas){
					//Add enPas Move
				}
				
				if(sq - 11 == GameBoard.enPas){
					//Add enPas Move
				}
			}
		}
		
		
		//castling
		if(GameBoard.castlePerm & CASTLEBIT.BKCA){
			if(GameBoard.pieces[SQUARES.F8] == PIECES.EMPTY && GameBoard.pieces[SQUARES.G8] == PIECES.EMPTY){
				if(SqAttacked(SQUARES.F8, COLORS.WHITE) == BOOL.FALSE && SqAttacked(SQUARES.E8, COLORS.WHITE) == BOOL.FALSE){
					//Add quiet (castling) move
				}
			}
		}
		
		if(GameBoard.castlePerm & CASTLEBIT.BQCA){
			if(GameBoard.pieces[SQUARES.D8] == PIECES.EMPTY && GameBoard.pieces[SQUARES.C8] == PIECES.EMPTY && GameBoard.pieces[SQUARES.B8] == PIECES.EMPTY){
				if(SqAttacked(SQUARES.D8, COLORS.WHITE) == BOOL.FALSE && SqAttacked(SQUARES.E8, COLORS.WHITE) == BOOL.FALSE){
					//Add quiet (castling) move
				}
			}
		}
	}
	
	//non sliding piece moves
	//get pce for our side ->generate moves for wN, wK (non sliding pieces)
	//loop all directions for the piece --> we need to know the number of directions for a given piece
	pceIndex = LoopNonSlideIndex[GameBoard.side];
	pce = LoopNonSlidePce[pceIndex++];
	
	while(pce!=0){
		for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum){
			//get the square that this piece is on
			sq = GameBoard.pList[PCEINDEX(pce, pceNum)];
			
			//loop through all of the directions that this pce can move to
			for(index = 0; index < DirNum[pce]; index++){
				dir = PceDir[pce][index];
				t_sq = sq + dir;
				
				if(SQOFFBOARD(t_sq)){
					continue;
				}
				
				if(GameBoard.pieces[t_sq] != PIECES.EMPTY){
					//we could be making a capture
					if(PieceCol[GameBoard.pieces[t_sq]] != GameBoard.side){
						//add capture move
						AddCaptureMove(MOVE(sq, t_sq, GameBoard.pieces[t_sq], PIECES.EMPTY, 0));
					}
				}
				else{
					//Add quiet move
					AddQuietMove(MOVE(sq, t_sq, PIECES.EMPTY, PIECES.EMPTY, 0));
				}
			}
		}
		pce = LoopNonSlidePce[pceIndex++];
	}
	
	
	//sliding piece moves
	pceIndex = LoopSlideIndex[GameBoard.side];
	pce = LoopSlidePce[pceIndex++];
	
	while(pce!=0){
		for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum){
			//get the square that this piece is on
			sq = GameBoard.pList[PCEINDEX(pce, pceNum)];
			
			//loop through all of the directions that this pce can move to
			for(index = 0; index < DirNum[pce]; index++){
				dir = PceDir[pce][index];
				t_sq = sq + dir;
				
				while(!SQOFFBOARD(t_sq)){
					if(GameBoard.pieces[t_sq] != PIECES.EMPTY){
						//we could be making a capture
						if(PieceCol[GameBoard.pieces[t_sq]] != GameBoard.side){
							//add capture
							AddCaptureMove(MOVE(sq, t_sq, GameBoard.pieces[t_sq], PIECES.EMPTY, 0));
						}
						break;
					}
					//Add quiet move
					AddQuietMove(MOVE(sq, t_sq, PIECES.EMPTY, PIECES.EMPTY, 0));
					t_sq += dir;
				}
			}
		}
		pce = LoopSlidePce[pceIndex++];		
	}
}