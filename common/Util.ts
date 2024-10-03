
export class Util {
    
    static shuffledCopy<T>(input: T[]) {
        const array = input.slice()
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    // roateArray  shiftArray
    static rotateArray<T>(input: T[], k: number) {
        const n = input.length
        k = ((k % n) + n) % n  // Normalize k
        return [...input.slice(-k), ...input.slice(0, -k)]
    }
}
