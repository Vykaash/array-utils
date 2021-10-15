## Notes from the author
MIT license. Project is intended for personal use, but is made available, as is, for anyone who finds it useful. Use at your own discretion

## array-utils
Collection of types and behaviors for arrays/typed arrays I found useful in my own work.

### TFixedLength<type, count>
For specifying an array should have a specific length
```ts
// make an array type equivelent to [number x 16]
type Matrix = TFixedLength<number, 16>;
```

### TIndexable, TIterable, TIndexableIterable
For specifying types that have array-like behaviors, but may not be arrays by definition.
I hope the names are obvious, but just in case here is a brief description of each:<br>
An indexable implies usage such as `indexable[1]`<br>
An iterable implies usage such as `for (const element of iterable)`<br>
IndexableIterable is simply an intersection of the above in the form `Indexable & Iterable`<br>

### IBufferArrayConstructor, IFloatBufferArrayConstructor, IIntegerBufferArrayConstructor
Generic constructor types for `TypeArrays`

### TBufferArrays, TFloatBufferArrays, TIntegerBufferArrays
Union types for `TypeArrays`

### TInferIndexableGeneric
Used to determine what kind of data an indexable will return if you index into that object
```ts
// examples
const array = [1,2,3]; //number[]
const val: TInferIndexableGeneric<array>; // resolves to number

const val: TInferIndexableGeneric<[1, '2']>; // resolves to (1 | '2')

const array = [35, 'hello'];
const val: TInferIndexableGeneric<array>; // resolves to unknown
```

### copy(target: Indexable, source: Indexable, from: number, to: number): target
Copies the range [from, to) within source, to target. No error checking is performed, so make sure
target is large enough to copy into<br>
```ts
const source = [1,2,3];
const target = [0,0,0];

copy(target, source, 0, 1); // target is now [1,0,0]
```

### resizeBuffer(buffer: typed array, newSize: number): new instance of same typed array
Will create a new view(`TypeArray`) and `ArrayBuffer` of size `newSize`. Original contents are copied into the new buffer. Can be used to shrink buffers<br>
```ts
const buff = new Float32Array(16); // 16 floats
buff.fill(20, 0, 8); // first 8 hold the value 20
const largerBuff = resize(buff, 24); // largerBuff holds 24 floats, the first 8 hold the value 20
const smallerBuff = resize(buff, 4); //smallerBuff holds 4 floats, all of which hold the value 20
```

### swap(array: Indexable, a: number, b: number): array
Will swap `array[a]` with `array[b]`. No error checking is performed so make sure `a` and `b` are within [0, `array.length`)

### swapNPop(array: Indexable & {length: number}, indexToRemove: number): removed value | undefined
Intended for UNORDERED collections, as an alternative to `splice`. follows same rules as `pop`, but can be used to remove a value from anywhere. If you care about element order after removal, use this function with care
```ts
// examples
const data = [1, 2, 3];
const removedItem = swapNPop(data, 1); // returns 2, data is [1,3]

const data = [];
const removedItem = swapNPop(data, 15); // returns undefined, data is []

const data = [1];
const removedItem = swapNPop(data, 0); // returns 1, data is []
```