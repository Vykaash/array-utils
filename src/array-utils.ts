// recursively inserts a T into R until R's length is N
type _TFixedLength<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TFixedLength<T, N, [T, ...R]>;

/**
 * @example
 * ```ts
 * // make an array type equivelent to [number x 16]
 * type Matrix = TFixedLength<number, 16>;
 * ```
 */
export type TFixedLength<T, N extends number> = number extends N ? T[] : _TFixedLength<T, N, []>;

export type TIndexable<T> = { [key: number]: T }
export type TIterable<T> = { [Symbol.iterator](): IterableIterator<T> };
export type TIndexableIterable<T> = TIndexable<T> & TIterable<T>;

export interface IBufferArrayConstructor<T extends TBufferArrays> {
    new(): T;
    new(elements: Iterable<number>): T;
    new(length: number): T;
    new(arrayOrArrayBuffer: ArrayBuffer | ArrayLike<number> | SharedArrayBuffer): T;
    new(buffer: ArrayBuffer | SharedArrayBuffer, byteOffset: number, length?: number): T;
}

export interface IFloatBufferArrayConstructor<T extends TFloatBufferArrays> {
    new(): T;
    new(elements: Iterable<number>): T;
    new(length: number): T;
    new(arrayOrArrayBuffer: ArrayBuffer | ArrayLike<number> | SharedArrayBuffer): T;
    new(buffer: ArrayBuffer | SharedArrayBuffer, byteOffset: number, length?: number): T;
}

export interface IIntegerBufferArrayConstructor<T extends TIntegerBufferArrays> {
    new(): T;
    new(elements: Iterable<number>): T;
    new(length: number): T;
    new(arrayOrArrayBuffer: ArrayBuffer | ArrayLike<number> | SharedArrayBuffer): T;
    new(buffer: ArrayBuffer | SharedArrayBuffer, byteOffset: number, length?: number): T;
}

export type TBufferArrays = Float64Array
    | Float32Array
    | Uint32Array
    | Int32Array
    | Uint16Array
    | Int16Array
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    ;

export type TFloatBufferArrays = Float64Array
    | Float32Array
    ;

export type TInferIndexableGeneric<T> = T extends TIndexable<infer A> ? A : never;

export type TIntegerBufferArrays = Uint32Array
    | Uint32Array
    | Int32Array
    | Uint16Array
    | Int16Array
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    ;

export const copy = <T extends TIndexable<any>, U extends TIndexable<TInferIndexableGeneric<T>>>(target: T, source: U, from: number, to: number): T => {
    for (; from < to; ++from) {
        target[from] = source[from];
    }
    return target;
};

export const resizeBuffer = <T extends TBufferArrays>(buffer: T, newSize: number): T => {
    const viewCnstr = buffer['constructor'] as IBufferArrayConstructor<T>;
    const newBuff = new ArrayBuffer(newSize * buffer.BYTES_PER_ELEMENT);
    const newView = new viewCnstr(newBuff);

    copy(newView as TIndexable<number>, buffer, 0, Math.min(buffer.length, newSize));

    return newView;
}

export const swap = <T extends TIndexable<any>>(array: T, a: number, b: number): T => {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    return array;
}

/**
 * a faster remove method than `splice` for UNORDERED arrays. the value at indexToRemove is replaced
 * with the result of array.pop(). does not validate indices. if indexToRemove is >= array.length then
 * the pop() result is returned without any swapping.
 * @returns standard pop results
 */
export const swapNPop = <T extends TIndexable<any> & { length: number, pop(): TInferIndexableGeneric<T> | undefined }>(array: T, indexToRemove: number): TInferIndexableGeneric<T> | undefined => {
    const swapVal = array.pop();
    if (indexToRemove >= array.length) {
        return swapVal;
    }

    const returnVal = array[indexToRemove];
    array[indexToRemove] = swapVal;
    return returnVal;
}
