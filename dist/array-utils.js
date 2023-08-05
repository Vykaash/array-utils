(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AU = {}));
})(this, (function (exports) { 'use strict';

    const copy = (target, source, from, to) => {
        for (; from < to; ++from) {
            target[from] = source[from];
        }
        return target;
    };
    const resizeBuffer = (buffer, newSize) => {
        const viewCnstr = buffer['constructor'];
        const newBuff = new ArrayBuffer(newSize * buffer.BYTES_PER_ELEMENT);
        const newView = new viewCnstr(newBuff);
        copy(newView, buffer, 0, Math.min(buffer.length, newSize));
        return newView;
    };
    const swap = (array, a, b) => {
        const temp = array[a];
        array[a] = array[b];
        array[b] = temp;
        return array;
    };
    /**
     * a faster remove method than `splice` for UNORDERED arrays. the value at indexToRemove is replaced
     * with the result of array.pop(). does not validate indices. if indexToRemove is >= array.length then
     * the pop() result is returned without any swapping.
     * @returns standard pop results
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

    exports.copy = copy;
    exports.resizeBuffer = resizeBuffer;
    exports.swap = swap;
    exports.swapNPop = swapNPop;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
