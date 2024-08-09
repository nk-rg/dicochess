import { Board } from '../board'
import { Color } from '../enums/color.enum'
import { Player } from '../player'

export abstract class Piece {
    constructor(
        public positionX: any,
        public positionY: any,
        public player: Player,
        public board: Board
    ) {}

    abstract hints(): number[]
    abstract getImagePath(): string
    move(index: number): void {
        this.positionX = Math.floor(index / 8)
        this.positionY = index % 8
    }
    isWhite(): boolean {
        return this.player.color === Color.WHITE
    }
    abstract edibleBoxes(): number[]

    canGo(index: number): boolean {
        const hintsFilter = this.hints().filter(
            (x) => !this.edibleBoxes().includes(x)
        )
        return hintsFilter.includes(index) || this.canEat(index)
    }

    canEat(index: number): boolean {
        const pieceToEat = this.board.getPiece(index)
        return (
            !!pieceToEat &&
            pieceToEat.player.color !== this.player.color &&
            this.edibleBoxes().includes(index)
        )
    }

    getIndex(): number {
        return this.positionX * 8 + this.positionY
    }
}
