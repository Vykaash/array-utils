declare type _TFixedLength<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TFixedLength<T, N, [T, ...R]>;
/**
 * @example
 * ```ts
 * // make an array type equivelent to [number x 16]
 * type Matrix = TFixedLength<number, 16>;
 * ```
 */
export declare type TFixedLength<T, N extends number> = number extends N ? T[] : _TFixedLength<T, N, []>;
export declare type TIndexable<T> = {
    [key: number]: T;
};
export declare type TIterable<T> = {
    [Symbol.iterator](): IterableIterator<T>;
};
export declare type TIndexableIterable<T> = TIndexable<T> & TIterable<T>;
export interface IBufferArrayConstructor<T extends TBufferArrays> {
    new (): T;
    new (elements: Iterable<number>): T;
    new (length: number): T;
    new (arrayOrArrayBuffer: ArrayBuffer | ArrayLike<number> | SharedArrayBuffer): T;
    new (buffer: ArrayBuffer | SharedArrayBuffer, byteOffset: number, length?: number): T;
}
export interface IFloatBufferArrayConstructor<T extends TFloatBufferArrays> {
    new (): T;
    new (elements: Iterable<number>): T;
    new (length: number): T;
    new (arrayOrArrayBuffer: ArrayBuffer | ArrayLike<number> | SharedArrayBuffer): T;
    new (buffer: ArrayBuffer | SharedArrayBuffer, byteOffset: number, length?: number): T;
}
export interface IIntegerBufferArrayConstructor<T extends TIntegerBufferArrays> {
    new (): T;
    new (elements: Iterable<number>): T;
    new (length: number): T;
    new (arrayOrArrayBuffer: ArrayBuffer | ArrayLike<number> | SharedArrayBuffer): T;
    new (buffer: ArrayBuffer | SharedArrayBuffer, byteOffset: number, length?: number): T;
}
export declare type TBufferArrays = Float64Array | Float32Array | Uint32Array | Int32Array | Uint16Array | Int16Array | Uint8Array | Uint8ClampedArray | Int8Array;
export declare type TFloatBufferArrays = Float64Array | Float32Array;
export declare type TInferIndexableGeneric<T> = T extends TIndexable<infer A> ? A : never;
export declare type TIntegerBufferArrays = Uint32Array | Uint32Array | Int32Array | Uint16Array | Int16Array | Uint8Array | Uint8ClampedArray | Int8Array;
/**
 * copies source to target in range of [from, to).
 * does not validate indices.
 */
export declare const copy: <T extends TIndexable<any>, U extends TIndexable<TInferIndexableGeneric<T>>>(target: T, source: U, from: number, to: number) => T;
/**
 * returns a new buffer array with length of newSize
 */
export declare const resizeBuffer: <T extends TBufferArrays>(buffer: T, newSize: number) => T;
/**
 * does not validate indices.
 * @returns array with values at a and b swapped
 */
export declare const swap: <T extends TIndexable<any>>(array: T, a: number, b: number) => T;
/**
 * a faster remove method than `splice` for UNORDERED arrays. the value at indexToRemove is replaced
 * with the result of array.pop(). does not validate indices
 * @returns the removed value or undefined if array is empty (same as default pop behavior)
 */
export declare const swapNPop: <T extends TIndexable<any> & {
    length: number;
    pop(): TInferIndexableGeneric<T> | undefined;
}>(array: T, indexToRemove: number) => TInferIndexableGeneric<T> | undefined;
export {};
