/**
 * copies source to target in range of [from, to).
 * does not preform any error checking.
 * @param from - defaults to 0
 * @param to - defaults to source.length
 */
const copy = (target, source, from = 0, to = source.length) => {
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

export { copy, resizeBuffer };
