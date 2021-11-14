const e = require('./error')

exports.createConfig = (str) => {
  const configArr = ['C0', 'C1', 'R0', 'R1', 'A']

  let arr = str.split('-')

  for (let i = 0; i < arr.length; i++) {
    let f = false
    for (let j = 0; j < configArr.length; j++) {
      if (arr[i] == configArr[j]) {
        f = true
      }
    }
    if (!f) {
      e.error("Invalid config", 1)
    }
  }

  return arr
  /**
   * Второй вариант проверки валидности конфига
   * Он больше соответсвует требованию реализации,
   * но мне не нравится из-за отсутсвия маштабируемсти
   */
  /*
  for (let i = 0; i < arr.length; i++) {
    if ((arr[i][0] == "C" || arr[i][0] == "R") && arr[i].length == 2) {
      if (arr[i][1] == "1" || arr[i][1] == "0") {
        console.log("ok", arr[i])
      } else {
        console.log("not ok", arr[i])
      }
    } else if (arr[i][0] == "A" && arr[i].length == 1) {
      console.log("ok", arr[i])
    } else {
      console.log("very not ok", arr[i])
    }
  }
  */
}