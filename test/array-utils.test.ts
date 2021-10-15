import * as au from '../src/array-utils';

test('resizeBuffer - grow', () => {
    const buffer = new Uint8Array([1, 2, 3, 4]);
    const resized = au.resizeBuffer(buffer, 8);

    expect(resized.length).toBe(8);
    expect(resized.toString()).toEqual('1,2,3,4,0,0,0,0');
});

test('resizeBuffer - shrink', () => {
    const buffer = new Uint32Array([1, 2, 3, 4]);
    const resized = au.resizeBuffer(buffer, 2);

    expect(resized.length).toBe(2);
    expect(resized.toString()).toEqual('1,2');
});

test('copy', () => {
    const a = [1, 2, 3, 4];
    const b = [0, 0, 0, 0];
    au.copy(b, a, 0, a.length);
    expect(b).toEqual(a);
});

test('swap', () => {
    expect(au.swap([1, 2], 0, 1)).toEqual([2, 1]);
    expect(au.swap([1], 0, 0)).toEqual([1]);
    expect(au.swap([1, 2, 3, 4], 1, 2)).toEqual([1, 3, 2, 4]);
    expect(au.swap([1, 2, 3, 4], 1, 1)).toEqual([1, 2, 3, 4]);
});

test('swapNpop', () => {
    {
        const a = [1, 2];
        expect(au.swapNPop(a, 0)).toBe(1);
        expect(a).toEqual([2]);
    }
    {
        const a = [1];
        expect(au.swapNPop(a, 0)).toBe(1);
        expect(a).toEqual([]);
    }
    {
        const a = [1, 2, 3, 4];
        expect(au.swapNPop(a, 3)).toBe(4);
        expect(a).toEqual([1,2,3]);
    }
    {
        const a = [];
        expect(au.swapNPop(a, 2)).toBe(undefined);
        expect(a).toEqual([]);
    }
})