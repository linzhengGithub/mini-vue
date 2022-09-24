
export function generate(ast) {
  return {
    code: `
    export function render(_ctx, _cache, $props, $setup, $data, $options) {
      return "hi 1"
    }
    `
  }
}
