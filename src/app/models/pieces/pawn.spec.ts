import { Board } from '../board'
import { Pawn } from './pawn'
import { Piece } from './piece.class'

describe('Pawn movements', () => {
    it('should return bg-yellow if row and column are odd', () => {
        const board = new Board()
        const pawn = board.getPiece(8)
        expect(pawn).toBeInstanceOf(Pawn)
        expect(pawn!.hints()).toEqual([16, 24])
    })
})
