import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class DragDropService {
    public draggedItem: any | null = null
    public element: any = null

    constructor() {}

    setDraggedItem(item: any): void {
        this.draggedItem = item
    }

    clearDraggedItem(): void {
        this.draggedItem = null
    }
}
