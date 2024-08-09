import { Board } from '../board'
import { Player } from '../player'
import { Piece } from './piece.class'

export class King extends Piece {
    constructor(
        positionX: number,
        positionY: number,
        player: Player,
        board: Board
    ) {
        super(positionX, positionY, player, board)
    }
    override getImagePath(): string {
        if (this.isWhite()) {
            return 'assets/pieces/wk.png'
        }
        return 'assets/pieces/bk.png'
    }
    override hints(): number[] {
        let possibleHints = [
            { row: this.positionX - 1, column: this.positionY - 1 }, // left-up
            { row: this.positionX - 1, column: this.positionY + 1 }, // right-up
            { row: this.positionX + 1, column: this.positionY + 1 }, // bottom-right
            { row: this.positionX + 1, column: this.positionY - 1 }, // bottom-left
            { row: this.positionX - 1, column: this.positionY }, //up
            { row: this.positionX + 1, column: this.positionY }, // bottom
            { row: this.positionX, column: this.positionY + 1 }, // right
            { row: this.positionX, column: this.positionY - 1 }, // left
        ]
        return possibleHints
            .filter(
                (pos) =>
                    pos.row >= 0 &&
                    pos.column <= 7 &&
                    pos.column >= 0 &&
                    pos.column <= 7
            )
            .map((pos) => pos.row * 8 + pos.column)
    }

    override edibleBoxes(): number[] {
        return this.hints();
    }
    checkMovement(): boolean {
        throw new Error('Method not implemented.')
    }
}
