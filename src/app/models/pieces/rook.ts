import { Board } from '../board'
import { Player } from '../player'
import { Piece } from './piece.class'

export class Rook extends Piece {
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
            return 'assets/pieces/wr.png'
        }
        return 'assets/pieces/br.png'
    }
    override hints(): number[] {
        let hints: number[] = []
        this.traverseBoard((row, col) => {
            hints.push(row * 8 + col)
            return true
        })
        return hints
    }

    override edibleBoxes(): number[] {
        let edibleBoxes: number[] = []
        this.traverseBoard((row, col) => {
            const piece = this.board.getPiece(row * 8 + col)
            if (piece && piece.player !== this.player) {
                edibleBoxes.push(piece.getIndex())
                return false
            }
            return true
        })
        return edibleBoxes
    }

    traverseBoard(callback: (row: number, col: number) => boolean): void {
        let directions = [
            { dx: -1, dy: 0 }, // up
            { dx: 1, dy: 0 }, // down
            { dx: 0, dy: -1 }, // left
            { dx: 0, dy: 1 }, // right
        ]

        for (let { dx, dy } of directions) {
            let row = this.positionX
            let column = this.positionY
            while (
                row + dx >= 0 &&
                row + dx <= 7 &&
                column + dy >= 0 &&
                column + dy <= 7
            ) {
                row += dx
                column += dy
                if (!callback(row, column)) {
                    break
                }
            }
        }
    }
    checkMovement(): boolean {
        throw new Error('Method not implemented.')
    }
}
