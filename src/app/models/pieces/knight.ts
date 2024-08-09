import { Board } from '../board'
import { Color } from '../enums/color.enum'
import { Player } from '../player'
import { Piece } from './piece.class'

export class Knight extends Piece {
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
            return 'assets/pieces/wn.png'
        }
        return 'assets/pieces/bn.png'
    }
    override hints(): number[] {
        let hints: number[] = []

        let posibleHints = [
            { row: this.positionX - 1, column: this.positionY + 2 }, // right-bottom
            { row: this.positionX + 1, column: this.positionY + 2 }, // right-up
            { row: this.positionX - 1, column: this.positionY - 2 }, // left-bottom
            { row: this.positionX + 1, column: this.positionY - 2 }, // left-up
            { row: this.positionX - 2, column: this.positionY - 1 }, // up-left
            { row: this.positionX - 2, column: this.positionY + 1 }, // up-right
            { row: this.positionX + 2, column: this.positionY - 1 }, // bottom-left
            { row: this.positionX + 2, column: this.positionY + 1 }, // bottom-right
        ]

        for (let { row, column } of posibleHints) {
            let r = row
            let col = column
            if (r >= 0 && r <= 7 && col >= 0 && col <= 7) {
                hints.push(r * 8 + col)
            }
        }

        return hints
    }

    override edibleBoxes(): number[] {
        return this.hints().filter((h) => {
            const piece = this.board.getPiece(h)
            if (piece) {
                return piece.player.color !== this.player.color
            }
            return false
        })
    }

    checkMovement(): boolean {
        throw new Error('Method not implemented.')
    }
}
