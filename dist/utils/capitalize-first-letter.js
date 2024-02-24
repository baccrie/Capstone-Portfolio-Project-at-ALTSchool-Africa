"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = exports.capitalize = void 0;
function capitalize(inputData) {
    const newInput = inputData.replace(' ', '-').toLowerCase();
    return newInput
        .split('-')
        .map((el) => {
        return el[0].toUpperCase() + el.slice(1);
    })
        .join('-');
}
exports.capitalize = capitalize;
function trim(inputData) {
    const newInput = inputData.toLowerCase().split(' ');
    let newInput2 = newInput.map((el) => {
        let newel = el.split('-');
        newel = newel
            .map((elm) => {
            return elm[0].toUpperCase() + elm.slice(1);
        })
            .join('-');
        return newel;
    });
    newInput2 = newInput2.map((el) => {
        let elem = el.split('/');
        elem = elem
            .map((part) => {
            return part[0].toUpperCase() + part.slice(1);
        })
            .join('/');
        return elem;
    });
    return newInput2.join(' ');
}
exports.trim = trim;
//# sourceMappingURL=capitalize-first-letter.js.map