// 下划线转驼峰命名
export const underlineToCamel = function (name) {
  return name.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

export const camelToUnderline = function (name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// 连字符和驼峰转换
export const hyphenToCamel = function (name) {
  return name.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

export const camelToHyphen = function (name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}

const utils = {
  underlineToCamel,
  camelToUnderline,
  hyphenToCamel,
  camelToHyphen,
}

export default utils