/**
 * copies source to target in range of [from, to).
 * does not preform any error checking.
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
    copy(newView, buffer, 0, newSize);
    return newView;
};
const buff = new Float32Array(16);
buff.fill(20, 0, 8);

export { copy, resizeBuffer };
