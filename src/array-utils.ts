type _TFixedLength<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TFixedLength<T, N, [T, ...R]>;
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

export type TIntegerBufferArrays = Uint32Array
    | Uint32Array
    | Int32Array
    | Uint16Array
    | Int16Array
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    ;

/**
 * copies source to target in range of [from, to).
 * does not preform any error checking.
 * @param from - defaults to 0
 * @param to - defaults to source.length
 */
export const copy = <T extends (TIndexable<any> & { length: number }), U extends (TIndexable<any> & { length: number })>(target: T, source: U, from = 0, to = source.length): T => {
    for (; from < to; ++from) {
        target[from] = source[from];
    }
    return target;
};

/**
 * returns a new buffer array with length of newSize
 */
export const resizeBuffer = <T extends TBufferArrays>(buffer: T, newSize: number): T => {
    const viewCnstr = buffer['constructor'] as IBufferArrayConstructor<T>;

    const newBuff = new ArrayBuffer(newSize * buffer.BYTES_PER_ELEMENT);
    const newView = new viewCnstr(newBuff);

    copy(newView, buffer, 0, newSize);

    return newView;
}