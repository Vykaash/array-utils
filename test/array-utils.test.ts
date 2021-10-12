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
})