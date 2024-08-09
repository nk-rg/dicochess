import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { CalculateBgPipe } from './calculate-bg.pipe'
import { Board } from './models/board'
import { BoxComponent } from './box/box.component'
import { DraggableDirective } from './directives/draggable.directive'
import { DroppableDirective } from './directives/droppable.directive'
import { DragDropService } from './service/drag-drop.service'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        CalculateBgPipe,
        BoxComponent,
        DraggableDirective,
        DroppableDirective,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    board = new Board()
    constructor(public dragDropservice: DragDropService) {}
    trackCustom(t: number) {
        console.log(t)
    }

    handleItemDropped(e: any) {
        console.log(e)
    }
}
