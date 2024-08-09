import { Board } from '../board'
import { Player } from '../player'
import { Piece } from './piece.class'

export class Queen extends Piece {
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
            return 'assets/pieces/wq.png'
        }
        return 'assets/pieces/bq.png'
    }

    override hints(): number[] {
        let hints: number[] = []
        this.traverseBoard((row, col) => {
            hints.push(row * 8 + col)
            return true;
        })
        return hints
    }

    override edibleBoxes(): number[] {
        let edibleBoxes: number[] = []
        this.traverseBoard((row, col) => {
            const piece = this.board.getPiece(row * 8 + col)
            if (piece && piece.player.color !== this.player.color) {
                edibleBoxes.push(row * 8 + col)
                return false
            }
            return true;
        })
        return edibleBoxes
    }

    traverseBoard(callback: (row: number, col: number) => boolean): void {
        let directions = [
            { dx: 1, dy: 1 },
            { dx: -1, dy: -1 },
            { dx: 1, dy: -1 },
            { dx: -1, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
        ]
        for (let { dx, dy } of directions) {
            let row = this.positionX
            let col = this.positionY
            while (
                row + dx >= 0 &&
                row + dx <= 7 &&
                col + dy >= 0 &&
                col + dy <= 7
            ) {
                row += dx
                col += dy
                if (!callback(row, col)) {
                    break
                }
            }
        }
    }

    checkMovement(): boolean {
        throw new Error('Method not implemented.')
    }
}
