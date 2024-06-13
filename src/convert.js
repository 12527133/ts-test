"use strict";
// convert.ts
const toLinkedList = (list) => {
    const len = list.length;
    if (len === 0) {
        return null;
    }
    const initListNode = { val: -1, next: null };
    const result = { ...initListNode };
    let temp = result;
    for (let i = 0; i < list.length; i++) {
        temp.val = list[i];
        temp.next = (i !== len - 1) ? { ...initListNode } : null;
        temp = temp.next;
    }
    return result;
};
