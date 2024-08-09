import { Color } from './enums/color.enum';
import { Side } from './enums/orientation.enum'

export class Player {
    constructor(
        public name: string,
        public color: Color,
        public side: Side
    ) {}
}
