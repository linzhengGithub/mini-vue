import { NodeTypes } from "./ast"

const enum TagType {
  Start,
  End
}

export function baseParse(content: string) {
  const context = createParseContext(content)
  return createRoot(parseChildren(context, ''))
}

function parseChildren(context: any, parentTag) {
  const nodes: any = []

  let node
  while (!isEnd(context, parentTag)) {
    const s = context.source
    if (s.startsWith('{{')) {
      node = parseInterpolation(context)
    } else if (s[0] === '<') {
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context)
      }
    }

    if (!node) {
      node = parseText(context)
    }

    nodes.push(node)
  }

  return nodes
}

function isEnd(context, parentTag) {
  // 当遇到结束标签的时候
  const s = context.source
  if (parentTag && s.startsWith(`</${parentTag}>`)) {
    return true
  }
  // source 有值的时候
  return !s
}

function parseText(context: any) {
  let endIndex = context.source.length
  let endTokens = ['<', '{{']

  for (let i = 0; i < endTokens.length; i++) { 
    const index = context.source.indexOf(endTokens[i])
    if (index !== -1 && endIndex > index) {
      endIndex = index
    }
  }

  const content = parseTextData(context, endIndex)

  return {
    type: NodeTypes.TEXT,
    content
  }
}

function parseTextData(context, length) {
  // 1.解析
  const content = context.source.slice(0, length)
  // 2.推进
  advanceBy(context, length)

  return content
}

function parseElement(context) {
  const element: any = parseTag(context, TagType.Start)

  element.children = parseChildren(context, element.tag)

  parseTag(context, TagType.End)

  return element
}


function parseTag(context: any, type: TagType) {
  // 1.解析
  const match: any = /^<\/?([a-z]*)/i.exec(context.source)
  const tag = match[1]
  // 2.删除处理完成的代码
  advanceBy(context, match[0].length)
  advanceBy(context, 1)

  if (type === TagType.End) return

  return {
    type: NodeTypes.ELEMENT,
    tag
  }
}

function parseInterpolation(context) {
  const openDelimiter = '{{'
  const closeDelimiter = '}}'

  const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length)

  advanceBy(context, openDelimiter.length)
  const rawContentLength = closeIndex - openDelimiter.length

  const rawContent = parseTextData(context, rawContentLength)
  const content = rawContent.trim()

  advanceBy(context, closeDelimiter.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content
    }
  }
}

function advanceBy(context: any, length: number) {
  context.source = context.source.slice(length)
}

function createRoot(children): any {
  return {
    children
  }
}

function createParseContext(content: string): any {
  return {
    source: content
  }
}
