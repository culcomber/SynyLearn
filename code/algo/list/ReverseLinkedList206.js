// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 迭代解法
var reverseList = function(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

// 递归
var reverseList1 = function(head) {
  if (head == null || head.next == null) return head;
  const p = reverseList1(head.next);
  head.next.next = head;
  head.next = null;
  return p;
};

reverseList([1,2,3,4,5])
reverseList1([1,2,3,4,5])