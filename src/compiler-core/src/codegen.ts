import { NodeTypes } from "./ast"
import { CREATE_ELEMENT_VNODE, helperMapName, TO_DISPLAY_STRING } from "./tunTimeHelpers"

export function generate(ast) {
  const context = createCodegenContext()
  const { push } = context

  genFunctionPreamble(ast, context)

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
}

function genNode(node, context) {
  switch (node.type) {
    case NodeTypes.TEXT:
      getText(node, context)
      break;
    case NodeTypes.INTERPOLATION:
      getInterpolation(node, context)
      break;
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context)
      break;
    case NodeTypes.ELEMENT:
      genElement(node, context)
      break;

    default:
      break;
  }
}

function genElement(node: any, context: any) {
  const { push, helper } = context
  const { tag } = node
  push(`${helper(CREATE_ELEMENT_VNODE)}('${tag}')`)
}

function genExpression(node: any, context: any) {
  const { push } = context
  push(`${node.content}`)
}

function getInterpolation(node: any, context: any) {
  const { push, helper } = context

  push(`${helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  push(')')
}

function getText(node: any, context: any) {
  const { push } = context
  push(`'${node.content}'`)
}

function genFunctionPreamble(ast: any, context: any) {
  const { push } = context
  const VueBinging = 'Vue'
  const aliasHelper = (s) => `${helperMapName[s]}:_${helperMapName[s]}`

  if (ast.helpers.length > 0) {
    push(`const { ${ast.helpers.map(aliasHelper).join(', ')} } = ${VueBinging}`)
  }
  push('\n')
  push('return ')
}

function createCodegenContext(): any {
  const context = {
    code: '',
    push(source) {
      context.code += source
    },
    helper(key) {
      return `_${helperMapName[key]}`
    }
  }
  return context
}
