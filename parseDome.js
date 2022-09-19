// 使用有限状态机的思想 实现一个简单正则

// /abc/.test('')
// /ab[cd]/.test('')

function test(string) {
  let i;
  let startIndex;
  let endIndex;
  let result = []
  function waitForA(char) {
    if (char === 'a') {
      startIndex = i
      return waitForB
    }
    return waitForA
  }

  function waitForB(char) {
    if (char === 'b') {
      return waitForC
    }
    return waitForA
  }

  function waitForC(char) {
    if (char === 'c' || char === 'd') {
      endIndex = i
      return end
    }
    return waitForA
  }

  function end() {
    return end
  }

  let currentState = waitForA
  for (i = 0; i < string.length; i++) {
    let nextState = currentState(string[i])
    currentState = nextState

    if (nextState === end) {
      result.push({
        start: startIndex,
        end: endIndex
      })
      currentState = waitForA
    }
  }
  console.log(result);
}


console.log(test('uthabcuhfdabd'))
