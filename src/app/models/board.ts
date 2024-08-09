import { Color } from './enums/color.enum'
import { Side } from './enums/orientation.enum'
import { Bishop } from './pieces/bishop'
import { King } from './pieces/king'
import { Knight } from './pieces/knight'
import { Pawn } from './pieces/pawn'
import { Piece } from './pieces/piece.class'
import { Queen } from './pieces/queen'
import { Rook } from './pieces/rook'
import { Player } from './player'

export class Board {
    pieces!: (Piece | null)[]
    hints!: number[]
    player1!: Player
    player2!: Player
    selectedPiece: Piece | null = null
    turn: Color = Color.WHITE

    constructor() {
        this.generateChessPieces()
        this.setHints([])
    }

    getPiece(index: number): Piece | null | undefined {
        return this.boxes[index].piece
    }

    getSelectedPiece() {
        return this.selectedPiece
    }

    deselectPiece() {
        this.selectedPiece = null
        this.setHints([])
    }

    movePieceFromTo(indexSelected: number, indexToMove: number): void {
        this.selectedPiece = null
        const auxPiece = this.boxes[indexSelected].piece
        this.boxes[indexSelected].piece = null
        this.boxes[indexToMove].piece = auxPiece
        this.turn = this.turn === Color.WHITE ? Color.BLACK : Color.WHITE
        this.setHints([])
    }

    selectPiece(index: number) {
        const piece = this.getPiece(index)!
        this.setHints(piece.hints())
        this.selectedPiece = piece
    }

    setHints(hints: number[]): void {
        this.hints = hints
    }

    boxes!: Box[]
    EMPTY = null
    generateChessPieces() {
        this.player1 = new Player('player1', Color.WHITE, Side.TOP)
        this.player2 = new Player('player2', Color.BLACK, Side.BOTTOM)
        this.boxes = [
            new Box(new Rook(0, 0, this.player1, this)),
            new Box(new Knight(0, 1, this.player1, this)),
            new Box(new Bishop(0, 2, this.player1, this)),
            new Box(new Queen(0, 3, this.player1, this)),
            new Box(new King(0, 4, this.player1, this)),
            new Box(new Bishop(0, 5, this.player1, this)),
            new Box(new Knight(0, 6, this.player1, this)),
            new Box(new Rook(0, 7, this.player1, this)),
            new Box(new Pawn(1, 0, this.player1, this)),
            new Box(new Pawn(1, 1, this.player1, this)),
            new Box(new Pawn(1, 2, this.player1, this)),
            new Box(new Pawn(1, 3, this.player1, this)),
            new Box(new Pawn(1, 4, this.player1, this)),
            new Box(new Pawn(1, 5, this.player1, this)),
            new Box(new Pawn(1, 6, this.player1, this)),
            new Box(new Pawn(1, 7, this.player1, this)),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(this.EMPTY),
            new Box(new Pawn(6, 0, this.player2, this)),
            new Box(new Pawn(6, 1, this.player2, this)),
            new Box(new Pawn(6, 2, this.player2, this)),
            new Box(new Pawn(6, 3, this.player2, this)),
            new Box(new Pawn(6, 4, this.player2, this)),
            new Box(new Pawn(6, 5, this.player2, this)),
            new Box(new Pawn(6, 6, this.player2, this)),
            new Box(new Pawn(6, 7, this.player2, this)),
            new Box(new Rook(7, 0, this.player2, this)),
            new Box(new Knight(7, 1, this.player2, this)),
            new Box(new Bishop(7, 2, this.player2, this)),
            new Box(new Queen(7, 3, this.player2, this)),
            new Box(new King(7, 4, this.player2, this)),
            new Box(new Bishop(7, 5, this.player2, this)),
            new Box(new Knight(7, 6, this.player2, this)),
            new Box(new Rook(7, 7, this.player2, this)),
        ]
    }

    getTurnPlayer(): Player {
        return this.turn === Color.WHITE ? this.player1 : this.player2
    }
}

export class Box {
    piece: Piece | null = null
    constructor(piece: Piece | null) {
        this.piece = piece
    }
}
