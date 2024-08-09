import { CalculateBgPipe } from './calculate-bg.pipe'

describe('CalculateBgPipe', () => {
    it('create an instance', () => {
        const pipe = new CalculateBgPipe()
        expect(pipe).toBeTruthy()
    })
    it('should return bg-amber if row and column are even', () => {
        const pipe = new CalculateBgPipe()
        // expect(pipe.transform(0)).toEqual('bg-amber-900')
        expect(pipe.transform(9)).toEqual('bg-amber-900')
        // expect(pipe.transform(64)).toEqual('bg-amber-900')
    })
    it('should return bg-yellow if row and column are odd', () => {
        const pipe = new CalculateBgPipe()
        expect(pipe.transform(1)).toEqual('bg-yellow-200')
        expect(pipe.transform(33)).toEqual('bg-yellow-200')
        expect(pipe.transform(63)).toEqual('bg-yellow-200')
    })
})
