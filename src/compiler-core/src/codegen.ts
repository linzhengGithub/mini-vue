
export function generate(ast) {
  const context = createCodegenContext()
  const { push } = context

  push(`const { toDisplayString: _toDisplayString } = Vue`)
  push('\n')
  push('return ')

  const functionName = 'render'
  const args = ['_ctx', '_cache']
  const signature = args.join(', ')

  push(`function ${functionName} (${signature}) {`)

  push('return ')
  genNode(ast.codegenNode, context)
  push('}')

  return {
    code: context.code
  }

  function genNode(node, context) {
    const {push} = context
    push(`'${node.content}'`)
  }
}

function createCodegenContext(): any {
  const context = {
    code: '',
    push(source) {
      context.code += source
    }
  }
  return context
}
