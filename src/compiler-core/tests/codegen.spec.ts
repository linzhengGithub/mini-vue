import { generate } from "../src/codegen";
import { baseParse } from "../src/parse";
import { transform } from "../src/transform";

describe('codegen', () => {
  it.skip('string', () => {
    const ast = baseParse('hi')
    transform(ast)
    const {code} = generate(ast)
    
    expect(code).toMatchSnapshot()
  })

  it('interpolation', () => {
    const ast = baseParse('{{message}}')
    transform(ast)
    const {code} = generate(ast)
    
    expect(code).toMatchSnapshot()
  }) 
});
