import { CommonModule } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    input,
} from '@angular/core'
import { CalculateBgPipe } from '../calculate-bg.pipe'
import { Board } from '../models/board'
import { Color } from '../models/enums/color.enum'
import { Piece } from '../models/pieces/piece.class'
import { DraggableDirective } from '../directives/draggable.directive'
import { DroppableDirective } from '../directives/droppable.directive'

@Component({
    selector: 'app-box',
    standalone: true,
    imports: [
        CalculateBgPipe,
        CommonModule,
        DraggableDirective,
        DroppableDirective,
    ],
    templateUrl: './box.component.html',
    styleUrl: './box.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent implements OnInit {
    image = input<string>()
    board = input.required<Board>()
    showHints = input.required<boolean>()
    index = input.required<number>()
    turn = input.required<Color>()
    selectedPiece = input.required<Piece | null>()

    constructor() {}

    ngOnInit(): void {}

    choosePiece() {
        const selectedPiece = this.selectedPiece()
        const currentPiece = this.board().getPiece(this.index())
        const currentPieceColor = currentPiece?.player.color
        const colorTurn = this.board().getTurnPlayer().color
        if (selectedPiece == null) {
            this.handleNotSelectedPiece(currentPieceColor, colorTurn)
            return
        }
        this.handleSelectedPiece(currentPieceColor!)
    }

    private handleSelectedPiece(currentPieceColor: Color) {
        const colorSelectedPiece = this.selectedPiece()!.player.color
        const indexSelectedPiece = this.selectedPiece()!.getIndex()
        if (currentPieceColor === colorSelectedPiece) {
            return this.board().selectPiece(this.index())
        }
        if (currentPieceColor !== colorSelectedPiece) {
            if (!this.selectedPiece()!.canEat(this.index())) {
                return this.board().deselectPiece()
            }
            this.selectedPiece()!.move(this.index())
            this.board().movePieceFromTo(indexSelectedPiece, this.index())
        }
    }

    private handleNotSelectedPiece(
        currentPieceColor: Color | undefined,
        colorTurn: Color
    ) {
        if (currentPieceColor === colorTurn) {
            this.board().selectPiece(this.index())
        }
    }

    movePiece() {
        const selectedPiece = this.selectedPiece()!
        const indexSelectedPiece = selectedPiece.getIndex()
        selectedPiece.move(this.index())
        this.board().movePieceFromTo(indexSelectedPiece, this.index())
        console.log(' moving')
    }

    canDrop = (index: number): boolean => {
        const selectedPiece = this.selectedPiece()
        if (selectedPiece?.getIndex() === this.index()) {
            return false
        }
        return selectedPiece?.canGo(this.index()) || false
    }
    handleDropped(event: any) {
        if (this.index() === this.selectedPiece()?.getIndex()) {
            return
        }
        this.movePiece()
    }
}
