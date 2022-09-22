import { NodeTypes } from "./ast";


export function transform(root) {
  // 1. 遍历 - 深度优先搜索
  traverseNode(root)
  // 2. 修改 text content
}

function traverseNode(node: any) {
  console.log(node);
  const children = node.children
  // 先粗暴的通过单测
  if(node.type === NodeTypes.TEXT) {
    node.content = node.content + 'mini-vue'
  }

  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i]
      traverseNode(node)
    }
  }
}
