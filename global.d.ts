// global.d.ts
declare class ListNode {
    public val: number;
    public next: ListNode | null;
    constructor(val?: number, next?: ListNode | null);
}


declare class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null);
}