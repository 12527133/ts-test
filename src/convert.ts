// convert.ts
const toLinkedList = (list: number[]): ListNode | null => {
    const len: number = list.length
    if (len === 0) {
        return null
    }
    const initListNode: ListNode = { val: -1, next: null }
    const result: ListNode = { ...initListNode }
    let temp: ListNode | null = result
    for (let i = 0; i < list.length; i++) {
        temp.val = list[i]
        temp.next = (i !== len - 1) ? { ...initListNode } : null
        temp = temp.next
    }
    return result
}
