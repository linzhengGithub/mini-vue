export function transform(root, options = {}) {
  const context = createTransformContext(root, options)
  
  traverseNode(root, context)

  createRootCodegen(root)
}

function createRootCodegen(root: any) {
  root.codegenNode = root.children[0]
}

function createTransformContext(root: any, options: any): any {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || []
  }

  return context
}

function traverseNode(node: any, context) {
  // if (node.type === NodeTypes.TEXT) {
  //   node.content = node.content + 'mini-vue'
  // }
  // 将上面代码 通过 plugin 的方式执行
  const { nodeTransforms } = context
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i]
    transform(node)
  }

  console.log(node);

  traverseChildren(node, context);
}

function traverseChildren(node, context) {
  const children = node.children
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, context);
    }
  }
}
