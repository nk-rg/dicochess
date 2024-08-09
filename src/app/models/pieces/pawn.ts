import { Board } from '../board'
import { Side } from '../enums/orientation.enum'
import { Player } from '../player'
import { Piece } from './piece.class'

export class Pawn extends Piece {
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
            return 'assets/pieces/wp.png'
        }
        return 'assets/pieces/bp.png'
    }

    override hints(): number[] {
        const isTopSide = this.player.side === Side.TOP
        const positionXEdge = isTopSide ? 1 : 6
        const positionXModifier = isTopSide ? 1 : -1

        const hints = [
            (this.positionX + positionXModifier) * 8 + this.positionY,
        ]
        if (this.positionX === positionXEdge) {
            hints.push(
                (this.positionX + 2 * positionXModifier) * 8 + this.positionY
            )
        }
        return hints
            .filter((h) => this.board.getPiece(h) === null)
    }

    override edibleBoxes() {
        const isTopSide = this.player.side === Side.TOP
        const positionXModifier = isTopSide ? 1 : -1
        const row = (this.positionX + positionXModifier) * 8
        let edibleBoxes = []
        if (this.positionY >= 0 || this.positionY <= 6) {
            edibleBoxes.push(row + this.positionY + 1)
        }
        if (this.positionY >= 1 || this.positionY <= 7) {
            edibleBoxes.push(row + this.positionY - 1)
        }
        return edibleBoxes
    }

    checkMovement(): boolean {
        throw new Error('Method not implemented.')
    }
}
