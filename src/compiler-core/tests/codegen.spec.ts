import { generate } from "../src/codegen";
import { baseParse } from "../src/parse";

describe('codegen', () => {
  it('string', () => {
    const ast = baseParse('hi')
    const {code} = generate(ast)
    
    // 快照
    // 1.抓bug
    // 2.有意()
    expect(code).toMatchSnapshot()
  })
});
