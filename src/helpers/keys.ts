type DefaultObject = Record<string, any>

export function gerarChavesRecursivo(objeto: any, chavePai = ''): any {
  const chaves: { [key: string]: any } = {}

  for (let chave in objeto) {
    if (objeto.hasOwnProperty(chave)) {
      const valor = objeto[chave]
      const chaveCompleta = chavePai ? `${chavePai}.${chave}` : chave.toString()

      if (typeof valor === 'object' && valor !== null) {
        const chavesAninhadas = gerarChavesRecursivo(valor, chaveCompleta)
        Object.assign(chaves, chavesAninhadas)
      } else {
        chaves[chaveCompleta] = valor
      }
    }
  }

  return chaves
}

export function verificaChavesExistentes(chaves: { [key: string]: any }, tipo: any): boolean {
  for (let chave in chaves) {
    if (chaves.hasOwnProperty(chave)) {
      const partesChave = chave.split('.')
      let tipoAtual = tipo

      for (let i = 0; i < partesChave.length; i++) {
        const parte = partesChave[i]

        if (parte in tipoAtual) {
          tipoAtual = tipoAtual[parte]
        } else {
          return false
        }
      }
    }
  }

  return true
}

export function formatRecursiveObject(inputObject: DefaultObject) {
  const formattedFilterObject: DefaultObject = {}

  Object.entries(inputObject).reduce((acc, [key, value]) => {
    const splittedKey: string[] = key.split('.')
    let curr: DefaultObject = acc

    splittedKey.forEach((key, index) => {
      if (index === splittedKey.length - 1) {
        // Assign the value to the final key
        curr[key] = value
      } else {
        // Create an empty object if the key doesn't exist
        curr[key] = curr[key] || {}
        // Move to the next level of the nested object
        curr = curr[key]
      }
    })

    return acc
  }, formattedFilterObject)

  return formattedFilterObject
}
