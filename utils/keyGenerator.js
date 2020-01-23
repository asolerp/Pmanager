const createKeywords = name => {
  const arrName = []
  let curName = ''
  name.split('').forEach(letter => {
    curName += letter
    arrName.push(curName)
  })
  return arrName
}

const generateKeywords = name => {
  const keywordFullName = createKeywords(name)

  return [...new Set(['', ...keywordFullName])]
}

export default generateKeywords
