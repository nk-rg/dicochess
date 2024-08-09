import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core'
import { DragDropService } from '../service/drag-drop.service'

@Directive({
    selector: '[appDraggable]',
    standalone: true,
})
export class DraggableDirective {
    @Input() appDraggable: any
    @Output() draggableEnd: EventEmitter<void> = new EventEmitter()
    private offsetX = 0
    private offsetY = 0
    private moveListener: (() => void) | null = null
    private upListener: (() => void) | null = null

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private dragDropService: DragDropService
    ) {}

    @HostListener('mousedown', ['$event'])
    onDragStart(event: any): void {
        event.preventDefault()
        this.dragDropService.setDraggedItem(this.appDraggable)

        const rect = this.el.nativeElement.getBoundingClientRect()
        const elementWidth = rect.width
        const elementHeight = rect.height
        this.offsetX = elementWidth / 2
        this.offsetY = elementHeight / 2
        const clone = this.el.nativeElement.cloneNode(true)

        this.dragDropService.element = clone

        this.renderer.setStyle(clone, 'position', 'absolute')
        this.renderer.setStyle(clone, 'z-index', '1000')
        this.renderer.setStyle(
            clone,
            'left',
            event.clientX - this.offsetX + 'px'
        )
        this.renderer.setStyle(
            clone,
            'top',
            event.clientY - this.offsetY + 'px'
        )
        this.renderer.setStyle(clone, 'width', event.target?.clientWidth + 'px')
        this.renderer.setStyle(
            clone,
            'height',
            event.target?.clientHeight + 'px'
        )
        this.renderer.addClass(this.el.nativeElement, 'dragging')
        this.renderer.setStyle(clone, 'pointer-events', 'none')
        document.body.appendChild(clone)

        this.moveListener = this.renderer.listen(
            'document',
            'mousemove',
            (moveEvent: MouseEvent) => {
                this.renderer.setStyle(
                    clone,
                    'left',
                    `${moveEvent.clientX - this.offsetX}px`
                )
                this.renderer.setStyle(
                    clone,
                    'top',
                    `${moveEvent.clientY - this.offsetY}px`
                )
            }
        )

        this.upListener = this.renderer.listen('document', 'mouseup', () => {
            this.draggableEnd.emit()
            this.dragDropService.clearDraggedItem()
            this.renderer.removeChild(document.body, clone)
            this.renderer.removeClass(this.el.nativeElement, 'dragging')
            this.removeListeners()
        })
    }

    private removeListeners(): void {
        if (this.moveListener) {
            this.moveListener()
            this.moveListener = null
        }
        if (this.upListener) {
            this.upListener()
            this.upListener = null
        }
    }

    ngOnDestroy(): void {
        this.removeListeners()
    }
}
