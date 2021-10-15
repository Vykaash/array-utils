/**
 * copies source to target in range of [from, to).
 * does not validate indices.
 */
const copy = (target, source, from, to) => {
    for (; from < to; ++from) {
        target[from] = source[from];
    }
    return target;
};
/**
 * returns a new buffer array with length of newSize
 */
const resizeBuffer = (buffer, newSize) => {
    const viewCnstr = buffer['constructor'];
    const newBuff = new ArrayBuffer(newSize * buffer.BYTES_PER_ELEMENT);
    const newView = new viewCnstr(newBuff);
    copy(newView, buffer, 0, Math.min(buffer.length, newSize));
    return newView;
};
/**
 * does not validate indices.
 * @returns array with values at a and b swapped
 */
const swap = (array, a, b) => {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    return array;
};
/**
 * a faster remove method than `splice` for UNORDERED arrays. the value at indexToRemove is replaced
 * with the result of array.pop(). does not validate indices
 * @returns the removed value or undefined if array is empty (same as default pop behavior)
 */
const swapNPop = (array, indexToRemove) => {
    const swapVal = array.pop();
    if (indexToRemove >= array.length) {
        return swapVal;
    }
    const returnVal = array[indexToRemove];
    array[indexToRemove] = swapVal;
    return returnVal;
};

export { copy, resizeBuffer, swap, swapNPop };
