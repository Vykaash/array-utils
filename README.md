## Notes from the author
Project is intended for personal use, but is made available, as is, for anyone who finds it useful. Use at your own discretion.

# array-utils
Collection of types and behaviors for arrays/typed arrays I found useful in my own work.

### TFixedLength<type, count>
For specifying an array should have a specific length.
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

### copy(target: Indexable, source: Indexable, from: number, to: number): target
Copies the range [from, to) within source, to target. No error checking is performed, so make sure
target is large enough to copy into<br>
```ts
const source = [1,2,3];
const target = [0,0,0];

copy(target, source, 0, 1); // target is now [1,0,0]
```

### resizeBuffer(buffer: TypedArray type, newSize: number): new instance of same type as buffer
Will create a new view(`TypeArray`) and `ArrayBuffer` of size `newSize`. Original contents are copied into
the new buffer. Can be used to shrink buffers<br>
```ts
const buff = new Float32Array(16); // 16 floats
buff.fill(20, 0, 8); // first 8 hold the value 20
const largerBuff = resize(buff, 24); // largerBuff holds 24 floats, the first 8 hold the value 20
const smallerBuff = resize(buff, 4); //smallerBuff holds 4 floats, all of which hold the value 20
```
