import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'calculateBg',
    standalone: true,
})
export class CalculateBgPipe implements PipeTransform {
    transform(value: number, ...args: unknown[]): string {
        const row = Math.floor(value / 8)
        const column = value % 8
        if (
            (this.isEven(row) && this.isEven(column)) ||
            (!this.isEven(row) && !this.isEven(column))
        ) {
            return 'bg-amber-900'
        }
        return 'bg-yellow-200'
    }

    isEven(value: number) {
        return value % 2 == 0
    }
}
