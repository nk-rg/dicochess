import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    Renderer2,
} from '@angular/core'

import { DragDropService } from '../service/drag-drop.service'

@Directive({
    selector: '[appDroppable]',
    standalone: true,
})
export class DroppableDirective implements OnInit {
    @Input() appDroppable: any
    @Input() canDrop!: (index: number) => boolean
    @Output() itemDropped = new EventEmitter<any>()

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private dragDropService: DragDropService
    ) {}
    ngOnInit(): void {}

    @HostListener('mouseenter', ['$event'])
    onDragEnter(event: any): void {
        event.preventDefault()
        if (this.appDroppable && this.dragDropService.draggedItem) {
            this.renderer.setStyle(
                this.el.nativeElement,
                'border',
                '5px solid #fff'
            )
        }
    }

    @HostListener('mouseleave', ['$event'])
    onDragLeave(event: MouseEvent): void {
        event.preventDefault()
        this.renderer.removeStyle(this.el.nativeElement, 'border')
    }

    @HostListener('mouseup', ['$event'])
    onDrop(event: MouseEvent): void {
        event.preventDefault()
        if (
            this.appDroppable &&
            this.dragDropService.draggedItem &&
            this.canDrop(this.dragDropService.draggedItem)
        ) {
            console.log('MOUSE UP FROM DROPPABLE ASD')
            this.itemDropped.emit()
            this.renderer.setStyle(this.el.nativeElement, 'cursor', 'normal')
            this.renderer.removeStyle(this.el.nativeElement, 'border')
            this.renderer.removeChild(
                document.body,
                this.dragDropService.element
            )
            this.dragDropService.clearDraggedItem()
        }
    }
}
