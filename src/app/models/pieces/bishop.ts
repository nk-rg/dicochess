import { Board } from '../board'
import { Player } from '../player'
import { Piece } from './piece.class'

export class Bishop extends Piece {
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
            return 'assets/pieces/wb.png'
        }
        return 'assets/pieces/bb.png'
    }
    override hints(): number[] {
        const hints: number[] = []
        this.traverseBoard((row, col) => {
            hints.push(row * 8 + col)
            return true
        })
        return hints
    }

    override edibleBoxes(): number[] {
        const edibleBoxes: number[] = []
        this.traverseBoard((row, col) => {
            const piece = this.board.getPiece(row * 8 + col)
            if (piece && piece.player.color !== this.player.color) {
                edibleBoxes.push(piece.getIndex())
                return false
            }
            return true
        })
        return edibleBoxes
    }

    private traverseBoard(callback: (row: number, col: number) => boolean) {
        const directions = [
            { dx: 1, dy: -1 },
            { dx: 1, dy: 1 },
            { dx: -1, dy: 1 },
            { dx: -1, dy: -1 },
        ]

        for (const { dx, dy } of directions) {
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

    override canEat(index: number): boolean {
        return this.edibleBoxes().includes(index)
    }

    checkMovement(): boolean {
        throw new Error('Method not implemented.')
    }
}
